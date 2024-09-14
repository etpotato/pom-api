import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users';
import { AuthSignInRequestDto, AuthSignInResponseDto } from './dto';
import { encodeJwt, fillDto, validateHash } from 'src/utils';
import { AppConfigService } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: AppConfigService,
  ) {}

  async signUp(dto: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    const existing = await this.usersService.findByName(dto.name);

    if (existing) {
      throw new ConflictException();
    }

    const user = await this.usersService.create(dto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...data } = user;

    const token = await encodeJwt(data, this.config.get('JWT_SECRET'), 60 * 60);

    return fillDto({ token, user: data }, AuthSignInResponseDto);
  }

  async signIn(dto: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    const user = await this.usersService.findByName(dto.name);
    const isPasswordValid = await validateHash(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...data } = user;

    const token = await encodeJwt(data, this.config.get('JWT_SECRET'), 60 * 60);

    return fillDto({ token, user: data }, AuthSignInResponseDto);
  }
}
