import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SignupDTO } from 'src/module/auth/dto/signup.dto';
import { LoginUser } from '../dto/login-user.dto';

@Injectable()
export class TeacherLoginMailProducer {
  constructor(
    @InjectQueue('teacher-login-mail') private teacherLoginMail: Queue,
  ) {}

  async sendMail(data: SignupDTO) {
    await this.teacherLoginMail.add('send-mail', data);
  }
}
