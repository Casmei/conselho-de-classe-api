import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
@Index(['subject', 'instance'], { unique: true })
export class SubjectToInstance extends CustomBaseEntity {
  @ManyToOne(() => Instance, (instance) => instance.subjectToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  instance: Instance;

  @ManyToOne(() => Subject, (subject) => subject.subjectToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  subject: Subject;

  @Column()
  subscription_instance: Date;
}
