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
exports.HealthController = void 0;
const base_controller_1 = require("./protocols/base-controller");
const api_response_1 = require("./protocols/api-response");
class HealthController extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get("/health", this.handleRequest.bind(this));
    }
    handleRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(new api_response_1.ApiResponse(null, "Ok"));
        });
    }
}
exports.HealthController = HealthController;
