import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { differenceInYears, isValid } from 'date-fns';
import { dateFormated } from '../validation.helpers';

@Injectable()
@ValidatorConstraint({ async: false })
export class ValidateLegalAge implements ValidatorConstraintInterface {
  validate(birthDate: string): boolean {
    const birthDateFormated = dateFormated(birthDate);

    const age = differenceInYears(new Date(), birthDateFormated);

    if (!isValid(birthDateFormated)) {
      return false;
    }

    return age >= 18;
  }

  defaultMessage?(): string {
    return 'Guardian deve ser maior de idade.';
  }
}

export const IsLegalAge = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: ValidateLegalAge,
    });
  };
};
