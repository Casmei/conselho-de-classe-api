import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { InviteExtraData } from '../protocols/user.protocols';
import { User } from './user.entity';

@Entity()
export class InviteUser extends CustomBaseEntity {
  @Column()
  code: string;
  @ManyToOne(() => User, (user) => user.invites)
  owner_invite: User;
  @ManyToOne(() => Instance, (instance) => instance.invites)
  instance: Instance;
  @Column({ type: 'jsonb', nullable: true })
  invite_extra_data: InviteExtraData;
}
