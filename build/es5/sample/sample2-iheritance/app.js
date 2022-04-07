"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var index_1 = require("../../src/index");
var Photo_1 = require("./Photo");
var photoJson = {
    id: "1",
    filename: "myphoto.jpg",
    description: "about my photo",
    authorName: "Johny.Cage",
    authorEmail: "johny@cage.com",
    author: {
        id: "2",
        firstName: "Johny",
        lastName: "Cage"
    },
    albums: [{
            id: "1",
            authorName: "Johny.Cage",
            authorEmail: "johny@cage.com",
            name: "My life"
        },
        {
            id: "2",
            authorName: "Johny.Cage",
            authorEmail: "johny@cage.com",
            name: "My young years"
        }]
};
var photo = index_1.plainToClass(Photo_1.Photo, photoJson);
console.log("deserialized object: ", photo);
// now check serialization
var newPhotoJson = index_1.classToPlain(photo);
console.log("serialized object: ", newPhotoJson);
// try to deserialize an array
console.log("-------------------------------");
var photosJson = [{
        id: "1",
        filename: "myphoto.jpg",
        description: "about my photo",
        author: {
            id: "2",
            firstName: "Johny",
            lastName: "Cage",
            registrationDate: "1995-12-17T03:24:00"
        },
        albums: [{
                id: "1",
                name: "My life"
            },
            {
                id: "2",
                name: "My young years"
            }]
    },
    {
        id: "2",
        filename: "hisphoto.jpg",
        description: "about his photo",
        author: {
            id: "2",
            firstName: "Johny",
            lastName: "Cage"
        },
        albums: [{
                id: "1",
                name: "My life"
            },
            {
                id: "2",
                name: "My young years"
            }]
    }];
var photos = index_1.plainToClass(Photo_1.Photo, photosJson);
console.log("deserialized array: ", photos);
// now check array serialization
var newPhotosJson = index_1.classToPlain(photos);
console.log("serialized array: ", newPhotosJson);
//# sourceMappingURL=app.js.map