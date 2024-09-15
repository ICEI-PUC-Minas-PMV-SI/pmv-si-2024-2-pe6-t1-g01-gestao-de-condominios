import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ nullable: true })
  block: string;

  @OneToMany(() => User, (user) => user.apartment)
  residents: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
