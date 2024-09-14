import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config.validation';
import { AppConfigServiceInterface } from './config-service.interface';

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  public get<T extends keyof EnvironmentVariables>(key: T) {
    return this.config.get<EnvironmentVariables[T]>(key);
  }
}
