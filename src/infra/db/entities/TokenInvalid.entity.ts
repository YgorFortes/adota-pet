import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token_invalid' })
export class TokenInvalidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'token', length: 255, nullable: false })
  token: string;
}
