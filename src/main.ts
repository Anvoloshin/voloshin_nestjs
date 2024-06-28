import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';

=======
>>>>>>> main
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: true,
    methods: 'GET,PATCH,POST,DELETE',
  });
  await app.listen(process.env.APP_PORT);
=======
  await app.listen(3000);
>>>>>>> main
}
bootstrap();
