"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIsNumber = CustomIsNumber;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("@modules/utils");
function CustomIsNumber(config = {}) {
    return (0, utils_1.applyDecorators)(function (target, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isNumber",
            target: target.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: ({ property }) => {
                    return `The field ${property} must have a valid number format.`;
                } }, config),
            validator: {
                validate(value) {
                    return (0, class_validator_1.isNumber)(value, {
                        maxDecimalPlaces: 0,
                        allowInfinity: false,
                        allowNaN: false,
                    });
                },
            },
        });
    }, (0, class_transformer_1.Transform)(({ value }) => {
        if (value) {
            return parseInt(value);
        }
        return value;
    }));
}
