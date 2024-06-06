import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuardianEntity } from './Guardian.entity';
import { ShelterEntity } from './Shelter.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'city', length: 45, nullable: false })
  city: string;

  @Column({ name: 'cep', length: 45, nullable: true })
  cep: string;

  @Column({ name: 'state', length: 45, nullable: false })
  state: string;

  @Column({ name: 'street', length: 45, nullable: false })
  street: string;

  @Column({ name: 'complement', length: 45, nullable: true })
  complement: string;

  @Column({ name: 'neighborhood', length: 45, nullable: false })
  neighborhood: string;

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

  @OneToOne(() => GuardianEntity, guardian => guardian.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  guardian: GuardianEntity;

  @OneToOne(() => ShelterEntity, shelter => shelter.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  shelter: ShelterEntity;
}
