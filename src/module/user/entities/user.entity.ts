import { Council } from 'src/module/council/entities/council.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { userRoles } from '../role.enum';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRoles, default: userRoles.MANAGER })
  role: userRoles;

  @OneToMany(() => Council, (council) => council.owner)
  councils: Council[];
}
