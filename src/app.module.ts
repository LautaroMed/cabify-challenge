import { Module } from '@nestjs/common';
import { StatusController } from './status/statusController';
import {GroupController} from "./group/groupController";
import {CarService} from "./car/car.service";
import {GroupService} from "./group/group.service";
import {CarController} from "./car/carController";

@Module({
  imports: [],
  controllers: [CarController, GroupController, StatusController],
  providers: [CarService, GroupService],
})
export class AppModule {}
