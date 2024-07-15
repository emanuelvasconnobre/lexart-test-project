"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerHttpException = void 0;
const app_exceptions_1 = require("../app-exceptions");
const protocols_1 = require("../protocols");
class InternalServerHttpException extends protocols_1.HttpException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : app_exceptions_1.UnexpectedException.defaultMessage,
            detail: new app_exceptions_1.UnexpectedException({
                traceback: attr.traceback,
            }),
        });
    }
}
exports.InternalServerHttpException = InternalServerHttpException;
