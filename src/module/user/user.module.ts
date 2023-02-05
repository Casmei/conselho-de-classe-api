import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { TeacherLoginMailConsumer } from './jobs/teacher-login-mail.consumer';
import { TeacherLoginMailProducer } from './jobs/teacher-login-mail.producer';
import { InviteUser } from './entities/invite-user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, TeacherLoginMailConsumer, TeacherLoginMailProducer],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, InviteUser]),
    BullModule.registerQueue({
      name: 'teacher-login-mail',
    }),
  ],
})
export class UserModule {}
