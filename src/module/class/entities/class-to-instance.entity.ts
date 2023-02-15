import { Instance } from 'src/module/instance/entities/instance.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Class } from './class.entity';

@Entity()
@Index(['class', 'instance'], { unique: true })
export class ClassToInstance extends CustomBaseEntity {
  @ManyToOne(() => Instance, (instance) => instance.classToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  instance: Instance;

  @ManyToOne(() => Class, (singleClass) => singleClass.classToInstance, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  class: Class;

  @Column()
  subscription_instance: Date;
}
