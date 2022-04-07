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
require("es6-shim");
var gulpclass_1 = require("gulpclass");
var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");
var replace = require("gulp-replace");
var mocha = require("gulp-mocha");
var chai = require("chai");
var tslint = require("gulp-tslint");
var stylish = require("tslint-stylish");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var istanbul = require("gulp-istanbul");
var remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
var rename = require("gulp-rename");
var file = require("gulp-file");
var uglify = require("gulp-uglify");
var Gulpfile = /** @class */ (function () {
    function Gulpfile() {
    }
    // -------------------------------------------------------------------------
    // General tasks
    // -------------------------------------------------------------------------
    /**
     * Cleans build folder.
     */
    Gulpfile.prototype.clean = function (cb) {
        return del(["./build/**"], cb);
    };
    /**
     * Runs typescript files compilation.
     */
    Gulpfile.prototype.compile = function () {
        return gulp.src("*.js", { read: false })
            .pipe(shell(["tsc"]));
    };
    // -------------------------------------------------------------------------
    // Bundling task
    // -------------------------------------------------------------------------
    /**
     * Compiles and compiles bundles.
     */
    Gulpfile.prototype.compileBundles = function () {
        var amdTsProject = ts.createProject("tsconfig.json", {
            module: "amd",
            outFile: "class-transformer.amd.js",
            typescript: require("typescript")
        });
        var systemTsProject = ts.createProject("tsconfig.json", {
            module: "system",
            outFile: "class-transformer.system.js",
            typescript: require("typescript")
        });
        var amdPureTsProject = ts.createProject("tsconfig.json", {
            module: "amd",
            outFile: "class-transformer.pure.amd.js",
            noEmitHelpers: true,
            noImplicitUseStrict: true,
            typescript: require("typescript")
        });
        var systemPureTsProject = ts.createProject("tsconfig.json", {
            module: "system",
            outFile: "class-transformer.pure.system.js",
            noEmitHelpers: true,
            noImplicitUseStrict: true,
            typescript: require("typescript")
        });
        return [
            gulp.src("build/bundle/**/*.ts")
                .pipe(amdTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(systemTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(amdPureTsProject()).js
                .pipe(gulp.dest("build/package")),
            gulp.src("build/bundle/**/*.ts")
                .pipe(systemPureTsProject()).js
                .pipe(gulp.dest("build/package"))
        ];
    };
    /**
     * Copies all source files into destination folder in a correct structure to build bundles.
     */
    Gulpfile.prototype.bundleCopySources = function () {
        return gulp.src(["./src/**/*.ts"])
            .pipe(gulp.dest("./build/bundle/class-transformer"));
    };
    /**
     * Creates special main file for bundle build.
     */
    Gulpfile.prototype.bundleCopyMainFile = function () {
        return gulp.src("./package.json", { read: false })
            .pipe(file("class-transformer.ts", "export * from \"./class-transformer/index\";"))
            .pipe(gulp.dest("./build/bundle"));
    };
    /**
     * Uglifys bundles.
     */
    Gulpfile.prototype.uglify = function () {
        return [
            gulp.src("./build/package/class-transformer.pure.amd.js")
                .pipe(uglify())
                .pipe(rename("class-transformer.pure.amd.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/class-transformer.pure.system.js")
                .pipe(uglify())
                .pipe(rename("class-transformer.pure.system.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/class-transformer.amd.js")
                .pipe(uglify())
                .pipe(rename("class-transformer.amd.min.js"))
                .pipe(gulp.dest("./build/package")),
            gulp.src("./build/package/class-transformer.system.js")
                .pipe(uglify())
                .pipe(rename("class-transformer.system.min.js"))
                .pipe(gulp.dest("./build/package")),
        ];
    };
    // -------------------------------------------------------------------------
    // Packaging and Publishing tasks
    // -------------------------------------------------------------------------
    /**
     * Publishes a package to npm from ./build/package directory.
     */
    Gulpfile.prototype.npmPublish = function () {
        return gulp.src("*.js", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish"
        ]));
    };
    /**
     * Copies all sources to the package directory.
     */
    Gulpfile.prototype.packageCompile = function () {
        var tsProject = ts.createProject("tsconfig.json");
        var tsResult = gulp.src(["./src/**/*.ts", "./typings/**/*.ts"])
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        return [
            tsResult.dts.pipe(gulp.dest("./build/package")),
            tsResult.js
                .pipe(sourcemaps.write(".", { sourceRoot: "", includeContent: true }))
                .pipe(gulp.dest("./build/package"))
        ];
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageMoveCompiledFiles = function () {
        return gulp.src("./build/package/src/**/*")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Moves all compiled files to the final package directory.
     */
    Gulpfile.prototype.packageClearCompileDirectory = function (cb) {
        return del([
            "./build/package/src/**"
        ], cb);
    };
    /**
     * Change the "private" state of the packaged package.json file to public.
     */
    Gulpfile.prototype.packagePreparePackageFile = function () {
        return gulp.src("./package.json")
            .pipe(replace("\"private\": true,", "\"private\": false,"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will replace all typescript code blocks in the README (since npm does not support typescript syntax
     * highlighting) and copy this README file into the package folder.
     */
    Gulpfile.prototype.packageReadmeFile = function () {
        return gulp.src("./README.md")
            .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Creates a package that can be published to npm.
     */
    Gulpfile.prototype.package = function () {
        return [
            "clean",
            ["bundleCopySources", "bundleCopyMainFile"],
            ["compile", "compileBundles"],
            ["uglify"],
            "packageCompile",
            "packageMoveCompiledFiles",
            "packageClearCompileDirectory",
            ["packagePreparePackageFile", "packageReadmeFile"]
        ];
    };
    /**
     * Creates a package and publishes it to npm.
     */
    Gulpfile.prototype.publish = function () {
        return ["package", "npmPublish"];
    };
    // -------------------------------------------------------------------------
    // Run tests tasks
    // -------------------------------------------------------------------------
    /**
     * Runs ts linting to validate source code.
     */
    Gulpfile.prototype.tslint = function () {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
    };
    /**
     * Runs before test coverage, required step to perform a test coverage.
     */
    Gulpfile.prototype.coveragePre = function () {
        return gulp.src(["./build/es5/src/**/*.js"])
            .pipe(istanbul())
            .pipe(istanbul.hookRequire());
    };
    /**
     * Runs post coverage operations.
     */
    Gulpfile.prototype.coveragePost = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        chai.use(require("chai-as-promised"));
        return gulp.src(["./build/es5/test/functional/**/*.js"])
            .pipe(mocha())
            .pipe(istanbul.writeReports());
    };
    Gulpfile.prototype.coverageRemap = function () {
        return gulp.src("./coverage/coverage-final.json")
            .pipe(remapIstanbul())
            .pipe(gulp.dest("./coverage"));
    };
    /**
     * Compiles the code and runs tests.
     */
    Gulpfile.prototype.tests = function () {
        return ["compile", "coveragePost", "coverageRemap", "tslint"];
    };
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "clean", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "compile", null);
    __decorate([
        gulpclass_1.MergedTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "compileBundles", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "bundleCopySources", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "bundleCopyMainFile", null);
    __decorate([
        gulpclass_1.MergedTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "uglify", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "npmPublish", null);
    __decorate([
        gulpclass_1.MergedTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageCompile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageMoveCompiledFiles", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageClearCompileDirectory", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packagePreparePackageFile", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "packageReadmeFile", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "package", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "publish", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "tslint", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coveragePre", null);
    __decorate([
        gulpclass_1.Task("coveragePost", ["coveragePre"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coveragePost", null);
    __decorate([
        gulpclass_1.Task(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "coverageRemap", null);
    __decorate([
        gulpclass_1.SequenceTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Gulpfile.prototype, "tests", null);
    Gulpfile = __decorate([
        gulpclass_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
//# sourceMappingURL=gulpfile.js.map