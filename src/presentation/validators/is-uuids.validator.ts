import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validate as isValidUUID } from 'uuid';

export function IsUUIDs(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsUUIDsConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'IsUUIDs' })
export class IsUUIDsConstraint implements ValidatorConstraintInterface {
  validate(value: string[]): boolean {
    for (let i = 0; i < value.length; i++) {
      if (!isValidUUID(value[i])) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be array of UUIDs.`;
  }
}
