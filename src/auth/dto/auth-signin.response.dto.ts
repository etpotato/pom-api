import { Expose, Type } from 'class-transformer';
import { User } from 'src/users/users.entity';

class AuthSignInResponseUserDto implements Omit<User, 'passwordHash'> {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public created_at: string;

  @Expose()
  public updated_at: string;
}

export class AuthSignInResponseDto {
  @Expose()
  public token: string;

  @Expose()
  @Type(() => AuthSignInResponseUserDto)
  public user: AuthSignInResponseUserDto;
}
