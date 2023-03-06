import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ClassModule } from '../class/class.module';
import { InstanceModule } from '../instance/instance.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    ClassModule,
    CourseModule,
    InstanceModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
