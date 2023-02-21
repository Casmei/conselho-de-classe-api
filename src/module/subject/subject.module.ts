import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { InstanceModule } from '../instance/instance.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), InstanceModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
