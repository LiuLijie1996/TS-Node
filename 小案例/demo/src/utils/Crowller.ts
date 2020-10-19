import superagent from "superagent";
import fs from "fs";
import path from "path";

// 定义分析器的类型
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

// 爬虫类
class Crowller {
  //私有属性
  private filePath = path.resolve(__dirname, "../../data/newsList.json");

  // 构造函数
  constructor(private analyzer: Analyzer, private url: string) {
    // 负责爬虫的流程
    this.initSpiderProcess();
  }

  //负责爬虫的流程
  private async initSpiderProcess() {
    // 1.获取html的内容
    const html = await this.getRawHtml();
    // 2.分析html，得到存储的数据
    const fileContent = this.analyzer.analyze(html, this.filePath);
    // 3.存储内容
    this.saveJsonData(fileContent);
  }

  // 获取html的内容
  private async getRawHtml() {
    // 请求数据
    let result = await superagent.get(this.url);
    return result.text; //返回html内容
  }

  // 存储内容
  private saveJsonData(content: string) {
    // 存到文件中
    fs.writeFileSync(this.filePath, content);
    console.log("存储完成");
  }
}

export default Crowller;
