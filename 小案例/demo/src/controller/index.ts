import fs from "fs";
import path from "path";
import "./CrowllerController";
import { Request, Response } from "express";
import { getResponseData } from "../utils/util";
import { controller, get, post } from "../descriptor";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller("/")
export class Index {
  static isLogin(req: RequestWithBody): boolean {
    return !!(req.session ? req.session.login : undefined);
  }

  // 首页
  @get("/")
  home(req: RequestWithBody, res: Response): void {
    let isLogin = Index.isLogin(req);

    if (isLogin) {
      let indexOverPath = path.resolve(__dirname, "../../html/indexOver.html");
      let indexOver = fs.readFileSync(indexOverPath, "utf8");
      res.send(indexOver);
    } else {
      let indexPath = path.resolve(__dirname, "../../html/index.html");
      let index = fs.readFileSync(indexPath, "utf8");
      res.send(index);
    }
  }

  // 退出登陆
  @get("/logout")
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }

    res.json(getResponseData(null));
  }

  // 验证登陆
  @post("/login")
  login(req: RequestWithBody, res: Response) {
    let { password } = req.body;
    let isLogin = req.session ? req.session.login : undefined;

    // 判断是否登录
    if (isLogin) {
      res.json(getResponseData(null));
    } else {
      // 没有登录时，判断密码是否正确
      if (password === "123" && req.session) {
        req.session.login = true;
        res.json(getResponseData(null));
      } else {
        res.json(getResponseData(null, "登录失败"));
      }
    }
  }
}
