import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, validationArguments?: ValidationArguments): boolean {
    const [relatedPropetyName] = validationArguments.constraints;

    const password = (validationArguments.object as unknown)[relatedPropetyName];

    return confirmPassword === password;
  }

  defaultMessage(): string {
    return 'As senhas não coincidem';
  }
}

export const MatchPassword = (proprety: string, optionsValidation: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [proprety],
      validator: MatchPasswordConstraint,
    });
  };
};
