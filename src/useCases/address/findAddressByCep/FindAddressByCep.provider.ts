import { Address } from 'src/entities/Address.entity';

import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { ICreateAddressDto } from '../createAddress/dtos/ICreateAddress.useCase.dto';
import { IAddressCepFinderProvider } from './interface/IAddressCepFinder.provider';
interface IRequestCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro: string | undefined;
}

export class findAddressByCepProvider implements IAddressCepFinderProvider {
  async findAddressByCep(cep: string, complement?: string): Promise<Address> {
    try {
      const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

      const reponseData: IRequestCep = (await axios.get(apiUrl)).data;

      if (reponseData.erro) {
        throw new BadRequestException(
          'CEP não encontrado. Se seu CEP não foi encontrado, tente digitar manualmente o endereço.',
        );
      }

      complement ? reponseData.complemento : null;

      const address: ICreateAddressDto = new Address({
        city: reponseData.localidade,
        state: reponseData.uf,
        street: reponseData.logradouro,
        cep: reponseData.cep,
        complement: complement,
        neighborhood: reponseData.bairro,
      });

      return address;
    } catch (error) {
      throw new BadRequestException(
        'CEP não encontrado. Se seu CEP não foi encontrado, tente digitar manualmente o endereço.',
      );
    }
  }
}
