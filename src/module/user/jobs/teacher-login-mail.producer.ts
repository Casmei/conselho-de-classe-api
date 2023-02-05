import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
@Injectable()
export class TeacherLoginMailProducer {
  constructor(
    @InjectQueue('teacher-login-mail') private teacherLoginMail: Queue,
  ) {}

  async sendMail(data: { email: string; code: string }) {
    await this.teacherLoginMail.add('send-mail', data);
  }
}
