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
export class ValidateCepWithoutFields implements ValidatorConstraintInterface {
  validate(cep: string, args: ValidationArguments): boolean {
    const addressWithoutCep = Object.keys(args.object).filter(
      key => key !== 'cep' && key !== 'complement',
    );
    if (cep && addressWithoutCep.length > 0) {
      return false;
    }
    return true;
  }

  defaultMessage?(): string {
    return 'O campo cep não pode ser especificado juntamente com outras informações de endereço.';
  }
}

export const ValidateCepWithoutOtherFields = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: ValidateCepWithoutFields,
    });
  };
};
