import { DatabaseEnvironmentVariables } from 'src/db/config';
import { validate } from 'src/utils';

export class EnvironmentVariables extends DatabaseEnvironmentVariables {}

export function validateConfig(config: Record<string, unknown>) {
  return validate(config, EnvironmentVariables);
}
