"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIsDate = CustomIsDate;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("@modules/utils");
function CustomIsDate(config = {}) {
    return (0, utils_1.applyDecorators)(function (target, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isDate",
            target: target.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: ({ property }) => {
                    return `The field ${property} must have a valid date format.`;
                } }, config),
            validator: {
                validate(value) {
                    return value instanceof Date && !isNaN(value.getTime());
                },
            },
        });
    }, (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)));
}
