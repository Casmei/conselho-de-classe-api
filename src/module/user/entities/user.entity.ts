import { Class } from 'src/module/class/entities/class.entity';
import { Instance } from 'src/module/instance/entities/instance.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { userRoles } from '../protocols/user.protocols';
import { InviteUser } from './invite-user.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRoles, default: userRoles.MANAGER })
  role: userRoles;

  @ManyToMany(() => Subject, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => Class, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  classes: Class[];

  @ManyToMany(() => Instance, (instance) => instance.users, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinTable()
  instances?: Instance[];

  @OneToMany(() => InviteUser, (invite) => invite.owner_invite)
  invites: InviteUser[];
}
