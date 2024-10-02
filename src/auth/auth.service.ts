import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users';
import {
  AuthGetUserRequestDto,
  AuthSignInRequestDto,
  AuthSignInResponseDto,
  AuthSignInResponseUserDto,
  AuthUpdateUserRequestDto,
} from './dto';
import { fillDto, validateHash } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { JwtData } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    const existing = await this.usersService.findByName(dto.name);

    if (existing) {
      throw new ConflictException();
    }

    const user = await this.usersService.create(dto);
    const jwtData: JwtData = {
      id: user.id,
      role: user.role,
    };
    const access_token = await this.jwtService.signAsync(jwtData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...data } = user;

    return fillDto({ access_token, user: data }, AuthSignInResponseDto);
  }

  async signIn(dto: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    const user = await this.usersService.findByName(dto.name);
    const isPasswordValid = await validateHash(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const jwtData: JwtData = {
      id: user.id,
      role: user.role,
    };
    const access_token = await this.jwtService.signAsync(jwtData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...data } = user;

    return fillDto({ access_token, user: data }, AuthSignInResponseDto);
  }

  async getUser(id: AuthGetUserRequestDto['id']) {
    const user = await this.usersService.findById(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;

    return fillDto(result, AuthSignInResponseUserDto);
  }

  public async updateUser(dto: AuthUpdateUserRequestDto) {
    await this.usersService.update(dto);
  }
}
