import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { ip, method, path: url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const finish = Date.now();
      const durationMs = finish - start;

      this.logger.info(
        `[${method}] ${url} ${statusCode} ${contentLength} ${durationMs}ms - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
