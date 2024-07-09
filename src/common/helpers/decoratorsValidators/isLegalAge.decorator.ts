import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { differenceInYears } from 'date-fns';

@Injectable()
@ValidatorConstraint({ async: false })
export class ValidateLegalAge implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    const age = differenceInYears(new Date(), date);

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
