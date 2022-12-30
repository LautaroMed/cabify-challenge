import {Controller, Put} from '@nestjs/common';
import { CarService } from './car.service';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Put()
  loadCars(): string {
    return this.carService.loadCars();
  }
}
