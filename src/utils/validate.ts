import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validate<T extends object>(
  source: Record<string, unknown>,
  dto: ClassConstructor<T>,
) {
  const validatedConfig = plainToInstance(dto, source, {
    excludeExtraneousValues: true,
  });
  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
