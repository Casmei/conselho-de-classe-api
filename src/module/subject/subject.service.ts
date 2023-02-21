import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}
  async create(instanceId: number, data: CreateSubjectDto) {
    try {
      const subject = await this.subjectRepository.save({
        ...data,
        instance: { id: instanceId },
      });

      return subject;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(instanceId: number) {
    return this.subjectRepository.find({
      where: { instance: { id: instanceId } },
    });
  }

  async findOne(instanceId: number, id: string) {
    try {
      const subject = this.subjectRepository.findOneOrFail({
        where: {
          instance: { id: instanceId },
          id,
        },
        cache: 60000,
      });

      if (!subject) {
        throw new NotFoundException('Disciplina não encontrada');
      }

      return subject;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(instanceId: number, id: string, data: UpdateSubjectDto) {
    try {
      return this.subjectRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(instanceId: number, id: string) {
    try {
      return this.subjectRepository.softDelete(id);
    } catch (error) {
      throw new HttpException('subject not found', HttpStatus.NOT_FOUND);
    }
  }
}
