import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";

@Controller()
export class StatusController {
  @Get("/status")
  getStatus(@Res() response: Response) {
    response.status(200).send("OK")
  }
}
