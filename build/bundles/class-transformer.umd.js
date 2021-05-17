(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ClassTransformer = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var _Reflect = createCommonjsModule(function (module, exports) {
	/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	Object.defineProperty(exports, "__esModule", { value: true });
	(function (Reflect) {
	    // Metadata Proposal
	    // https://rbuckton.github.io/reflect-metadata/
	    (function (factory) {
	        var root = typeof commonjsGlobal === "object" ? commonjsGlobal :
	            typeof self === "object" ? self :
	                typeof this === "object" ? this :
	                    Function("return this;")();
	        var exporter = makeExporter(Reflect);
	        if (typeof root.Reflect === "undefined") {
	            root.Reflect = Reflect;
	        }
	        else {
	            exporter = makeExporter(root.Reflect, exporter);
	        }
	        factory(exporter);
	        function makeExporter(target, previous) {
	            return function (key, value) {
	                if (typeof target[key] !== "function") {
	                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
	                }
	                if (previous)
	                    previous(key, value);
	            };
	        }
	    })(function (exporter) {
	        var hasOwn = Object.prototype.hasOwnProperty;
	        // feature test for Symbol support
	        var supportsSymbol = typeof Symbol === "function";
	        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
	        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
	        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
	        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
	        var downLevel = !supportsCreate && !supportsProto;
	        var HashMap = {
	            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	            create: supportsCreate
	                ? function () { return MakeDictionary(Object.create(null)); }
	                : supportsProto
	                    ? function () { return MakeDictionary({ __proto__: null }); }
	                    : function () { return MakeDictionary({}); },
	            has: downLevel
	                ? function (map, key) { return hasOwn.call(map, key); }
	                : function (map, key) { return key in map; },
	            get: downLevel
	                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	                : function (map, key) { return map[key]; },
	        };
	        // Load global or shim versions of Map, Set, and WeakMap
	        var functionPrototype = Object.getPrototypeOf(Function);
	        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
	        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
	        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
	        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	        // [[Metadata]] internal slot
	        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
	        var Metadata = new _WeakMap();
	        /**
	         * Applies a set of decorators to a property of a target object.
	         * @param decorators An array of decorators.
	         * @param target The target object.
	         * @param propertyKey (Optional) The property key to decorate.
	         * @param attributes (Optional) The property descriptor for the target key.
	         * @remarks Decorators are applied in reverse order.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Example = Reflect.decorate(decoratorsArray, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Object.defineProperty(Example, "staticMethod",
	         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	         *
	         *     // method (on prototype)
	         *     Object.defineProperty(Example.prototype, "method",
	         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	         *
	         */
	        function decorate(decorators, target, propertyKey, attributes) {
	            if (!IsUndefined(propertyKey)) {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
	                    throw new TypeError();
	                if (IsNull(attributes))
	                    attributes = undefined;
	                propertyKey = ToPropertyKey(propertyKey);
	                return DecorateProperty(decorators, target, propertyKey, attributes);
	            }
	            else {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                return DecorateConstructor(decorators, target);
	            }
	        }
	        exporter("decorate", decorate);
	        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
	        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
	        /**
	         * A default metadata decorator factory that can be used on a class, class member, or parameter.
	         * @param metadataKey The key for the metadata entry.
	         * @param metadataValue The value for the metadata entry.
	         * @returns A decorator function.
	         * @remarks
	         * If `metadataKey` is already defined for the target and target key, the
	         * metadataValue for that key will be overwritten.
	         * @example
	         *
	         *     // constructor
	         *     @Reflect.metadata(key, value)
	         *     class Example {
	         *     }
	         *
	         *     // property (on constructor, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticProperty;
	         *     }
	         *
	         *     // property (on prototype, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         property;
	         *     }
	         *
	         *     // method (on constructor)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticMethod() { }
	         *     }
	         *
	         *     // method (on prototype)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         method() { }
	         *     }
	         *
	         */
	        function metadata(metadataKey, metadataValue) {
	            function decorator(target, propertyKey) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	            }
	            return decorator;
	        }
	        exporter("metadata", metadata);
	        /**
	         * Define a unique metadata entry on the target.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param metadataValue A value that contains attached metadata.
	         * @param target The target object on which to define metadata.
	         * @param propertyKey (Optional) The property key for the target.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Reflect.defineMetadata("custom:annotation", options, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	         *
	         *     // decorator factory as metadata-producing annotation.
	         *     function MyAnnotation(options): Decorator {
	         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	         *     }
	         *
	         */
	        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	        }
	        exporter("defineMetadata", defineMetadata);
	        /**
	         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasMetadata", hasMetadata);
	        /**
	         * Gets a value indicating whether the target object has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasOwnMetadata", hasOwnMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getMetadata", getMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getOwnMetadata", getOwnMetadata);
	        /**
	         * Gets the metadata keys defined on the target object or its prototype chain.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryMetadataKeys(target, propertyKey);
	        }
	        exporter("getMetadataKeys", getMetadataKeys);
	        /**
	         * Gets the unique metadata keys defined on the target object.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getOwnMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryOwnMetadataKeys(target, propertyKey);
	        }
	        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
	        /**
	         * Deletes the metadata entry from the target object with the provided key.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.deleteMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function deleteMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            if (!metadataMap.delete(metadataKey))
	                return false;
	            if (metadataMap.size > 0)
	                return true;
	            var targetMetadata = Metadata.get(target);
	            targetMetadata.delete(propertyKey);
	            if (targetMetadata.size > 0)
	                return true;
	            Metadata.delete(target);
	            return true;
	        }
	        exporter("deleteMetadata", deleteMetadata);
	        function DecorateConstructor(decorators, target) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsConstructor(decorated))
	                        throw new TypeError();
	                    target = decorated;
	                }
	            }
	            return target;
	        }
	        function DecorateProperty(decorators, target, propertyKey, descriptor) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target, propertyKey, descriptor);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsObject(decorated))
	                        throw new TypeError();
	                    descriptor = decorated;
	                }
	            }
	            return descriptor;
	        }
	        function GetOrCreateMetadataMap(O, P, Create) {
	            var targetMetadata = Metadata.get(O);
	            if (IsUndefined(targetMetadata)) {
	                if (!Create)
	                    return undefined;
	                targetMetadata = new _Map();
	                Metadata.set(O, targetMetadata);
	            }
	            var metadataMap = targetMetadata.get(P);
	            if (IsUndefined(metadataMap)) {
	                if (!Create)
	                    return undefined;
	                metadataMap = new _Map();
	                targetMetadata.set(P, metadataMap);
	            }
	            return metadataMap;
	        }
	        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
	        function OrdinaryHasMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return true;
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryHasMetadata(MetadataKey, parent, P);
	            return false;
	        }
	        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
	        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            return ToBoolean(metadataMap.has(MetadataKey));
	        }
	        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
	        function OrdinaryGetMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryGetMetadata(MetadataKey, parent, P);
	            return undefined;
	        }
	        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
	        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return undefined;
	            return metadataMap.get(MetadataKey);
	        }
	        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
	        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
	            metadataMap.set(MetadataKey, MetadataValue);
	        }
	        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
	        function OrdinaryMetadataKeys(O, P) {
	            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (parent === null)
	                return ownKeys;
	            var parentKeys = OrdinaryMetadataKeys(parent, P);
	            if (parentKeys.length <= 0)
	                return ownKeys;
	            if (ownKeys.length <= 0)
	                return parentKeys;
	            var set = new _Set();
	            var keys = [];
	            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	                var key = ownKeys_1[_i];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	                var key = parentKeys_1[_a];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            return keys;
	        }
	        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
	        function OrdinaryOwnMetadataKeys(O, P) {
	            var keys = [];
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return keys;
	            var keysObj = metadataMap.keys();
	            var iterator = GetIterator(keysObj);
	            var k = 0;
	            while (true) {
	                var next = IteratorStep(iterator);
	                if (!next) {
	                    keys.length = k;
	                    return keys;
	                }
	                var nextValue = IteratorValue(next);
	                try {
	                    keys[k] = nextValue;
	                }
	                catch (e) {
	                    try {
	                        IteratorClose(iterator);
	                    }
	                    finally {
	                        throw e;
	                    }
	                }
	                k++;
	            }
	        }
	        // 6 ECMAScript Data Typ0es and Values
	        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
	        function Type(x) {
	            if (x === null)
	                return 1 /* Null */;
	            switch (typeof x) {
	                case "undefined": return 0 /* Undefined */;
	                case "boolean": return 2 /* Boolean */;
	                case "string": return 3 /* String */;
	                case "symbol": return 4 /* Symbol */;
	                case "number": return 5 /* Number */;
	                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
	                default: return 6 /* Object */;
	            }
	        }
	        // 6.1.1 The Undefined Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
	        function IsUndefined(x) {
	            return x === undefined;
	        }
	        // 6.1.2 The Null Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
	        function IsNull(x) {
	            return x === null;
	        }
	        // 6.1.5 The Symbol Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
	        function IsSymbol(x) {
	            return typeof x === "symbol";
	        }
	        // 6.1.7 The Object Type
	        // https://tc39.github.io/ecma262/#sec-object-type
	        function IsObject(x) {
	            return typeof x === "object" ? x !== null : typeof x === "function";
	        }
	        // 7.1 Type Conversion
	        // https://tc39.github.io/ecma262/#sec-type-conversion
	        // 7.1.1 ToPrimitive(input [, PreferredType])
	        // https://tc39.github.io/ecma262/#sec-toprimitive
	        function ToPrimitive(input, PreferredType) {
	            switch (Type(input)) {
	                case 0 /* Undefined */: return input;
	                case 1 /* Null */: return input;
	                case 2 /* Boolean */: return input;
	                case 3 /* String */: return input;
	                case 4 /* Symbol */: return input;
	                case 5 /* Number */: return input;
	            }
	            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
	            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
	            if (exoticToPrim !== undefined) {
	                var result = exoticToPrim.call(input, hint);
	                if (IsObject(result))
	                    throw new TypeError();
	                return result;
	            }
	            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
	        }
	        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
	        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
	        function OrdinaryToPrimitive(O, hint) {
	            if (hint === "string") {
	                var toString_1 = O.toString;
	                if (IsCallable(toString_1)) {
	                    var result = toString_1.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            else {
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var toString_2 = O.toString;
	                if (IsCallable(toString_2)) {
	                    var result = toString_2.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            throw new TypeError();
	        }
	        // 7.1.2 ToBoolean(argument)
	        // https://tc39.github.io/ecma262/2016/#sec-toboolean
	        function ToBoolean(argument) {
	            return !!argument;
	        }
	        // 7.1.12 ToString(argument)
	        // https://tc39.github.io/ecma262/#sec-tostring
	        function ToString(argument) {
	            return "" + argument;
	        }
	        // 7.1.14 ToPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-topropertykey
	        function ToPropertyKey(argument) {
	            var key = ToPrimitive(argument, 3 /* String */);
	            if (IsSymbol(key))
	                return key;
	            return ToString(key);
	        }
	        // 7.2 Testing and Comparison Operations
	        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
	        // 7.2.2 IsArray(argument)
	        // https://tc39.github.io/ecma262/#sec-isarray
	        function IsArray(argument) {
	            return Array.isArray
	                ? Array.isArray(argument)
	                : argument instanceof Object
	                    ? argument instanceof Array
	                    : Object.prototype.toString.call(argument) === "[object Array]";
	        }
	        // 7.2.3 IsCallable(argument)
	        // https://tc39.github.io/ecma262/#sec-iscallable
	        function IsCallable(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.4 IsConstructor(argument)
	        // https://tc39.github.io/ecma262/#sec-isconstructor
	        function IsConstructor(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.7 IsPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-ispropertykey
	        function IsPropertyKey(argument) {
	            switch (Type(argument)) {
	                case 3 /* String */: return true;
	                case 4 /* Symbol */: return true;
	                default: return false;
	            }
	        }
	        // 7.3 Operations on Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-objects
	        // 7.3.9 GetMethod(V, P)
	        // https://tc39.github.io/ecma262/#sec-getmethod
	        function GetMethod(V, P) {
	            var func = V[P];
	            if (func === undefined || func === null)
	                return undefined;
	            if (!IsCallable(func))
	                throw new TypeError();
	            return func;
	        }
	        // 7.4 Operations on Iterator Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
	        function GetIterator(obj) {
	            var method = GetMethod(obj, iteratorSymbol);
	            if (!IsCallable(method))
	                throw new TypeError(); // from Call
	            var iterator = method.call(obj);
	            if (!IsObject(iterator))
	                throw new TypeError();
	            return iterator;
	        }
	        // 7.4.4 IteratorValue(iterResult)
	        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
	        function IteratorValue(iterResult) {
	            return iterResult.value;
	        }
	        // 7.4.5 IteratorStep(iterator)
	        // https://tc39.github.io/ecma262/#sec-iteratorstep
	        function IteratorStep(iterator) {
	            var result = iterator.next();
	            return result.done ? false : result;
	        }
	        // 7.4.6 IteratorClose(iterator, completion)
	        // https://tc39.github.io/ecma262/#sec-iteratorclose
	        function IteratorClose(iterator) {
	            var f = iterator["return"];
	            if (f)
	                f.call(iterator);
	        }
	        // 9.1 Ordinary Object Internal Methods and Internal Slots
	        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
	        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
	        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
	        function OrdinaryGetPrototypeOf(O) {
	            var proto = Object.getPrototypeOf(O);
	            if (typeof O !== "function" || O === functionPrototype)
	                return proto;
	            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	            // Try to determine the superclass constructor. Compatible implementations
	            // must either set __proto__ on a subclass constructor to the superclass constructor,
	            // or ensure each class has a valid `constructor` property on its prototype that
	            // points back to the constructor.
	            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	            // This is the case when in ES6 or when using __proto__ in a compatible browser.
	            if (proto !== functionPrototype)
	                return proto;
	            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	            var prototype = O.prototype;
	            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	            if (prototypeProto == null || prototypeProto === Object.prototype)
	                return proto;
	            // If the constructor was not a function, then we cannot determine the heritage.
	            var constructor = prototypeProto.constructor;
	            if (typeof constructor !== "function")
	                return proto;
	            // If we have some kind of self-reference, then we cannot determine the heritage.
	            if (constructor === O)
	                return proto;
	            // we have a pretty good guess at the heritage.
	            return constructor;
	        }
	        // naive Map shim
	        function CreateMapPolyfill() {
	            var cacheSentinel = {};
	            var arraySentinel = [];
	            var MapIterator = /** @class */ (function () {
	                function MapIterator(keys, values, selector) {
	                    this._index = 0;
	                    this._keys = keys;
	                    this._values = values;
	                    this._selector = selector;
	                }
	                MapIterator.prototype["@@iterator"] = function () { return this; };
	                MapIterator.prototype[iteratorSymbol] = function () { return this; };
	                MapIterator.prototype.next = function () {
	                    var index = this._index;
	                    if (index >= 0 && index < this._keys.length) {
	                        var result = this._selector(this._keys[index], this._values[index]);
	                        if (index + 1 >= this._keys.length) {
	                            this._index = -1;
	                            this._keys = arraySentinel;
	                            this._values = arraySentinel;
	                        }
	                        else {
	                            this._index++;
	                        }
	                        return { value: result, done: false };
	                    }
	                    return { value: undefined, done: true };
	                };
	                MapIterator.prototype.throw = function (error) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    throw error;
	                };
	                MapIterator.prototype.return = function (value) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    return { value: value, done: true };
	                };
	                return MapIterator;
	            }());
	            return /** @class */ (function () {
	                function Map() {
	                    this._keys = [];
	                    this._values = [];
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                }
	                Object.defineProperty(Map.prototype, "size", {
	                    get: function () { return this._keys.length; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	                Map.prototype.get = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    return index >= 0 ? this._values[index] : undefined;
	                };
	                Map.prototype.set = function (key, value) {
	                    var index = this._find(key, /*insert*/ true);
	                    this._values[index] = value;
	                    return this;
	                };
	                Map.prototype.delete = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    if (index >= 0) {
	                        var size = this._keys.length;
	                        for (var i = index + 1; i < size; i++) {
	                            this._keys[i - 1] = this._keys[i];
	                            this._values[i - 1] = this._values[i];
	                        }
	                        this._keys.length--;
	                        this._values.length--;
	                        if (key === this._cacheKey) {
	                            this._cacheKey = cacheSentinel;
	                            this._cacheIndex = -2;
	                        }
	                        return true;
	                    }
	                    return false;
	                };
	                Map.prototype.clear = function () {
	                    this._keys.length = 0;
	                    this._values.length = 0;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                };
	                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
	                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
	                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
	                Map.prototype["@@iterator"] = function () { return this.entries(); };
	                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
	                Map.prototype._find = function (key, insert) {
	                    if (this._cacheKey !== key) {
	                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
	                    }
	                    if (this._cacheIndex < 0 && insert) {
	                        this._cacheIndex = this._keys.length;
	                        this._keys.push(key);
	                        this._values.push(undefined);
	                    }
	                    return this._cacheIndex;
	                };
	                return Map;
	            }());
	            function getKey(key, _) {
	                return key;
	            }
	            function getValue(_, value) {
	                return value;
	            }
	            function getEntry(key, value) {
	                return [key, value];
	            }
	        }
	        // naive Set shim
	        function CreateSetPolyfill() {
	            return /** @class */ (function () {
	                function Set() {
	                    this._map = new _Map();
	                }
	                Object.defineProperty(Set.prototype, "size", {
	                    get: function () { return this._map.size; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Set.prototype.has = function (value) { return this._map.has(value); };
	                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	                Set.prototype.delete = function (value) { return this._map.delete(value); };
	                Set.prototype.clear = function () { this._map.clear(); };
	                Set.prototype.keys = function () { return this._map.keys(); };
	                Set.prototype.values = function () { return this._map.values(); };
	                Set.prototype.entries = function () { return this._map.entries(); };
	                Set.prototype["@@iterator"] = function () { return this.keys(); };
	                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
	                return Set;
	            }());
	        }
	        // naive WeakMap shim
	        function CreateWeakMapPolyfill() {
	            var UUID_SIZE = 16;
	            var keys = HashMap.create();
	            var rootKey = CreateUniqueKey();
	            return /** @class */ (function () {
	                function WeakMap() {
	                    this._key = CreateUniqueKey();
	                }
	                WeakMap.prototype.has = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.has(table, this._key) : false;
	                };
	                WeakMap.prototype.get = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
	                };
	                WeakMap.prototype.set = function (target, value) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                    table[this._key] = value;
	                    return this;
	                };
	                WeakMap.prototype.delete = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? delete table[this._key] : false;
	                };
	                WeakMap.prototype.clear = function () {
	                    // NOTE: not a real clear, just makes the previous data unreachable
	                    this._key = CreateUniqueKey();
	                };
	                return WeakMap;
	            }());
	            function CreateUniqueKey() {
	                var key;
	                do
	                    key = "@@WeakMap@@" + CreateUUID();
	                while (HashMap.has(keys, key));
	                keys[key] = true;
	                return key;
	            }
	            function GetOrCreateWeakMapTable(target, create) {
	                if (!hasOwn.call(target, rootKey)) {
	                    if (!create)
	                        return undefined;
	                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
	                }
	                return target[rootKey];
	            }
	            function FillRandomBytes(buffer, size) {
	                for (var i = 0; i < size; ++i)
	                    buffer[i] = Math.random() * 0xff | 0;
	                return buffer;
	            }
	            function GenRandomBytes(size) {
	                if (typeof Uint8Array === "function") {
	                    if (typeof crypto !== "undefined")
	                        return crypto.getRandomValues(new Uint8Array(size));
	                    if (typeof msCrypto !== "undefined")
	                        return msCrypto.getRandomValues(new Uint8Array(size));
	                    return FillRandomBytes(new Uint8Array(size), size);
	                }
	                return FillRandomBytes(new Array(size), size);
	            }
	            function CreateUUID() {
	                var data = GenRandomBytes(UUID_SIZE);
	                // mark as random - RFC 4122 § 4.4
	                data[6] = data[6] & 0x4f | 0x40;
	                data[8] = data[8] & 0xbf | 0x80;
	                var result = "";
	                for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                    var byte = data[offset];
	                    if (offset === 4 || offset === 6 || offset === 8)
	                        result += "-";
	                    if (byte < 16)
	                        result += "0";
	                    result += byte.toString(16).toLowerCase();
	                }
	                return result;
	            }
	        }
	        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	        function MakeDictionary(obj) {
	            obj.__ = undefined;
	            delete obj.__;
	            return obj;
	        }
	    });
	})(exports.Reflect || (exports.Reflect = {}));

	});

	exports.TransformationType = void 0;
	(function (TransformationType) {
	    TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
	    TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
	    TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
	})(exports.TransformationType || (exports.TransformationType = {}));

	/**
	 * Storage all library metadata.
	 */
	var MetadataStorage = /** @class */ (function () {
	    function MetadataStorage() {
	        // -------------------------------------------------------------------------
	        // Properties
	        // -------------------------------------------------------------------------
	        this._typeMetadatas = new Map();
	        this._transformMetadatas = new Map();
	        this._exposeMetadatas = new Map();
	        this._excludeMetadatas = new Map();
	        this._ancestorsMap = new Map();
	    }
	    // -------------------------------------------------------------------------
	    // Adder Methods
	    // -------------------------------------------------------------------------
	    MetadataStorage.prototype.addTypeMetadata = function (metadata) {
	        if (!this._typeMetadatas.has(metadata.target)) {
	            this._typeMetadatas.set(metadata.target, new Map());
	        }
	        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
	    };
	    MetadataStorage.prototype.addTransformMetadata = function (metadata) {
	        if (!this._transformMetadatas.has(metadata.target)) {
	            this._transformMetadatas.set(metadata.target, new Map());
	        }
	        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
	            this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
	        }
	        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
	    };
	    MetadataStorage.prototype.addExposeMetadata = function (metadata) {
	        if (!this._exposeMetadatas.has(metadata.target)) {
	            this._exposeMetadatas.set(metadata.target, new Map());
	        }
	        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
	    };
	    MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
	        if (!this._excludeMetadatas.has(metadata.target)) {
	            this._excludeMetadatas.set(metadata.target, new Map());
	        }
	        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
	    };
	    // -------------------------------------------------------------------------
	    // Public Methods
	    // -------------------------------------------------------------------------
	    MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
	        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function (metadata) {
	            if (!metadata.options)
	                return true;
	            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
	                return true;
	            if (metadata.options.toClassOnly === true) {
	                return (transformationType === exports.TransformationType.CLASS_TO_CLASS ||
	                    transformationType === exports.TransformationType.PLAIN_TO_CLASS);
	            }
	            if (metadata.options.toPlainOnly === true) {
	                return transformationType === exports.TransformationType.CLASS_TO_PLAIN;
	            }
	            return true;
	        });
	    };
	    MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
	        return this.findMetadata(this._excludeMetadatas, target, propertyName);
	    };
	    MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
	        return this.findMetadata(this._exposeMetadatas, target, propertyName);
	    };
	    MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
	        return this.getExposedMetadatas(target).find(function (metadata) {
	            return metadata.options && metadata.options.name === name;
	        });
	    };
	    MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
	        return this.findMetadata(this._typeMetadatas, target, propertyName);
	    };
	    MetadataStorage.prototype.getStrategy = function (target) {
	        var excludeMap = this._excludeMetadatas.get(target);
	        var exclude = excludeMap && excludeMap.get(undefined);
	        var exposeMap = this._exposeMetadatas.get(target);
	        var expose = exposeMap && exposeMap.get(undefined);
	        if ((exclude && expose) || (!exclude && !expose))
	            return 'none';
	        return exclude ? 'excludeAll' : 'exposeAll';
	    };
	    MetadataStorage.prototype.getExposedMetadatas = function (target) {
	        return this.getMetadata(this._exposeMetadatas, target);
	    };
	    MetadataStorage.prototype.getExcludedMetadatas = function (target) {
	        return this.getMetadata(this._excludeMetadatas, target);
	    };
	    MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
	        return this.getExposedMetadatas(target)
	            .filter(function (metadata) {
	            if (!metadata.options)
	                return true;
	            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
	                return true;
	            if (metadata.options.toClassOnly === true) {
	                return (transformationType === exports.TransformationType.CLASS_TO_CLASS ||
	                    transformationType === exports.TransformationType.PLAIN_TO_CLASS);
	            }
	            if (metadata.options.toPlainOnly === true) {
	                return transformationType === exports.TransformationType.CLASS_TO_PLAIN;
	            }
	            return true;
	        })
	            .map(function (metadata) { return metadata.propertyName; });
	    };
	    MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
	        return this.getExcludedMetadatas(target)
	            .filter(function (metadata) {
	            if (!metadata.options)
	                return true;
	            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
	                return true;
	            if (metadata.options.toClassOnly === true) {
	                return (transformationType === exports.TransformationType.CLASS_TO_CLASS ||
	                    transformationType === exports.TransformationType.PLAIN_TO_CLASS);
	            }
	            if (metadata.options.toPlainOnly === true) {
	                return transformationType === exports.TransformationType.CLASS_TO_PLAIN;
	            }
	            return true;
	        })
	            .map(function (metadata) { return metadata.propertyName; });
	    };
	    MetadataStorage.prototype.clear = function () {
	        this._typeMetadatas.clear();
	        this._exposeMetadatas.clear();
	        this._excludeMetadatas.clear();
	        this._ancestorsMap.clear();
	    };
	    // -------------------------------------------------------------------------
	    // Private Methods
	    // -------------------------------------------------------------------------
	    MetadataStorage.prototype.getMetadata = function (metadatas, target) {
	        var metadataFromTargetMap = metadatas.get(target);
	        var metadataFromTarget;
	        if (metadataFromTargetMap) {
	            metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
	        }
	        var metadataFromAncestors = [];
	        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
	            var ancestor = _a[_i];
	            var ancestorMetadataMap = metadatas.get(ancestor);
	            if (ancestorMetadataMap) {
	                var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
	                metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
	            }
	        }
	        return metadataFromAncestors.concat(metadataFromTarget || []);
	    };
	    MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
	        var metadataFromTargetMap = metadatas.get(target);
	        if (metadataFromTargetMap) {
	            var metadataFromTarget = metadataFromTargetMap.get(propertyName);
	            if (metadataFromTarget) {
	                return metadataFromTarget;
	            }
	        }
	        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
	            var ancestor = _a[_i];
	            var ancestorMetadataMap = metadatas.get(ancestor);
	            if (ancestorMetadataMap) {
	                var ancestorResult = ancestorMetadataMap.get(propertyName);
	                if (ancestorResult) {
	                    return ancestorResult;
	                }
	            }
	        }
	        return undefined;
	    };
	    MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
	        var metadataFromTargetMap = metadatas.get(target);
	        var metadataFromTarget;
	        if (metadataFromTargetMap) {
	            metadataFromTarget = metadataFromTargetMap.get(propertyName);
	        }
	        var metadataFromAncestorsTarget = [];
	        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
	            var ancestor = _a[_i];
	            var ancestorMetadataMap = metadatas.get(ancestor);
	            if (ancestorMetadataMap) {
	                if (ancestorMetadataMap.has(propertyName)) {
	                    metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
	                }
	            }
	        }
	        return metadataFromAncestorsTarget
	            .slice()
	            .reverse()
	            .concat((metadataFromTarget || []).slice().reverse());
	    };
	    MetadataStorage.prototype.getAncestors = function (target) {
	        if (!target)
	            return [];
	        if (!this._ancestorsMap.has(target)) {
	            var ancestors = [];
	            for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== 'undefined'; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
	                ancestors.push(baseClass);
	            }
	            this._ancestorsMap.set(target, ancestors);
	        }
	        return this._ancestorsMap.get(target);
	    };
	    return MetadataStorage;
	}());

	/**
	 * Default metadata storage is used as singleton and can be used to storage all metadatas.
	 */
	var defaultMetadataStorage = new MetadataStorage();

	/**
	 * This function returns the global object across Node and browsers.
	 *
	 * Note: `globalThis` is the standardized approach however it has been added to
	 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
	 */
	function getGlobal() {
	    if (typeof globalThis !== 'undefined') {
	        return globalThis;
	    }
	    if (typeof global !== 'undefined') {
	        return global;
	    }
	    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	    // @ts-ignore: Cannot find name 'window'.
	    if (typeof window !== 'undefined') {
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore: Cannot find name 'window'.
	        return window;
	    }
	    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	    // @ts-ignore: Cannot find name 'self'.
	    if (typeof self !== 'undefined') {
	        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore: Cannot find name 'self'.
	        return self;
	    }
	}

	function isPromise(p) {
	    return p !== null && typeof p === 'object' && typeof p.then === 'function';
	}

	function instantiateArrayType(arrayType) {
	    var array = new arrayType();
	    if (!(array instanceof Set) && !('push' in array)) {
	        return [];
	    }
	    return array;
	}
	var TransformOperationExecutor = /** @class */ (function () {
	    // -------------------------------------------------------------------------
	    // Constructor
	    // -------------------------------------------------------------------------
	    function TransformOperationExecutor(transformationType, options) {
	        this.transformationType = transformationType;
	        this.options = options;
	        // -------------------------------------------------------------------------
	        // Private Properties
	        // -------------------------------------------------------------------------
	        this.recursionStack = new Set();
	    }
	    // -------------------------------------------------------------------------
	    // Public Methods
	    // -------------------------------------------------------------------------
	    TransformOperationExecutor.prototype.transform = function (source, value, targetType, arrayType, isMap, level) {
	        var _this = this;
	        if (level === void 0) { level = 0; }
	        if (Array.isArray(value) || value instanceof Set) {
	            var newValue_1 = arrayType && this.transformationType === exports.TransformationType.PLAIN_TO_CLASS
	                ? instantiateArrayType(arrayType)
	                : [];
	            value.forEach(function (subValue, index) {
	                var subSource = source ? source[index] : undefined;
	                if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
	                    var realTargetType = void 0;
	                    if (typeof targetType !== 'function' &&
	                        targetType &&
	                        targetType.options &&
	                        targetType.options.discriminator &&
	                        targetType.options.discriminator.property &&
	                        targetType.options.discriminator.subTypes) {
	                        if (_this.transformationType === exports.TransformationType.PLAIN_TO_CLASS) {
	                            realTargetType = targetType.options.discriminator.subTypes.find(function (subType) {
	                                return subType.name === subValue[targetType.options.discriminator.property];
	                            });
	                            var options = { newObject: newValue_1, object: subValue, property: undefined };
	                            var newType = targetType.typeFunction(options);
	                            realTargetType === undefined ? (realTargetType = newType) : (realTargetType = realTargetType.value);
	                            if (!targetType.options.keepDiscriminatorProperty)
	                                delete subValue[targetType.options.discriminator.property];
	                        }
	                        if (_this.transformationType === exports.TransformationType.CLASS_TO_CLASS) {
	                            realTargetType = subValue.constructor;
	                        }
	                        if (_this.transformationType === exports.TransformationType.CLASS_TO_PLAIN) {
	                            subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
	                        }
	                    }
	                    else {
	                        realTargetType = targetType;
	                    }
	                    var value_1 = _this.transform(subSource, subValue, realTargetType, undefined, subValue instanceof Map, level + 1);
	                    if (newValue_1 instanceof Set) {
	                        newValue_1.add(value_1);
	                    }
	                    else {
	                        newValue_1.push(value_1);
	                    }
	                }
	                else if (_this.transformationType === exports.TransformationType.CLASS_TO_CLASS) {
	                    if (newValue_1 instanceof Set) {
	                        newValue_1.add(subValue);
	                    }
	                    else {
	                        newValue_1.push(subValue);
	                    }
	                }
	            });
	            return newValue_1;
	        }
	        else if (targetType === String && !isMap) {
	            if (value === null || value === undefined)
	                return value;
	            return String(value);
	        }
	        else if (targetType === Number && !isMap) {
	            if (value === null || value === undefined)
	                return value;
	            return Number(value);
	        }
	        else if (targetType === Boolean && !isMap) {
	            if (value === null || value === undefined)
	                return value;
	            return Boolean(value);
	        }
	        else if ((targetType === Date || value instanceof Date) && !isMap) {
	            if (value instanceof Date) {
	                return new Date(value.valueOf());
	            }
	            if (value === null || value === undefined)
	                return value;
	            return new Date(value);
	        }
	        else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
	            if (value === null || value === undefined)
	                return value;
	            return Buffer.from(value);
	        }
	        else if (isPromise(value) && !isMap) {
	            return new Promise(function (resolve, reject) {
	                value.then(function (data) { return resolve(_this.transform(undefined, data, targetType, undefined, undefined, level + 1)); }, reject);
	            });
	        }
	        else if (!isMap && value !== null && typeof value === 'object' && typeof value.then === 'function') {
	            // Note: We should not enter this, as promise has been handled above
	            // This option simply returns the Promise preventing a JS error from happening and should be an inaccessible path.
	            return value; // skip promise transformation
	        }
	        else if (typeof value === 'object' && value !== null) {
	            // try to guess the type
	            if (!targetType && value.constructor !== Object /* && TransformationType === TransformationType.CLASS_TO_PLAIN*/)
	                targetType = value.constructor;
	            if (!targetType && source)
	                targetType = source.constructor;
	            if (this.options.enableCircularCheck) {
	                // add transformed type to prevent circular references
	                this.recursionStack.add(value);
	            }
	            var keys = this.getKeys(targetType, value, isMap);
	            var newValue = source ? source : {};
	            if (!source &&
	                (this.transformationType === exports.TransformationType.PLAIN_TO_CLASS ||
	                    this.transformationType === exports.TransformationType.CLASS_TO_CLASS)) {
	                if (isMap) {
	                    newValue = new Map();
	                }
	                else if (targetType) {
	                    newValue = new targetType();
	                }
	                else {
	                    newValue = {};
	                }
	            }
	            var _loop_1 = function (key) {
	                if (key === '__proto__' || key === 'constructor') {
	                    return "continue";
	                }
	                var valueKey = key;
	                var newValueKey = key, propertyName = key;
	                if (!this_1.options.ignoreDecorators && targetType) {
	                    if (this_1.transformationType === exports.TransformationType.PLAIN_TO_CLASS) {
	                        var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
	                        if (exposeMetadata) {
	                            propertyName = exposeMetadata.propertyName;
	                            newValueKey = exposeMetadata.propertyName;
	                        }
	                    }
	                    else if (this_1.transformationType === exports.TransformationType.CLASS_TO_PLAIN ||
	                        this_1.transformationType === exports.TransformationType.CLASS_TO_CLASS) {
	                        var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key);
	                        if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
	                            newValueKey = exposeMetadata.options.name;
	                        }
	                    }
	                }
	                // get a subvalue
	                var subValue = undefined;
	                if (value instanceof Map) {
	                    subValue = value.get(valueKey);
	                }
	                else if (value[valueKey] instanceof Function) {
	                    subValue = value[valueKey]();
	                }
	                else {
	                    subValue = value[valueKey];
	                }
	                // determine a type
	                var type = undefined, isSubValueMap = subValue instanceof Map;
	                if (targetType && isMap) {
	                    type = targetType;
	                }
	                else if (targetType) {
	                    var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
	                    if (metadata_1) {
	                        var options = { newObject: newValue, object: value, property: propertyName };
	                        var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
	                        if (metadata_1.options &&
	                            metadata_1.options.discriminator &&
	                            metadata_1.options.discriminator.property &&
	                            metadata_1.options.discriminator.subTypes) {
	                            if (!(value[valueKey] instanceof Array)) {
	                                if (this_1.transformationType === exports.TransformationType.PLAIN_TO_CLASS) {
	                                    type = metadata_1.options.discriminator.subTypes.find(function (subType) {
	                                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
	                                            return subType.name === subValue[metadata_1.options.discriminator.property];
	                                        }
	                                    });
	                                    type === undefined ? (type = newType) : (type = type.value);
	                                    if (!metadata_1.options.keepDiscriminatorProperty) {
	                                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
	                                            delete subValue[metadata_1.options.discriminator.property];
	                                        }
	                                    }
	                                }
	                                if (this_1.transformationType === exports.TransformationType.CLASS_TO_CLASS) {
	                                    type = subValue.constructor;
	                                }
	                                if (this_1.transformationType === exports.TransformationType.CLASS_TO_PLAIN) {
	                                    subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
	                                }
	                            }
	                            else {
	                                type = metadata_1;
	                            }
	                        }
	                        else {
	                            type = newType;
	                        }
	                        isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
	                    }
	                    else if (this_1.options.targetMaps) {
	                        // try to find a type in target maps
	                        this_1.options.targetMaps
	                            .filter(function (map) { return map.target === targetType && !!map.properties[propertyName]; })
	                            .forEach(function (map) { return (type = map.properties[propertyName]); });
	                    }
	                    else if (this_1.options.enableImplicitConversion &&
	                        this_1.transformationType === exports.TransformationType.PLAIN_TO_CLASS) {
	                        // if we have no registererd type via the @Type() decorator then we check if we have any
	                        // type declarations in reflect-metadata (type declaration is emited only if some decorator is added to the property.)
	                        var reflectedType = _Reflect.Reflect.getMetadata('design:type', targetType.prototype, propertyName);
	                        if (reflectedType) {
	                            type = reflectedType;
	                        }
	                    }
	                }
	                // if value is an array try to get its custom array type
	                var arrayType_1 = Array.isArray(value[valueKey])
	                    ? this_1.getReflectedType(targetType, propertyName)
	                    : undefined;
	                // const subValueKey = TransformationType === TransformationType.PLAIN_TO_CLASS && newKeyName ? newKeyName : key;
	                var subSource = source ? source[valueKey] : undefined;
	                // if its deserialization then type if required
	                // if we uncomment this types like string[] will not work
	                // if (this.transformationType === TransformationType.PLAIN_TO_CLASS && !type && subValue instanceof Object && !(subValue instanceof Date))
	                //     throw new Error(`Cannot determine type for ${(targetType as any).name }.${propertyName}, did you forget to specify a @Type?`);
	                // if newValue is a source object that has method that match newKeyName then skip it
	                if (newValue.constructor.prototype) {
	                    var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
	                    if ((this_1.transformationType === exports.TransformationType.PLAIN_TO_CLASS ||
	                        this_1.transformationType === exports.TransformationType.CLASS_TO_CLASS) &&
	                        // eslint-disable-next-line @typescript-eslint/unbound-method
	                        ((descriptor && !descriptor.set) || newValue[newValueKey] instanceof Function))
	                        return "continue";
	                }
	                if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
	                    var transformKey = this_1.transformationType === exports.TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
	                    var finalValue = void 0;
	                    if (this_1.transformationType === exports.TransformationType.CLASS_TO_PLAIN) {
	                        // Get original value
	                        finalValue = value[transformKey];
	                        // Apply custom transformation
	                        finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
	                        // If nothing change, it means no custom transformation was applied, so use the subValue.
	                        finalValue = value[transformKey] === finalValue ? subValue : finalValue;
	                        // Apply the default transformation
	                        finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
	                    }
	                    else {
	                        if (subValue === undefined && this_1.options.exposeDefaultValues) {
	                            // Set default value if nothing provided
	                            finalValue = newValue[newValueKey];
	                        }
	                        else {
	                            finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
	                            finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
	                        }
	                    }
	                    if (finalValue !== undefined || this_1.options.exposeUnsetFields) {
	                        if (newValue instanceof Map) {
	                            newValue.set(newValueKey, finalValue);
	                        }
	                        else {
	                            newValue[newValueKey] = finalValue;
	                        }
	                    }
	                }
	                else if (this_1.transformationType === exports.TransformationType.CLASS_TO_CLASS) {
	                    var finalValue = subValue;
	                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, key, value, this_1.transformationType);
	                    if (finalValue !== undefined || this_1.options.exposeUnsetFields) {
	                        if (newValue instanceof Map) {
	                            newValue.set(newValueKey, finalValue);
	                        }
	                        else {
	                            newValue[newValueKey] = finalValue;
	                        }
	                    }
	                }
	            };
	            var this_1 = this;
	            // traverse over keys
	            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	                var key = keys_1[_i];
	                _loop_1(key);
	            }
	            if (this.options.enableCircularCheck) {
	                this.recursionStack.delete(value);
	            }
	            return newValue;
	        }
	        else {
	            return value;
	        }
	    };
	    TransformOperationExecutor.prototype.applyCustomTransformations = function (value, target, key, obj, transformationType) {
	        var _this = this;
	        var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
	        // apply versioning options
	        if (this.options.version !== undefined) {
	            metadatas = metadatas.filter(function (metadata) {
	                if (!metadata.options)
	                    return true;
	                return _this.checkVersion(metadata.options.since, metadata.options.until);
	            });
	        }
	        // apply grouping options
	        if (this.options.groups && this.options.groups.length) {
	            metadatas = metadatas.filter(function (metadata) {
	                if (!metadata.options)
	                    return true;
	                return _this.checkGroups(metadata.options.groups);
	            });
	        }
	        else {
	            metadatas = metadatas.filter(function (metadata) {
	                return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
	            });
	        }
	        metadatas.forEach(function (metadata) {
	            value = metadata.transformFn({ value: value, key: key, obj: obj, type: transformationType, options: _this.options });
	        });
	        return value;
	    };
	    // preventing circular references
	    TransformOperationExecutor.prototype.isCircular = function (object) {
	        return this.recursionStack.has(object);
	    };
	    TransformOperationExecutor.prototype.getReflectedType = function (target, propertyName) {
	        if (!target)
	            return undefined;
	        var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
	        return meta ? meta.reflectedType : undefined;
	    };
	    TransformOperationExecutor.prototype.getKeys = function (target, object, isMap) {
	        var _this = this;
	        // determine exclusion strategy
	        var strategy = defaultMetadataStorage.getStrategy(target);
	        if (strategy === 'none')
	            strategy = this.options.strategy || 'exposeAll'; // exposeAll is default strategy
	        // get all keys that need to expose
	        var keys = [];
	        if (strategy === 'exposeAll' || isMap) {
	            if (object instanceof Map) {
	                keys = Array.from(object.keys());
	            }
	            else {
	                keys = Object.keys(object);
	            }
	        }
	        if (isMap) {
	            // expose & exclude do not apply for map keys only to fields
	            return keys;
	        }
	        if (!this.options.ignoreDecorators && target) {
	            // add all exposed to list of keys
	            var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
	            if (this.transformationType === exports.TransformationType.PLAIN_TO_CLASS) {
	                exposedProperties = exposedProperties.map(function (key) {
	                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
	                    if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
	                        return exposeMetadata.options.name;
	                    }
	                    return key;
	                });
	            }
	            if (this.options.excludeExtraneousValues) {
	                keys = exposedProperties;
	            }
	            else {
	                keys = keys.concat(exposedProperties);
	            }
	            // exclude excluded properties
	            var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
	            if (excludedProperties_1.length > 0) {
	                keys = keys.filter(function (key) {
	                    return !excludedProperties_1.includes(key);
	                });
	            }
	            // apply versioning options
	            if (this.options.version !== undefined) {
	                keys = keys.filter(function (key) {
	                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
	                    if (!exposeMetadata || !exposeMetadata.options)
	                        return true;
	                    return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
	                });
	            }
	            // apply grouping options
	            if (this.options.groups && this.options.groups.length) {
	                keys = keys.filter(function (key) {
	                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
	                    if (!exposeMetadata || !exposeMetadata.options)
	                        return true;
	                    return _this.checkGroups(exposeMetadata.options.groups);
	                });
	            }
	            else {
	                keys = keys.filter(function (key) {
	                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
	                    return (!exposeMetadata ||
	                        !exposeMetadata.options ||
	                        !exposeMetadata.options.groups ||
	                        !exposeMetadata.options.groups.length);
	                });
	            }
	        }
	        // exclude prefixed properties
	        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
	            keys = keys.filter(function (key) {
	                return _this.options.excludePrefixes.every(function (prefix) {
	                    return key.substr(0, prefix.length) !== prefix;
	                });
	            });
	        }
	        // make sure we have unique keys
	        keys = keys.filter(function (key, index, self) {
	            return self.indexOf(key) === index;
	        });
	        return keys;
	    };
	    TransformOperationExecutor.prototype.checkVersion = function (since, until) {
	        var decision = true;
	        if (decision && since)
	            decision = this.options.version >= since;
	        if (decision && until)
	            decision = this.options.version < until;
	        return decision;
	    };
	    TransformOperationExecutor.prototype.checkGroups = function (groups) {
	        if (!groups)
	            return true;
	        return this.options.groups.some(function (optionGroup) { return groups.includes(optionGroup); });
	    };
	    return TransformOperationExecutor;
	}());

	/**
	 * These are the default options used by any transformation operation.
	 */
	var defaultOptions = {
	    enableCircularCheck: false,
	    enableImplicitConversion: false,
	    excludeExtraneousValues: false,
	    excludePrefixes: undefined,
	    exposeDefaultValues: false,
	    exposeUnsetFields: true,
	    groups: undefined,
	    ignoreDecorators: false,
	    strategy: undefined,
	    targetMaps: undefined,
	    version: undefined,
	};

	var __assign = (undefined && undefined.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var ClassTransformer = /** @class */ (function () {
	    function ClassTransformer() {
	    }
	    ClassTransformer.prototype.classToPlain = function (object, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.classToPlainFromExist = function (object, plainObject, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(plainObject, object, undefined, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.plainToClass = function (cls, plain, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(undefined, plain, cls, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.plainToClassFromExist = function (clsObject, plain, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(clsObject, plain, undefined, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.classToClass = function (object, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.classToClassFromExist = function (object, fromObject, options) {
	        var executor = new TransformOperationExecutor(exports.TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
	        return executor.transform(fromObject, object, undefined, undefined, undefined, undefined);
	    };
	    ClassTransformer.prototype.serialize = function (object, options) {
	        return JSON.stringify(this.classToPlain(object, options));
	    };
	    /**
	     * Deserializes given JSON string to a object of the given class.
	     */
	    ClassTransformer.prototype.deserialize = function (cls, json, options) {
	        var jsonObject = JSON.parse(json);
	        return this.plainToClass(cls, jsonObject, options);
	    };
	    /**
	     * Deserializes given JSON string to an array of objects of the given class.
	     */
	    ClassTransformer.prototype.deserializeArray = function (cls, json, options) {
	        var jsonObject = JSON.parse(json);
	        return this.plainToClass(cls, jsonObject, options);
	    };
	    return ClassTransformer;
	}());

	/**
	 * Marks the given class or property as excluded. By default the property is excluded in both
	 * constructorToPlain and plainToConstructor transformations. It can be limited to only one direction
	 * via using the `toPlainOnly` or `toClassOnly` option.
	 *
	 * Can be applied to class definitions and properties.
	 */
	function Exclude(options) {
	    if (options === void 0) { options = {}; }
	    /**
	     * NOTE: The `propertyName` property must be marked as optional because
	     * this decorator used both as a class and a property decorator and the
	     * Typescript compiler will freak out if we make it mandatory as a class
	     * decorator only receives one parameter.
	     */
	    return function (object, propertyName) {
	        defaultMetadataStorage.addExcludeMetadata({
	            target: object instanceof Function ? object : object.constructor,
	            propertyName: propertyName,
	            options: options,
	        });
	    };
	}

	/**
	 * Marks the given class or property as included. By default the property is included in both
	 * constructorToPlain and plainToConstructor transformations. It can be limited to only one direction
	 * via using the `toPlainOnly` or `toClassOnly` option.
	 *
	 * Can be applied to class definitions and properties.
	 */
	function Expose(options) {
	    if (options === void 0) { options = {}; }
	    /**
	     * NOTE: The `propertyName` property must be marked as optional because
	     * this decorator used both as a class and a property decorator and the
	     * Typescript compiler will freak out if we make it mandatory as a class
	     * decorator only receives one parameter.
	     */
	    return function (object, propertyName) {
	        defaultMetadataStorage.addExposeMetadata({
	            target: object instanceof Function ? object : object.constructor,
	            propertyName: propertyName,
	            options: options,
	        });
	    };
	}

	/**
	 * Return the class instance only with the exposed properties.
	 *
	 * Can be applied to functions and getters/setters only.
	 */
	function TransformClassToClass(params) {
	    return function (target, propertyKey, descriptor) {
	        var classTransformer = new ClassTransformer();
	        var originalMethod = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = originalMethod.apply(this, args);
	            var isPromise = !!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function';
	            return isPromise
	                ? result.then(function (data) { return classTransformer.classToClass(data, params); })
	                : classTransformer.classToClass(result, params);
	        };
	    };
	}

	/**
	 * Transform the object from class to plain object and return only with the exposed properties.
	 *
	 * Can be applied to functions and getters/setters only.
	 */
	function TransformClassToPlain(params) {
	    return function (target, propertyKey, descriptor) {
	        var classTransformer = new ClassTransformer();
	        var originalMethod = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = originalMethod.apply(this, args);
	            var isPromise = !!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function';
	            return isPromise
	                ? result.then(function (data) { return classTransformer.classToPlain(data, params); })
	                : classTransformer.classToPlain(result, params);
	        };
	    };
	}

	/**
	 * Return the class instance only with the exposed properties.
	 *
	 * Can be applied to functions and getters/setters only.
	 */
	function TransformPlainToClass(classType, params) {
	    return function (target, propertyKey, descriptor) {
	        var classTransformer = new ClassTransformer();
	        var originalMethod = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = originalMethod.apply(this, args);
	            var isPromise = !!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function';
	            return isPromise
	                ? result.then(function (data) { return classTransformer.plainToClass(classType, data, params); })
	                : classTransformer.plainToClass(classType, result, params);
	        };
	    };
	}

	/**
	 * Defines a custom logic for value transformation.
	 *
	 * Can be applied to properties only.
	 */
	function Transform(transformFn, options) {
	    if (options === void 0) { options = {}; }
	    return function (target, propertyName) {
	        defaultMetadataStorage.addTransformMetadata({
	            target: target.constructor,
	            propertyName: propertyName,
	            transformFn: transformFn,
	            options: options,
	        });
	    };
	}

	/**
	 * Specifies a type of the property.
	 * The given TypeFunction can return a constructor. A discriminator can be given in the options.
	 *
	 * Can be applied to properties only.
	 */
	function Type(typeFunction, options) {
	    if (options === void 0) { options = {}; }
	    return function (target, propertyName) {
	        var reflectedType = _Reflect.Reflect.getMetadata('design:type', target, propertyName);
	        defaultMetadataStorage.addTypeMetadata({
	            target: target.constructor,
	            propertyName: propertyName,
	            reflectedType: reflectedType,
	            typeFunction: typeFunction,
	            options: options,
	        });
	    };
	}

	var classTransformer = new ClassTransformer();
	function classToPlain(object, options) {
	    return classTransformer.classToPlain(object, options);
	}
	function classToPlainFromExist(object, plainObject, options) {
	    return classTransformer.classToPlainFromExist(object, plainObject, options);
	}
	function plainToClass(cls, plain, options) {
	    return classTransformer.plainToClass(cls, plain, options);
	}
	function plainToClassFromExist(clsObject, plain, options) {
	    return classTransformer.plainToClassFromExist(clsObject, plain, options);
	}
	function classToClass(object, options) {
	    return classTransformer.classToClass(object, options);
	}
	function classToClassFromExist(object, fromObject, options) {
	    return classTransformer.classToClassFromExist(object, fromObject, options);
	}
	function serialize(object, options) {
	    return classTransformer.serialize(object, options);
	}
	/**
	 * Deserializes given JSON string to a object of the given class.
	 */
	function deserialize(cls, json, options) {
	    return classTransformer.deserialize(cls, json, options);
	}
	/**
	 * Deserializes given JSON string to an array of objects of the given class.
	 */
	function deserializeArray(cls, json, options) {
	    return classTransformer.deserializeArray(cls, json, options);
	}

	exports.ClassTransformer = ClassTransformer;
	exports.Exclude = Exclude;
	exports.Expose = Expose;
	exports.Transform = Transform;
	exports.TransformClassToClass = TransformClassToClass;
	exports.TransformClassToPlain = TransformClassToPlain;
	exports.TransformPlainToClass = TransformPlainToClass;
	exports.Type = Type;
	exports.classToClass = classToClass;
	exports.classToClassFromExist = classToClassFromExist;
	exports.classToPlain = classToPlain;
	exports.classToPlainFromExist = classToPlainFromExist;
	exports.deserialize = deserialize;
	exports.deserializeArray = deserializeArray;
	exports.plainToClass = plainToClass;
	exports.plainToClassFromExist = plainToClassFromExist;
	exports.serialize = serialize;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=class-transformer.umd.js.map
