import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EmailDomainsAllowed } from 'src/common/enum/emailsDOmainsAllowed.enum';

const emailsDomain = Object.values(EmailDomainsAllowed);

@Injectable()
@ValidatorConstraint({ async: false })
export class ValidateEmailDomain implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> | boolean {
    const domain = email.split('@')[1];

    if (!domain) {
      return false;
    }

    return emailsDomain.includes(domain as EmailDomainsAllowed);
  }
  defaultMessage?(): string {
    return `O domínio do email não está na lista permitida (${emailsDomain.join(', ')}).`;
  }
}

export const ValidateEmail = (optionsValidation?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: ValidateEmailDomain,
    });
  };
};
