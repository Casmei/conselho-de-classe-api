import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): DataSourceOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      ssl: configService.get('CONTEXT') === 'dev' ? false : true,
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      autoLoadEntities: false,
      synchronize: configService.get<boolean>('DB_SYNC'),
      logging: false,
      migrations: ['dist/migrations/**/*.{ts,js}']
    } as DataSourceOptions;
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

const configService = new ConfigService(config());
const dataSource = new DataSource(TypeOrmConfig.getOrmConfig(configService));

export default dataSource;
