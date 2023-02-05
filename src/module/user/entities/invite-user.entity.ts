import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InviteUserEntity extends CustomBaseEntity {
  @Column()
  code: string;
  @Column()
  inviting_user: User;
  @Column()
  instance: Instance;
  @Column({ type: 'jsonb', nullable: true })
  invite_extra_data: any;
}
