import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { GuardianEntity } from './Guardian.entity';
import { ShelterEntity } from './Shelter.entity';
import { UserRole } from '../../../common/enum/roleUser.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 255, nullable: false, unique: true })
  @Index()
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 60, nullable: false })
  password: string;

  @Column({ name: 'role', length: 45, nullable: false })
  role: UserRole;

  @Column({ name: 'photo', length: 255, nullable: true })
  photo: string;

  @Column({ name: 'telephone', length: 15, nullable: false })
  telephone: string;

  @OneToOne(() => GuardianEntity, guardian => guardian.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  guardian: GuardianEntity;

  @OneToOne(() => ShelterEntity, shelter => shelter.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  shelter: ShelterEntity;

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
