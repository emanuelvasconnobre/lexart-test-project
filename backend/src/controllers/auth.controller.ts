import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { AuthService, ProductService } from "services";
import { CreateProductDto, UpdateProductDto } from "validation/product";
import {
  InternalServerHttpException,
  NotFoundHttpException,
} from "exceptions/http-exceptions";
import { validateDto } from "utils";
import { ApiResponse } from "./protocols/api-response";
import { LoginDto, RegisterDto } from "validation/auth";

export class AuthController extends BaseController {
  private authService = new AuthService();
  private routeName = "auth";

  constructor() {
    super();
    this.router.post(`/${this.routeName}/login`, this.login.bind(this));
    this.router.post(`/${this.routeName}/register`, this.register.bind(this));
    this.router.get(`/${this.routeName}/logout`, this.logout.bind(this));
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = req.body;

    try {
      await validateDto(LoginDto, body);
      const user = await this.authService.login(body);
      req.session.save((err: any) => {
        (req.session as any).user = user;
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log out.",
            traceback: err,
          });
        } else {
          res.status(200).json(new ApiResponse(undefined, "Logged in"));
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  private logout(req: Request, res: Response, next: NextFunction): void {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log out.",
            traceback: err,
          });
        } else {
          res.status(200).json(new ApiResponse(undefined, "Logged out"));
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = req.body;

    try {
      await validateDto(RegisterDto, body);
      await this.authService.register(body);

      res
        .status(200)
        .json(new ApiResponse(undefined, "User registered successfully"));
    } catch (error: any) {
      next(error);
    }
  }
}
