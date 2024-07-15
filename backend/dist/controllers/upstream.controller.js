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
exports.UpstreamController = void 0;
const base_controller_1 = require("./protocols/base-controller");
const middlewares_1 = require("@modules/middlewares");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const services_1 = require("@modules/services");
const winston_1 = require("@modules/config/winston");
class UpstreamController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.productService = new services_1.ProductService();
        this.router.get(`/upstream`, middlewares_1.isAuthenticatedMiddleware, this.uploadTestProducts.bind(this));
        this.router.get(`/destroy`, middlewares_1.isAuthenticatedMiddleware, this.deleteAllProducts.bind(this));
    }
    initializeRoutes() { }
    handleRequest(req, res) { }
    deleteAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            const sendEvent = (event, data) => {
                res.write(`event: ${event}\n`);
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            };
            try {
                sendEvent("message", {
                    message: "Starting process",
                    progress: 0,
                });
                const totalProducts = yield this.productService.count();
                const batchSize = 10;
                let deletedProducts = 0;
                while (deletedProducts < totalProducts) {
                    const deleted = yield this.productService.deleteMany({
                        where: {},
                        limit: batchSize,
                    });
                    deletedProducts += deleted;
                    const progress = Math.floor((deletedProducts / totalProducts) * 100);
                    sendEvent("message", {
                        message: "Processing...",
                        progress,
                    });
                }
                sendEvent("message", {
                    message: "All products deleted.",
                    progress: 100,
                });
                res.end();
            }
            catch (error) {
                winston_1.logger.error(`Event Error: ${error}`);
                sendEvent("error", {
                    message: "An error occurred while deleting products.",
                    progress: 100,
                });
                res.end();
            }
        });
    }
    uploadTestProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            const sendEvent = (event, data) => {
                res.write(`event: ${event}\n`);
                res.write(`data: ${JSON.stringify(data)}\n\n`);
            };
            try {
                sendEvent("message", {
                    message: "Starting process",
                    progress: 0,
                });
                const filePath = path_1.default.join(__dirname, "../assets", "products-for-insert.json");
                (0, fs_1.readFile)(filePath, "utf8", (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        winston_1.logger.error(`Event Error: ${err}`);
                        sendEvent("error", {
                            message: "Error reading file",
                        });
                        res.end();
                        return;
                    }
                    const jsonData = JSON.parse(data);
                    const totalItems = jsonData.length;
                    const batchSize = 10;
                    let processedItems = 0;
                    for (let i = 0; i < totalItems; i += batchSize) {
                        const batch = jsonData.slice(i, i + batchSize);
                        this.productService.createMany(batch);
                        processedItems += batch.length;
                        const progress = Math.floor((processedItems / totalItems) * 100);
                        sendEvent("message", {
                            message: "Processing...",
                            progress,
                        });
                    }
                    sendEvent("message", {
                        message: "All data processed",
                        progress: 100,
                    });
                    res.end();
                }));
            }
            catch (error) {
                winston_1.logger.error(`Event Error: ${error}`);
                sendEvent("error", {
                    message: "An error occured while inserting products",
                    progress: 100,
                });
                res.end();
            }
        });
    }
}
exports.UpstreamController = UpstreamController;
