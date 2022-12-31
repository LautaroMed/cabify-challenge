import {Body, Controller, Post, Res} from '@nestjs/common';
import { GroupService } from './group.service';
import {Response} from "express";
import {Group} from "../types";

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("/journey")
  requestJourney(@Body() body, @Res() response: Response) {
    const group: Group = JSON.parse(body);

    if (!group) {
      response.sendStatus(400);
    }

    this.groupService.requestJourney(group);
    response.sendStatus(200);
  }

  @Post("/dropoff")
  requestDropOff(): string {
    return this.groupService.requestDropOff();
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
    response.status(200).send(JSON.stringify(car))
  }
}
