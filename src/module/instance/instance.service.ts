import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { Instance } from './entities/instance.entity';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(Instance)
    private readonly instanceRepository: Repository<Instance>,
    private userService: UserService,
  ) {}
  //TODO: tipar meu user
  async create(user: any, data: CreateInstanceDto) {
    try {
      if (await this.isOwner(user.id)) {
        throw new BadRequestException();
      }

      return this.instanceRepository.save({
        ...data,
        userOwner: user,
        users: [user],
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findAllByUser(userPaylaod: any) {
    try {
      const user = await this.userService.findOne(userPaylaod.id);
      return user.instances;
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

  private async isOwner(id: string) {
    //TODO: aplicar estrategia de cache
    return !!(await this.instanceRepository.findOneBy({ userOwner: { id } }));
  }
}
