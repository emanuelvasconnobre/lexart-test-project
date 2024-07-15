import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { AuthService, ProductService } from "@modules/services";
import {
  CreateProductDto,
  UpdateProductDto,
} from "@modules/validation/product";
import {
  InternalServerHttpException,
  NotFoundHttpException,
} from "@modules/exceptions/http-exceptions";
import { validateDto } from "@modules/utils";
import { ApiResponse } from "./protocols/api-response";
import { LoginDto, RegisterDto } from "@modules/validation/auth";
import { isAuthenticatedMiddleware } from "@modules/middlewares";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * definitions:
 *   ApiResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: API response message.
 *       data:
 *         type: object
 *         description: Optional data of API response.
 *   LoginDto:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address.
 *       password:
 *         type: string
 *         description: User's password.
 *   RegisterDto:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         description: Username of the user.
 *       name:
 *         type: string
 *         description: Name of the user.
 *       email:
 *         type: string
 *         format: email
 *         description: Email address of the user.
 *       password:
 *         type: string
 *         description: Password of the user.
 */

export class AuthController extends BaseController {
  private authService = new AuthService();
  private routeName = "auth";

  constructor() {
    super();
    this.router.post(`/${this.routeName}/login`, this.login.bind(this));
    this.router.get(
      `/${this.routeName}`,
      isAuthenticatedMiddleware,
      this.checkAccess.bind(this)
    );
    this.router.post(`/${this.routeName}/register`, this.register.bind(this));
    this.router.get(
      `/${this.routeName}/logout`,
      isAuthenticatedMiddleware,
      this.logout.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async checkAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userInfo = req.session.user ?? {};

    try {
      res.status(200).json(new ApiResponse(userInfo, "Logged in"));
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User authentication.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/LoginDto'
   *     responses:
   *       '200':
   *         description: User authenticated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ApiResponse'
   */
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
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log in.",
            traceback: err,
          });
        } else {
          if (req.session) {
            req.session.user = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            };
          }
          res.status(200).json(
            new ApiResponse(
              {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
              },
              "Logged in"
            )
          );
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/logout:
   *   get:
   *     summary: User logout.
   *     tags:
   *       - Auth
   *     responses:
   *       '200':
   *         description: User logged out successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ApiResponse'
   */
  private logout(req: Request, res: Response, next: NextFunction): void {
    try {
      req.session?.destroy((err) => {
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log out.",
            traceback: err,
          });
        } else {
          res.clearCookie("connect.sid");
          res.status(200).json(new ApiResponse(undefined, "Logged out"));
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/RegisterDto'
   *     responses:
   *       '200':
   *         description: User registered successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/ApiResponse'
   */
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
