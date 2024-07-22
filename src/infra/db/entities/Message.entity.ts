import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuardianEntity } from './Guardian.entity';
import { ShelterEntity } from './Shelter.entity';
import { PetEntity } from './Pet.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @Column('int', { name: 'guardian_id', nullable: false })
  guardianId: number;

  @ManyToOne(() => GuardianEntity, guardian => guardian.messages, {})
  @JoinColumn({ name: 'guardian_id' })
  @Index()
  guardian: GuardianEntity;

  @Column('int', { name: 'shelter_id', nullable: false })
  shelterId: number;

  @ManyToOne(() => ShelterEntity, shelter => shelter.address, {})
  @JoinColumn({ name: 'shelter_id' })
  @Index()
  shelter: ShelterEntity;

  @Column('int', { name: 'pet_id', nullable: false })
  petId: number;

  @ManyToOne(() => PetEntity, pet => pet.messages, {})
  @JoinColumn({ name: 'pet_id' })
  @Index()
  pet: PetEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    default: null,
    type: 'timestamp with time zone',
  })
  deletedAt: Date;
}
