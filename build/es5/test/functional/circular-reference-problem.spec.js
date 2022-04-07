"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var storage_1 = require("../../src/storage");
var TransformOperationExecutor_1 = require("../../src/TransformOperationExecutor");
var sinon = require("sinon");
describe("circular reference problem", function () {
    it("should skip circular reference objects in classToPlain operation", function () {
        storage_1.defaultMetadataStorage.clear();
        var Caption = /** @class */ (function () {
            function Caption() {
            }
            return Caption;
        }());
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            return User;
        }());
        var photo1 = new Photo();
        photo1.id = 1;
        photo1.filename = "me.jpg";
        var photo2 = new Photo();
        photo2.id = 2;
        photo2.filename = "she.jpg";
        var caption = new Caption();
        caption.text = "cool photo";
        var user = new User();
        user.caption = caption;
        user.firstName = "Umed Khudoiberdiev";
        user.photos = [photo1, photo2];
        photo1.user = user;
        photo2.user = user;
        photo1.users = [user];
        photo2.users = [user];
        photo1.caption = caption;
        photo2.caption = caption;
        var plainUser = index_1.classToPlain(user, { enableCircularCheck: true });
        plainUser.should.be.eql({
            firstName: "Umed Khudoiberdiev",
            caption: { text: "cool photo" },
            photos: [{
                    id: 1,
                    filename: "me.jpg",
                    users: [],
                    caption: { text: "cool photo" }
                }, {
                    id: 2,
                    filename: "she.jpg",
                    users: [],
                    caption: { text: "cool photo" }
                }]
        });
    });
    it("should not skip circular reference objects, but handle it correctly in classToClass operation", function () {
        storage_1.defaultMetadataStorage.clear();
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            return User;
        }());
        var photo1 = new Photo();
        photo1.id = 1;
        photo1.filename = "me.jpg";
        var photo2 = new Photo();
        photo2.id = 2;
        photo2.filename = "she.jpg";
        var user = new User();
        user.firstName = "Umed Khudoiberdiev";
        user.photos = [photo1, photo2];
        photo1.user = user;
        photo2.user = user;
        photo1.users = [user];
        photo2.users = [user];
        var classUser = index_1.classToClass(user, { enableCircularCheck: true });
        classUser.should.not.be.equal(user);
        classUser.should.be.instanceOf(User);
        classUser.should.be.eql(user);
    });
    describe("enableCircularCheck option", function () {
        var Photo = /** @class */ (function () {
            function Photo() {
            }
            return Photo;
        }());
        var User = /** @class */ (function () {
            function User() {
            }
            return User;
        }());
        var isCircularSpy;
        var photo1 = new Photo();
        photo1.id = 1;
        photo1.filename = "me.jpg";
        var user = new User();
        user.firstName = "Umed Khudoiberdiev";
        user.photos = [photo1];
        beforeEach(function () {
            isCircularSpy = sinon.spy(TransformOperationExecutor_1.TransformOperationExecutor.prototype, "isCircular");
        });
        afterEach(function () {
            isCircularSpy.restore();
        });
        it("enableCircularCheck option is undefined (default)", function () {
            var result = index_1.plainToClass(User, user);
            sinon.assert.notCalled(isCircularSpy);
        });
        it("enableCircularCheck option is true", function () {
            var result = index_1.plainToClass(User, user, { enableCircularCheck: true });
            sinon.assert.called(isCircularSpy);
        });
    });
});
//# sourceMappingURL=circular-reference-problem.spec.js.map