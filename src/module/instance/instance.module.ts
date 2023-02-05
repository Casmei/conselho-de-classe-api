import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instance } from './entities/instance.entity';
import { UserModule } from '../user/user.module';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instance]), UserModule],
  controllers: [InstanceController],
  providers: [InstanceService],
})
export class InstanceModule {}
