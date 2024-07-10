import { Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";

export class HealthController extends BaseController {
  constructor() {
    super();
  }

  protected initializeRoutes() {
    this.router.get("/health", this.handleRequest.bind(this));
  }

  public handleRequest(req: Request, res: Response) {
    res.json({
      message: "Ok",
    });
  }
}
