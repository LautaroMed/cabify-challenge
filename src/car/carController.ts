import {Body, Controller, Put, Res} from '@nestjs/common';
import { CarService } from './car.service';
import {Response} from "express";
import {CarDTO} from "../types";
import {StatusCodes} from "http-status-codes";
import {GroupService} from "../group/group.service";

@Controller()
export class CarController {
  constructor(private readonly carService: CarService, private readonly groupService: GroupService) {}

  @Put("/cars")
  loadCars(@Body() cars: CarDTO[], @Res() response: Response) {
    if (cars === undefined) {
      response.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
      this.groupService.reset();
      this.carService.loadCars(cars);

      response.sendStatus(StatusCodes.OK);
    }
  }
}
