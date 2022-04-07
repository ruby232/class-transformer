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
describe("implicit type conversion", function () {
    it("should run only when enabled", function () {
        storage_1.defaultMetadataStorage.clear();
        var SimpleExample = /** @class */ (function () {
            function SimpleExample() {
            }
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", Number)
            ], SimpleExample.prototype, "implicitTypeNumber", void 0);
            __decorate([
                decorators_1.Expose(),
                __metadata("design:type", String)
            ], SimpleExample.prototype, "implicitTypeString", void 0);
            return SimpleExample;
        }());
        var result1 = index_1.plainToClass(SimpleExample, {
            implicitTypeNumber: "100",
            implicitTypeString: 133123,
        }, { enableImplicitConversion: true });
        var result2 = index_1.plainToClass(SimpleExample, {
            implicitTypeNumber: "100",
            implicitTypeString: 133123,
        }, { enableImplicitConversion: false });
        chai_1.expect(result1).to.deep.equal({ implicitTypeNumber: 100, implicitTypeString: "133123" });
        chai_1.expect(result2).to.deep.equal({ implicitTypeNumber: "100", implicitTypeString: 133123 });
    });
});
describe("implicit and explicity type declarations", function () {
    storage_1.defaultMetadataStorage.clear();
    var Example = /** @class */ (function () {
        function Example() {
        }
        __decorate([
            decorators_1.Expose(),
            __metadata("design:type", Date)
        ], Example.prototype, "implicitTypeViaOtherDecorator", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Number)
        ], Example.prototype, "implicitTypeViaEmptyTypeDecorator", void 0);
        __decorate([
            decorators_1.Type(function () { return String; }),
            __metadata("design:type", String)
        ], Example.prototype, "explicitType", void 0);
        return Example;
    }());
    var result = index_1.plainToClass(Example, {
        implicitTypeViaOtherDecorator: "2018-12-24T12:00:00Z",
        implicitTypeViaEmptyTypeDecorator: "100",
        explicitType: 100,
    }, { enableImplicitConversion: true });
    it("should use implicitly defined design:type to convert value when no @Type decorator is used", function () {
        chai_1.expect(result.implicitTypeViaOtherDecorator).to.be.instanceOf(Date);
        chai_1.expect(result.implicitTypeViaOtherDecorator.getTime()).to.be.equal(new Date("2018-12-24T12:00:00Z").getTime());
    });
    it("should use implicitly defined design:type to convert value when empty @Type() decorator is used", function () {
        chai_1.expect(result.implicitTypeViaEmptyTypeDecorator).that.is.a("number");
        chai_1.expect(result.implicitTypeViaEmptyTypeDecorator).to.be.equal(100);
    });
    it("should use explicitly defined type when @Type(() => Construtable) decorator is used", function () {
        chai_1.expect(result.explicitType).that.is.a("string");
        chai_1.expect(result.explicitType).to.be.equal("100");
    });
});
describe("plainToClass transforms built-in primitive types properly", function () {
    storage_1.defaultMetadataStorage.clear();
    var Example = /** @class */ (function () {
        function Example() {
        }
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Date)
        ], Example.prototype, "date", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", String)
        ], Example.prototype, "string", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", String)
        ], Example.prototype, "string2", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Number)
        ], Example.prototype, "number", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Number)
        ], Example.prototype, "number2", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Boolean)
        ], Example.prototype, "boolean", void 0);
        __decorate([
            decorators_1.Type(),
            __metadata("design:type", Boolean)
        ], Example.prototype, "boolean2", void 0);
        return Example;
    }());
    var result = index_1.plainToClass(Example, {
        date: "2018-12-24T12:00:00Z",
        string: "100",
        string2: 100,
        number: "100",
        number2: 100,
        boolean: 1,
        boolean2: 0,
    }, { enableImplicitConversion: true });
    it("should recognize and convert to Date", function () {
        chai_1.expect(result.date).to.be.instanceOf(Date);
        chai_1.expect(result.date.getTime()).to.be.equal(new Date("2018-12-24T12:00:00Z").getTime());
    });
    it("should recognize and convert to string", function () {
        chai_1.expect(result.string).that.is.a("string");
        chai_1.expect(result.string2).that.is.a("string");
        chai_1.expect(result.string).to.be.equal("100");
        chai_1.expect(result.string2).to.be.equal("100");
    });
    it("should recognize and convert to number", function () {
        chai_1.expect(result.number).that.is.a("number");
        chai_1.expect(result.number2).that.is.a("number");
        chai_1.expect(result.number).to.be.equal(100);
        chai_1.expect(result.number2).to.be.equal(100);
    });
    it("should recognize and convert to boolean", function () {
        chai_1.expect(result.boolean).to.be.true;
        chai_1.expect(result.boolean2).to.be.false;
    });
});
//# sourceMappingURL=implicit-type-declarations.spec.js.map