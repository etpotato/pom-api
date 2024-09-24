import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const [type, tokenFromHeader] =
      request.headers.authorization?.split(' ') || [];
    const token = type === 'Bearer' ? tokenFromHeader : null;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
