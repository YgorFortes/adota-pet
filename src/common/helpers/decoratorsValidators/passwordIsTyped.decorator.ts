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
export class ValidatePassWordIsTyped implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const [confirmPassWordTyped] = Object.keys(args.object).filter(
      key => key === 'confirmPassword',
    );

    if (password && !confirmPassWordTyped) {
      return false;
    }

    return true;
  }

  defaultMessage?(): string {
    return 'O campo confirmPassword deve colocado junto com password.';
  }
}

export const PasswordIsTyped = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: ValidatePassWordIsTyped,
    });
  };
};
