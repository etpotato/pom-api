import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { AppConfigService } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  const config = app.get(AppConfigService);
  const port = config.get('PORT');
  await app.listen(port);

  Logger.log(`App is listening on port: ${port}`);
}
bootstrap();
