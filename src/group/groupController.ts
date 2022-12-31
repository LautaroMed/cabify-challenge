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
  locate(): string {
    return this.groupService.locate();
  }
}
