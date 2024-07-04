import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: configService.get('CLIENT_URL'),
  });
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
