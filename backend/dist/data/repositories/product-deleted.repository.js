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
exports.ProductDeletedRepository = void 0;
const entities_1 = require("@modules/data/entities");
const app_exceptions_1 = require("@modules/exceptions/app-exceptions");
class ProductDeletedRepository {
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield entities_1.ProductDeleted.count();
                return count;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error counting all products`,
                    traceback: error.message,
                });
            }
        });
    }
    getMany(take, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productsDeleted = yield entities_1.ProductDeleted.findAll({
                    limit: take,
                    offset: skip,
                });
                return productsDeleted;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error deleting all products`,
                    traceback: error.message,
                });
            }
        });
    }
    createOne(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProductDeleted = yield entities_1.ProductDeleted.create(productData);
                return newProductDeleted;
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
exports.ProductDeletedRepository = ProductDeletedRepository;
