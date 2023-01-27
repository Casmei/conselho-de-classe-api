import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    private userService: UserService,
  ) {}
  //todo: tipar meu user
  async create(user: any, data: CreateInstitutionDto) {
    try {
      return this.institutionRepository.save({
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
      return user.institutions;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async update(
    institutionId: string,
    userPaylaod: any,
    data: UpdateInstitutionDto,
  ) {
    return this.institutionRepository.update(institutionId, data);
  }

  private async isOwner(id: string) {
    const user = await this.userService.findOne(id);

    return !!(await this.institutionRepository.countBy({
      userOwner: user,
    }));
  }
}
