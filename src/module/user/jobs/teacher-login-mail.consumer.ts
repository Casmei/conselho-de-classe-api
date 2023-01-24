import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AuthRegisterDTO } from 'src/module/auth/dto/auth-register.dto';

@Processor('teacher-login-mail')
export class TeacherLoginMailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-mail')
  async sendMail(job: Job<AuthRegisterDTO>) {
    this.mailerService
      .sendMail({
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
      })
      .then(() => {
        console.log(`[EMAIL] - Sent with success to ${job.data.email}`);
      })
      .catch((err) => {
        console.log(`[EMAIL] - Failed to send to ${job.data.email}\n${err}`);
      });
  }
}
