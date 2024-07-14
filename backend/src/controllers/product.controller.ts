import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { LogService, ProductService } from "@modules/services";
import {
  CreateProductDto,
  UpdateProductDto,
} from "@modules/validation/product";
import { NotFoundHttpException } from "@modules/exceptions/http-exceptions";
import { validateDto } from "@modules/utils";
import { ApiResponse } from "./protocols/api-response";
import { isAuthenticatedMiddleware } from "@modules/middlewares";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Example Product"
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *           example: "Example Brand"
 *         model:
 *           type: string
 *           description: The model of the product.
 *           example: "Model X"
 *         price:
 *           type: number
 *           format: decimal
 *           description: The price of the product.
 *           example: 99.99
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "This is an example product."
 *     CreateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Example Product"
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *           example: "Example Brand"
 *         model:
 *           type: string
 *           description: The model of the product.
 *           example: "Model X"
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 99.99
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "This is an example product."
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Updated Product"
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *           example: "Updated Brand"
 *         model:
 *           type: string
 *           description: The model of the product.
 *           example: "Updated Model X"
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 149.99
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "This is an updated product description."
 */
export class ProductController extends BaseController {
  private productService = new ProductService();
  private logService = new LogService();
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

  /**
   * @swagger
   * /product:
   *   get:
   *     summary: Retrieve a paginated list of products.
   *     tags:
   *       - Products
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
   *         description: A paginated list of products.
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
   *                     $ref: '#/components/schemas/Product'
   */
  private async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const countPerPage = parseInt(req.query.countPerPage as string, 10) || 10;

    try {
      const products = await this.productService.getMany(page, countPerPage);
      const countElements = await this.productService.count();
      const countPage = Math.ceil(countElements / countPerPage);

      res.status(200).json(new ApiResponse({ items: products, countPage }));
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * @swagger
   * /product/{id}:
   *   get:
   *     summary: Retrieve a product by its ID.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The ID of the product to retrieve.
   *     responses:
   *       '200':
   *         description: A single product.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/Product'
   *       '404':
   *         description: Product not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Product with id {id} not found
   */
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

  /**
   * @swagger
   * /product:
   *   post:
   *     summary: Create a new product.
   *     tags:
   *       - Products
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductDto'
   *     responses:
   *       '201':
   *         description: Product created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/CreateProductDto'
   */
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

  /**
   * @swagger
   * /product/{id}:
   *   put:
   *     summary: Update an existing product.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The ID of the product to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProductDto'
   *     responses:
   *       '200':
   *         description: Product updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Success
   *                 data:
   *                   $ref: '#/components/schemas/UpdateProductDto'
   *       '404':
   *         description: Product not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Product with id {id} not found
   */
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

  /**
   * @swagger
   * /product/{id}:
   *   delete:
   *     summary: Delete a product by its ID.
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The ID of the product to delete.
   *     responses:
   *       '204':
   *         description: Product successfully deleted.
   *       '404':
   *         description: Product not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Product with id {id} not found
   */
  private async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id, 10);
      const productData = await this.productService.getById(productId);
      const deleted = await this.productService.delete(productId);

      if (deleted) {
        await this.logService.create({
          productId,
          brand: productData!.brand,
          model: productData!.model,
          name: productData!.name,
          price: productData!.price,
          description: productData!.description,
          deletedAt: new Date(),
          userId: req.session!.user.id,
          username: req.session!.user.username,
        });

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
