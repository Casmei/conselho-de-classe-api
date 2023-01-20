import { Class } from 'src/module/class/entities/class.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
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

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => Class)
  @JoinTable()
  classes: Class[];
}