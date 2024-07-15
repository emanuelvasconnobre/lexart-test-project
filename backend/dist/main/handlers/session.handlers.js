"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionHandler = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const sequelize_1 = require("@modules/config/sequelize");
const sessionHandler = (app) => {
    const pgSessionInstance = (0, connect_pg_simple_1.default)(express_session_1.default);
    app.use((0, express_session_1.default)({
        store: new pgSessionInstance({
            conObject: Object.assign(Object.assign({}, sequelize_1.sequelize.options), { user: sequelize_1.sequelize.options.username }),
            createTableIfMissing: true,
            tableName: "session",
        }),
        secret: process.env["SECRET"] || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
            httpOnly: true,
            sameSite: "strict",
        },
    }));
};
exports.sessionHandler = sessionHandler;
