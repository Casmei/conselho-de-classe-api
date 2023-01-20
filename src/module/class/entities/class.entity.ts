import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Class extends CustomBaseEntity {
  @Column()
  name: string;
}
