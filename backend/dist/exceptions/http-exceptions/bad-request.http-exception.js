"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestHttpException = void 0;
const bad_request_exception_1 = require("../app-exceptions/bad-request.exception");
const protocols_1 = require("../protocols");
class BadRequestHttpException extends protocols_1.HttpException {
    constructor(attr = {}) {
        var _a, _b;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : bad_request_exception_1.BadRequestException.defaultMessage,
            status: "BAD_REQUEST",
            detail: (_b = attr.details) !== null && _b !== void 0 ? _b : new bad_request_exception_1.BadRequestException({
                traceback: attr.traceback,
                issues: attr.issues,
            }),
        });
    }
}
exports.BadRequestHttpException = BadRequestHttpException;
