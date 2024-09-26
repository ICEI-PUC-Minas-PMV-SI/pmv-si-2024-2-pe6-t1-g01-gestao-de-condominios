import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Apartment } from './apartment.entity';
import { Document } from './document.entity';
import { Visit } from './visit.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  SINDICO = 'SINDICO',
  MORADOR = 'MORADOR',
  PORTEIRO = 'PORTEIRO',
}

export type UserRelations = 'apartment' | 'visitor';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cellphone: string;

  @Column({ nullable: true })
  cpf: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MORADOR,
  })
  role: UserRole;

  @ManyToOne(() => Apartment, (apartment) => apartment.residents, {
    nullable: true,
  })
  apartment: Apartment;

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @OneToMany(() => Visit, (visit) => visit.resident)
  visits: Visit[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
