import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { IUpdateGuardianUseCaseDto } from './dtos/IUpdateGuardian.useCase.dto';
import { UpdateUserUseCase } from 'src/useCases/user/updateUser/UpdateUser.useCase';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { UpdateAddressUseCase } from 'src/useCases/address/updateAddress/UpdateAddress.useCase';
import { IUserWithAssociation } from 'src/common/interfaces/IUserWithAssociation';
import { userAssociation } from 'src/enum/userAssociation.enum';

@Injectable()
export class UpdateGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private updateUserUseCase: UpdateUserUseCase,
    private verifyUserAssociationUseCase: VerifyUserAssociationUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
  ) {}

  async execute(idUser: string, updateGuardianDto: IUpdateGuardianUseCaseDto): Promise<Guardian> {
    const { about, birthDate } = updateGuardianDto;

    const userAssociationGuardian: IUserWithAssociation =
      await this.verifyUserAssociationUseCase.findAssociantionWithUser(
        idUser,
        userAssociation.GUARDIAN,
      );

    const guardianUpdated = await this.guardianRepository.updateGuardian(
      userAssociationGuardian.guardian.id,
      {
        about,
        birthDate,
      },
    );

    const userUpdated = updateGuardianDto.user
      ? await this.updateUserUseCase.execute(idUser, updateGuardianDto.user)
      : null;

    const addressUpdated = updateGuardianDto.address
      ? await this.updateAddressUseCase.execute(
          userAssociationGuardian.guardian.address.id,
          updateGuardianDto.address,
        )
      : null;

    const updatedGuardian = {
      ...guardianUpdated,
      user: userUpdated ? { ...userUpdated } : null,
      address: addressUpdated ? { ...addressUpdated } : null,
    };

    return updatedGuardian;
  }
}
