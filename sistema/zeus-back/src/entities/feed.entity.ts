import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.feeds, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  postingDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
