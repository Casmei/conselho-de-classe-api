import { Class } from 'src/module/class/entities/class.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import { User } from 'src/module/user/entities/user.entity';
import { userRoles } from 'src/module/user/protocols/user.protocols';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Instance } from './instance.entity';

@Entity()
@Index(['user', 'instance'], { unique: true })
export class UserToInstance extends CustomBaseEntity {
  @ManyToOne(() => Instance, (instance) => instance.userToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  instance: Instance;

  @ManyToOne(() => User, (user) => user.userToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToMany(() => Subject, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => Class, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  classes: Class[];

  @Column()
  subscription_instance: Date;

  @Column({ type: 'enum', enum: userRoles, default: userRoles.MANAGER })
  role: userRoles;
}
