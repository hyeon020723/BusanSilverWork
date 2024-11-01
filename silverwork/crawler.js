// crawler.js
const axios = require("axios");
const cheerio = require("cheerio");

class Editor {
  constructor(response) {
    this.QuerySelector = cheerio.load(response.data);
    this.companyName = this.QuerySelector(".jc01")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.titleName = this.QuerySelector(".job_title")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.carrerInfo = this.GetChildArr(".job_txt", 1);
    this.locationInfo = this.GetChildArr(".job_txt", 3);
    this.salaryAmount = this.QuerySelector(".jc03")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.uploadDate = this.QuerySelector(".jc04")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.expireDate = this.QuerySelector(".jc05")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.providedBy = this.QuerySelector(".jc06")
      .map((i, el) => this.QuerySelector(el).text().trim())
      .get();
    this.herf = this.GetChildHerf(".jc02", 0);
  }

  GetChildHerf(arg, n) {
    const result = [];
    const self = this;
    this.QuerySelector(arg).each(function (index, parent) {
      const nthChild =
        "https://www.busan50plus.or.kr" +
        self.QuerySelector(parent).children().eq(n).attr("href");
      result.push(nthChild);
    });
    return result;
  }

  GetChildArr(arg, n) {
    const result = [];
    const self = this;
    this.QuerySelector(arg).each(function (index, parent) {
      const nthChild = self
        .QuerySelector(parent)
        .children()
        .eq(n)
        .text()
        .trim();
      result.push(nthChild);
    });
    return result;
  }

  RemoveHead() {
    this.companyName.splice(0, 1);
    this.salaryAmount.splice(0, 1);
    this.uploadDate.splice(0, 1);
    this.expireDate.splice(0, 1);
    this.providedBy.splice(0, 1);
  }

  isExpired(stringDate) {
    const year = 2000 + parseInt(stringDate.slice(0, 2));
    const month = parseInt(stringDate.slice(3, 5));
    const day = parseInt(stringDate.slice(6));
    const Today = new Date();
    if (year > Today.getFullYear()) return false;
    if (year === Today.getFullYear()) {
      if (month > Today.getMonth() + 1) return false;
      if (month === Today.getMonth() + 1 && day >= Today.getDate())
        return false;
    }
    return true;
  }

  ParseJson(jsonData) {
    for (let i = 0; i < this.companyName.length; i++) {
      if (!this.isExpired(this.expireDate[i])) {
        jsonData.push({
          companyName: this.companyName[i],
          titleName: this.titleName[i],
          carrerInfo: this.carrerInfo[i],
          salaryAmount: this.salaryAmount[i],
          uploadDate: this.uploadDate[i],
          expireDate: this.expireDate[i],
          providedBy: this.providedBy[i],
          herf: this.herf[i],
        });
      }
    }
  }
}

// fetchData 함수 수정
async function fetchData() {
  const Alldata = [];
  let indexes = 1;
  let pages = 1;

  while (indexes > 0) {
    const response = await axios.get(
      "https://www.busan50plus.or.kr/job/civilian_02_2",
      {
        params: { page: pages },
      }
    );
    const editor = new Editor(response);
    editor.RemoveHead();
    editor.ParseJson(Alldata);
    indexes = editor.titleName.length;
    pages += 1;
  }

  return Alldata;
}

module.exports = fetchData;
