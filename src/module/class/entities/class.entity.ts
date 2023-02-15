import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ClassToInstance } from './class-to-instance.entity';

@Entity()
export class Class extends CustomBaseEntity {
  @Column()
  name: string;

  @OneToMany(() => ClassToInstance, (classToInstance) => classToInstance.class)
  classToInstance: ClassToInstance[];
}
