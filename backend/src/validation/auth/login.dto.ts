import { CustomIsString } from "validation/protocols/decorators";

export class LoginDto {
  @CustomIsString()
  email!: string;

  @CustomIsString()
  password!: string;
}
