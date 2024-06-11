import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Class } from 'src/module/class/entities/class.entity';
import { Subject } from 'src/module/subject/entities/subject.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { TeacherNote } from 'src/module/council/entities/teacherNote.entity';

@Entity()
export class Teacher extends CustomBaseEntity {
  @ManyToOne(() => User, (user) => user.teachers)
  teacher: User;

  @RelationId((Teacher: Teacher) => Teacher.teacher)
  @Column()
  teacherId: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.Teachers)
  class: Class;

  @RelationId((Teacher: Teacher) => Teacher.class)
  @Column()
  classId: number;

  @ManyToOne(() => Subject, (subject) => subject.Teachers)
  subject: Subject;

  @RelationId((Teacher: Teacher) => Teacher.subject)
  @Column()
  subjectId: number;

  @OneToMany(() => TeacherNote, (teacherNote) => teacherNote.teacher)
  notes: TeacherNote[];
}
