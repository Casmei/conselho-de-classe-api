import { TeacherNote } from 'src/module/council/entities/teacherNote.entity';
import { Course } from 'src/module/course/entities/course.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Student extends CustomBaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  registration: string;

  @Column({ nullable: true })
  contract: string;

  @ManyToOne(() => Course, (course) => course.students, {
    nullable: true,
  })
  course: Course;

  @RelationId((student: Student) => student.course)
  @Column()
  courseId: number;

  @OneToMany(() => TeacherNote, (teacherNote) => teacherNote.teacher)
  notes: TeacherNote[];
}
