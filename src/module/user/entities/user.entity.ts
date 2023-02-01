import { Class } from 'src/module/class/entities/class.entity';
import { Institution } from 'src/module/institution/entities/institution.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import {
  InvitationExtraData,
  userRoles,
  UserStatus,
} from '../protocols/user.protocols';

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

  @Column({ type: 'enum', enum: UserStatus, nullable: true })
  status?: UserStatus;

  @Column({ type: 'jsonb', nullable: true })
  invitation_extra_data?: InvitationExtraData;

  @ManyToMany(() => Class, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  classes: Class[];

  @ManyToMany(() => Institution, (institution) => institution.users, {
    cascade: true,
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinTable()
  institutions?: Institution[];
}
