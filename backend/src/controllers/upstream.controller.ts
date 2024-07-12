import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { ApiResponse } from "./protocols/api-response";
import { isAuthenticatedMiddleware } from "middlewares";
import path from "path";
import { readFile } from "fs";
import { ProductService } from "services";

export class UpstreamController extends BaseController {
  private productService = new ProductService();
  private routeName = "upstream";

  constructor() {
    super();
    this.router.get(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.uploadTestProducts.bind(this)
    );
    this.router.delete(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.deleteAllProducts.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  /**
   * @swagger
   * /upstream:
   *   delete:
   *     summary: Delete all products from the database.
   *     tags:
   *       - Products
   *     responses:
   *       '200':
   *         description: Event stream indicating the progress and completion of the deletion process.
   *         content:
   *           text/event-stream:
   *             schema:
   *               type: string
   *               example: |
   *                 data: {"event":"progress","data":{"progress":10}}
   *
   *                 data: {"event":"progress","data":{"progress":20}}
   *
   *                 data: {"event":"complete","data":{"message":"All products deleted."}}
   *       '500':
   *         description: Error event stream indicating an error during the deletion process.
   *         content:
   *           text/event-stream:
   *             schema:
   *               type: string
   *               example: |
   *                 data: {"event":"error","data":{"message":"An error occurred while deleting products."}}
   */
  private async deleteAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      const totalProducts = await this.productService.count();
      const batchSize = 10;
      let deletedProducts = 0;

      while (deletedProducts < totalProducts) {
        const deleted = await this.productService.deleteMany({
          where: {},
          limit: batchSize,
        });

        deletedProducts += deleted;

        const progress = Math.floor((deletedProducts / totalProducts) * 100);

        res.write(
          `data: ${JSON.stringify({
            event: "progress",
            data: { progress },
          })}\n\n`
        );
      }

      res.write(
        `data: ${JSON.stringify({
          event: "complete",
          data: { message: "All products deleted." },
        })}\n\n`
      );
      res.end();
    } catch (error) {
      res.write(
        `data: ${JSON.stringify({
          event: "error",
          data: { message: "An error occurred while deleting products." },
        })}\n\n`
      );
      res.end();
    }
  }

  /**
   * @swagger
   * /upstream:
   *   get:
   *     summary: Add test products to the database.
   *     tags:
   *       - Products
   *     responses:
   *       '200':
   *         description: Event stream indicating the progress and completion of the bulk insertion process.
   *         content:
   *           text/event-stream:
   *             schema:
   *               type: string
   *               example: |
   *                 event: progress
   *                 data: {"progress":10}
   *
   *                 event: progress
   *                 data: {"progress":20}
   *
   *                 event: complete
   *                 data: {"message":"All data processed"}
   *       '500':
   *         description: Error event stream indicating an error during the bulk insertion process.
   *         content:
   *           text/event-stream:
   *             schema:
   *               type: string
   *               example: |
   *                 event: error
   *                 data: {"message":"An error occured while inserting products"}
   */
  private async uploadTestProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      const filePath = path.join(
        __dirname,
        "../assets",
        "products-for-insert.json"
      );

      readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          res.write(
            `event: error\ndata: ${JSON.stringify({
              message: "Error reading file",
            })}\n\n`
          );
          res.end();
          return;
        }

        const jsonData = JSON.parse(data);
        const totalItems = jsonData.length;
        const batchSize = 10;
        let processedItems = 0;

        for (let i = 0; i < totalItems; i += batchSize) {
          const batch = jsonData.slice(i, i + batchSize);
          this.productService.createMany(batch);
          processedItems += batch.length;
          const progress = Math.floor((processedItems / totalItems) * 100);
          res.write(
            `event: progress\ndata: ${JSON.stringify({ progress })}\n\n`
          );
        }

        res.write(
          `event: complete\ndata: ${JSON.stringify({
            message: "All data processed",
          })}\n\n`
        );
        res.end();
      });
    } catch (error) {
      res.write(
        `data: ${JSON.stringify({
          event: "error",
          data: { message: "An error occured while inserting products" },
        })}\n\n`
      );
      res.end();
    }
  }
}
