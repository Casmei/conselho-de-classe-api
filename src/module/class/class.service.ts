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

  async findOne(instanceId: number, id: string) {
    try {
      const singleClass = await this.classRepository.findOneBy({
        id,
        instance: { id: instanceId },
      });

      if (!singleClass) {
        throw new NotFoundException();
      }

      return singleClass;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(instanceId: number, id: string, data: UpdateClassDto) {
    try {
      if (!(await this.classBelongsToInstitution(instanceId, id))) {
        throw new NotFoundException();
      }
      return this.classRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(instanceId: number, id: string) {
    try {
      if (!(await this.classBelongsToInstitution(instanceId, id))) {
        throw new NotFoundException();
      }
      return this.classRepository.softDelete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async classBelongsToInstitution(instanceId: number, classId: string) {
    return !!this.classRepository.countBy({
      instance: { id: instanceId },
      id: classId,
    });
  }

  async retrieveOrCreate(instanceId: number, data: CreateClassDto) {
    const existClass = await this.classRepository.findOne({
      where: {
        instance: { id: instanceId },
        ...data,
      },
    });

    if (!existClass) {
      return this.create(instanceId, data);
    }

    return existClass;
  }
}
