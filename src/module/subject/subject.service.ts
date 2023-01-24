import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
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
  create(data: CreateSubjectDto) {
    try {
      return this.subjectRepository.save(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAll() {
    try {
      return this.subjectRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const subject = this.subjectRepository.findOneOrFail({
        where: { id },
        cache: 60000,
      });

      if (!!subject) {
        throw new HttpException('subject not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {}
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
      return this.subjectRepository.softDelete(id);
    } catch (error) {
      throw new HttpException('subject not found', HttpStatus.NOT_FOUND);
    }
  }
}
