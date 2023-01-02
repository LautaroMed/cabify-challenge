import {Body, Controller, Put, Res} from '@nestjs/common';
import { CarService } from './car.service';
import {Response} from "express";
import {CarDTO} from "../types";
import {StatusCodes} from "http-status-codes";

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Put("/cars")
  loadCars(@Body() cars: CarDTO[], @Res() response: Response) {
    if (cars === undefined) {
      response.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
      this.carService.loadCars(cars);
      response.sendStatus(StatusCodes.OK);
    }
  }
}
