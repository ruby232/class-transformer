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
var storage_1 = require("../../src/storage");
var decorators_1 = require("../../src/decorators");
var chai_1 = require("chai");
describe("transformer methods decorator", function () {
    it("should expose non configuration properties and return User instance class", function () {
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
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getUser = function () {
                var user = new User();
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                return user;
            };
            __decorate([
                decorators_1.TransformClassToClass(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUser", null);
            return UserController;
        }());
        var controller = new UserController();
        var result = controller.getUser();
        chai_1.expect(result.password).to.be.undefined;
        var plainUser = {
            firstName: "Snir",
            lastName: "Segal"
        };
        chai_1.expect(result).to.be.eql(plainUser);
        chai_1.expect(result).to.be.instanceof(User);
    });
    it("should expose non configuration properties and return User instance class instead of plain object", function () {
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
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getUser = function () {
                var user = {};
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                return user;
            };
            __decorate([
                decorators_1.TransformPlainToClass(User),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUser", null);
            return UserController;
        }());
        var controller = new UserController();
        var result = controller.getUser();
        chai_1.expect(result.password).to.be.undefined;
        var user = new User();
        user.firstName = "Snir";
        user.lastName = "Segal";
        chai_1.expect(result).to.be.eql(user);
        chai_1.expect(result).to.be.instanceof(User);
    });
    it("should expose non configuration properties", function () {
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
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getUser = function () {
                var user = new User();
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                return user;
            };
            __decorate([
                decorators_1.TransformClassToPlain(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUser", null);
            return UserController;
        }());
        var controller = new UserController();
        var result = controller.getUser();
        chai_1.expect(result.password).to.be.undefined;
        var plainUser = {
            firstName: "Snir",
            lastName: "Segal"
        };
        chai_1.expect(result).to.be.eql(plainUser);
    });
    it("should expose non configuration properties and properties with specific groups", function () {
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
                decorators_1.Expose({ groups: ["user.permissions"] }),
                __metadata("design:type", Array)
            ], User.prototype, "roles", void 0);
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getUserWithRoles = function () {
                var user = new User();
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                user.roles = ["USER", "MANAGER"];
                return user;
            };
            __decorate([
                decorators_1.TransformClassToPlain({ groups: ["user.permissions"] }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUserWithRoles", null);
            return UserController;
        }());
        var controller = new UserController();
        var result = controller.getUserWithRoles();
        chai_1.expect(result.password).to.be.undefined;
        var plainUser = {
            firstName: "Snir",
            lastName: "Segal",
            roles: ["USER", "MANAGER"]
        };
        chai_1.expect(result).to.be.eql(plainUser);
    });
    it("should expose non configuration properties with specific version", function () {
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
                decorators_1.Expose({ groups: ["user.permissions"] }),
                __metadata("design:type", Array)
            ], User.prototype, "roles", void 0);
            __decorate([
                decorators_1.Expose({ since: 2 }),
                __metadata("design:type", String)
            ], User.prototype, "websiteUrl", void 0);
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getUserVersion1 = function () {
                var user = new User();
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                user.roles = ["USER", "MANAGER"];
                user.websiteUrl = "http://www.github.com";
                return user;
            };
            UserController.prototype.getUserVersion2 = function () {
                var user = new User();
                user.firstName = "Snir";
                user.lastName = "Segal";
                user.password = "imnosuperman";
                user.roles = ["USER", "MANAGER"];
                user.websiteUrl = "http://www.github.com";
                return user;
            };
            __decorate([
                decorators_1.TransformClassToPlain({ version: 1 }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUserVersion1", null);
            __decorate([
                decorators_1.TransformClassToPlain({ version: 2 }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUserVersion2", null);
            return UserController;
        }());
        var controller = new UserController();
        var resultV2 = controller.getUserVersion2();
        chai_1.expect(resultV2.password).to.be.undefined;
        chai_1.expect(resultV2.roles).to.be.undefined;
        var plainUserV2 = {
            firstName: "Snir",
            lastName: "Segal",
            websiteUrl: "http://www.github.com"
        };
        chai_1.expect(resultV2).to.be.eql(plainUserV2);
        var resultV1 = controller.getUserVersion1();
        chai_1.expect(resultV1.password).to.be.undefined;
        chai_1.expect(resultV1.roles).to.be.undefined;
        chai_1.expect(resultV1.websiteUrl).to.be.undefined;
        var plainUserV1 = {
            firstName: "Snir",
            lastName: "Segal"
        };
        chai_1.expect(resultV1).to.be.eql(plainUserV1);
    });
});
//# sourceMappingURL=transformer-method.spec.js.map