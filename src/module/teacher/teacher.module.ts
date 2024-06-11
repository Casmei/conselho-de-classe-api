import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [],
  providers: [],
})
export class TeacherModule {}
