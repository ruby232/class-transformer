"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../../src/decorators");
var User_1 = require("./User");
var Authorable = /** @class */ (function () {
    function Authorable() {
    }
    __decorate([
        decorators_1.Exclude(),
        __metadata("design:type", String)
    ], Authorable.prototype, "authorEmail", void 0);
    __decorate([
        decorators_1.Type(function () { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], Authorable.prototype, "author", void 0);
    return Authorable;
}());
exports.Authorable = Authorable;
//# sourceMappingURL=Authorable.js.map