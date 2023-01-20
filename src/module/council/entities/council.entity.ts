import { User } from 'src/module/user/entities/user.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('councils')
export class Council extends CustomBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;
}
