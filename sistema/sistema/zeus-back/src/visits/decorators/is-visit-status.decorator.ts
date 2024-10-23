import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { VisitStatus } from 'src/entities/visit.entity';

@ValidatorConstraint({ async: false })
export class IsVisitStatusConstraint implements ValidatorConstraintInterface {
  validate(role: any) {
    return role === VisitStatus.PENDING || role ===  VisitStatus.APPROVED || role === VisitStatus.DISAPPROVED;
  }

  defaultMessage() {
    return 'O status deve ser "PENDENTE", "APROVADO" ou "DESAPROVADO".';
  }
}

export function IsVisitStatus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVisitStatusConstraint,
    });
  };
}
