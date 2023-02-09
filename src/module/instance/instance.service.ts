import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { Instance } from './entities/instance.entity';
import { UserToInstance } from './entities/UserToInstance.entity';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(Instance)
    private readonly instanceRepository: Repository<Instance>,
    @InjectRepository(UserToInstance)
    private readonly userToInstanceRepository: Repository<UserToInstance>,
    private userService: UserService,
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
        },
      });

      return instances;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async update(
    institutionId: string,
    userPaylaod: any,
    data: UpdateInstanceDto,
  ) {
    return this.instanceRepository.update(institutionId, data);
  }

  async joinInstanceByCode(code: string, user: any) {
    /**
     * [] - Verificar se o email do convite é o mesmo da pessoa autenticada
     * [x] - Verificar se o dono do convite não é o mesmo que está tentando entrar
     * [] - Verificar se o usuário já está dentro da instancia
     * [] - Verificar a válida do convite e mudar de Invited para Active
     * [] - Tratar o retorna da response
     */

    const invite = await this.userService.findInviteByCode(code);

    const isOwner = !!(await this.instanceRepository.findOneBy({
      userOwner: { id: user.id },
      id: invite.instance.id,
    }));

    //TODO: tem como comparar o id da pessoa autenticada com o id do dono do convite, porém não funcionou
    if (isOwner) {
      throw new UnauthorizedException(
        'O dono da instância não pode entrar nela atráves de um convite',
      );
    }

    if (invite.invite_extra_data.userData.email !== user.email) {
      throw new UnauthorizedException(
        'Você não tem autorização para usar esse convite',
      );
    }
    const instance = await this.instanceRepository.findOneBy({
      id: invite.instance.id,
    });

    // return this.userToInstanceRepository.save({
    //   instance,
    //   user: { id: user.id },
    //   subscription_instance: new Date(),
    //   classes: invite.invite_extra_data.userData.classes,
    //   subjects: invite.invite_extra_data.userData.subjects,
    //   role: invite.invite_extra_data.userData.role,
    // });
  }

  private async isOwner(id: string) {
    //TODO: aplicar estrategia de cache
    return !!(await this.instanceRepository.findOneBy({ userOwner: { id } }));
  }
}
