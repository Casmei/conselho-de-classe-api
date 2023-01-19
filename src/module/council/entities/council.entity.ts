import { User } from 'src/module/user/entities/user.entity';
import CustomBaseEntity from 'src/shared/entity/CustomBaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('councils')
export class Council extends CustomBaseEntity {
  @ManyToOne(() => User, (user) => user.councils)
  owner: User;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;
}
