import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role, RoleValue } from 'src/types';
import { User } from '../users.entity';
import { Type } from 'class-transformer';

export class UserUpdateRequestDto
  implements Partial<Pick<User, 'id' | 'name' | 'role'>>
{
  @IsNumberString()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @IsEnum(Role)
  @IsOptional()
  public role?: RoleValue;
}
