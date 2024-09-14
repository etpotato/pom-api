import { Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class SourceGetRequesDto {
  @Expose()
  @IsDefined()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  public id: number;
}
