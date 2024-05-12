import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { AppConfigService } from './modules/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(AppConfigService);
  const port = config.get('PORT');
  await app.listen(port);

  Logger.log(`App is listening on port: ${port}`);
}
bootstrap();
