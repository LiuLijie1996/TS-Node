"use strict";
// import { RequestHandler } from "express";
// import { router } from "../router";
// // 定义枚举类型
// enum Methods {
//   get = "get",
//   post = "post",
// }
// export function controller(target: any) {
//   for (const key in target.prototype) {
//     // 获取实例中的方法
//     let handler = target.prototype[key];
//     // 获取路由
//     let path = Reflect.getMetadata("path", target.prototype, key);
//     // 获取请求方式
//     let method: Methods = Reflect.getMetadata("method", target.prototype, key);
//     // 获取中间件
//     let middleware = Reflect.getMetadata("middleware", target.prototype, key);
//     // 判断路由是否存在，请求方式是否存在，方法是否存在
//     if (path && method && handler) {
//       // 判断中间件是否存在
//       if (middleware) {
//         router[method](path, middleware, handler);
//       } else {
//         router[method](path, handler);
//       }
//     }
//   }
// }
// export function getRequestDecorator(type: Methods) {
//   return function (path: string) {
//     return function (target: any, key: string) {
//       // 收集路由
//       Reflect.defineMetadata("path", path, target, key);
//       // 收集请求方式
//       Reflect.defineMetadata("method", type, target, key);
//     };
//   };
// }
// export function use(middleware: RequestHandler) {
//   return function (target: any, key: string) {
//     // 收集中间件
//     Reflect.defineMetadata("middleware", middleware, target, key);
//   };
// }
// export const get = getRequestDecorator(Methods.get);
// export const post = getRequestDecorator(Methods.post);
// // export function get(path: string) {
// //   return function (target: any, key: string, descriptor: PropertyDescriptor) {
// //     // 收集路由
// //     Reflect.defineMetadata("path", path, target, key);
// //     // 收集请求方式
// //     Reflect.defineMetadata("method", "get", target, key);
// //   };
// // }
// // export function post(path: string) {
// //   return function (target: any, key: string, descriptor: PropertyDescriptor) {
// //     // 收集路由
// //     Reflect.defineMetadata("path", path, target, key);
// //     // 收集请求方式
// //     Reflect.defineMetadata("method", "post", target, key);
// //   };
// // }
