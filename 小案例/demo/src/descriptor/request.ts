// 定义枚举类型
export enum Methods {
    get = "get",
    post = "post",
}

function getRequestDecorator(type: Methods) {
    return function (path: string) {
        return function (target: any, key: string) {
            // 收集路由
            Reflect.defineMetadata("path", path, target, key);
            // 收集请求方式
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);