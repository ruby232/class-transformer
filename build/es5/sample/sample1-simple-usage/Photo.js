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
var Album_1 = require("./Album");
var User_1 = require("./User");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    Object.defineProperty(Photo.prototype, "name", {
        get: function () {
            return this.id + "_" + this.filename;
        },
        enumerable: true,
        configurable: true
    });
    Photo.prototype.getAlbums = function () {
        console.log("this is not serialized/deserialized");
        return this.albums;
    };
    __decorate([
        decorators_1.Type(function () { return User_1.User; }),
        __metadata("design:type", User_1.User)
    ], Photo.prototype, "author", void 0);
    __decorate([
        decorators_1.Type(function () { return Album_1.Album; }),
        __metadata("design:type", Array)
    ], Photo.prototype, "albums", void 0);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map