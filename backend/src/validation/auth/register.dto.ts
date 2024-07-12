import { CustomIsEmail, CustomIsString } from "validation/protocols/decorators";

export class RegisterDto {
  @CustomIsString()
  username!: string;

  @CustomIsString()
  name!: string;

  @CustomIsEmail()
  email!: string;

  @CustomIsString()
  password!: string;
}
