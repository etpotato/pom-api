import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { DatabaseEnvironmentVariables } from 'src/db/config';
import { validate } from 'src/utils';
import { IntersectionType } from '@nestjs/mapped-types';
import { SentryEnvironmentVariables } from 'src/sentry';

export class EnvironmentVariables extends IntersectionType(
  DatabaseEnvironmentVariables,
  SentryEnvironmentVariables,
) {
  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export function validateConfig(config: Record<string, unknown>) {
  return validate(config, EnvironmentVariables);
}
