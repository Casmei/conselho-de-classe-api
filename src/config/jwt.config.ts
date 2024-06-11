import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

class JwtConfig {
  static getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: '123',
      signOptions: {
        expiresIn: '7d',
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
