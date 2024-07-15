"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionMiddleware = exceptionMiddleware;
const winston_1 = require("@modules/config/winston");
const protocols_1 = require("@modules/exceptions/protocols");
const http_status_codes_1 = require("http-status-codes");
function exceptionMiddleware(error, req, res, next) {
    if (error instanceof protocols_1.HttpException) {
        return res.status(error.statusCode).json(error.serialize());
    }
    else if (error instanceof protocols_1.AppException) {
        winston_1.logger.error(`${error.message}: ${error.traceback}`);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(error.serialize());
    }
    else {
        winston_1.logger.error(`Unexpected Error: ${error}`);
        return res.status(500).json({
            error: {
                message: "Internal Error Handled",
            },
        });
    }
}
