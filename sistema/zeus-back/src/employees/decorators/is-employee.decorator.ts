import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

@ValidatorConstraint({ async: false })
export class IsEmployeeConstraint implements ValidatorConstraintInterface {
  validate(role: any) {
    return role === UserRole.PORTEIRO;
  }

  defaultMessage() {
    return 'O role deve ser "PORTEIRO".';
  }
}

export function IsEmployee(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmployeeConstraint,
    });
  };
}
