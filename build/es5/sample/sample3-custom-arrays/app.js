"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
require("reflect-metadata");
var index_1 = require("../../src/index");
var Photo_1 = require("./Photo");
// check deserialization
var photoJson = {
    id: "1",
    filename: "myphoto.jpg",
    description: "about my photo",
    tags: [
        "me",
        "iam"
    ],
    albums: [{
            id: "1",
            name: "My life"
        },
        {
            id: "2",
            name: "My young years"
        }]
};
var photo = index_1.plainToClass(Photo_1.Photo, photoJson);
console.log("deserialized object: ", photo);
console.log("-----------------------------");
console.log("Trying to find album: ", photo.albums.findByName("My life"));
console.log("-----------------------------");
// now check serialization
var newPhotoJson = index_1.classToPlain(photo);
console.log("serialized object: ", newPhotoJson);
console.log("-----------------------------");
//# sourceMappingURL=app.js.map