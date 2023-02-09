import { InviteUser } from 'src/module/user/entities/invite-user.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @OneToMany(() => InviteUser, (invite) => invite.instance)
  invites: InviteUser[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
