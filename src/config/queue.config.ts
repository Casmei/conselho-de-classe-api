import { BullRootModuleOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

class BullConfig {
  static getBullConfig(configService: ConfigService): BullRootModuleOptions {
    return {
      redis: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    };
  }
}

export const bullConfigAsync = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<BullRootModuleOptions> => BullConfig.getBullConfig(configService),
  inject: [ConfigService],
};
