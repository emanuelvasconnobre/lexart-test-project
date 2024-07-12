import { Transform, TransformFnParams } from 'class-transformer';
import { IsArray, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { applyDecorators } from 'utils';

export function CustomIsArray(config: ValidationOptions = {}): PropertyDecorator {
  return applyDecorators(
    Transform(({ value }: TransformFnParams) => {
      return value != undefined && value.length > 0 ? value : [];
    }),
    function(target: Object, propertyName: string | symbol) {
      registerDecorator({
        name: 'isArray',
        target: target.constructor,
        propertyName: propertyName as string,
        options: {
          message: ({ property }: ValidationArguments) => {
            return `The field "${property}" must be a list of items.`;
          },
          ...config,
        },
        validator: {
          validate(value: any) {
            return Array.isArray(value);
          },
        },
      });
    }
  );
}
