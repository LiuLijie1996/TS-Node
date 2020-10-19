interface Result {
  code: number;
  data: any;
  msg?: string;
}

export function getResponseData(data: any, msg?: string): Result {
  // 判断有没有错误信息
  if (msg) {
    return {
      code: 0,
      msg: msg,
      data,
    };
  }
  return {
    code: 200,
    data,
  };
}
