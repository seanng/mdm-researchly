import { ValidationPipe } from '@nestjs/common';
import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';

const config = {
  cors: true,
};

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, config);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
