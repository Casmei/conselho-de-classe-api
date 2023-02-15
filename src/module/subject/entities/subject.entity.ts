import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubjectToInstance } from './subject-to-instance.entity';

@Entity()
export class Subject extends CustomBaseEntity {
  @Column()
  name: string;

  @OneToMany(
    () => SubjectToInstance,
    (subjectToInstance) => subjectToInstance.subject,
  )
  subjectToInstance: SubjectToInstance[];
}
