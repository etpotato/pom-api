import { Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    excludeExtraneousValues: true,
  });
  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
