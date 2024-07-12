import { Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { ApiResponse } from "./protocols/api-response";

export class HealthController extends BaseController {
  constructor() {
    super();
  }

  protected initializeRoutes() {
    this.router.get("/health", this.handleRequest.bind(this));
  }

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Check if the API is functioning correctly.
   *     tags:
   *       - Health Check
   *     responses:
   *       '200':
   *         description: Returns a message indicating that the API is working.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Ok
   */
  public async handleRequest(req: Request, res: Response) {
    res.json(new ApiResponse(null, "Ok"));
  }
}
