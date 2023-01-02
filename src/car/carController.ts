import {Body, Controller, Put, Res} from '@nestjs/common';
import { CarService } from './car.service';
import {Response} from "express";
import {CarDTO} from "../types";

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Put("/cars")
  loadCars(@Body() cars: CarDTO[], @Res() response: Response) {
    if (cars === undefined) {
      response.sendStatus(400);
    } else {
      this.carService.loadCars(cars);
      response.sendStatus(200);
    }
  }
}
