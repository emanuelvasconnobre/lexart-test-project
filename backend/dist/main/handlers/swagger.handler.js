"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerHandler = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Lexart Test Backend",
            description: "API Rest developed for Lexart Techynical Test",
            version: "1.0.0",
        },
        servers: [
            {
                url: process.env["URL_BASE"],
                description: "Server",
            },
        ],
    },
    apis: ["**/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const swaggerHandler = (app) => {
    app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.swaggerHandler = swaggerHandler;
