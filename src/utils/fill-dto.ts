import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillDto<T extends object>(
  source: object,
  dto: ClassConstructor<T>,
) {
  return plainToInstance(dto, source, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  });
}
