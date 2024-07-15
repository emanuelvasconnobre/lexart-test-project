"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedMiddleware = void 0;
const http_exceptions_1 = require("@modules/exceptions/http-exceptions");
const isAuthenticatedMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    }
    else {
        throw new http_exceptions_1.UnauthorizedHttpException();
    }
};
exports.isAuthenticatedMiddleware = isAuthenticatedMiddleware;
