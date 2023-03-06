import { Class } from 'src/module/class/entities/class.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import { User } from 'src/module/user/entities/user.entity';
import { CustomBaseDateEntity } from 'src/shared/entity/CustomBaseEntity';
import {
  Column,
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

  @OneToMany(() => Class, (singleClass) => singleClass.instance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  classes: Class[];

  @OneToMany(() => Course, (course) => course)
  course: Course[];

  @OneToMany(() => Subject, (subject) => subject.instance)
  subjects: Subject[];
}
