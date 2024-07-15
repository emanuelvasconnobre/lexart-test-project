"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDecorators = applyDecorators;
function applyDecorators(...decorators) {
    return function (target, propertyKey) {
        for (const decorator of decorators) {
            decorator(target, propertyKey);
        }
    };
}
