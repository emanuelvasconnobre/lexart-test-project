"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(attr) {
        super(attr.message);
        this.name = attr.name;
        this.message = attr.message;
        this.traceback = attr.traceback;
        this.issues = attr.issues;
    }
    toString() {
        return `Exception: ${this.message} - ${Date.now().toString()} ${AppException.isDebugModeEnable && `\n Traceback: \n${this.traceback}`}`;
    }
    serialize() {
        var _a;
        return {
            name: this.name,
            message: this.message,
            traceback: AppException.isDebugModeEnable ? this.traceback : undefined,
            issues: (_a = this.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => issue.serialize()),
        };
    }
}
exports.AppException = AppException;
AppException.isDebugModeEnable = process.env["DEBUG"] == "true";
