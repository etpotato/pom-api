import { Expose } from 'class-transformer';
import { User } from '../users.entity';
import { RoleValue } from 'src/types';

export class UserResponseDto implements User {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public passwordHash: string;

  @Expose()
  public role: RoleValue;

  @Expose()
  public created_at: string;

  @Expose()
  public updated_at: string;
}
