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
  localidade: 'São Paulo';
  uf: 'SP';
  ibge: '3550308';
  gia: '1004';
  ddd: '11';
  siafi: '7107';
}

export class findAddressByCepProvider implements IAddressCepFinderProvider {
  async findAddressByCep(cep: string, complement?: string): Promise<Address> {
    try {
      const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
      const reponseData: IRequestCep = (await axios.get(apiUrl)).data;

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
      throw new BadRequestException('CEP não encontrado');
    }
  }
}
