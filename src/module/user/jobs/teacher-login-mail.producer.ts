import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { AuthRegisterDTO } from 'src/module/auth/dto/auth-register.dto';

@Injectable()
export class TeacherLoginMailProducer {
  constructor(
    @InjectQueue('teacher-login-mail') private teacherLoginMail: Queue,
  ) {}

  async sendMail(data: AuthRegisterDTO) {
    await this.teacherLoginMail.add('send-mail', data);
  }
}
