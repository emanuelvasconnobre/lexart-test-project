"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, colorize, printf } = winston_1.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    format: combine(timestamp(), colorize({
        message: true,
        level: true,
    }), logFormat),
    transports: [new winston_1.transports.Console()],
});
