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
exports.AuthController = void 0;
const base_controller_1 = require("./protocols/base-controller");
const services_1 = require("@modules/services");
const http_exceptions_1 = require("@modules/exceptions/http-exceptions");
const utils_1 = require("@modules/utils");
const api_response_1 = require("./protocols/api-response");
const auth_1 = require("@modules/validation/auth");
const middlewares_1 = require("@modules/middlewares");
class AuthController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.authService = new services_1.AuthService();
        this.routeName = "auth";
        this.router.post(`/${this.routeName}/login`, this.login.bind(this));
        this.router.get(`/${this.routeName}`, middlewares_1.isAuthenticatedMiddleware, this.checkAccess.bind(this));
        this.router.post(`/${this.routeName}/register`, this.register.bind(this));
        this.router.get(`/${this.routeName}/logout`, middlewares_1.isAuthenticatedMiddleware, this.logout.bind(this));
    }
    initializeRoutes() { }
    handleRequest(req, res) { }
    checkAccess(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userInfo = (_a = req.session.user) !== null && _a !== void 0 ? _a : {};
            try {
                res.status(200).json(new api_response_1.ApiResponse(userInfo, "Logged in"));
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            try {
                yield (0, utils_1.validateDto)(auth_1.LoginDto, body);
                const user = yield this.authService.login(body);
                (_a = req.session) === null || _a === void 0 ? void 0 : _a.save((err) => {
                    if (err) {
                        throw new http_exceptions_1.InternalServerHttpException({
                            message: "Could not log in.",
                            traceback: err,
                        });
                    }
                    else {
                        if (req.session) {
                            req.session.user = {
                                id: user.id,
                                name: user.name,
                                username: user.username,
                                email: user.email,
                            };
                        }
                        res.status(200).json(new api_response_1.ApiResponse({
                            id: user.id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                        }, "Logged in"));
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        var _a;
        try {
            (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy((err) => {
                if (err) {
                    throw new http_exceptions_1.InternalServerHttpException({
                        message: "Could not log out.",
                        traceback: err,
                    });
                }
                else {
                    res.clearCookie("connect.sid");
                    res.status(200).json(new api_response_1.ApiResponse(undefined, "Logged out"));
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                yield (0, utils_1.validateDto)(auth_1.RegisterDto, body);
                yield this.authService.register(body);
                res
                    .status(200)
                    .json(new api_response_1.ApiResponse(undefined, "User registered successfully"));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
