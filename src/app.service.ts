import { Injectable } from '@nestjs/common';
import { LoggerService } from '#shared/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly loggerService: LoggerService) {}

  appStatus(): Record<string, any> {
    this.loggerService.w({ spanName: 'getHello' });
    return { timestamp: new Date().toISOString(), message: 'common/ok' };
  }
}
