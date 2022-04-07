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
require("reflect-metadata");
var index_1 = require("../../src/index");
var storage_1 = require("../../src/storage");
var decorators_1 = require("../../src/decorators");
describe("ignoring specific decorators", function () {
    it("when ignoreDecorators is set to true it should ignore all decorators", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Expose({ name: "lala" }),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Expose({ groups: ["user"] }),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var plainedUser = index_1.classToPlain(user, { ignoreDecorators: true });
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });
});
//# sourceMappingURL=ignore-decorators.spec.js.map