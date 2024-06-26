import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './Message.entity';
import { ShelterEntity } from './Shelter.entity';
import { GuardianEntity } from './Guardian.entity';
import { PetSpecie } from '../../../common/enum/petSpecie.enum';
import { PetSize } from '../../../common/enum/petSize.enum';
import { PetStatus } from '../../../common/enum/petStatus.enum';

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

  @Column({ name: 'image', length: 255, nullable: false })
  image: string;

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

  @ManyToOne(() => ShelterEntity, shelter => shelter.pets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'shelter_id' })
  @Index()
  shelter: ShelterEntity;

  @ManyToOne(() => GuardianEntity, guardianEntity => guardianEntity.pets, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'guardian_id' })
  @Index()
  guardian: GuardianEntity;

  @OneToMany(() => MessageEntity, message => message.pet)
  messages: Array<MessageEntity>;
}
