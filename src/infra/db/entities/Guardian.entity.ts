import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { AddressEntity } from './Address.entity';
import { MessageEntity } from './Message.entity';
import { AdoptionEntity } from './Adoption.entity';

@Entity({ name: 'guardian' })
export class GuardianEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'about', type: 'text', nullable: true })
  about: string;

  @Column({ name: 'birth_date', nullable: false })
  birthDate: Date;

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

  @OneToOne(() => AddressEntity, address => address.guardian, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @OneToOne(() => UserEntity, user => user.guardian, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: UserEntity;

  @OneToMany(() => AdoptionEntity, adoptionEntity => adoptionEntity.guardian, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  Adoptions: Array<AdoptionEntity>;

  @OneToMany(() => MessageEntity, message => message.guardian, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  messages: Array<MessageEntity>;
}
