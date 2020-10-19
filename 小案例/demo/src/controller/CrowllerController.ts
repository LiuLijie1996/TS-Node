import fs from "fs";
import path from "path";
import { getResponseData } from "../utils/util";
import { controller, get, use } from "../descriptor";
import { Request, Response, NextFunction } from "express";
import NewsAnalyzer from "../utils/NewsAnalyzer";
import Crowller from "../utils/Crowller";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

// 中间件函数
function checkLogin(req: RequestWithBody, res: Response, next: NextFunction): void {
  console.log('checkLogin running');

  let isLogin = !!(req.session ? req.session.login : undefined);
  if (!isLogin) {
    res.json(getResponseData(null, "请先登录"));
  } else {
    next();
  }
}

// 中间件函数
function test(req: RequestWithBody, res: Response, next: NextFunction): void {
  console.log('test running');

  next();
}

@controller("/")
export class CrowllerController {
  // 获取数据
  @get("/getData")
  @use(checkLogin)
  @use(test)
  getData(req: RequestWithBody, res: Response): void {
    const url = "http://www.baidu.com/"; //目标地址
    const analyzer = NewsAnalyzer.getInstance(); //实例化新闻分析类
    new Crowller(analyzer, url);
    res.json(getResponseData(null));
  }

  // 显示数据
  @get("/showData")
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response): void {
    let contentPath = path.resolve(__dirname, "../../data/newsList.json");
    let result = fs.readFileSync(contentPath, "utf8");
    try {
      res.json(getResponseData(JSON.parse(result)));
    } catch (err) {
      res.json(getResponseData(null, "没有数据"));
    }
  }
}
