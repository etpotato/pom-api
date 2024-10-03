import pino, { Logger as PinoLogger } from 'pino';
import { LoggerService, Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config';
import { NodeEnv } from 'src/types';
import { isObject } from 'class-validator';

@Injectable()
export class Logger implements LoggerService {
  private readonly pino: PinoLogger;

  constructor(config: AppConfigService) {
    const sentryTarget =
      config.get('NODE_ENV') === NodeEnv.Prod
        ? {
            target: 'pino-sentry-transport',
            options: {
              sentry: {
                dsn: config.get('SENTRY_DSN'),
                // additional options for sentry
              },
            },
          }
        : null;
    this.pino = pino({
      transport: {
        targets: [
          { ...sentryTarget },
          {
            target: 'pino-pretty',
            options: {
              destination: 1,
              colorize: true,
            },
          },
        ],
      },
      level: 'debug',
      // formatters: {
      //   level(level) {
      //     return { level };
      //   },
      // },
    });
  }

  public info(message: string, ...params: any[]) {
    this.pino.info(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }

  public log(message: string, ...params: any[]) {
    this.pino.info(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }

  public fatal(message: string, ...params: any[]) {
    this.pino.fatal(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }

  public error(message: string, ...params: any[]) {
    this.pino.error(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }

  public warn(message: string, ...params: any[]) {
    this.pino.warn(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }

  public debug(message: string, ...params: any[]) {
    this.pino.debug(
      isObject(params?.[0]) ? params?.[0] : undefined,
      message,
      ...params,
    );
  }
}
