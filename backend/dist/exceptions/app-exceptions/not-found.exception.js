"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const app_exception_1 = require("../protocols/app-exception");
class NotFoundException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : NotFoundException.defaultMessage,
            name: NotFoundException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        });
    }
}
exports.NotFoundException = NotFoundException;
NotFoundException.defaultName = "NOT_FOUND_EXCEPTION";
NotFoundException.defaultMessage = "Not Found";
