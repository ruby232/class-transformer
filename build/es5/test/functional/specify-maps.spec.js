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
var chai_1 = require("chai");
describe("specifying target maps", function () {
    it("should convert instance of the given object to plain javascript object and should expose all properties since its a default behaviour", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser);
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser);
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        var classToClassUser = index_1.classToClass(user);
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser);
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });
    it("should exclude all objects marked with @Exclude() decorator", function () {
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
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        chai_1.expect(plainUser.password).to.be.undefined;
        var existUser = { id: 1, age: 27, password: "yayayaya" };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser);
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "yayayaya"
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser);
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassUser = index_1.classToClass(user);
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser);
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
    });
    it("should exclude all properties from object if whole class is marked with @Exclude() decorator", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            User = __decorate([
                decorators_1.Exclude()
            ], User);
            return User;
        }());
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({});
        chai_1.expect(plainUser.firstName).to.be.undefined;
        chai_1.expect(plainUser.lastName).to.be.undefined;
        chai_1.expect(plainUser.password).to.be.undefined;
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser);
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({});
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser);
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1
        });
        var classToClassUser = index_1.classToClass(user);
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({});
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser);
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1
        });
    });
    it("should exclude all properties from object if whole class is marked with @Exclude() decorator, but include properties marked with @Expose() decorator", function () {
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
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        chai_1.expect(plainUser.password).to.be.undefined;
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser);
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser);
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassUser = index_1.classToClass(user);
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser);
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
    });
    it("should exclude all properties from object if its defined via transformation options, but include properties marked with @Expose() decorator", function () {
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
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user, { strategy: "excludeAll" });
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        chai_1.expect(plainUser.password).to.be.undefined;
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser, { strategy: "excludeAll" });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser, { strategy: "excludeAll" });
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser, { strategy: "excludeAll" });
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassUser = index_1.classToClass(user, { strategy: "excludeAll" });
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser, { strategy: "excludeAll" });
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev"
        });
    });
    it("should expose all properties from object if its defined via transformation options, but exclude properties marked with @Exclude() decorator", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude(),
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
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user, { strategy: "exposeAll" });
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed"
        });
        chai_1.expect(plainUser.lastName).to.be.undefined;
        chai_1.expect(plainUser.password).to.be.undefined;
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser, { strategy: "exposeAll" });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed"
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser, { strategy: "exposeAll" });
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "Umed"
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser, { strategy: "exposeAll" });
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed"
        });
        var classToClassUser = index_1.classToClass(user, { strategy: "exposeAll" });
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "Umed"
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser, { strategy: "exposeAll" });
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed"
        });
    });
    it("should convert values to specific types if they are set via @Type decorator", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Type(function (type) { return String; }),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Type(function (type) { return String; }),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Number; }),
                __metadata("design:type", Number)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Boolean; }),
                __metadata("design:type", Boolean)
            ], User.prototype, "isActive", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Date; }),
                __metadata("design:type", Date)
            ], User.prototype, "registrationDate", void 0);
            __decorate([
                decorators_1.Type(function (type) { return String; }),
                __metadata("design:type", String)
            ], User.prototype, "lastVisitDate", void 0);
            return User;
        }());
        var date = new Date();
        var user = new User();
        user.firstName = 321;
        user.lastName = 123;
        user.password = "123";
        user.isActive = "1";
        user.registrationDate = date.toString();
        user.lastVisitDate = date;
        var fromPlainUser = {
            firstName: 321,
            lastName: 123,
            password: "123",
            isActive: "1",
            registrationDate: date.toString(),
            lastVisitDate: date
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var plainUser = index_1.classToPlain(user, { strategy: "exposeAll" });
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
        var existUser = { id: 1, age: 27 };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser, { strategy: "exposeAll" });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
        plainUser2.should.be.equal(existUser);
        var transformedUser = index_1.plainToClass(User, fromPlainUser, { strategy: "exposeAll" });
        transformedUser.should.be.instanceOf(User);
        transformedUser.should.be.eql({
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser, { strategy: "exposeAll" });
        fromExistTransformedUser.should.be.instanceOf(User);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
        var classToClassUser = index_1.classToClass(user, { strategy: "exposeAll" });
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.be.eql({
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser, { strategy: "exposeAll" });
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "321",
            lastName: "123",
            password: 123,
            isActive: true,
            registrationDate: new Date(date.toString()),
            lastVisitDate: date.toString(),
        });
    });
    it("should transform nested objects too and make sure their decorators are used too", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], Photo.prototype, "filename", void 0);
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            return User;
        }());
        var photo = new Photo();
        photo.id = 1;
        photo.name = "Me";
        photo.filename = "iam.jpg";
        photo.uploadDate = new Date();
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.photo = photo;
        var plainUser = index_1.classToPlain(user, { strategy: "exposeAll" });
        plainUser.should.not.be.instanceOf(User);
        plainUser.photo.should.not.be.instanceOf(Photo);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                uploadDate: photo.uploadDate
            }
        });
        chai_1.expect(plainUser.password).to.be.undefined;
        chai_1.expect(plainUser.photo.filename).to.be.undefined;
        chai_1.expect(plainUser.photo.uploadDate).to.be.eql(photo.uploadDate);
        chai_1.expect(plainUser.photo.uploadDate).not.to.be.equal(photo.uploadDate);
        var existUser = { id: 1, age: 27, photo: { id: 2, description: "photo" } };
        var plainUser2 = index_1.classToPlainFromExist(user, existUser, { strategy: "exposeAll" });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.photo.should.not.be.instanceOf(Photo);
        plainUser2.should.be.eql({
            id: 1,
            age: 27,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                uploadDate: photo.uploadDate,
                description: "photo"
            }
        });
        plainUser2.should.be.equal(existUser);
        chai_1.expect(plainUser2.password).to.be.undefined;
        chai_1.expect(plainUser2.photo.filename).to.be.undefined;
        chai_1.expect(plainUser2.photo.uploadDate).to.be.eql(photo.uploadDate);
        chai_1.expect(plainUser2.photo.uploadDate).not.to.be.equal(photo.uploadDate);
    });
    it("should transform nested objects too and make sure given type is used instead of automatically guessed one", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], Photo.prototype, "filename", void 0);
            return Photo;
        }());
        var ExtendedPhoto = /** @class */ (function () {
            function ExtendedPhoto() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], ExtendedPhoto.prototype, "name", void 0);
            return ExtendedPhoto;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Type(function (type) { return ExtendedPhoto; }) // force specific type
                ,
                __metadata("design:type", Photo)
            ], User.prototype, "photo", void 0);
            return User;
        }());
        var photo = new Photo();
        photo.id = 1;
        photo.name = "Me";
        photo.filename = "iam.jpg";
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.photo = photo;
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "iam.jpg"
            }
        });
        chai_1.expect(plainUser.password).to.be.undefined;
        chai_1.expect(plainUser.photo.name).to.be.undefined;
    });
    it("should convert given plain object to class instance object", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], Photo.prototype, "filename", void 0);
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Photo; }),
                __metadata("design:type", Photo)
            ], User.prototype, "photo", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.photo = new Photo();
        user.photo.id = 1;
        user.photo.name = "Me";
        user.photo.filename = "iam.jpg";
        user.photo.uploadDate = new Date();
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                name: "Me",
                filename: "iam.jpg",
                uploadDate: new Date(),
            }
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        var fromExistPhoto = new Photo();
        fromExistPhoto.metadata = "taken by Camera";
        fromExistUser.photo = fromExistPhoto;
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        transformedUser.photo.should.be.instanceOf(Photo);
        transformedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                uploadDate: fromPlainUser.photo.uploadDate
            }
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser);
        fromExistTransformedUser.should.be.equal(fromExistUser);
        fromExistTransformedUser.photo.should.be.equal(fromExistPhoto);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                metadata: "taken by Camera",
                uploadDate: fromPlainUser.photo.uploadDate
            }
        });
        var classToClassUser = index_1.classToClass(user);
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.photo.should.be.instanceOf(Photo);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.not.be.equal(user.photo);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                uploadDate: user.photo.uploadDate
            }
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser);
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.photo.should.be.instanceOf(Photo);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.not.be.equal(user.photo);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                name: "Me",
                metadata: "taken by Camera",
                uploadDate: user.photo.uploadDate
            }
        });
    });
    it("should expose only properties that match given group", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            __decorate([
                decorators_1.Expose({
                    groups: ["user", "guest"]
                }),
                __metadata("design:type", String)
            ], Photo.prototype, "filename", void 0);
            __decorate([
                decorators_1.Expose({
                    groups: ["admin"]
                }),
                __metadata("design:type", Number)
            ], Photo.prototype, "status", void 0);
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Expose({
                    groups: ["user", "guest"]
                }),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Expose({
                    groups: ["user"]
                }),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Expose({
                    groups: ["admin"]
                }),
                __metadata("design:type", Boolean)
            ], User.prototype, "isActive", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Photo; }),
                __metadata("design:type", Photo)
            ], User.prototype, "photo", void 0);
            __decorate([
                decorators_1.Expose({
                    groups: ["admin"]
                }),
                decorators_1.Type(function (type) { return Photo; }),
                __metadata("design:type", Array)
            ], User.prototype, "photos", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.isActive = false;
        user.photo = new Photo();
        user.photo.id = 1;
        user.photo.filename = "myphoto.jpg";
        user.photo.status = 1;
        user.photos = [user.photo];
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            isActive: false,
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1,
                }]
        };
        var fromExistUser = new User();
        fromExistUser.id = 1;
        fromExistUser.photo = new Photo();
        fromExistUser.photo.metadata = "taken by Camera";
        var plainUser1 = index_1.classToPlain(user);
        plainUser1.should.not.be.instanceOf(User);
        plainUser1.should.be.eql({
            firstName: "Umed",
            photo: {
                id: 1
            }
        });
        chai_1.expect(plainUser1.lastName).to.be.undefined;
        chai_1.expect(plainUser1.password).to.be.undefined;
        chai_1.expect(plainUser1.isActive).to.be.undefined;
        var plainUser2 = index_1.classToPlain(user, { groups: ["user"] });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        chai_1.expect(plainUser2.isActive).to.be.undefined;
        var transformedUser2 = index_1.plainToClass(User, fromPlainUser, { groups: ["user"] });
        transformedUser2.should.be.instanceOf(User);
        transformedUser2.photo.should.be.instanceOf(Photo);
        transformedUser2.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        var fromExistTransformedUser = index_1.plainToClassFromExist(fromExistUser, fromPlainUser, { groups: ["user"] });
        fromExistTransformedUser.should.be.equal(fromExistUser);
        fromExistTransformedUser.photo.should.be.equal(fromExistUser.photo);
        fromExistTransformedUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                metadata: "taken by Camera",
                filename: "myphoto.jpg"
            }
        });
        var classToClassUser = index_1.classToClass(user, { groups: ["user"] });
        classToClassUser.should.be.instanceOf(User);
        classToClassUser.photo.should.be.instanceOf(Photo);
        classToClassUser.should.not.be.equal(user);
        classToClassUser.should.not.be.equal(user.photo);
        classToClassUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        var classToClassFromExistUser = index_1.classToClassFromExist(user, fromExistUser, { groups: ["user"] });
        classToClassFromExistUser.should.be.instanceOf(User);
        classToClassFromExistUser.photo.should.be.instanceOf(Photo);
        classToClassFromExistUser.should.not.be.equal(user);
        classToClassFromExistUser.should.not.be.equal(user.photo);
        classToClassFromExistUser.should.be.equal(fromExistUser);
        classToClassFromExistUser.should.be.eql({
            id: 1,
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                metadata: "taken by Camera",
                filename: "myphoto.jpg"
            }
        });
        var plainUser3 = index_1.classToPlain(user, { groups: ["guest"] });
        plainUser3.should.not.be.instanceOf(User);
        plainUser3.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        chai_1.expect(plainUser3.password).to.be.undefined;
        chai_1.expect(plainUser3.isActive).to.be.undefined;
        var transformedUser3 = index_1.plainToClass(User, fromPlainUser, { groups: ["guest"] });
        transformedUser3.should.be.instanceOf(User);
        transformedUser3.photo.should.be.instanceOf(Photo);
        transformedUser3.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        var plainUser4 = index_1.classToPlain(user, { groups: ["admin"] });
        plainUser4.should.not.be.instanceOf(User);
        plainUser4.should.be.eql({
            firstName: "Umed",
            isActive: false,
            photo: {
                id: 1,
                status: 1
            },
            photos: [{
                    id: 1,
                    status: 1
                }]
        });
        chai_1.expect(plainUser4.lastName).to.be.undefined;
        chai_1.expect(plainUser4.password).to.be.undefined;
        var transformedUser4 = index_1.plainToClass(User, fromPlainUser, { groups: ["admin"] });
        transformedUser4.should.be.instanceOf(User);
        transformedUser4.photo.should.be.instanceOf(Photo);
        transformedUser4.photos[0].should.be.instanceOf(Photo);
        transformedUser4.should.be.eql({
            firstName: "Umed",
            isActive: false,
            photo: {
                id: 1,
                status: 1
            },
            photos: [{
                    id: 1,
                    status: 1
                }]
        });
        var plainUser5 = index_1.classToPlain(user, { groups: ["admin", "user"] });
        plainUser5.should.not.be.instanceOf(User);
        plainUser5.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            isActive: false,
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1
                }]
        });
        var transformedUser5 = index_1.plainToClass(User, fromPlainUser, { groups: ["admin", "user"] });
        transformedUser5.should.be.instanceOf(User);
        transformedUser5.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            isActive: false,
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1
                }]
        });
    });
    it("should expose only properties that match given version", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            __decorate([
                decorators_1.Expose({
                    since: 1.5,
                    until: 2
                }),
                __metadata("design:type", String)
            ], Photo.prototype, "filename", void 0);
            __decorate([
                decorators_1.Expose({
                    since: 2
                }),
                __metadata("design:type", Number)
            ], Photo.prototype, "status", void 0);
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            __decorate([
                decorators_1.Expose({
                    since: 1,
                    until: 2
                }),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Expose({
                    since: 0.5
                }),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Type(function (type) { return Photo; }),
                __metadata("design:type", Photo)
            ], User.prototype, "photo", void 0);
            __decorate([
                decorators_1.Expose({
                    since: 3
                }),
                decorators_1.Type(function (type) { return Photo; }),
                __metadata("design:type", Array)
            ], User.prototype, "photos", void 0);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.photo = new Photo();
        user.photo.id = 1;
        user.photo.filename = "myphoto.jpg";
        user.photo.status = 1;
        user.photos = [user.photo];
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman",
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1,
                }]
        };
        var plainUser1 = index_1.classToPlain(user);
        plainUser1.should.not.be.instanceOf(User);
        plainUser1.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1
                }]
        });
        var transformedUser1 = index_1.plainToClass(User, fromPlainUser);
        transformedUser1.should.be.instanceOf(User);
        transformedUser1.photo.should.be.instanceOf(Photo);
        transformedUser1.photos[0].should.be.instanceOf(Photo);
        transformedUser1.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg",
                status: 1
            },
            photos: [{
                    id: 1,
                    filename: "myphoto.jpg",
                    status: 1
                }]
        });
        var plainUser2 = index_1.classToPlain(user, { version: 0.3 });
        plainUser2.should.not.be.instanceOf(User);
        plainUser2.should.be.eql({
            photo: {
                id: 1
            }
        });
        var transformedUser2 = index_1.plainToClass(User, fromPlainUser, { version: 0.3 });
        transformedUser2.should.be.instanceOf(User);
        transformedUser2.photo.should.be.instanceOf(Photo);
        transformedUser2.should.be.eql({
            photo: {
                id: 1
            }
        });
        var plainUser3 = index_1.classToPlain(user, { version: 0.5 });
        plainUser3.should.not.be.instanceOf(User);
        plainUser3.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1
            }
        });
        var transformedUser3 = index_1.plainToClass(User, fromPlainUser, { version: 0.5 });
        transformedUser3.should.be.instanceOf(User);
        transformedUser3.photo.should.be.instanceOf(Photo);
        transformedUser3.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1
            }
        });
        var plainUser4 = index_1.classToPlain(user, { version: 1 });
        plainUser4.should.not.be.instanceOf(User);
        plainUser4.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1
            }
        });
        var transformedUser4 = index_1.plainToClass(User, fromPlainUser, { version: 1 });
        transformedUser4.should.be.instanceOf(User);
        transformedUser4.photo.should.be.instanceOf(Photo);
        transformedUser4.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1
            }
        });
        var plainUser5 = index_1.classToPlain(user, { version: 1.5 });
        plainUser5.should.not.be.instanceOf(User);
        plainUser5.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        var transformedUser5 = index_1.plainToClass(User, fromPlainUser, { version: 1.5 });
        transformedUser5.should.be.instanceOf(User);
        transformedUser5.photo.should.be.instanceOf(Photo);
        transformedUser5.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                filename: "myphoto.jpg"
            }
        });
        var plainUser6 = index_1.classToPlain(user, { version: 2 });
        plainUser6.should.not.be.instanceOf(User);
        plainUser6.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                status: 1
            }
        });
        var transformedUser6 = index_1.plainToClass(User, fromPlainUser, { version: 2 });
        transformedUser6.should.be.instanceOf(User);
        transformedUser6.photo.should.be.instanceOf(Photo);
        transformedUser6.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                status: 1
            }
        });
        var plainUser7 = index_1.classToPlain(user, { version: 3 });
        plainUser7.should.not.be.instanceOf(User);
        plainUser7.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                status: 1
            },
            photos: [{
                    id: 1,
                    status: 1
                }]
        });
        var transformedUser7 = index_1.plainToClass(User, fromPlainUser, { version: 3 });
        transformedUser7.should.be.instanceOf(User);
        transformedUser7.photo.should.be.instanceOf(Photo);
        transformedUser7.photos[0].should.be.instanceOf(Photo);
        transformedUser7.should.be.eql({
            lastName: "Khudoiberdiev",
            photo: {
                id: 1,
                status: 1
            },
            photos: [{
                    id: 1,
                    status: 1
                }]
        });
    });
    it("should expose method and accessors that have @Expose()", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            Object.defineProperty(User.prototype, "name", {
                get: function () {
                    return this.firstName + " " + this.lastName;
                },
                enumerable: true,
                configurable: true
            });
            User.prototype.getName = function () {
                return this.firstName + " " + this.lastName;
            };
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [])
            ], User.prototype, "name", null);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], User.prototype, "getName", null);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromPlainUser = {
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            name: "Umed Khudoiberdiev",
            getName: "Umed Khudoiberdiev"
        });
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        var likeUser = new User();
        likeUser.firstName = "Umed";
        likeUser.lastName = "Khudoiberdiev";
        transformedUser.should.be.eql(likeUser);
    });
    it("should expose with alternative name if its given", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            Object.defineProperty(User.prototype, "name", {
                get: function () {
                    return this.firstName + " " + this.lastName;
                },
                enumerable: true,
                configurable: true
            });
            User.prototype.getName = function () {
                return this.firstName + " " + this.lastName;
            };
            __decorate([
                decorators_1.Expose({ name: "myName" }),
                __metadata("design:type", String)
            ], User.prototype, "firstName", void 0);
            __decorate([
                decorators_1.Expose({ name: "secondName" }),
                __metadata("design:type", String)
            ], User.prototype, "lastName", void 0);
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [])
            ], User.prototype, "name", null);
            __decorate([
                decorators_1.Expose({ name: "fullName" }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], User.prototype, "getName", null);
            return User;
        }());
        var user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        var fromPlainUser = {
            myName: "Umed",
            secondName: "Khudoiberdiev",
            password: "imnosuperman"
        };
        var plainUser = index_1.classToPlain(user);
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            myName: "Umed",
            secondName: "Khudoiberdiev",
            name: "Umed Khudoiberdiev",
            fullName: "Umed Khudoiberdiev"
        });
        var transformedUser = index_1.plainToClass(User, fromPlainUser);
        transformedUser.should.be.instanceOf(User);
        var likeUser = new User();
        likeUser.firstName = "Umed";
        likeUser.lastName = "Khudoiberdiev";
        transformedUser.should.be.eql(likeUser);
    });
    it("should exclude all prefixed properties if prefix is given", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            Object.defineProperty(User.prototype, "name", {
                get: function () {
                    return this._firstName + " " + this._lastName;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Type(function () { return Photo; }),
                __metadata("design:type", Photo)
            ], User.prototype, "photo", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [])
            ], User.prototype, "name", null);
            return User;
        }());
        var user = new User();
        user.$system = "@#$%^&*token(*&^%$#@!";
        user._firstName = "Umed";
        user._lastName = "Khudoiberdiev";
        user.password = "imnosuperman";
        user.photo = new Photo();
        user.photo.id = 1;
        user.photo.$filename = "myphoto.jpg";
        user.photo.status = 1;
        var fromPlainUser = {
            $system: "@#$%^&*token(*&^%$#@!",
            _firstName: "Khudoiberdiev",
            _lastName: "imnosuperman",
            password: "imnosuperman",
            photo: {
                id: 1,
                $filename: "myphoto.jpg",
                status: 1,
            }
        };
        var plainUser = index_1.classToPlain(user, { excludePrefixes: ["_", "$"] });
        plainUser.should.not.be.instanceOf(User);
        plainUser.should.be.eql({
            name: "Umed Khudoiberdiev",
            photo: {
                id: 1,
                status: 1
            }
        });
        var transformedUser = index_1.plainToClass(User, fromPlainUser, { excludePrefixes: ["_", "$"] });
        transformedUser.should.be.instanceOf(User);
        var likeUser = new User();
        likeUser.photo = new Photo();
        likeUser.photo.id = 1;
        likeUser.photo.status = 1;
        transformedUser.should.be.eql(likeUser);
    });
    it("should be able to transform array too", function () {
        storage_1.defaultMetadataStorage.clear();
        var User = /** @class */ (function () {
            function User() {
            }
            Object.defineProperty(User.prototype, "name", {
                get: function () {
                    return this.firstName + " " + this.lastName;
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                decorators_1.Exclude(),
                __metadata("design:type", String)
            ], User.prototype, "password", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [])
            ], User.prototype, "name", null);
            return User;
        }());
        var user1 = new User();
        user1.firstName = "Umed";
        user1.lastName = "Khudoiberdiev";
        user1.password = "imnosuperman";
        var user2 = new User();
        user2.firstName = "Dima";
        user2.lastName = "Zotov";
        user2.password = "imnomesser";
        var users = [user1, user2];
        var plainUsers = index_1.classToPlain(users);
        plainUsers.should.be.eql([{
                firstName: "Umed",
                lastName: "Khudoiberdiev",
                name: "Umed Khudoiberdiev"
            }, {
                firstName: "Dima",
                lastName: "Zotov",
                name: "Dima Zotov"
            }]);
        var fromPlainUsers = [{
                firstName: "Umed",
                lastName: "Khudoiberdiev",
                name: "Umed Khudoiberdiev"
            }, {
                firstName: "Dima",
                lastName: "Zotov",
                name: "Dima Zotov"
            }];
        var existUsers = [{ id: 1, age: 27 }, { id: 2, age: 30 }];
        var plainUser2 = index_1.classToPlainFromExist(users, existUsers);
        plainUser2.should.be.eql([{
                id: 1,
                age: 27,
                firstName: "Umed",
                lastName: "Khudoiberdiev",
                name: "Umed Khudoiberdiev"
            }, {
                id: 2,
                age: 30,
                firstName: "Dima",
                lastName: "Zotov",
                name: "Dima Zotov"
            }]);
        var transformedUser = index_1.plainToClass(User, fromPlainUsers);
        transformedUser[0].should.be.instanceOf(User);
        transformedUser[1].should.be.instanceOf(User);
        var likeUser1 = new User();
        likeUser1.firstName = "Umed";
        likeUser1.lastName = "Khudoiberdiev";
        var likeUser2 = new User();
        likeUser2.firstName = "Dima";
        likeUser2.lastName = "Zotov";
        transformedUser.should.be.eql([likeUser1, likeUser2]);
        var classToClassUsers = index_1.classToClass(users);
        classToClassUsers[0].should.be.instanceOf(User);
        classToClassUsers[1].should.be.instanceOf(User);
        classToClassUsers[0].should.not.be.equal(user1);
        classToClassUsers[1].should.not.be.equal(user1);
        var classUserLike1 = new User();
        classUserLike1.firstName = "Umed";
        classUserLike1.lastName = "Khudoiberdiev";
        var classUserLike2 = new User();
        classUserLike2.firstName = "Dima";
        classUserLike2.lastName = "Zotov";
        classToClassUsers.should.be.eql([classUserLike1, classUserLike2]);
        var fromExistUser1 = new User();
        fromExistUser1.id = 1;
        var fromExistUser2 = new User();
        fromExistUser2.id = 2;
        var fromExistUsers = [fromExistUser1, fromExistUser2];
        var classToClassFromExistUser = index_1.classToClassFromExist(users, fromExistUsers);
        classToClassFromExistUser[0].should.be.instanceOf(User);
        classToClassFromExistUser[1].should.be.instanceOf(User);
        classToClassFromExistUser[0].should.not.be.equal(user1);
        classToClassFromExistUser[1].should.not.be.equal(user1);
        classToClassFromExistUser.should.be.eql(fromExistUsers);
        var fromExistUserLike1 = new User();
        fromExistUserLike1.id = 1;
        fromExistUserLike1.firstName = "Umed";
        fromExistUserLike1.lastName = "Khudoiberdiev";
        var fromExistUserLike2 = new User();
        fromExistUserLike2.id = 2;
        fromExistUserLike2.firstName = "Dima";
        fromExistUserLike2.lastName = "Zotov";
        classToClassFromExistUser.should.be.eql([fromExistUserLike1, fromExistUserLike2]);
    });
});
//# sourceMappingURL=specify-maps.spec.js.map