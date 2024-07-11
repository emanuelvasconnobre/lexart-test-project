import { Transform, TransformFnParams } from 'class-transformer';
import { IsDate, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { applyDecorators } from 'utils';

export function CustomIsDate(config: ValidationOptions = {}): PropertyDecorator {
  return applyDecorators(
    function(target: Object, propertyName: string | symbol) {
      registerDecorator({
        name: 'isDate',
        target: target.constructor,
        propertyName: propertyName as string,
        options: {
          message: ({ property }: ValidationArguments) => {
            return `Campo ${property} precisa ter um formato de data válida.`;
          },
          ...config,
        },
        validator: {
          validate(value: any) {
            return value instanceof Date && !isNaN(value.getTime());
          },
        },
      });
    },
    Transform(({ value }: TransformFnParams) => value && new Date(value))
  );
}