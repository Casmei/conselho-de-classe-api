import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/module/auth/decorators/verify-role.decorator';
import { userRoles } from 'src/module/user/protocols/user.protocols';
import { InstanceService } from '../instance.service';

@Injectable()
export class InstitutionRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly instanceService: InstanceService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<userRoles[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const instanceId = request.params.instance_id;

    if (
      await this.instanceService.hasPermision(
        instanceId,
        userId,
        requiredRoles[0],
      )
    ) {
      return true;
    }
    throw new BadRequestException('Você não tem permissão');
  }
}
