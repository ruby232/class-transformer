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
describe("serialization and deserialization objects", function () {
    it("should perform serialization and deserialization properly", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
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
        var user1 = new User();
        user1.firstName = "Dima";
        user1.lastName = "Zotov";
        user1.password = "imnosuperman";
        var user2 = new User();
        user2.firstName = "Bakhrom";
        user2.lastName = "Baubekov";
        user2.password = "imnosuperman";
        var users = [user1, user2];
        var plainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainUsers = [{
                firstName: "Dima",
                lastName: "Zotov",
                password: "imnobatman"
            }, {
                firstName: "Bakhrom",
                lastName: "Baubekov",
                password: "imnosuperman"
            }];
        var plainedUser = index_1.serialize(user);
        plainedUser.should.be.eql(JSON.stringify({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        }));
        var plainedUsers = index_1.serialize(users);
        plainedUsers.should.be.eql(JSON.stringify([{
                firstName: "Dima",
                lastName: "Zotov",
            }, {
                firstName: "Bakhrom",
                lastName: "Baubekov",
            }]));
        var classedUser = index_1.deserialize(User, JSON.stringify(plainUser));
        classedUser.should.be.instanceOf(User);
        classedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classedUsers = index_1.deserializeArray(User, JSON.stringify(plainUsers));
        classedUsers[0].should.be.instanceOf(User);
        classedUsers[1].should.be.instanceOf(User);
        var userLike1 = new User();
        userLike1.firstName = "Dima";
        userLike1.lastName = "Zotov";
        var userLike2 = new User();
        userLike2.firstName = "Bakhrom";
        userLike2.lastName = "Baubekov";
        classedUsers.should.be.eql([userLike1, userLike2]);
    });
    it("should successfully deserialize object with unknown nested properties ", function () {
        storage_1.defaultMetadataStorage.clear();
        var TestObject = /** @class */ (function () {
            function TestObject() {
            }
            return TestObject;
        }());
        var payload = {
            prop: "Hi",
            extra: {
                anotherProp: "let's see how this works out!"
            }
        };
        var result = index_1.deserialize(TestObject, JSON.stringify(payload));
        result.should.be.instanceof(TestObject);
        result.prop.should.be.eql("Hi");
        // We should strip, but it's a breaking change
        // (<any>result).extra.should.be.undefined;
    });
    it("should not overwrite non writable properties on deserialize", function () {
        var TestObject = /** @class */ (function () {
            function TestObject() {
                this.normalProp = "Hello!";
            }
            Object.defineProperty(TestObject.prototype, "getterOnlyProp", {
                get: function () {
                    return "I cannot write!";
                },
                enumerable: true,
                configurable: true
            });
            return TestObject;
        }());
        var payload = {
            getterOnlyProp: "I CAN write!",
            normalProp: "Goodbye!"
        };
        var result = index_1.deserialize(TestObject, JSON.stringify(payload));
        result.getterOnlyProp.should.be.eql("I cannot write!");
        result.normalProp.should.be.eql("Goodbye!");
    });
    // it("should overwrite default properties defined in prototype", () => {
    //     class TestObject {
    //         normalProp: string = "Hello!";
    //         prototypedProp: string;
    //     }
    //     TestObject.prototype.prototypedProp = "I'm a BUG!";
    //     const payload = {
    //         normalProp: "Goodbye!",
    //         prototypedProp: "Goodbye!"
    //     };
    //     const result = deserialize(TestObject, JSON.stringify(payload));
    //     result.normalProp.should.be.eql("Goodbye!");
    //     result.prototypedProp.should.be.eql("Goodbye!");
    // });
});
//# sourceMappingURL=serialization-deserialization.spec.js.map