"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const reflect_metadata_1 = __importDefault(require("reflect-metadata"));
const Reflect = reflect_metadata_1.default.Reflect;
const storage_1 = require("../storage");
/**
 * Specifies a type of the property.
 * The given TypeFunction can return a constructor. A discriminator can be given in the options.
 *
 * Can be applied to properties only.
 */
function Type(typeFunction, options = {}) {
    return function (target, propertyName) {
        const reflectedType = Reflect.getMetadata('design:type', target, propertyName);
        storage_1.defaultMetadataStorage.addTypeMetadata({
            target: target.constructor,
            propertyName: propertyName,
            reflectedType,
            typeFunction,
            options,
        });
    };
}
exports.Type = Type;
//# sourceMappingURL=type.decorator.js.map