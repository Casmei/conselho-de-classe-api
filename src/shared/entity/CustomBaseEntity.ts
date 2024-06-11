import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseDateEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default abstract class CustomBaseEntity extends CustomBaseDateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
