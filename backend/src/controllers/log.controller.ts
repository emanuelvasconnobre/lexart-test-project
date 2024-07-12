import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { LogService } from "@modules/services";
import { ApiResponse } from "./protocols/api-response";
import { isAuthenticatedMiddleware } from "@modules/middlewares";

export class LogController extends BaseController {
  private service = new LogService();
  private routeName = "log";

  constructor() {
    super();
    this.router.get(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.getMany.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  /**
   * @swagger
   * /log:
   *   get:
   *     summary: List all deleted products from the system.
   *     tags:
   *       - Logs
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Page number for pagination.
   *       - in: query
   *         name: countPerPage
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Number of records per page.
   *     responses:
   *       '200':
   *         description: List of deleted products.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ProductDeleted'
   */
  private async getMany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const countPerPage = parseInt(req.query.countPerPage as string, 10) || 10;

    try {
      const logs = await this.service.getMany(page, countPerPage);
      res.status(200).json(new ApiResponse(logs));
    } catch (error: any) {
      next(error);
    }
  }
}
