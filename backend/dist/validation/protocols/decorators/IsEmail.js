"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIsEmail = CustomIsEmail;
const class_validator_1 = require("class-validator");
const utils_1 = require("@modules/utils");
function CustomIsEmail(config = {}) {
    return (0, utils_1.applyDecorators)(function (target, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isEmail",
            target: target.constructor,
            propertyName: propertyName,
            options: Object.assign({ message: ({ property }) => {
                    return `The field ${property} must have a valid email format.`;
                } }, config),
            validator: {
                validate(value) {
                    return (0, class_validator_1.isEmail)(value);
                },
            },
        });
    });
}
