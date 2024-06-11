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

  async create(data: CreateClassDto) {
    try {
      return this.classRepository.save({
        ...data,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    return this.classRepository.find();
  }

  async findOne(id: string) {
    try {
      const singleClass = await this.classRepository.findOneBy({ id });

      if (!singleClass) {
        throw new NotFoundException();
      }

      return singleClass;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, data: UpdateClassDto) {
    try {
      return this.classRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      return this.classRepository.softDelete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
