import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { userRoles } from '../../user/protocols/user.protocols';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserInstanceRole extends CustomBaseEntity {
  @Column({
    type: 'enum',
    enum: userRoles,
    default: userRoles.MANAGER,
  })
  role: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Instance)
  @JoinColumn()
  instance: Instance;
}
