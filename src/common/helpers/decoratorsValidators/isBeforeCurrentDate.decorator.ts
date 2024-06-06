import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { isBefore, startOfDay } from 'date-fns';
import { dateFormated } from '../validation.helpers';

@Injectable()
@ValidatorConstraint({ async: false })
export class ValidateCurrentDate implements ValidatorConstraintInterface {
  validate(birthDate: string): boolean {
    const currentDate = new Date();
    const birthDateFormated = dateFormated(birthDate);

    const currentDateWithoutMiliSeconds = startOfDay(currentDate);

    return isBefore(birthDateFormated, currentDateWithoutMiliSeconds);
  }

  defaultMessage?(args: ValidationArguments): string {
    return `${args.property} deve ser anterior à data atual`;
  }
}

export const isBeforeCurrentDate = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: ValidateCurrentDate,
    });
  };
};
