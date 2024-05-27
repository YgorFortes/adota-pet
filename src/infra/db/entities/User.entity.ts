import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { roleUser } from '../../../enum/role-user.enum';
import { GuardianEntity } from './Guardian.entity';
import { ShelterEntity } from './Shelter.entity';
import { MessageEntity } from './Message.entity';

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
  role: roleUser;

  @Column({ name: 'photo', length: 255, nullable: true })
  photo: string;

  @Column({ name: 'telephone', length: 15, nullable: false })
  telephone: string;

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

  @OneToMany(() => MessageEntity, message => message.guardian)
  message: Array<MessageEntity>;
}
