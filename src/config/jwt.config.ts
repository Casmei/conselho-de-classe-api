import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

class JwtConfig {
  static getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get('JWT_SECRET_PASSWORD'),
      signOptions: {
        expiresIn: configService.get('JWT_TIME_VALID_TOKEN'),
      },
    };
  }
}

export const jwtConfigAsync = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    JwtConfig.getJwtConfig(configService),
  inject: [ConfigService],
};
