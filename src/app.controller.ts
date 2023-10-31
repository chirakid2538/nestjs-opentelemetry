import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async appStatus(): Promise<Record<string, any>> {
    throw new BadRequestException('aaa');
    return this.appService.appStatus();
  }
}
