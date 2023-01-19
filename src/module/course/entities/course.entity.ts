import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Course extends CustomBaseEntity {
  @Column()
  name: string;
}
