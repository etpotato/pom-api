import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtData } from 'src/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const requiredRoles: string[] | undefined =
      this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: JwtData } = context.switchToHttp().getRequest();

    return requiredRoles.includes(user?.role);
  }
}
