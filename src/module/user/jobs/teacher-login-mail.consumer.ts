import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AuthRegisterDTO } from 'src/module/auth/dto/auth-register.dto';

@Processor('teacher-login-mail')
export class TeacherLoginMailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-mail')
  async sendMail(job: Job<{ email: string; code: string }>) {
    this.mailerService
      .sendMail({
        to: job.data.email,
        from: 'desenvolvimento@singlex.com.br',
        subject: 'Nova conta ✔',
        html: `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>Você foi convidado para participar de uma instituição 🎉</h1>
          <p>Entre nesse link para entrar: http://localhost:3033/invite/${job.data.code}
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
