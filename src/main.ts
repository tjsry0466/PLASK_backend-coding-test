import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import defaultConfig from './config/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // mapping 클래스 변경 허용
      transformOptions: {
        enableImplicitConversion: true, // 암묵적 타입 변환
      },
    }),
  );
  await app.listen(defaultConfig().port);
}
bootstrap();
