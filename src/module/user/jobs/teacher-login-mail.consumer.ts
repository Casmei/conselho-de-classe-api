import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LoginUser } from '../dto/login-user.dto';

@Processor('teacher-login-mail')
export class TeacherLoginMailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-mail')
  async sendMail(job: Job<LoginUser>) {
    await this.mailerService.sendMail({
      to: 'lilyan.kuvalis@ethereal.email',
      from: 'lilyan.kuvalis@ethereal.email',
      subject: 'Nova conta ✔',
      html: `<p>Olá, ${job.data.name}!</p></hr><p>Sua senha é: <strong>${job.data.password}</strong></p>`,
    });
  }
}
