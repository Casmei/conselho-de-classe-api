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
  //TODO: tipar meu user
  async create(user: any, data: CreateInstitutionDto) {
    try {

      if (await this.isOwner(user.id)) {
        throw new BadRequestException();
      }
      
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
    //TODO: aplicar estrategia de cache
    return !!(await this.institutionRepository.findOneBy({userOwner: {id}}))
  }
}
