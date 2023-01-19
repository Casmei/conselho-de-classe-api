import { SetMetadata } from '@nestjs/common';
import { userRoles } from '../../user/role.enum';

export const ROLE_KEY = 'role';
export const VerifyRole = (...roles: userRoles[]) =>
  SetMetadata(ROLE_KEY, roles);
