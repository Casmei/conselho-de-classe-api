import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SignupDTO } from 'src/module/auth/dto/signup.dto';

@Processor('teacher-login-mail')
export class TeacherLoginMailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-mail')
  async sendMail(job: Job<SignupDTO>) {
    console.log('🚀 ~ email', job.data.email);

    await this.mailerService.sendMail({
      to: job.data.email,
      from: 'desenvolvimento@singlex.com.br',
      subject: 'Nova conta ✔',
      html: `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>Cadastro realizado com sucesso ${job.data.name} 🎉</h1>
          <p>Sua nova senha é: <strong>${job.data.password}</strong></p>
          <p>Recomendamos que você altere essa senha assim que fizer login.</p>
        </body>
      </html>
      `,
    });
  }
}
