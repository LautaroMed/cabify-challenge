import { Injectable } from '@nestjs/common';
import {Car, Group} from "../types";

@Injectable()
export class CarService {
  private cars: Object;
  private ready: boolean;

  constructor() {
    this.clearCars();
  }

  loadCars(cars: Car[]): string {
    this.clearCars();

    cars.forEach(car => this.addFreeCar(car));
    this.ready = true;

    return 'OK';
  }

  isReady(): boolean {
    return this.ready;
  }

  findCarForGroup(group: Group): Car|null {
    return this.findCarWithSeats(group.people);
  }

  addFreeCar(car) {
    this.cars[car.seats].push(car);
  }

  private clearCars() {
    this.ready = false;
    this.cars = {};
    for (let i = 1; i <= 6; i++) {
      this.cars[i] = [];
    }
  }

  private findCarWithSeats(seats: number): Car|null {
    if (this.cars[seats].length > 0) {
      return this.cars[seats].pop();
    }
    if ((seats + 1) in this.cars) {
      return this.findCarWithSeats(seats + 1);
    }
    return null;
  }
}
