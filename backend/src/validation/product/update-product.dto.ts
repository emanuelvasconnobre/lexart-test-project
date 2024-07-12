import {
  CustomIsNumber,
  CustomIsString,
} from "@modules/validation/protocols/decorators";

export class UpdateProductDto {
  @CustomIsString()
  name!: string;

  @CustomIsString()
  brand!: string;

  @CustomIsString()
  model!: string;

  @CustomIsNumber()
  price!: number;

  @CustomIsString()
  description!: string;
}
