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
exports.LogService = void 0;
const repositories_1 = require("@modules/data/repositories");
class LogService {
    constructor() {
        this.repository = new repositories_1.ProductDeletedRepository();
    }
    count() {
        return this.repository.count();
    }
    getMany(page, countPerPage) {
        const take = +countPerPage;
        const skip = page == 1 ? 0 : (page - 1) * countPerPage;
        return this.repository.getMany(take, skip);
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdObject = yield this.repository.createOne(productData);
            return createdObject;
        });
    }
}
exports.LogService = LogService;
