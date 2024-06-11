import { Class } from 'src/module/class/entities/class.entity';
import { Student } from 'src/module/student/entities/student.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Course extends CustomBaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];

  @OneToMany(() => Class, (classEntity) => classEntity.course)
  classes: Class[];
}
