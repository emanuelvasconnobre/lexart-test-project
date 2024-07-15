"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIsString = CustomIsString;
const class_validator_1 = require("class-validator");
const utils_1 = require("@modules/utils");
function CustomIsString(config = {}) {
    return (0, utils_1.applyDecorators)(function (target, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isString",
            target: target.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: ({ property }) => {
                    return `The field ${property} must be of type string.`;
                } }, config),
            validator: {
                validate(value) {
                    return (0, class_validator_1.isString)(value);
                },
            },
        });
    });
}
