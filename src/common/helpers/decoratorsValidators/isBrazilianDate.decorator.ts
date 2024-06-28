import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { isValid } from 'date-fns';
import { dateFormated } from '../validation.helpers';

@Injectable()
@ValidatorConstraint({ async: false })
export class BrazilianDateFormat implements ValidatorConstraintInterface {
  validate(birthDate: string): boolean {
    if (!birthDate) {
      return false;
    }

    const birthDateFormated = dateFormated(birthDate);

    if (!isValid(birthDateFormated)) {
      return false;
    }

    return true;
  }

  defaultMessage?(): string {
    return 'A data de nascimento deve estar no formato DD/MM/YYYY.';
  }
}

export const IsBrazilianDate = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: BrazilianDateFormat,
    });
  };
};
