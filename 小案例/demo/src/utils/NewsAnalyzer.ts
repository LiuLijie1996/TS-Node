import { JSDOM } from "jsdom";
import fs from "fs";
import { Analyzer } from "./Crowller";

// 新闻类型
interface NewsItem {
  title: string; //标题
  link: string; //链接
  heat_score: number; //热度
}

// 得到所有新闻后整理出的新闻类型
interface NewsResult {
  time: number; //时间
  data: NewsItem[];
}

// 存到文件中的数据结构
interface Content {
  [propName: number]: NewsItem[];
}

// 分析器类
export default class NewsAnalyzer implements Analyzer {
  static instance: NewsAnalyzer;

  // 将构造函数改成私有方法,这样在外部就不能实例化了
  private constructor() {}

  static getInstance() {
    // 判断instance是否被赋值当前类的实例
    if (!NewsAnalyzer.instance) {
      NewsAnalyzer.instance = new NewsAnalyzer();
    }

    // 返回当前类的实例
    return NewsAnalyzer.instance;
  }

  // 分析
  analyze(html: string, filePath: string) {
    // 1.分析html内容，得到最终的数据
    const newsResult: NewsResult = this.getHtmlInfo(html);
    // 2.生成要存储的内容
    const fileContent = this.getJsonContent(newsResult, filePath);
    return JSON.stringify(fileContent);
  }

  // 解析html内容
  private getHtmlInfo(html: string) {
    let document = new JSDOM(html).window.document;
    let innerHTML = document.querySelector("#hotsearch_data")?.innerHTML;
    let dataList = innerHTML && JSON.parse(innerHTML).hotsearch; //解析数据
    let NewsList: NewsItem[] = [];
    // 整理数据
    dataList.forEach((item: any) => {
      let newItem: NewsItem = {
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
  }

  //生成要存储的内容
  private getJsonContent(data: NewsResult, filePath: string) {
    let fileContent: Content = {};

    // 判断json文件是否存在
    if (fs.existsSync(filePath)) {
      // 存在，读取文件中的数据
      let readFile = fs.readFileSync(filePath, "utf-8") || "{}";
      fileContent = JSON.parse(readFile);
    }
    // 增加新内容
    fileContent[data.time] = data.data;

    // 返回全新内容
    return fileContent;
  }
}
