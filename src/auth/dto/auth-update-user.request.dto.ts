import { OmitType } from '@nestjs/mapped-types';
import { UserUpdateRequestDto } from 'src/users';

export class AuthUpdateUserRequestDto extends UserUpdateRequestDto {}
export class AuthUpdateUserRequestBodyDto extends OmitType(
  UserUpdateRequestDto,
  ['id'],
) {}
