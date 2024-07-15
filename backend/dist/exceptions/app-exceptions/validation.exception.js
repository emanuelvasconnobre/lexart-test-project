"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.ValidationField = void 0;
const app_exception_1 = require("../protocols/app-exception");
class ValidationField {
    constructor(attr) {
        this.target = attr.target;
        this.value = attr.value;
        this.message = attr.message;
    }
}
exports.ValidationField = ValidationField;
class ValidationException extends app_exception_1.AppException {
    constructor(attr = {}) {
        var _a, _b;
        super({
            message: (_a = attr.message) !== null && _a !== void 0 ? _a : ValidationException.defaultMessage,
            name: ValidationException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues,
        });
        this.fields = (_b = attr.fields) !== null && _b !== void 0 ? _b : [];
    }
    serialize() {
        var _a;
        return {
            name: this.name,
            message: this.message,
            traceback: app_exception_1.AppException.isDebugModeEnable ? this.traceback : undefined,
            issues: (_a = this.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => issue.serialize()),
            fields: this.fields,
        };
    }
}
exports.ValidationException = ValidationException;
ValidationException.defaultName = 'VALIDATION_EXCEPTION';
ValidationException.defaultMessage = 'The data received are not valid.';
