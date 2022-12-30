import { Module } from '@nestjs/common';
import { StatusController } from './status/statusController';
import { StatusService } from './status/status.service';
import {GroupController} from "./group/groupController";
import {CarService} from "./car/car.service";
import {GroupService} from "./group/group.service";
import {CarController} from "./car/carController";

@Module({
  imports: [],
  controllers: [CarController, GroupController, StatusController],
  providers: [CarService, GroupService, StatusService],
})
export class AppModule {}
