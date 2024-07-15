"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const app_exception_1 = require("../protocols/app-exception");
class UnauthorizedException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : UnauthorizedException.defaultMessage,
            name: UnauthorizedException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        });
    }
}
exports.UnauthorizedException = UnauthorizedException;
UnauthorizedException.defaultName = "UNAUTHORIZED_EXCEPTION";
UnauthorizedException.defaultMessage = "Unauthorized";
