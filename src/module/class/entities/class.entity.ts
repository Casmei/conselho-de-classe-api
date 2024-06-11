import { Course } from 'src/module/course/entities/course.entity';
import { Teacher } from 'src/module/teacher/entities/teacher';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Class extends CustomBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Course, (course) => course.classes)
  course: Course;

  @RelationId((classEntity: Class) => classEntity.course)
  @Column()
  courseId: number;

  @OneToMany(() => Teacher, (teacher) => teacher.class)
  Teachers: Teacher[];
}
