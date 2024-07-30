import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IMessageRepository } from 'src/repositories/interfaces/IMessageRepository.interface';
import { ICreateMessageUseCaseDto } from './dtos/ICreateMessage.userCase.dto';
import { FindPetByIdUseCase } from 'src/useCases/pet/findPetById/FindPetById.useCase';
import { FindShelterByIdUseCase } from 'src/useCases/shelter/findShelterById/FindShelterById.useCase';
import { FindGuardianByIdUseCase } from 'src/useCases/guardian/findGuardianById/FindGuardianById.useCase';
import { Message } from 'src/entities/Message.entity';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';
import { Provide } from 'src/common/enum/provider.enum';
import { IManageEmailInterface } from '../sendEmail/interface/IManageEmail.interface';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { Pet } from 'src/entities/Pet.entity';

export class CreateMessageUseCase {
  constructor(
    @Inject(RepositoryType.IMessageRepository) private messageRepository: IMessageRepository,
    private findShelterByIdUseCase: FindShelterByIdUseCase,
    private findGuardianByIdUseCase: FindGuardianByIdUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findPetByIdUseCase: FindPetByIdUseCase,
    @Inject(Provide.IManageEmailInterface) private manageEmailUseCase: IManageEmailInterface,
  ) {}

  async execute(createMessageDto: ICreateMessageUseCaseDto, userId: string): Promise<boolean> {
    const user = await this.findUserByIdUseCase.execute(userId, createMessageDto.role);

    if (user.role === UserRole.GUARDIAN) {
      await this.handleGuardianMessage(createMessageDto, user);
    }

    if (user.role === UserRole.SHELTER) {
      await this.handleShelterMessage(createMessageDto, user);
    }

    return true;
  }

  private async handleShelterMessage(
    createMessageDto: ICreateMessageUseCaseDto,
    user: IUserWithAssociation,
  ): Promise<void> {
    const { content, petId, recipientId } = createMessageDto;
    const { shelter } = user;

    const guardian = await this.findGuardianByIdUseCase.execute(recipientId);
    const pet = await this.findPetByIdUseCase.execute(petId, shelter.id);

    const message = new Message({
      content,
      shelter: shelter,
      guardian: guardian,
      pet,
    });

    const resultMessage = await this.messageRepository.saveMessage(message);

    if (!resultMessage) {
      throw new InternalServerErrorException(`Não foi possivel enviar a mensagem.`);
    }

    this.sendEmail(resultMessage.content, user, guardian.user.email, pet);
  }

  private async handleGuardianMessage(
    createMessageDto: ICreateMessageUseCaseDto,
    user: IUserWithAssociation,
  ): Promise<void> {
    const { content, petId, recipientId } = createMessageDto;
    const { guardian } = user;

    const shelter = await this.findShelterByIdUseCase.execute(recipientId);
    const pet = await this.findPetByIdUseCase.execute(petId, shelter.id);

    const message = new Message({
      content,
      shelter: shelter,
      guardian: guardian,
      pet,
    });

    const resultMessage = await this.messageRepository.saveMessage(message);

    if (!resultMessage) {
      throw new InternalServerErrorException(`Não foi possivel enviar a mensagem.`);
    }

    this.sendEmail(resultMessage.content, user, shelter.user.email, pet);
  }

  private sendEmail(
    content: string,
    user: IUserWithAssociation,
    recipient: string,
    pet: Pet,
  ): void {
    this.manageEmailUseCase.sendEmail({
      message: content,
      to: user.email,
      from: recipient,
      pet,
    });
  }
}
