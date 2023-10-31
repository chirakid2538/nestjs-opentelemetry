import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';
import { otelSDK } from './tracer';

import { HttpExceptionFilter } from '#common/filters/http-exception.filter';
import { convertError } from '#common/utils/class-validator.util';

async function bootstrap() {
  /**
   * init opentelemetry instant
   */
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const responseError = convertError({}, errors);
        throw new BadRequestException({
          statusCode: 400,
          message: 'common/validation-failed',
          errors: responseError,
        });
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
