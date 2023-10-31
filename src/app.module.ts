import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerModule } from '#shared/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
