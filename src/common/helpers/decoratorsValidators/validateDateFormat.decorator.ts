import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: false })
export class DateFormat implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    const validateDate = new Date(date);

    if (!validateDate.getTime()) {
      return false;
    }

    return true;
  }

  defaultMessage?(): string {
    return 'A data deve estar nos formato YYYY-MM-DD, YYYY/MM/DD ou MM/DD/YYYY';
  }
}

export const ValidateDateFormat = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: DateFormat,
    });
  };
};
