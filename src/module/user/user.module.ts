import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { TeacherLoginMailConsumer } from './jobs/teacher-login-mail.consumer';
import { TeacherLoginMailProducer } from './jobs/teacher-login-mail.producer';
import { JwtService } from '@nestjs/jwt';
import { Teacher } from '../teacher/entities/teacher';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    TeacherLoginMailConsumer,
    TeacherLoginMailProducer,
    JwtService,
  ],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Teacher]),
    BullModule.registerQueue({
      name: 'teacher-login-mail',
    }),
  ],
})
export class UserModule {}
