import { User } from 'src/module/user/entities/user.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity()
export class Institution extends CustomBaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.institutions)
  users: User[];

  @OneToOne(() => User, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn()
  userOwner: User;
}
