import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InstanceService } from '../instance.service';

@Injectable()
export class UserBelongsToIntance implements CanActivate {
  constructor(private readonly instanceService: InstanceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticatedUser = request.user;
    const instanceId = request.params.instance_id;

    const instance = await this.instanceService.userBelongsToInstance(
      instanceId,
      authenticatedUser.id,
    );

    if (!instance) {
      throw new NotFoundException('Instancia não encontrada');
    }

    return true;
  }
}
