import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { IUpdateGuardianUseCaseDto } from './dtos/IUpdateGuardian.useCase.dto';
import { UpdateUserUseCase } from 'src/useCases/user/updateUser/UpdateUser.useCase';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { UpdateAddressUseCase } from 'src/useCases/address/updateAddress/UpdateAddress.useCase';
import { IUserWithGuardian } from 'src/common/interfaces/IUserWithGuardian';

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

    const userAssociation: IUserWithGuardian =
      await this.verifyUserAssociationUseCase.findAssociantionWithUser(idUser);

    const guardianUpdatedPromisse = this.guardianRepository.updateGuardian(
      userAssociation.guardian.id,
      {
        about,
        birthDate,
      },
    );

    const userUpdatedPromisse = updateGuardianDto.user
      ? this.updateUserUseCase.execute(idUser, updateGuardianDto.user)
      : null;

    const addressUpdatedPromisse = updateGuardianDto.address
      ? this.updateAddressUseCase.execute(
          userAssociation.guardian.address.id,
          updateGuardianDto.address,
        )
      : null;

    const [guardianUpdated, userUpdated, addressUpdated] = await Promise.all([
      guardianUpdatedPromisse,
      userUpdatedPromisse,
      addressUpdatedPromisse,
    ]);

    const updatedGuardian = {
      ...guardianUpdated,
      user: userUpdated ? { ...userUpdated } : null,
      address: addressUpdated ? { ...addressUpdated } : null,
    };

    return updatedGuardian;
  }
}
