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

  //TODO: inverter, é mais fácil pesquisar a instancia no usuario do que o usuario em uma instancia
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
