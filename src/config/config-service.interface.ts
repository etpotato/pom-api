import { EnvironmentVariables } from './config.validation';

export interface AppConfigServiceInterface {
  get<T extends keyof EnvironmentVariables>(key: T): EnvironmentVariables[T];
}
