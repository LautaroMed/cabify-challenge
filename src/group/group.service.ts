import { Injectable } from '@nestjs/common';
import {CarService} from "../car/car.service";
import {Group} from "../types";
import {Car} from "../car/model/Car";

@Injectable()
export class GroupService {
  private groupQueue: Group[];
  private travelingGroups: Object;

  constructor(private readonly carService: CarService) {
    this.reset();
  }

  reset() {
    this.groupQueue = [];
    this.travelingGroups = [];
  }

  requestJourney(group: Group) {
    const car: Car|null = this.carService.findCarForGroup(group);
    if (!car) {
      this.groupQueue.push(group);
    } else {
      this.addGroupToCar(group, car);
      this.carService.refreshCar(car);
    }
  }

  requestDropOff(groupId: number) {
    if (groupId in this.travelingGroups) {
      const car: Car = this.travelingGroups[groupId];

      const group = this.removeGroupFromCar(groupId, car);
      this.carService.refreshCar(car);

      if (this.groupQueue.length) {
        this.sendWaitingGroupOnReleasedCar(car);
      }

      return group;
    } else {
      const index = this.findGroupInQueue(groupId);
      if (index > -1) {
        return this.groupQueue.splice(index, 1);
      }
    }
    return null;
  }

  locate(groupId: number) {
    if (groupId in this.travelingGroups) {
      return this.travelingGroups[groupId];
    }

    this.findGroupInQueue(groupId);
    return null
  }

  private findGroupInQueue(groupId: number) : number {
    for (let i = 0; i < this.groupQueue.length; i++) {
      if (this.groupQueue[i].id == groupId) {
        return i;
      }
    }
    throw new Error();
  }

  private addGroupToCar(group: Group, car: Car) {
    this.travelingGroups[group.id] = car;
    car.addGroup(group);
  }

  private removeGroupFromCar(groupId: number, car: Car) {
    delete this.travelingGroups[groupId];
    return car.dropGroup(groupId);
  }

  private sendWaitingGroupOnReleasedCar(car: Car) {
    for (let i = 0; i < this.groupQueue.length; i++) {
      if (this.groupQueue[i].people <= car.getFreeSeats()) {
        const nextGroup = this.groupQueue.splice(i, 1)[0];
        this.requestJourney(nextGroup);
        break;
      }
    }
  }
}
