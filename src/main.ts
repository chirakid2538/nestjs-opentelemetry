import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otelSDK } from './tracer';
import { HttpExceptionFilter } from '#common/filter/http-exception.filter';

async function bootstrap() {
  /**
   * init opentelemetry instant
   */
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
