"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var fs_1 = __importDefault(require("fs"));
// 分析器类
var NewsAnalyzer = /** @class */ (function () {
    // 将构造函数改成私有方法,这样在外部就不能实例化了
    function NewsAnalyzer() {
    }
    NewsAnalyzer.getInstance = function () {
        // 判断instance是否被赋值当前类的实例
        if (!NewsAnalyzer.instance) {
            NewsAnalyzer.instance = new NewsAnalyzer();
        }
        // 返回当前类的实例
        return NewsAnalyzer.instance;
    };
    // 分析
    NewsAnalyzer.prototype.analyze = function (html, filePath) {
        // 1.分析html内容，得到最终的数据
        var newsResult = this.getHtmlInfo(html);
        // 2.生成要存储的内容
        var fileContent = this.getJsonContent(newsResult, filePath);
        return JSON.stringify(fileContent);
    };
    // 解析html内容
    NewsAnalyzer.prototype.getHtmlInfo = function (html) {
        var _a;
        var document = new jsdom_1.JSDOM(html).window.document;
        var innerHTML = (_a = document.querySelector("#hotsearch_data")) === null || _a === void 0 ? void 0 : _a.innerHTML;
        var dataList = innerHTML && JSON.parse(innerHTML).hotsearch; //解析数据
        var NewsList = [];
        // 整理数据
        dataList.forEach(function (item) {
            var newItem = {
                title: item.pure_title,
                link: decodeURIComponent(item.linkurl),
                heat_score: item.heat_score,
            };
            NewsList.push(newItem);
        });
        // 返回最终的数据
        return {
            time: new Date().getTime(),
            data: NewsList,
        };
    };
    //生成要存储的内容
    NewsAnalyzer.prototype.getJsonContent = function (data, filePath) {
        var fileContent = {};
        // 判断json文件是否存在
        if (fs_1.default.existsSync(filePath)) {
            // 存在，读取文件中的数据
            var readFile = fs_1.default.readFileSync(filePath, "utf-8") || "{}";
            fileContent = JSON.parse(readFile);
        }
        // 增加新内容
        fileContent[data.time] = data.data;
        // 返回全新内容
        return fileContent;
    };
    return NewsAnalyzer;
}());
exports.default = NewsAnalyzer;
