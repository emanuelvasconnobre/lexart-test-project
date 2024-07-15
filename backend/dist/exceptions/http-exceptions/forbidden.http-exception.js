"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenHttpException = void 0;
const app_exceptions_1 = require("../app-exceptions");
const protocols_1 = require("../protocols");
class ForbiddenHttpException extends protocols_1.HttpException {
    constructor(attr = {}) {
        var _a, _b;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : app_exceptions_1.ForbiddenException.defaultMessage,
            status: "FORBIDDEN",
            detail: (_b = attr.details) !== null && _b !== void 0 ? _b : new app_exceptions_1.ForbiddenException(),
        });
    }
}
exports.ForbiddenHttpException = ForbiddenHttpException;
