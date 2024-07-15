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
exports.validateDto = validateDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bad_request_http_exception_1 = require("@modules/exceptions/http-exceptions/bad-request.http-exception");
const app_exceptions_1 = require("@modules/exceptions/app-exceptions");
function validateDto(dtoClass, plainObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const dtoInstance = (0, class_transformer_1.plainToClass)(dtoClass, plainObject);
        const errors = yield (0, class_validator_1.validate)(dtoInstance);
        if (errors.length > 0) {
            const validationErrors = errors.map((error) => new app_exceptions_1.ValidationField({
                target: error.property,
                value: error.value,
                message: error.constraints
                    ? Object.values(error.constraints)[0]
                    : "Invalid value",
            }));
            throw new bad_request_http_exception_1.BadRequestHttpException({
                details: new app_exceptions_1.ValidationException({
                    fields: validationErrors,
                }),
            });
        }
        return dtoInstance;
    });
}
