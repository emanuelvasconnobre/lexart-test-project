import { CustomIsEmail, CustomIsString } from "validation/protocols/decorators";

export class LoginDto {
  @CustomIsEmail()
  email!: string;

  @CustomIsString()
  password!: string;
}
