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
import { PetEntity } from './Pet.entity';
import { MessageEntity } from './Message.entity';

@Entity({ name: 'shelter' })
export class ShelterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'about', type: 'text', nullable: true })
  about: string;

  @Column({ name: 'website', length: 255 })
  webSite: string;

  @Column({ name: 'working_hours', length: 45 })
  workingHours: string;

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

  @OneToOne(() => UserEntity, user => user.shelter, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: UserEntity;

  @OneToOne(() => AddressEntity, address => address.shelter, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @OneToMany(() => PetEntity, petEntity => petEntity.shelter, { cascade: true, eager: true })
  pets: Array<PetEntity>;

  @OneToMany(() => MessageEntity, message => message.shelter)
  messages: Array<MessageEntity>;
}
