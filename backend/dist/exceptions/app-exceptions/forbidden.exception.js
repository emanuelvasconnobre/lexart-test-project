"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const app_exception_1 = require("../protocols/app-exception");
class ForbiddenException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : ForbiddenException.defaultMessage,
            name: ForbiddenException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        });
    }
}
exports.ForbiddenException = ForbiddenException;
ForbiddenException.defaultName = "FORBIDDEN_EXCEPTION";
ForbiddenException.defaultMessage = "Forbidden";
