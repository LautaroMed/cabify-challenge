import {Controller, Get, Res} from '@nestjs/common';
import {CarService} from "../car/car.service";
import {Response} from "express";

@Controller()
export class StatusController {
  constructor(private readonly carService: CarService) {}

  @Get("/status")
  getStatus(@Res() response: Response): string {
    if (this.carService.isReady()) {
      response.sendStatus(200)
    } else {
      response.sendStatus(401);
    }
    return "";
  }
}
