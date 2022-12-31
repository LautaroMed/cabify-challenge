import { Injectable } from '@nestjs/common';
import {CarService} from "../car/car.service";
import {Car, Group} from "../types";

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
      car.seats = car.seats - group.people;
      this.carService.addFreeCar(car)
    }
  }

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
  requestDropOff(): string {
    return 'Hello World!';
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
