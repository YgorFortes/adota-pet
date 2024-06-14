import { RepositoryType } from 'src/enum/repositoryType.enum';

import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { ICreateGuardianUseCaseDto } from './dtos/ICreateGuardian.UseCase.dto';
import { Guardian } from 'src/entities/Guardian.entity';
import { CreateAddressUseCase } from 'src/useCases/address/createAddress/CreateAddress.useCase';
import { Inject, Injectable } from '@nestjs/common';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';

@Injectable()
export class CreateGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private createAddressUseCase: CreateAddressUseCase,
    private verifyUserGuardianUseCase: VerifyUserAssociationUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(guardianDto: ICreateGuardianUseCaseDto): Promise<Guardian> {
    const { about, birthDate, address, idUser } = guardianDto;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, user] = await Promise.all([
      this.verifyUserGuardianUseCase.verifyUserAssociationWithGuardian(idUser),
      this.findUserByIdUseCase.execute(idUser),
    ]);

    const addressCreated = await this.createAddressUseCase.execute(address);

    const guardian = new Guardian({
      about,
      birthDate,
      address: addressCreated,
      user,
    });

    const guardianCreated = await this.guardianRepository.save(guardian);

    return guardianCreated;
  }
}
