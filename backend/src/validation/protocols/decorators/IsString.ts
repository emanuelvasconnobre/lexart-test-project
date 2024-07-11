import {
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { applyDecorators } from "utils";

export function CustomIsString(
  config: ValidationOptions = {}
): PropertyDecorator {
  return applyDecorators(function (
    target: Object,
    propertyName: string | symbol
  ) {
    registerDecorator({
      name: "isString",
      target: target.constructor,
      propertyName: propertyName as string,
      options: {
        message: ({ property }: ValidationArguments) => {
          return `Campo ${property} precisa ser do tipo texto.`;
        },
        ...config,
      },
      validator: {
        validate(value: any) {
          return isString(value);
        },
      },
    });
  });
}
