import { Injectable } from '@nestjs/common';
import {CarService} from "../car/car.service";
import {Group} from "../types";
import {Car} from "../car/model/Car";

@Injectable()
export class GroupService {
  private readonly groupQueue: Group[];
  private readonly travelingGroups: Object;

  constructor(private readonly carService: CarService) {
    this.groupQueue = [];
    this.travelingGroups = [];
  }

  requestJourney(group: Group) {
    const car: Car|null = this.carService.findCarForGroup(group);
    if (!car) {
      this.groupQueue.push(group);
    } else {
      this.travelingGroups[group.id] = car;
      car.addGroup(group);
      this.carService.addFreeCar(car);
    }
  }

  requestDropOff(groupId: number) {
    if (groupId in this.travelingGroups) {
      const car: Car = this.travelingGroups[groupId];
      delete this.travelingGroups[groupId];
      car.dropGroup(groupId);
      this.carService.addFreeCar(car);
    } else {
      const index = this.findGroupInQueue(groupId);
      if (index > -1) {
        return this.groupQueue.splice(index, 1);
      }
    }
    return null;
  }

  // FIXME: throw exception when group is not found
  locate(groupId: number) {
    if (groupId in this.travelingGroups) {
      return this.travelingGroups[groupId];
    }
    const index = this.findGroupInQueue(groupId);
    if (index > -1) {
      return undefined;
    }
    return null;
  }

  private findGroupInQueue(groupId: number) : number {
    for (let i = 0; i < this.groupQueue.length; i++) {
      if (this.groupQueue[i].id === groupId) {
        return i;
      }
    }
    return -1;
  }
}
