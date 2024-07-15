"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIsArray = CustomIsArray;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("@modules/utils");
function CustomIsArray(config = {}) {
    return (0, utils_1.applyDecorators)((0, class_transformer_1.Transform)(({ value }) => {
        return value != undefined && value.length > 0 ? value : [];
    }), function (target, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isArray",
            target: target.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: ({ property }) => {
                    return `The field "${property}" must be a list of items.`;
                } }, config),
            validator: {
                validate(value) {
                    return Array.isArray(value);
                },
            },
        });
    });
}
