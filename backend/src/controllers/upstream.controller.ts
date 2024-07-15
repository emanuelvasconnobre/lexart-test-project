import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { isAuthenticatedMiddleware } from "@modules/middlewares";
import path from "path";
import { readFile } from "fs";
import { ProductService } from "@modules/services";
import { logger } from "@modules/config/winston";

export class UpstreamController extends BaseController {
  private productService = new ProductService();

  constructor() {
    super();
    this.router.get(
      `/upstream`,
      isAuthenticatedMiddleware,
      this.uploadTestProducts.bind(this)
    );
    this.router.get(
      `/destroy`,
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
   *                 data: {"event":"progress","@modules/data":{"progress":10}}
   *
   *                 data: {"event":"progress","@modules/data":{"progress":20}}
   *
   *                 data: {"event":"complete","@modules/data":{"message":"All products deleted."}}
   *       '500':
   *         description: Error event stream indicating an error during the deletion process.
   *         content:
   *           text/event-stream:
   *             schema:
   *               type: string
   *               example: |
   *                 data: {"event":"error","@modules/data":{"message":"An error occurred while deleting products."}}
   */
  private async deleteAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      sendEvent("message", {
        message: "Starting process",
        progress: 0,
      });

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

        sendEvent("message", {
          message: "Processing...",
          progress,
        });
      }

      sendEvent("message", {
        message: "All products deleted.",
        progress: 100,
      });
      res.end();
    } catch (error) {
      logger.error(`Event Error: ${error}`);
      sendEvent("error", {
        message: "An error occurred while deleting products.",
        progress: 100,
      });
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

    const sendEvent = (event: string, data: any) => {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      sendEvent("message", {
        message: "Starting process",
        progress: 0,
      });

      const filePath = path.join(
        __dirname,
        "../assets",
        "products-for-insert.json"
      );

      readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          logger.error(`Event Error: ${err}`);
          sendEvent("error", {
            message: "Error reading file",
          });
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

          sendEvent("message", {
            message: "Processing...",
            progress,
          });
        }

        sendEvent("message", {
          message: "All data processed",
          progress: 100,
        });
        res.end();
      });
    } catch (error) {
      logger.error(`Event Error: ${error}`);
      sendEvent("error", {
        message: "An error occured while inserting products",
        progress: 100,
      });
      res.end();
    }
  }
}
