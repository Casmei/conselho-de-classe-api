import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Council } from './council.entity';
import { Student } from 'src/module/student/entities/student.entity';
import { Teacher } from 'src/module/teacher/entities/teacher';

@Entity()
export class TeacherNote extends CustomBaseEntity {
  @ManyToOne(() => Council, (council) => council.notes)
  council: Council;

  @RelationId((teacherNote: TeacherNote) => teacherNote.council)
  @Column()
  councilId: number;

  //////////////////

  @Column({ nullable: false })
  note: string;

  //////////////////

  @ManyToOne(() => Teacher, (Teacher) => Teacher.notes)
  teacher: Teacher;

  @RelationId((teacherNote: TeacherNote) => teacherNote.teacher)
  @Column()
  teacherId: number;

  //////////////////

  @ManyToOne(() => Student, (student) => student.notes)
  student: Student;

  @RelationId((teacherNote: TeacherNote) => teacherNote.student)
  @Column()
  studentId: number;
}
