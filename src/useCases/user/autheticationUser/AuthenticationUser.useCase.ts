import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthenticationDto } from './dtos/AuthenticationUser.useCase.dto';
import { FindUserByEmailUseCase } from '../findEmailByemail/FindUserByEmail.useCase';

import * as bcript from 'bcrypt';

export interface IPayLoad {
  sub: string;
  nameUser: string;
}

@Injectable()
export class AuthenticationUserUseCase {
  constructor(
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly jtwService: JwtService,
  ) {}

  async execute(authenticationDto: IAuthenticationDto): Promise<{ token: string }> {
    const user = await this.findUserByEmailUseCase.execute(authenticationDto.email);

    const checkPassWord = await bcript.compare(authenticationDto.password, user.password);

    if (!checkPassWord) {
      throw new UnauthorizedException('O email ou senha estão incorretos.');
    }

    const payload: IPayLoad = {
      sub: user.id,
      nameUser: user.name,
    };

    return {
      token: await this.jtwService.signAsync(payload),
    };
  }
}
