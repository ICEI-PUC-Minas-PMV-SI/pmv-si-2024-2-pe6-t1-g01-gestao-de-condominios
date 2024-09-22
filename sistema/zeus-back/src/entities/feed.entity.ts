import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fileRoute: string;

  @Column()
  authorName: string;

  @CreateDateColumn({ type: 'timestamp' })
  postingDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
