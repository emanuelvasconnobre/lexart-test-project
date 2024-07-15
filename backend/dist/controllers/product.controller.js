"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const base_controller_1 = require("./protocols/base-controller");
const services_1 = require("@modules/services");
const product_1 = require("@modules/validation/product");
const http_exceptions_1 = require("@modules/exceptions/http-exceptions");
const utils_1 = require("@modules/utils");
const api_response_1 = require("./protocols/api-response");
const middlewares_1 = require("@modules/middlewares");
class ProductController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.productService = new services_1.ProductService();
        this.logService = new services_1.LogService();
        this.routeName = "product";
        this.router.get(`/${this.routeName}/`, middlewares_1.isAuthenticatedMiddleware, this.getAllProducts.bind(this));
        this.router.get(`/${this.routeName}/:id`, middlewares_1.isAuthenticatedMiddleware, this.getProductById.bind(this));
        this.router.post(`/${this.routeName}/`, middlewares_1.isAuthenticatedMiddleware, this.createProduct.bind(this));
        this.router.put(`/${this.routeName}/:id`, middlewares_1.isAuthenticatedMiddleware, this.updateProduct.bind(this));
        this.router.delete(`/${this.routeName}/:id`, middlewares_1.isAuthenticatedMiddleware, this.deleteProduct.bind(this));
    }
    initializeRoutes() { }
    handleRequest(req, res) { }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const countPerPage = parseInt(req.query.countPerPage, 10) || 10;
            try {
                const products = yield this.productService.getMany(page, countPerPage);
                const countElements = yield this.productService.count();
                const countPage = Math.ceil(countElements / countPerPage);
                res.status(200).json(new api_response_1.ApiResponse({ items: products, countPage }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const product = yield this.productService.getById(productId);
                if (product) {
                    res.status(200).json(new api_response_1.ApiResponse(product));
                }
                else {
                    next(new http_exceptions_1.NotFoundHttpException({
                        message: `Product with id ${productId} not found`,
                    }));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productData = req.body;
            try {
                yield (0, utils_1.validateDto)(product_1.CreateProductDto, productData);
                const createdProduct = yield this.productService.create(productData);
                res.status(201).json(new api_response_1.ApiResponse(createdProduct));
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const productData = req.body;
                yield (0, utils_1.validateDto)(product_1.UpdateProductDto, productData);
                const updatedProduct = yield this.productService.update(productId, productData);
                if (updatedProduct) {
                    res.status(200).json(new api_response_1.ApiResponse(updatedProduct));
                }
                else {
                    throw new http_exceptions_1.NotFoundHttpException({
                        message: `Product with id ${productId} not found`,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const productData = yield this.productService.getById(productId);
                const deleted = yield this.productService.delete(productId);
                if (deleted) {
                    yield this.logService.create({
                        productId,
                        brand: productData.brand,
                        model: productData.model,
                        name: productData.name,
                        price: productData.price,
                        description: productData.description,
                        deletedAt: new Date(),
                        userId: req.session.user.id,
                        username: req.session.user.username,
                    });
                    res.status(204).send();
                }
                else {
                    throw new http_exceptions_1.NotFoundHttpException({
                        message: `Product with id ${productId} not found`,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
