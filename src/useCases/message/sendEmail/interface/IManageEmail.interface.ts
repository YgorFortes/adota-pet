import { Message } from 'src/entities/Message.entity';
import { Pet } from 'src/entities/Pet.entity';

export interface IManageEmailInterface {
  sendEmail(emailDto: IEmailDto): Promise<void>;
}

export interface IEmailDto {
  message: Message;
  email: string;
  guardianEmail: string;
  pet: Pet;
}
