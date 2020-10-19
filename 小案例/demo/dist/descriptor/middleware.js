"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key) {
        // 获取中间件
        var middlewares = Reflect.getMetadata("middlewares", target, key) || [];
        // 添加中间件到数组中
        middlewares.push(middleware);
        // 收集中间件
        Reflect.defineMetadata("middlewares", middlewares, target, key);
    };
}
exports.use = use;
