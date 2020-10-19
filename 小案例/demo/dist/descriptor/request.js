"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Methods = void 0;
// 定义枚举类型
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            // 收集路由
            Reflect.defineMetadata("path", path, target, key);
            // 收集请求方式
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
