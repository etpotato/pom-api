import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { DatabaseEnvironmentVariables } from 'src/db/config';
import { validate } from 'src/utils';
import { IntersectionType } from '@nestjs/mapped-types';
import { SentryEnvironmentVariables } from 'src/sentry';
import { NodeEnv, NodeEnvValue } from 'src/types';

export class EnvironmentVariables extends IntersectionType(
  DatabaseEnvironmentVariables,
  SentryEnvironmentVariables,
) {
  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @Expose()
  @IsOptional()
  @IsEnum(NodeEnv)
  @Transform(
    ({ value }: { value?: string }) =>
      Object.values(NodeEnv).find((env) => env === value) ?? NodeEnv.Dev,
  )
  NODE_ENV: NodeEnvValue;
}

export function validateConfig(config: Record<string, unknown>) {
  return validate(config, EnvironmentVariables);
}
