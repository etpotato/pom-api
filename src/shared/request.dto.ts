import { Expose, Type } from 'class-transformer';
import { IsDefined, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class GetByIdRequesDto {
  @Expose()
  @IsDefined()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  public id: number;
}

export class NameRequestDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
