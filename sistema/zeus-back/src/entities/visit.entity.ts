import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Visitor } from './visitor.entity';
import { User } from './user.entity';

export enum VisitStatus {
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  PENDING = 'PENDING',
}

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Visitor, (visitor) => visitor.visits, {
    nullable: false,
  })
  visitor: Visitor;

  @ManyToOne(() => User, (user) => user.visits, {
    nullable: false,
  })
  resident: User;

  @Column({
    type: 'enum',
    enum: VisitStatus,
    default: VisitStatus.PENDING,
  })
  status: VisitStatus;

  @Column({ type: 'timestamp', nullable: true })
  visitedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
