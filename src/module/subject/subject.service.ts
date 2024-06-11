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
  async create(data: CreateSubjectDto) {
    try {
      const subject = await this.subjectRepository.save({
        ...data,
      });

      return subject;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    return this.subjectRepository.find();
  }

  async findOne(id: string) {
    try {
      const subject = this.subjectRepository.findOneOrFail({
        where: { id },
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

  async update(id: string, data: UpdateSubjectDto) {
    try {
      return this.subjectRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      return this.subjectRepository.delete(id);
    } catch (error) {
      throw new HttpException('subject not found', HttpStatus.NOT_FOUND);
    }
  }
}
