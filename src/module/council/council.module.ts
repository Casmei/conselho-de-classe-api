import { Module } from '@nestjs/common';
import { CouncilService } from './council.service';
import { CouncilController } from './council.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Council } from './entities/council.entity';
import { TeacherNote } from './entities/teacherNote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Council, TeacherNote])],
  controllers: [CouncilController],
  providers: [CouncilService],
})
export class CouncilModule {}
