import { Teacher } from 'src/module/teacher/entities/teacher';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Subject extends CustomBaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Teacher, (teacher) => teacher.subject)
  Teachers: Teacher[];
}
