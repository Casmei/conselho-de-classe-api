import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TeacherNote } from './teacherNote.entity';

@Entity('councils')
export class Council extends CustomBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => TeacherNote, (teacherNotes) => teacherNotes.council)
  notes: TeacherNote[];
}
