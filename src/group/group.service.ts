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

  requestDropOff(): string {
    return 'Hello World!';
  }

  locate(): string {
    return 'Hello World!';
  }
}
