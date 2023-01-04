import { Injectable } from '@nestjs/common';
import {CarDTO, Group} from "../types";
import {Car} from "./model/Car";

@Injectable()
export class CarService {
  private cars: Object;

  constructor() {
    this.clearCars();
  }

  loadCars(cars: CarDTO[]): string {
    this.clearCars();

    cars.forEach(car => this.addFreeCar(new Car(car.id, car.seats)));

    return 'OK';
  }

  findCarForGroup(group: Group): Car|null {
    return this.findCarWithSeats(group.people);
  }

  refreshCar(car: Car) {
    this.removeCar(car);
    this.addFreeCar(car);
  }

  private clearCars() {
    this.cars = {};
    for (let i = 0; i <= 6; i++) {
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

  private addFreeCar(car: Car) {
    this.cars[car.getFreeSeats()].push(car);
  }

  private removeCar(car: Car) {
    this.cars[car.getFreeSeats()] = this.cars[car.getFreeSeats()].filter((nextCar: Car) => nextCar.getId() != car.getId());
  }
}
