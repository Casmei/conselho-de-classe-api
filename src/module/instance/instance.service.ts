import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InviteUserDto } from './dto/invite-user.dto';
import { UserStatus } from '../user/protocols/user.protocols';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { Instance } from './entities/instance.entity';
import { UserToInstance } from './entities/user-to-instance.entity';
import * as crypto from 'crypto';
import { InstanceInvite } from './entities/instance-invite.entity';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(Instance)
    private readonly instanceRepository: Repository<Instance>,
    @InjectRepository(UserToInstance)
    private readonly userToInstanceRepository: Repository<UserToInstance>,
    @InjectRepository(InstanceInvite)
    private readonly instanceInviteRespository: Repository<InstanceInvite>,
  ) {}

  async create(user: any, data: CreateInstanceDto) {
    if (await this.isOwner(user.id)) {
      throw new BadRequestException();
    }

    const instance = await this.instanceRepository.save({
      ...data,
      userOwner: user,
      userToInstance: [{ id: user.id }],
    });

    this.userToInstanceRepository.save({
      instance,
      user: { id: user.id },
      subscription_instance: new Date(),
    });

    return instance;
  }

  async findAllByUser(userPaylaod: any) {
    try {
      const userToInstance = await this.userToInstanceRepository.find({
        where: { user: { id: userPaylaod.id } },
        relations: { instance: true },
      });

      const instanceIds = userToInstance.map(
        (userInstance) => userInstance.instance.id,
      );

      const instances = await this.instanceRepository.find({
        where: {
          id: In(instanceIds),
        },
        relations: {
          userToInstance: { user: true },
          userOwner: true,
        },
        select: {
          userToInstance: {
            subscription_instance: true,
            role: true,
            classes: true,
            subjects: true,
            user: { id: true, name: true, email: true },
          },
          userOwner: { id: true, name: true, email: true },
        },
      });

      return instances;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async inviteUser(data: InviteUserDto, instance_id: number, user_id: string) {
    if (!(await this.existsInstance(instance_id))) {
      throw new BadRequestException('instance no exist');
    }

    const code = crypto.randomUUID().slice(0, 6);
    await this.instanceInviteRespository.save({
      code,
      instance: { id: instance_id },
      owner_invite: { id: user_id },
      invite_extra_data: {
        userData: {
          email: data.email,
          role: data.role,
          classes: data.classes,
          subjects: data.subjects,
        },
        status: UserStatus.INVITED,
      },
    });

    return { link: `http://localhost:3033/institution/invite/${code}` };
  }

  async findInviteByCode(code: string) {
    return this.instanceInviteRespository.findOne({
      where: { code },
      relations: { instance: true, owner_invite: true },
    });
  }

  async joinInstanceByCode(code: string, user: any) {
    const invite = await this.findInviteByCode(code);
    const instance = await this.instanceRepository.findOne({
      where: {
        id: invite.instance.id,
      },
      relations: {
        userToInstance: { user: true },
      },
    });

    this.instanceInviteRespository.update(invite.id, {
      ...invite,
      invite_extra_data: {
        ...invite.invite_extra_data,
        status: UserStatus.ACTIVE,
      },
    });

    return this.userToInstanceRepository.save({
      instance,
      user: { id: user.id },
      subscription_instance: new Date(),
      classes: invite.invite_extra_data.userData.classes,
      subjects: invite.invite_extra_data.userData.subjects,
      role: invite.invite_extra_data.userData.role,
    });
  }

  private async isOwner(id: string) {
    return !!(await this.instanceRepository.countBy({ userOwner: { id } }));
  }

  private async existsInstance(id: number) {
    return this.instanceRepository.countBy({ id });
  }

  async userBelongsToInstance(instanceId: number, userId: string) {
    const instance = await this.instanceRepository.findOne({
      where: { id: instanceId },
      relations: { userToInstance: true },
    });

    if (instance) {
      const users = instance.userToInstance.map(
        (userToInstance) => userToInstance.user.id,
      );
      return users.includes(userId);
    } else {
      return false;
    }
  }
}
