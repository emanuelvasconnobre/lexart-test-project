"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const app_exception_1 = require("../protocols/app-exception");
class BadRequestException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : BadRequestException.defaultMessage,
            name: BadRequestException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        });
    }
}
exports.BadRequestException = BadRequestException;
BadRequestException.defaultName = "BAD_REQUEST_EXCEPTION";
BadRequestException.defaultMessage = "Bad request";
