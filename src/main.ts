import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import defaultConfig from './config/default.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(defaultConfig().port);
}
bootstrap();
