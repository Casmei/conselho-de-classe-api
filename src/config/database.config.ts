import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      ssl: configService.get('CONTEXT') === 'dev' ? false : true,
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize: configService.get<boolean>('DB_SYNC'),
      logging: false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
