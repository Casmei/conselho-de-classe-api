import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(instanceId: number, data: CreateClassDto) {
    try {
      return this.classRepository.save({
        ...data,
        instance: { id: instanceId },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(instanceId: number) {
    return this.classRepository.find({
      where: { instance: { id: instanceId } },
    });
  }

  async findOne(id: string) {
    try {
      await this.classExists(id);

      return this.classRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, data: UpdateClassDto) {
    try {
      await this.classExists(id);

      return this.classRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      await this.classExists(id);

      return this.classRepository.softDelete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async classExists(id: string) {
    if (!(await this.classRepository.findOneBy({ id }))) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
