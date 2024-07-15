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
exports.UserRepository = void 0;
const entities_1 = require("@modules/data/entities");
const app_exceptions_1 = require("@modules/exceptions/app-exceptions");
class UserRepository {
    getMany(take, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield entities_1.User.findAll({
                    limit: take,
                    offset: skip,
                });
                return users;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error fetching users`,
                    traceback: error.message,
                });
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield entities_1.User.findByPk(id);
                return user;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error fetching user by id`,
                    traceback: error.message,
                });
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield entities_1.User.findOne({
                    where: { email },
                });
                return user;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error fetching user by email`,
                    traceback: error.message,
                });
            }
        });
    }
    createOne(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield entities_1.User.create(userData);
                return newUser;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error creating user`,
                    traceback: error.message,
                });
            }
        });
    }
    updateOne(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield entities_1.User.update(userData, {
                    where: { id },
                    returning: true,
                });
                return updatedUser[1][0];
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error updating user`,
                    traceback: error.message,
                });
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUserCount = yield entities_1.User.destroy({
                    where: { id },
                });
                return !!deletedUserCount;
            }
            catch (error) {
                throw new app_exceptions_1.UnexpectedException({
                    message: `Error deleting user`,
                    traceback: error.message,
                });
            }
        });
    }
}
exports.UserRepository = UserRepository;
