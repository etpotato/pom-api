import { Expose, Type } from 'class-transformer';
import { RoleValue } from 'src/types';
import { User } from 'src/users/users.entity';

export class AuthSignInResponseUserDto implements Omit<User, 'passwordHash'> {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public role: RoleValue;

  @Expose()
  public created_at: string;

  @Expose()
  public updated_at: string;
}

export class AuthSignInResponseDto {
  @Expose()
  public access_token: string;

  @Expose()
  @Type(() => AuthSignInResponseUserDto)
  public user: AuthSignInResponseUserDto;
}
