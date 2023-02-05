import { SetMetadata } from '@nestjs/common';
import { userRoles } from 'src/module/user/protocols/user.protocols';

export const ROLE_KEY = 'role';
export const VerifyRole = (...roles: userRoles[]) =>
  SetMetadata(ROLE_KEY, roles);
