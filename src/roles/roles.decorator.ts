import { SetMetadata } from '@nestjs/common';
import { RoleValue } from '../types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleValue[]) => SetMetadata(ROLES_KEY, roles);
