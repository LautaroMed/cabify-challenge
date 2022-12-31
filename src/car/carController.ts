import {Body, Controller, Put, Res} from '@nestjs/common';
import { CarService } from './car.service';
import {Response} from "express";

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Put("/cars")
  loadCars(@Body() body, @Res() response: Response) {
    let cars = JSON.parse(body);

    if (cars === undefined) {
      response.sendStatus(400);
    } else {
      this.carService.loadCars(cars);
      response.sendStatus(200);
    }
  }
}
