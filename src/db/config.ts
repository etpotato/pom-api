import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { config } from 'dotenv';
import { validate } from '../utils';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export class DatabaseEnvironmentVariables {
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

const databaseVariables = validate(process.env, DatabaseEnvironmentVariables);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: databaseVariables.DB_HOST,
  port: databaseVariables.DB_PORT,
  username: databaseVariables.DB_USERNAME,
  password: databaseVariables.DB_PASSWORD,
  database: databaseVariables.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const connectionSource = new DataSource(dataSourceOptions);
