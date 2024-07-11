import { Transform, TransformFnParams } from "class-transformer";
import {
  isNumber,
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { applyDecorators } from "utils";

export function CustomIsNumber(
  config: ValidationOptions = {}
): PropertyDecorator {
  return applyDecorators(
    function (target: Object, propertyName: string | symbol) {
      registerDecorator({
        name: "isNumber",
        target: target.constructor,
        propertyName: propertyName as string,
        options: {
          message: ({ property }: ValidationArguments) => {
            return `Campo ${property} precisa possuir um formato de número válido.`;
          },
          ...config,
        },
        validator: {
          validate(value: any) {
            return isNumber(value, {
              maxDecimalPlaces: 0,
              allowInfinity: false,
              allowNaN: false,
            });
          },
        },
      });
    },
    Transform(({ value }: TransformFnParams) => {
      if (value) {
        return parseInt(value);
      }
      return value;
    })
  );
}
