import { UserToInstance } from 'src/module/instance/entities/UserToInstance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { InviteUser } from './invite-user.entity';

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

  @OneToMany(() => InviteUser, (invite) => invite.owner_invite)
  invites: InviteUser[];
}
