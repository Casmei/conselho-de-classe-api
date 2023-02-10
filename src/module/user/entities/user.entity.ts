import { InstanceInvite } from 'src/module/instance/entities/instance-invite.entity';
import { UserToInstance } from 'src/module/instance/entities/UserToInstance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserToInstance, (userToInstance) => userToInstance.user)
  userToInstance: UserToInstance[];

  @OneToMany(() => InstanceInvite, (invite) => invite.owner_invite)
  invites: InstanceInvite[];
}
