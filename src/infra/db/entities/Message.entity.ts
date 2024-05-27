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

  @Column({ name: 'name_guardian', length: 100, nullable: false })
  nameGuardian: string;

  @Column({ name: 'telephone_guardian', length: 15, nullable: false })
  telephoneGuardian: string;

  @Column({ name: 'name_pet', length: 45, nullable: false })
  namePet: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

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

  @ManyToOne(() => GuardianEntity, guardian => guardian.messages)
  @JoinColumn({ name: 'guardian_id' })
  @Index()
  guardian: GuardianEntity;

  @ManyToOne(() => ShelterEntity, shelter => shelter.address)
  @JoinColumn({ name: 'shelter_id' })
  @Index()
  shelter: ShelterEntity;

  @ManyToOne(() => PetEntity, pet => pet.messages)
  @JoinColumn({ name: 'pet_id' })
  @Index()
  pet: PetEntity;
}
