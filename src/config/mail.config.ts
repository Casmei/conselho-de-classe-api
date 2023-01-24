import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

class MailConfig {
  static getMailConfig(configService: ConfigService): MailerOptions {
    return {
      transport: {
        host: configService.get('MAIL_HOST'),
        secure: true,
        port: configService.get('MAIL_PORT'),
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    };
  }
}

export const mailConfigAsync = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> =>
    MailConfig.getMailConfig(configService),
  inject: [ConfigService],
};
