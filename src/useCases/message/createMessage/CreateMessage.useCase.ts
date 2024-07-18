import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';
import { ICreateMessageUseCaseDto } from './dtos/ICreateMessage.userCase.dto';
import { FindPetByIdUseCase } from 'src/useCases/pet/findPetById/FindPetById.useCase';
import { FindShelterByIdUseCase } from 'src/useCases/shelter/findShelterById/FindShelterById.useCase';
import { Message } from 'src/entities/Message.entity';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { IManageEmailInterface } from '../sendEmail/interface/IManageEmail.interface';

export class CreateMessageUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
    private findShelterByIdUseCase: FindShelterByIdUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findPetByIdUseCase: FindPetByIdUseCase,
    @Inject(Provide.IManageEmailInterface) private manageEmailUseCase: IManageEmailInterface,
  ) {}

  async execute(createMessageDto: ICreateMessageUseCaseDto): Promise<boolean> {
    const { content, shelterId, userId, petId } = createMessageDto;
    const shelter = await this.findShelterByIdUseCase.execute(shelterId);

    const guardianUser = await this.findUserByIdUseCase.execute(userId, UserRole.GUARDIAN);
    const pet = await this.findPetByIdUseCase.execute(petId, shelter.id);

    const message = new Message({
      content,
      shelter: shelter,
      guardian: guardianUser.guardian,
      pet,
    });

    const resultMessage = await this.messageRepository.saveMessage(message);

    if (!resultMessage) {
      throw new InternalServerErrorException(`Não foi possivel enviar a mensagem.`);
    }

    this.manageEmailUseCase.sendEmail({
      message: resultMessage,
      email: shelter.user.email,
      guardianEmail: guardianUser.email,
      pet,
    });

    return true;
  }
}
