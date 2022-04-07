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
describe("es6 data types", function () {
    it("using Map", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Type(function () { return String; }),
                __metadata("design:type", Map)
            ], User.prototype, "weapons", void 0);
            return User;
        }());
        var plainUser = {
            id: 1,
            name: "Max Pain",
            weapons: {
                firstWeapon: "knife",
                secondWeapon: "eagle",
                thirdWeapon: "ak-47",
            }
        };
        var weapons = new Map();
        weapons.set("firstWeapon", "knife");
        weapons.set("secondWeapon", "eagle");
        weapons.set("thirdWeapon", "ak-47");
        var user = new User();
        user.id = 1;
        user.name = "Max Pain";
        user.weapons = weapons;
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.id.should.be.equal(1);
        classedUser.name.should.be.equal("Max Pain");
        classedUser.weapons.should.be.instanceOf(Map);
        classedUser.weapons.size.should.be.equal(3);
        classedUser.weapons.get("firstWeapon").should.be.equal("knife");
        classedUser.weapons.get("secondWeapon").should.be.equal("eagle");
        classedUser.weapons.get("thirdWeapon").should.be.equal("ak-47");
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.not.be.instanceOf(User);
        plainedUser.should.be.eql({
            id: 1,
            name: "Max Pain",
            weapons: {
                firstWeapon: "knife",
                secondWeapon: "eagle",
                thirdWeapon: "ak-47",
            }
        });
    });
    it("using Set", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Type(function () { return Set; }),
                __metadata("design:type", Set)
            ], User.prototype, "weapons", void 0);
            return User;
        }());
        var plainUser = {
            id: 1,
            name: "Max Pain",
            weapons: [
                "knife",
                "eagle",
                "ak-47"
            ]
        };
        var weapons = new Set();
        weapons.add("knife");
        weapons.add("eagle");
        weapons.add("ak-47");
        var user = new User();
        user.id = 1;
        user.name = "Max Pain";
        user.weapons = weapons;
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.id.should.be.equal(1);
        classedUser.name.should.be.equal("Max Pain");
        classedUser.weapons.should.be.instanceOf(Set);
        classedUser.weapons.size.should.be.equal(3);
        classedUser.weapons.has("knife").should.be.true;
        classedUser.weapons.has("eagle").should.be.true;
        classedUser.weapons.has("ak-47").should.be.true;
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.not.be.instanceOf(User);
        plainedUser.should.be.eql({
            id: 1,
            name: "Max Pain",
            weapons: [
                "knife",
                "eagle",
                "ak-47"
            ]
        });
    });
    it("using Map with objects", function () {
        storage_1.defaultMetadataStorage.clear();
        var Weapon = /** @class */ (function () {
            function Weapon(model, range) {
                this.model = model;
                this.range = range;
            }
            return Weapon;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Type(function () { return Weapon; }),
                __metadata("design:type", Map)
            ], User.prototype, "weapons", void 0);
            return User;
        }());
        var plainUser = {
            id: 1,
            name: "Max Pain",
            weapons: {
                firstWeapon: {
                    model: "knife",
                    range: 1
                },
                secondWeapon: {
                    model: "eagle",
                    range: 200
                },
                thirdWeapon: {
                    model: "ak-47",
                    range: 800
                }
            }
        };
        var weapons = new Map();
        weapons.set("firstWeapon", new Weapon("knife", 1));
        weapons.set("secondWeapon", new Weapon("eagle", 200));
        weapons.set("thirdWeapon", new Weapon("ak-47", 800));
        var user = new User();
        user.id = 1;
        user.name = "Max Pain";
        user.weapons = weapons;
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.id.should.be.equal(1);
        classedUser.name.should.be.equal("Max Pain");
        classedUser.weapons.should.be.instanceOf(Map);
        classedUser.weapons.size.should.be.equal(3);
        classedUser.weapons.get("firstWeapon").should.be.instanceof(Weapon);
        classedUser.weapons.get("firstWeapon").should.be.eql({
            model: "knife",
            range: 1
        });
        classedUser.weapons.get("secondWeapon").should.be.instanceof(Weapon);
        classedUser.weapons.get("secondWeapon").should.be.eql({
            model: "eagle",
            range: 200
        });
        classedUser.weapons.get("thirdWeapon").should.be.instanceof(Weapon);
        classedUser.weapons.get("thirdWeapon").should.be.eql({
            model: "ak-47",
            range: 800
        });
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.not.be.instanceOf(User);
        plainedUser.should.be.eql({
            id: 1,
            name: "Max Pain",
            weapons: {
                firstWeapon: {
                    model: "knife",
                    range: 1
                },
                secondWeapon: {
                    model: "eagle",
                    range: 200
                },
                thirdWeapon: {
                    model: "ak-47",
                    range: 800
                }
            }
        });
    });
    it("using Set with objects", function () {
        storage_1.defaultMetadataStorage.clear();
        var Weapon = /** @class */ (function () {
            function Weapon(model, range) {
                this.model = model;
                this.range = range;
            }
            return Weapon;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Type(function () { return Weapon; }),
                __metadata("design:type", Set)
            ], User.prototype, "weapons", void 0);
            return User;
        }());
        var plainUser = {
            id: 1,
            name: "Max Pain",
            weapons: [
                { model: "knife", range: 1 },
                { model: "eagle", range: 200 },
                { model: "ak-47", range: 800 },
            ]
        };
        var weapons = new Set();
        weapons.add(new Weapon("knife", 1));
        weapons.add(new Weapon("eagle", 200));
        weapons.add(new Weapon("ak-47", 800));
        var user = new User();
        user.id = 1;
        user.name = "Max Pain";
        user.weapons = weapons;
        var classedUser = index_1.plainToClass(User, plainUser);
        classedUser.should.be.instanceOf(User);
        classedUser.id.should.be.equal(1);
        classedUser.name.should.be.equal("Max Pain");
        classedUser.weapons.should.be.instanceOf(Set);
        classedUser.weapons.size.should.be.equal(3);
        var it = classedUser.weapons.values();
        var first = it.next().value;
        var second = it.next().value;
        var third = it.next().value;
        first.should.be.instanceof(Weapon);
        first.should.be.eql({ model: "knife", range: 1 });
        second.should.be.instanceof(Weapon);
        second.should.be.eql({ model: "eagle", range: 200 });
        third.should.be.instanceof(Weapon);
        third.should.be.eql({ model: "ak-47", range: 800 });
        var plainedUser = index_1.classToPlain(user);
        plainedUser.should.not.be.instanceOf(User);
        plainedUser.should.be.eql({
            id: 1,
            name: "Max Pain",
            weapons: [
                { model: "knife", range: 1 },
                { model: "eagle", range: 200 },
                { model: "ak-47", range: 800 },
            ]
        });
    });
});
//# sourceMappingURL=es6-data-types.spec.js.map