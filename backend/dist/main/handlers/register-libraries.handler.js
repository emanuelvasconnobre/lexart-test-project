"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLibrariesHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const winston_1 = require("@modules/config/winston");
const http_exceptions_1 = require("@modules/exceptions/http-exceptions");
const stream = {
    write: (message) => {
        winston_1.logger.info(message.trim());
    },
};
const registerLibrariesHandler = (app) => {
    var _a;
    app.use((0, morgan_1.default)("combined", { stream }));
    const isProduction = process.env.NODE_ENV === "prod";
    if (isProduction) {
        const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
        const corsOptions = {
            origin: function (origin, callback) {
                if (allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new http_exceptions_1.ForbiddenHttpException({ message: "Not allowed by CORS" }));
                }
            },
            credentials: true,
            optionsSuccessStatus: 200,
        };
        app.use((0, cors_1.default)(corsOptions));
    }
    else {
        app.use((0, cors_1.default)({
            origin: true,
            credentials: true,
            optionsSuccessStatus: 200,
        }));
    }
    app.use((0, helmet_1.default)());
};
exports.registerLibrariesHandler = registerLibrariesHandler;
