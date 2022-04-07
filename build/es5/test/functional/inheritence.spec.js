"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
describe("inheritence", function () {
    it("decorators should work inside a base class", function () {
        storage_1.defaultMetadataStorage.clear();
        var Contact = /** @class */ (function () {
            function Contact() {
            }
            __decorate([
                index_1.Transform(function (value) { return value.toUpperCase(); }),
                __metadata("design:type", String)
            ], Contact.prototype, "name", void 0);
            __decorate([
                index_1.Type(function () { return Date; }),
                __metadata("design:type", Date)
            ], Contact.prototype, "birthDate", void 0);
            return Contact;
        }());
        var User = /** @class */ (function (_super) {
            __extends(User, _super);
            function User() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Type(function () { return Number; }),
                __metadata("design:type", Number)
            ], User.prototype, "id", void 0);
            return User;
        }(Contact));
        var Student = /** @class */ (function (_super) {
            __extends(Student, _super);
            function Student() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                index_1.Transform(function (value) { return value.toUpperCase(); }),
                __metadata("design:type", String)
            ], Student.prototype, "university", void 0);
            return Student;
        }(User));
        var plainStudent = {
            name: "Johny Cage",
            university: "mit",
            birthDate: new Date(1967, 2, 1).toDateString(),
            id: 100,
            email: "johnny.cage@gmail.com"
        };
        var classedStudent = index_1.plainToClass(Student, plainStudent);
        classedStudent.name.should.be.equal("JOHNY CAGE");
        classedStudent.university.should.be.equal("MIT");
        classedStudent.birthDate.getTime().should.be.equal(new Date(1967, 2, 1).getTime());
        classedStudent.id.should.be.equal(plainStudent.id);
        classedStudent.email.should.be.equal(plainStudent.email);
    });
});
//# sourceMappingURL=inheritence.spec.js.map