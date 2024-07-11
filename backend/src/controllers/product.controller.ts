import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { ProductService } from "services";
import { CreateProductDto, UpdateProductDto } from "validation/product";
import { NotFoundHttpException } from "exceptions/http-exceptions";
import { validateDto } from "utils";
import { ApiResponse } from "./protocols/api-response";
import { isAuthenticatedMiddleware } from "middlewares";

export class ProductController extends BaseController {
  private productService = new ProductService();
  private routeName = "product";

  constructor() {
    super();
    this.router.get(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.getAllProducts.bind(this)
    );
    this.router.get(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.getProductById.bind(this)
    );
    this.router.post(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.createProduct.bind(this)
    );
    this.router.put(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.updateProduct.bind(this)
    );
    this.router.delete(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.deleteProduct.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const countPerPage = parseInt(req.query.countPerPage as string, 10) || 10;

    try {
      const products = await this.productService.getMany(page, countPerPage);
      res.status(200).json(new ApiResponse(products));
    } catch (error: any) {
      next(error);
    }
  }

  private async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const productId = parseInt(req.params.id, 10);
    const product = await this.productService.getById(productId);

    if (product) {
      res.status(200).json(new ApiResponse(product));
    } else {
      next(
        new NotFoundHttpException({
          message: `Product with id ${productId} not found`,
        })
      );
    }
  }

  private async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const productData = req.body;

    try {
      await validateDto(CreateProductDto, productData);

      const createdProduct = await this.productService.create(productData);
      res.status(201).json(new ApiResponse(createdProduct));
    } catch (error: any) {
      next(error);
    }
  }

  private async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id, 10);
      const productData = req.body;

      await validateDto(UpdateProductDto, productData);

      const updatedProduct = await this.productService.update(
        productId,
        productData
      );

      if (updatedProduct) {
        res.status(200).json(new ApiResponse(updatedProduct));
      } else {
        throw new NotFoundHttpException({
          message: `Product with id ${productId} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  private async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id, 10);
      const deleted = await this.productService.delete(productId);

      if (deleted) {
        res.status(204).send();
      } else {
        throw new NotFoundHttpException({
          message: `Product with id ${productId} not found`,
        });
      }
    } catch (error: any) {
      next(error);
    }
  }
}
