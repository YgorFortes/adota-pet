import { TransformFnParams } from 'class-transformer';
import { parse } from 'date-fns';
import { Address } from 'src/entities/Address.entity';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const isCepMissing = (address: Address, __: unknown): boolean => {
  if (!address.cep) {
    return true;
  }
};

export const trimString = ({ value }: TransformFnParams): string => {
  if (value && typeof value === 'string') {
    return value.trim();
  }
};

export const dateFormated = (value: string): Date => {
  return parse(value, 'dd/MM/yyyy', new Date());
};

export const otherFieldWithCep = (address: Address, __: unknown): boolean => {
  const addressWithoutCep = Object.keys(address).filter(key => key !== 'cep');

  if (address.cep && addressWithoutCep.length > 1) {
    return true;
  }
};
