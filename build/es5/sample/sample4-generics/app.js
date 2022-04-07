"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var SimpleCollection_1 = require("./SimpleCollection");
var User_1 = require("./User");
var index_1 = require("../../src/index");
var SuperCollection_1 = require("./SuperCollection");
var collection = new SimpleCollection_1.SimpleCollection();
collection.items = [
    new User_1.User(1, "Johny", "Cage", "*******"),
    new User_1.User(2, "Dima", "Cage", "*******")
];
collection.count = 2;
// using generics works only for classToPlain operations, since in runtime we can
// "guess" type without type provided only we have a constructor, not plain object.
// console.log(classToPlain(collection));
// alternatively you can use factory method
var collectionJson = {
    items: [{
            id: 1,
            firstName: "Johny",
            lastName: "Cage",
            password: "*******",
        }, {
            id: 2,
            firstName: "Dima",
            lastName: "Cage",
            password: "*******",
        }]
};
console.log(index_1.plainToClassFromExist(new SuperCollection_1.SuperCollection(User_1.User), collectionJson));
//# sourceMappingURL=app.js.map