import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from './Message.entity';
import { ShelterEntity } from './Shelter.entity';
import { PetSpecie } from '../../../common/enum/petSpecie.enum';
import { PetSize } from '../../../common/enum/petSize.enum';
import { PetStatus } from '../../../common/enum/petStatus.enum';
import { AdoptionEntity } from './Adoption.entity';

@Entity({ name: 'pet' })
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  @Index()
  name: string;

  @Column({
    name: 'birth_date',
    nullable: true,
    default: null,
  })
  @Index()
  birthDate: Date;

  @Column({ name: 'photo', length: 255, nullable: false })
  photo: string;

  @Column({ name: 'size', type: 'enum', enum: PetSize, nullable: false })
  @Index()
  size: PetSize;

  @Column({ name: 'behavior', length: 100, nullable: false })
  behavior: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.NÃO_ADOTADO,
    nullable: true,
  })
  @Index()
  status: PetStatus;

  @Column({
    name: 'specie',
    type: 'enum',
    enum: PetSpecie,
    nullable: false,
  })
  @Index()
  specie: PetSpecie;

  @Column({ name: 'shelter_id', nullable: false })
  shelterId: string;
  @ManyToOne(() => ShelterEntity, shelter => shelter.pets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'shelter_id' })
  shelter: ShelterEntity;

  @OneToMany(() => AdoptionEntity, adoptionEntity => adoptionEntity.pet, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'adoption_id' })
  adoptions: Array<AdoptionEntity>;

  @OneToMany(() => MessageEntity, message => message.pet, {})
  messages: Array<MessageEntity>;

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
