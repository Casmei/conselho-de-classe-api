import { User } from 'src/module/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstanceInvite } from './instance-invite.entity';
import { UserToInstance } from './UserToInstance.entity';

@Entity()
export class Instance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserToInstance, (userToInstance) => userToInstance.instance)
  userToInstance: UserToInstance[];

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  userOwner: User;

  @OneToMany(() => InstanceInvite, (invite) => invite.instance)
  invites: InstanceInvite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
