import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { LogService } from "services";

export class ProductController extends BaseController {
  private service = new LogService();
  private routeName = "log";

  constructor() {
    super();
    this.router.get(`/${this.routeName}/`, this.getMany.bind(this));
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async getMany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const countPerPage = parseInt(req.query.countPerPage as string, 10) || 10;

    try {
      const logs = await this.service.getMany(page, countPerPage);
      res.status(200).json(logs);
    } catch (error: any) {
      next(error);
    }
  }
}
