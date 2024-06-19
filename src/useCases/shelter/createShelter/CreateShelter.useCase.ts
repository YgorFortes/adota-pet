import { Inject, Injectable } from '@nestjs/common';
import { RepositoryType } from 'src/enum/repositoryType.enum';
import { IShelterRepository } from 'src/repositories/interfaces/IShelterRepository.interface';
import { FindUserByIdUseCase } from 'src/useCases/user/findUserById/FindUserById.useCase';
import { ICreateShelterUseCaseDto } from './dtos/ICreateShelter.UseCase.dto';
import { VerifyUserAssociationUseCase } from 'src/useCases/user/VerifyUserGuardian/VerifyUserAssociation.useCase';
import { userAssociation } from 'src/enum/userAssociation.enum';
import { CreateAddressUseCase } from 'src/useCases/address/createAddress/CreateAddress.useCase';
import { Shelter } from 'src/entities/Shelter.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateShelterUseCase {
  constructor(
    @Inject(RepositoryType.IShelterRepository) private shelterReposiotory: IShelterRepository,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private verifyUserAssociationUseCase: VerifyUserAssociationUseCase,
    private createAddressUseCase: CreateAddressUseCase,
    private readonly entityManage: EntityManager,
  ) {}

  async execute(shelterDto: ICreateShelterUseCaseDto): Promise<Shelter> {
    const { abbout, webSite, workingHours, address } = shelterDto;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, __] = await Promise.all([
      this.findUserByIdUseCase.execute(shelterDto.idUser),
      this.verifyUserAssociationUseCase.verifyUserAssociationWithGuardianOrShelter(
        shelterDto.idUser,
        userAssociation.SHELTER,
      ),
    ]);

    const shelter = await this.entityManage.transaction(async transactionalEntityManager => {
      const addresCreated = await this.createAddressUseCase.execute(
        address,
        transactionalEntityManager,
      );

      const shelter = new Shelter({
        abbout,
        webSite,
        workingHours,
        address: addresCreated,
        user,
      });

      const shelterCreated = await this.shelterReposiotory.save(
        shelter,
        transactionalEntityManager,
      );

      return shelterCreated;
    });

    return shelter;
  }
}
