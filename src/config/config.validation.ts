import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { DatabaseEnvironmentVariables } from 'src/db/config';
import { validate } from 'src/utils';

export class EnvironmentVariables extends DatabaseEnvironmentVariables {
  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export function validateConfig(config: Record<string, unknown>) {
  return validate(config, EnvironmentVariables);
}
