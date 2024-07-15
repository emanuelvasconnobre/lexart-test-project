"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHttpException = void 0;
const app_exceptions_1 = require("../app-exceptions");
const protocols_1 = require("../protocols");
class NotFoundHttpException extends protocols_1.HttpException {
    constructor(attr = {}) {
        var _a, _b;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : app_exceptions_1.NotFoundException.defaultMessage,
            status: "NOT_FOUND",
            detail: (_b = attr.details) !== null && _b !== void 0 ? _b : new app_exceptions_1.NotFoundException(),
        });
    }
}
exports.NotFoundHttpException = NotFoundHttpException;
