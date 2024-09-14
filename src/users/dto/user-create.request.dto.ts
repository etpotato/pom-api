import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
