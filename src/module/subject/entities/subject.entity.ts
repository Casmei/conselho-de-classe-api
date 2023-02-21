import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Subject extends CustomBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Instance, (instance) => instance.subjects)
  instance: Instance;
}
