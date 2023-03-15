import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassService } from '../class/class.service';
import { CourseService } from '../course/course.service';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly classService: ClassService,
    private readonly courseService: CourseService,
  ) {}

  async createParseCsv(instanceId: number, file: string) {
    const lines = file.split(/\r?\n/).slice(1);
    const students = [];

    for (const line of lines) {
      const [name, registration, contract, course, className] = line.split(',');

      const student = new Student();
      student.name = name;
      student.registration = registration;
      student.contract = contract;

      const courseObj = await this.courseService.retrieveOrCreate(instanceId, {
        name: course,
      });

      student.course = courseObj;

      const classObj = await this.classService.retrieveOrCreate(instanceId, {
        name: className,
      });

      student.class = classObj;

      students.push(student);
    }

    await this.studentRepository.insert(
      students.map((student) => ({ ...student, instance: { id: instanceId } })),
    );
  }

  async getAll(instanceId: number) {
    console.log('🚀 ~ instanceId:', instanceId);

    const students = await this.studentRepository.find({
      where: { instance: { id: instanceId } },
      relations: {
        class: true,
        course: true,
      },
    });

    return students;
  }

  async updateStudentCsv(instanceId: number, file: string) {
    const lines = file.split(/\r?\n/).slice(1);

    for (const line of lines) {
      const [name, registration, contract, course, className] = line.split(',');

      const student = await this.studentRepository.findOne({
        where: {
          registration,
        },
      });

      if (student) {
        student.name = name;
        student.contract = contract;

        const courseObj = await this.courseService.retrieveOrCreate(
          instanceId,
          {
            name: course,
          },
        );

        student.course = courseObj;

        const classObj = await this.classService.retrieveOrCreate(instanceId, {
          name: className,
        });
        student.class = classObj;

        this.studentRepository.update(student.id, student);
      }
    }
  }

  async getAllByInstance(instanceId: number) {
    const students = this.studentRepository
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.class', 'class')
      .innerJoinAndSelect('student.course', 'course')
      .where('class.instanceId = :instance_id', { instance_id: instanceId });
    
    return await students.getMany();
  }
}
