import { CustomIsString } from "validation/protocols/decorators";

export class RegisterDto {
  @CustomIsString()
  username!: string;

  @CustomIsString()
  name!: string;

  @CustomIsString()
  email!: string;

  @CustomIsString()
  password!: string;
}
