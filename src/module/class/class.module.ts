import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassToInstance } from './entities/class-to-instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, ClassToInstance])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
