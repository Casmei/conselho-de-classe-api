import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instance } from './entities/instance.entity';
import { UserModule } from '../user/user.module';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';
import { UserToInstance } from './entities/user-to-instance.entity';
import { InstanceInvite } from './entities/instance-invite.entity';
import { UserInstanceRole } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instance,
      UserToInstance,
      InstanceInvite,
      UserInstanceRole,
    ]),
    UserModule,
  ],
  controllers: [InstanceController],
  providers: [InstanceService],
  exports: [InstanceService],
})
export class InstanceModule {}
