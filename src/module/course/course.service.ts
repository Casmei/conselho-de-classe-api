import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(data: CreateCourseDto) {
    try {
      return this.courseRepository.save(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAll() {
    try {
      return this.courseRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findOne(id: string) {
    try {
      return this.courseRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string, data: UpdateCourseDto) {
    try {
      return await this.courseRepository.update(id, {
        ...data,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  remove(id: string) {
    return this.courseRepository.softDelete(id);
  }
}
