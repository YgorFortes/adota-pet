import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';

@Injectable()
@ValidatorConstraint({ async: false })
export class ValidateDateRelativeToCurrent implements ValidatorConstraintInterface {
  validate(date: Date, validationArguments: ValidationArguments): boolean {
    if (!date) {
      return false;
    }

    const currentDate = new Date();

    const currentDateWithoutMiliSeconds = startOfDay(currentDate);
    if (validationArguments.constraints[0] === 'before') {
      return isBefore(date, currentDateWithoutMiliSeconds);
    } else if (validationArguments.constraints[0] === 'after') {
      return isAfter(date, startOfDay(currentDate)) || isSameDay(date, currentDate);
    }
  }

  defaultMessage?(args: ValidationArguments): string {
    const constraint = args.constraints[0];
    if (constraint === 'before') {
      return `${args.property} deve ser anterior à data atual`;
    } else if (constraint === 'after') {
      return `${args.property} deve ser depois da data atual`;
    }
  }
}

export const validateDate = (
  type: 'before' | 'after' = 'before',
  optionsValidation?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [type],
      validator: ValidateDateRelativeToCurrent,
    });
  };
};
