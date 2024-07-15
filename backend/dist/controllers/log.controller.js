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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const base_controller_1 = require("./protocols/base-controller");
const services_1 = require("@modules/services");
const api_response_1 = require("./protocols/api-response");
const middlewares_1 = require("@modules/middlewares");
class LogController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.service = new services_1.LogService();
        this.routeName = "log";
        this.router.get(`/${this.routeName}/`, middlewares_1.isAuthenticatedMiddleware, this.getMany.bind(this));
    }
    initializeRoutes() { }
    handleRequest(req, res) { }
    getMany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page, 10) || 1;
            const countPerPage = parseInt(req.query.countPerPage, 10) || 10;
            try {
                const logs = yield this.service.getMany(page, countPerPage);
                const countElements = yield this.service.count();
                const countPage = Math.ceil(countElements / countPerPage);
                res.status(200).json(new api_response_1.ApiResponse({ items: logs, countPage }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LogController = LogController;
