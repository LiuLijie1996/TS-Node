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
exports.Index = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("../utils/util");
var descriptor_1 = require("../descriptor");
var Index = /** @class */ (function () {
    function Index() {
    }
    Index_1 = Index;
    Index.isLogin = function (req) {
        return !!(req.session ? req.session.login : undefined);
    };
    // 首页
    Index.prototype.home = function (req, res) {
        var isLogin = Index_1.isLogin(req);
        if (isLogin) {
            var indexOverPath = path_1.default.resolve(__dirname, "../../html/indexOver.html");
            var indexOver = fs_1.default.readFileSync(indexOverPath, "utf8");
            res.send(indexOver);
        }
        else {
            var indexPath = path_1.default.resolve(__dirname, "../../html/index.html");
            var index = fs_1.default.readFileSync(indexPath, "utf8");
            res.send(index);
        }
    };
    // 退出登陆
    Index.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json(util_1.getResponseData(null));
    };
    // 验证登陆
    Index.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = req.session ? req.session.login : undefined;
        // 判断是否登录
        if (isLogin) {
            res.json(util_1.getResponseData(null));
        }
        else {
            // 没有登录时，判断密码是否正确
            if (password === "123" && req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(null));
            }
            else {
                res.json(util_1.getResponseData(null, "登录失败"));
            }
        }
    };
    var Index_1;
    __decorate([
        descriptor_1.get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Index.prototype, "home", null);
    __decorate([
        descriptor_1.get("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Index.prototype, "logout", null);
    __decorate([
        descriptor_1.post("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Index.prototype, "login", null);
    Index = Index_1 = __decorate([
        descriptor_1.controller("/")
    ], Index);
    return Index;
}());
exports.Index = Index;
