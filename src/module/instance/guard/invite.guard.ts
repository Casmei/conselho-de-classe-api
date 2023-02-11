import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserStatus } from 'src/module/user/protocols/user.protocols';
import { InstanceService } from '../instance.service';

@Injectable()
export class InviteGuard implements CanActivate {
  constructor(private readonly inviteService: InstanceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticatedUser = request.user;
    const code = request.params.code;

    const invite = await this.inviteService.findInviteByCode(code);
    const { status, userData } = invite.invite_extra_data;

    if (!invite) {
      throw new BadRequestException('Invitation not found');
    }

    if (authenticatedUser.email === invite.owner_invite.email) {
      throw new UnauthorizedException(
        'The owner of the instance cannot join it through an invite',
      );
    }

    if (
      userData.email !== authenticatedUser.email ||
      status !== UserStatus.INVITED
    ) {
      throw new UnauthorizedException(
        'You are not authorized to use this invitation',
      );
    }

    return true;
  }
}
