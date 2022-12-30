import {Controller, Post} from '@nestjs/common';
import { GroupService } from './group.service';

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("/journey")
  requestJourney(): string {
    return this.groupService.requestJourney();
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
