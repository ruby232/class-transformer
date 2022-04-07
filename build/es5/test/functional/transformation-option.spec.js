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
describe("filtering by transformation option", function () {
    it("@Exclude with toPlainOnly set to true then it should be excluded only during classToPlain and classToPlainFromExist operations", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude({ toPlainOnly: true }),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var plainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });
    it("@Exclude with toClassOnly set to true then it should be excluded only during plainToClass and plainToClassFromExist operations", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude({ toClassOnly: true }),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var plainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });
    it("@Expose with toClassOnly set to true then it should be excluded only during classToPlain and classToPlainFromExist operations", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Expose({ toClassOnly: true }),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var plainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });
    it("@Expose with toPlainOnly set to true then it should be excluded only during classToPlain and classToPlainFromExist operations", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Expose({ toPlainOnly: true }),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var plainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
    });
});
//# sourceMappingURL=transformation-option.spec.js.map