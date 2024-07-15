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
exports.AuthService = void 0;
const repositories_1 = require("@modules/data/repositories");
const http_exceptions_1 = require("@modules/exceptions/http-exceptions");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        this.repository = new repositories_1.UserRepository();
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getByEmail(data.email);
            if (user) {
                throw new http_exceptions_1.ForbiddenHttpException({
                    message: "User already exists",
                });
            }
            yield this.repository.createOne(Object.assign(Object.assign({}, data), { password: yield bcrypt_1.default.hash(data.password, 10) }));
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getByEmail(data.email);
            if (user) {
                const match = yield bcrypt_1.default.compare(data.password, user.password);
                if (match) {
                    return user;
                }
            }
            throw new http_exceptions_1.UnauthorizedHttpException();
        });
    }
}
exports.AuthService = AuthService;
