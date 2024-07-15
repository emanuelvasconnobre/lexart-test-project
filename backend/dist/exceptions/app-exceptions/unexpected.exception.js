"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedException = void 0;
const app_exception_1 = require("../protocols/app-exception");
class UnexpectedException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : UnexpectedException.defaultMessage,
            name: UnexpectedException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        });
    }
}
exports.UnexpectedException = UnexpectedException;
UnexpectedException.defaultName = "UNEXPECTED_EXCEPTION";
UnexpectedException.defaultMessage = "An unexpected error occurred!";
