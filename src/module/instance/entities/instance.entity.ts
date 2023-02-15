import { ClassToInstance } from 'src/module/class/entities/class-to-instance.entity';
import { SubjectToInstance } from 'src/module/subject/entities/subject-to-instance.entity';
import { User } from 'src/module/user/entities/user.entity';
import { CustomBaseDateEntity } from 'src/shared/entity/CustomBaseEntity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InstanceInvite } from './instance-invite.entity';
import { UserToInstance } from './user-to-instance.entity';

@Entity()
export class Instance extends CustomBaseDateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  userOwner: User;

  @OneToMany(() => InstanceInvite, (invite) => invite.instance)
  invites: InstanceInvite[];

  @OneToMany(() => UserToInstance, (userToInstance) => userToInstance.instance)
  userToInstance: UserToInstance[];

  @OneToMany(
    () => SubjectToInstance,
    (subjectToInstance) => subjectToInstance.instance,
  )
  subjectToInstance: SubjectToInstance[];

  @OneToMany(
    () => ClassToInstance,
    (classToInstance) => classToInstance.instance,
  )
  classToInstance: ClassToInstance[];
}
