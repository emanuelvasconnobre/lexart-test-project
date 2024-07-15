"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("@modules/config/sequelize");
const middlewares_1 = require("@modules/middlewares");
const handlers_1 = require("@modules/main/handlers");
const winston_1 = require("@modules/config/winston");
const app = (0, express_1.default)();
const port = process.env["PORT"] || 3000;
app.use(express_1.default.json());
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.sync();
    (0, handlers_1.sessionHandler)(app);
    (0, handlers_1.registerLibrariesHandler)(app);
    yield (0, handlers_1.registerControllersHandler)(app);
    (0, handlers_1.swaggerHandler)(app);
    app.use(middlewares_1.exceptionMiddleware);
    app.listen(port, () => {
        winston_1.logger.info(`Server is running on http://localhost:${port}`);
    });
});
initializeServer();
exports.default = app;
