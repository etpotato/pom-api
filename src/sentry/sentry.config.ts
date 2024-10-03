import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { config } from 'dotenv';
import { validate } from 'src/utils';

config();

export class SentryEnvironmentVariables {
  @Expose()
  @IsString()
  @IsNotEmpty()
  SENTRY_DSN: string;
}

export const { SENTRY_DSN } = validate(process.env, SentryEnvironmentVariables);
