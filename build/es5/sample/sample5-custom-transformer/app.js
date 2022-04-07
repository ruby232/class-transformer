"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var index_1 = require("../../src/index");
var User_1 = require("./User");
var userJson = {
    id: 1,
    name: "Johny Cage",
    date: new Date().valueOf()
};
console.log(index_1.plainToClass(User_1.User, userJson));
var user = new User_1.User();
user.id = 1;
user.name = "Johny Cage";
user.date = new Date();
console.log(index_1.classToPlain(user));
//# sourceMappingURL=app.js.map