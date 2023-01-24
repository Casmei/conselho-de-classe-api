import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    configService.get('BACKEND_PORT')
      ? Number(configService.get('BACKEND_PORT'))
      : 3000,
  );
}
bootstrap();
