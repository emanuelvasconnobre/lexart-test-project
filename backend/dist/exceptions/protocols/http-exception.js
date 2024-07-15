"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const http_status_codes_1 = require("http-status-codes");
class HttpException extends Error {
    constructor(attr) {
        var _a;
        super(attr.message);
        this.message = attr.message;
        this.status = (_a = attr.status) !== null && _a !== void 0 ? _a : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR.toString();
        this.statusCode = attr.status
            ? http_status_codes_1.StatusCodes[attr.status]
            : http_status_codes_1.StatusCodes["INTERNAL_SERVER_ERROR"];
        this.detail = attr.detail;
    }
    toString() {
        return `${this.status.toString()} ${this.statusCode}: ${this.message} - ${Date.now().toString()}`;
    }
    serialize() {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode,
            detail: this.detail.serialize(),
        };
    }
}
exports.HttpException = HttpException;
