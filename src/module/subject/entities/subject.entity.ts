import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Subject extends CustomBaseEntity {
  @Column()
  name: string;
}
