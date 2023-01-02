import {Body, Controller, Post, Res} from '@nestjs/common';
import { GroupService } from './group.service';
import {Response} from "express";
import {Group} from "../types";

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("/journey")
  requestJourney(@Body() group: Group, @Res() response: Response) {
    if (!group) {
      response.sendStatus(400);
    }

    this.groupService.requestJourney(group);
    response.sendStatus(200);
  }

  @Post("/dropoff")
  requestDropOff(@Body() body, @Res() response: Response): string {
    if (!body.id) {
      response.sendStatus(400);
      return;
    }
    const result = this.groupService.requestDropOff(body.id);
    if (!result) {
      response.sendStatus(404);
      return;
    }
    response.sendStatus(200);
  }

  @Post("/locate")
  locate(@Body() body, @Res() response: Response): string {
    const car = this.groupService.locate(body.id);

    if (car === null) {
      response.sendStatus(404);
      return;
    }
    if (car === undefined) {
      response.sendStatus(204);
      return;
    }
    response.status(200).send(car.toString())
  }
}
