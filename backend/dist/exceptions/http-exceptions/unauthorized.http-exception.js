"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedHttpException = void 0;
const app_exceptions_1 = require("../app-exceptions");
const protocols_1 = require("../protocols");
class UnauthorizedHttpException extends protocols_1.HttpException {
    constructor(attr = {}) {
        var _a, _b;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : app_exceptions_1.UnauthorizedException.defaultMessage,
            status: "UNAUTHORIZED",
            detail: (_b = attr.details) !== null && _b !== void 0 ? _b : new app_exceptions_1.UnauthorizedException(),
        });
    }
}
exports.UnauthorizedHttpException = UnauthorizedHttpException;
