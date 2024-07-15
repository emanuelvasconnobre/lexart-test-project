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
exports.ProductRepository = void 0;
const sequelize_1 = require("@modules/config/sequelize");
const entities_1 = require("@modules/data/entities");
const app_exceptions_1 = require("@modules/exceptions/app-exceptions");
class ProductRepository {
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield entities_1.Product.count();
                return products;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error counting products`,
                    traceback: error.message,
                });
            }
        });
    }
    getMany(take, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield entities_1.Product.findAll({
                    limit: take,
                    offset: skip,
                });
                return products;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error fetching many products`,
                    traceback: error.message,
                });
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield entities_1.Product.findByPk(id);
                return product;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error fetching product by ID`,
                    traceback: error.message,
                });
            }
        });
    }
    createOne(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield entities_1.Product.create(productData);
                return newProduct;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error creating product`,
                    traceback: error.message,
                });
            }
        });
    }
    createMany(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sequelize_1.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const newProducts = yield entities_1.Product.bulkCreate(productData, { transaction });
                    return newProducts;
                }));
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error creating many products`,
                    traceback: error.message,
                });
            }
        });
    }
    updateOne(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield entities_1.Product.update(productData, {
                    where: { id },
                    returning: true,
                });
                return updatedProduct[1][0];
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error updating product`,
                    traceback: error.message,
                });
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedProduct = yield entities_1.Product.destroy({
                    where: { id },
                });
                return !!deletedProduct;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error deleting product`,
                    traceback: error.message,
                });
            }
        });
    }
    deleteMany(option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sequelize_1.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const deletedProductsCount = yield entities_1.Product.destroy(Object.assign({ transaction }, option));
                    return deletedProductsCount;
                }));
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error deleting many products`,
                    traceback: error.message,
                });
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sequelize_1.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    const deletedProductsCount = yield entities_1.Product.destroy({
                        transaction,
                    });
                    return !!deletedProductsCount;
                }));
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error deleting all products`,
                    traceback: error.message,
                });
            }
        });
    }
}
exports.ProductRepository = ProductRepository;
