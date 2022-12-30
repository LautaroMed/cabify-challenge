import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  requestJourney(): string {
    return 'Hello World!';
  }

  requestDropOff(): string {
    return 'Hello World!';
  }

  locate(): string {
    return 'Hello World!';
  }
}
