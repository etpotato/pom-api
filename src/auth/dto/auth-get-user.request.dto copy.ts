import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AuthGetUserRequestDto {
  @IsNumberString()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;
}
