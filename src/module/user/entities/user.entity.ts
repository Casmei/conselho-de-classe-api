import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { userRoles } from '../protocols/user.protocols';
import { Teacher } from 'src/module/teacher/entities/teacher';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: userRoles, default: userRoles.TEACHER })
  role: userRoles;

  @OneToMany(() => Teacher, (teacher) => teacher.teacher)
  teachers: Teacher[];
}
