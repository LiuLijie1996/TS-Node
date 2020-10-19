import express from "express";
import router from "./router";
import "./controller/index";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
let app = express();
// 解析form表单的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["teacher dell"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(router);

app.listen(3000, function () {
  console.log("server is running");
});
