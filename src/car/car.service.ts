import { Injectable } from '@nestjs/common';

@Injectable()
export class CarService {
  loadCars(): string {
    return 'Hello World!';
  }
}
