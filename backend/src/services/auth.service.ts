import { ProductDeleted } from "@data/entities";
import { UserRepository } from "@data/repositories";
import { LoginDto, RegisterDto } from "validation/auth";
import {
  ForbiddenHttpException,
  InternalServerHttpException,
  UnauthorizedHttpException,
} from "exceptions/http-exceptions";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import { Request } from "express";

export class AuthService {
  repository = new UserRepository();

  async register(data: RegisterDto) {
    const user = await this.repository.getByEmail(data.email);

    if (user) {
      throw new ForbiddenHttpException({
        message: "User already exists",
      });
    }

    await this.repository.createOne({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  async login(data: LoginDto) {
    const user = await this.repository.getByEmail(data.email);
    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      if (match) {
        return user;
      }
    }

    throw new UnauthorizedHttpException();
  }
}