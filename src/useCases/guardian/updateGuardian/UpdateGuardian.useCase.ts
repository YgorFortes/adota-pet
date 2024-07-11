import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/common/enum/repositoryType.enum';
import { IGuardianRepository } from 'src/repositories/interfaces/IGuardianRepository.interface';
import { IUpdateGuardianUseCaseDto } from './dtos/IUpdateGuardian.useCase.dto';
import { UpdateUserUseCase } from 'src/useCases/user/updateUser/UpdateUser.useCase';
import { Guardian } from 'src/entities/Guardian.entity';
import { UpdateAddressUseCase } from 'src/useCases/address/updateAddress/UpdateAddress.useCase';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { UserRole } from 'src/common/enum/roleUser.enum';

@Injectable()
export class UpdateGuardianUseCase {
  constructor(
    @Inject(RepositoryType.IGuardianRepository) private guardianRepository: IGuardianRepository,
    private updateUserUseCase: UpdateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
  ) {}

  async execute(idUser: string, updateGuardianDto: IUpdateGuardianUseCaseDto): Promise<Guardian> {
    const { about, birthDate } = updateGuardianDto;

    const userAssociationGuardian = await this.findUserByIdUseCase.execute(
      idUser,
      UserRole.GUARDIAN,
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
