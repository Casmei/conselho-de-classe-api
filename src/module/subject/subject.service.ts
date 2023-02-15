import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { InstanceService } from '../instance/instance.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectToInstance } from './entities/subject-to-instance.entity';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(SubjectToInstance)
    private readonly subjectToInstanceRepository: Repository<SubjectToInstance>,
    private readonly instanceService: InstanceService,
  ) {}
  async create(instanceId: number, data: CreateSubjectDto) {
    try {
      const subject = await this.subjectRepository.save(data);
      return this.subjectToInstanceRepository.save({
        instance: { id: instanceId },
        subject,
        subscription_instance: new Date(),
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(instanceId: number) {
    return this.subjectRepository.find({
      where: {
        subjectToInstance: [{ instance: { id: instanceId } }],
      },
      relations: { subjectToInstance: true },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(instanceId: number, id: string) {
    try {
      const subject = this.subjectRepository.findOneOrFail({
        where: {
          subjectToInstance: [{ instance: { id: instanceId } }],
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
