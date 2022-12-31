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

    cars.forEach(car => {
      this.cars[car.seats] = car;
    });
    this.ready = true;

    return 'OK';
  }

  isReady(): boolean {
    return this.ready;
  }
  private clearCars() {
    this.ready = false;
    this.cars = {};
    for (let i = 1; i <= 6; i++) {
      this.cars[i] = [];
    }
  }

}
