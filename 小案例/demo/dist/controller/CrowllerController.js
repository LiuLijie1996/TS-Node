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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowllerController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("../utils/util");
var descriptor_1 = require("../descriptor");
var NewsAnalyzer_1 = __importDefault(require("../utils/NewsAnalyzer"));
var Crowller_1 = __importDefault(require("../utils/Crowller"));
// 中间件函数
function checkLogin(req, res, next) {
    console.log('checkLogin running');
    var isLogin = !!(req.session ? req.session.login : undefined);
    if (!isLogin) {
        res.json(util_1.getResponseData(null, "请先登录"));
    }
    else {
        next();
    }
}
// 中间件函数
function test(req, res, next) {
    console.log('test running');
    next();
}
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    // 获取数据
    CrowllerController.prototype.getData = function (req, res) {
        var url = "http://www.baidu.com/"; //目标地址
        var analyzer = NewsAnalyzer_1.default.getInstance(); //实例化新闻分析类
        new Crowller_1.default(analyzer, url);
        res.json(util_1.getResponseData(null));
    };
    // 显示数据
    CrowllerController.prototype.showData = function (req, res) {
        var contentPath = path_1.default.resolve(__dirname, "../../data/newsList.json");
        var result = fs_1.default.readFileSync(contentPath, "utf8");
        try {
            res.json(util_1.getResponseData(JSON.parse(result)));
        }
        catch (err) {
            res.json(util_1.getResponseData(null, "没有数据"));
        }
    };
    __decorate([
        descriptor_1.get("/getData"),
        descriptor_1.use(checkLogin),
        descriptor_1.use(test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        descriptor_1.get("/showData"),
        descriptor_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        descriptor_1.controller("/")
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
