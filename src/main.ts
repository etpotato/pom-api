import './sentry';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { AppConfigService } from './config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { Logger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['debug', 'log', 'error', 'fatal', 'verbose', 'warn'],
  });

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  const config = app.get(AppConfigService);
  const port = config.get('PORT');
  await app.listen(port);

  logger.info(`App is listening on port: ${port}`);
}
bootstrap();
