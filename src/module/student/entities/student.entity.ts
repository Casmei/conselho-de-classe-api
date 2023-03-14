import { Class } from 'src/module/class/entities/class.entity';
import { Course } from 'src/module/course/entities/course.entity';
import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Class, (singleClass) => singleClass.students, {
    nullable: true,
  })
  class: Class;

  @ManyToOne(() => Instance, (instance) => instance.students, {
    nullable: true,
  })
  instance: Instance;
}
