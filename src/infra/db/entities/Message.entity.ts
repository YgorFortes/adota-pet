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

  @Column({ name: 'guardian_id', nullable: true })
  guardianId: string;

  @ManyToOne(() => GuardianEntity, guardian => guardian.messages, {})
  @JoinColumn({ name: 'guardian_id' })
  @Index()
  guardian: GuardianEntity;

  @Column({ name: 'shelter_id', nullable: true })
  shelterId: string;

  @ManyToOne(() => ShelterEntity, shelter => shelter.address, {})
  @JoinColumn({ name: 'shelter_id' })
  @Index()
  shelter: ShelterEntity;

  @Column({ name: 'pet_id', nullable: true })
  petId: string;

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
