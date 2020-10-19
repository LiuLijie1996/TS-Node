import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
    return function (target: any, key: string) {
        // 获取中间件
        let middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", target, key) || [];
        // 添加中间件到数组中
        middlewares.push(middleware);

        // 收集中间件
        Reflect.defineMetadata("middlewares", middlewares, target, key);
    };
}