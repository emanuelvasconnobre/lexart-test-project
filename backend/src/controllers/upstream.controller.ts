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
          data: { message: "Todos os produtos foram deletados." },
        })}\n\n`
      );
      res.end();
    } catch (error) {
      res.write(
        `data: ${JSON.stringify({
          event: "error",
          data: { message: "Erro durante a deleção de produtos." },
        })}\n\n`
      );
      res.end();
    }
  }

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
          data: { message: "Error during bulk insert" },
        })}\n\n`
      );
      res.end();
    }
  }
}
