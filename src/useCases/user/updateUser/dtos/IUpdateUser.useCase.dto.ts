import { ICreateUserUseCaseDTO } from '../../createUser/dtos/ICreateUser.useCase.dto';

export interface IUpdateUserUseCaseDto extends Partial<Omit<ICreateUserUseCaseDTO, 'role'>> {}
