"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
function getResponseData(data, msg) {
    // 判断有没有错误信息
    if (msg) {
        return {
            code: 0,
            msg: msg,
            data: data,
        };
    }
    return {
        code: 200,
        data: data,
    };
}
exports.getResponseData = getResponseData;
