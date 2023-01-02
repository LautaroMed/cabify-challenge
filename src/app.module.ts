import {MiddlewareConsumer, Module} from '@nestjs/common';
import { StatusController } from './status/statusController';
import {GroupController} from "./group/groupController";
import {CarService} from "./car/car.service";
import {GroupService} from "./group/group.service";
import {CarController} from "./car/carController";
import {RequestValidation} from "./middleware/RequestValidation";

@Module({
  imports: [],
  controllers: [CarController, GroupController, StatusController],
  providers: [CarService, GroupService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestValidation).forRoutes("*");
  }
}
