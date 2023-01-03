import {Body, Controller, Post, Res} from '@nestjs/common';
import { GroupService } from './group.service';
import {Response} from "express";
import {Group} from "../types";
import {StatusCodes} from "http-status-codes";

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("/journey")
  requestJourney(@Body() group: Group, @Res() response: Response) {
    if (!group) {
      response.sendStatus(StatusCodes.BAD_REQUEST);
    }

    this.groupService.requestJourney(group);
    response.status(StatusCodes.OK).send("");
  }

  @Post("/dropoff")
  requestDropOff(@Body() body, @Res() response: Response): string {
    if (!body.ID) {
      response.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }
    const result = this.groupService.requestDropOff(body.ID);
    if (!result) {
      response.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    response.status(StatusCodes.OK).send("");
  }

  @Post("/locate")
  locate(@Body() body, @Res() response: Response): string {
    if (!body.ID) {
      response.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }
    try {
      const car = this.groupService.locate(body.ID);
      if (car === null) {
        response.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }
      response.status(StatusCodes.OK).send(car.toString())
    } catch (e) {
      response.status(StatusCodes.NOT_FOUND).send("");
    }
  }
}
