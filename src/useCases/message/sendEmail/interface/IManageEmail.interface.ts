import { Pet } from 'src/entities/Pet.entity';

export interface IManageEmailInterface {
  sendEmail(emailDto: IEmailDto): Promise<void>;
}

export interface IEmailDto {
  message: string;
  to: string;
  from: string;
  pet: Pet;
}
