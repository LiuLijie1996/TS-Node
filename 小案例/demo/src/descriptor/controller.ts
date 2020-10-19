import "reflect-metadata";
import router from "../router";
import { RequestHandler } from "express";
import { Methods } from "./request"

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (const key in target.prototype) {
            // 获取实例中的方法
            let handler = target.prototype[key];
            // 获取路由
            let path = Reflect.getMetadata("path", target.prototype, key);
            // 获取请求方式
            let method: Methods = Reflect.getMetadata("method", target.prototype, key);
            // 获取中间件
            let middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", target.prototype, key);

            // 判断路由是否存在，请求方式是否存在
            if (path && method) {
                // 拼接路由
                let fullPath = root === "/" ? path : `${root}${path}`;

                // 判断中间件是否存在
                if (middlewares && middlewares.length) {
                    router[method](fullPath, ...middlewares, handler);
                } else {
                    router[method](fullPath, handler);
                }
            }
        }
    };
}
