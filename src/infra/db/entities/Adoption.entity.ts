import { AdoptionStatus } from '../../../common/enum/adoptionStatus.enum';
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
import { PetEntity } from './Pet.entity';

@Entity({ name: 'adoption' })
export class AdoptionEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ name: 'adoption_date', nullable: false, type: 'timestamp with time zone' })
  adoptionDate: Date;

  @Column({
    type: 'enum',
    enum: AdoptionStatus,
    default: AdoptionStatus.CONCLUIDO,
  })
  status: AdoptionStatus;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

  @Column('int', { name: 'guardian_id', nullable: false })
  guardianId: number;

  @ManyToOne(() => GuardianEntity, guardianEntity => guardianEntity.Adoptions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'guardian_id' })
  @Index()
  guardian: GuardianEntity;

  @Column('int', { name: 'pet_id', nullable: false })
  petId: number;

  @ManyToOne(() => PetEntity, petEntity => petEntity.adoptions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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
