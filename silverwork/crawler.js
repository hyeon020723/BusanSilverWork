const axios = require("axios");
const cheerio = require("cheerio");

class AdvancedEditor {
  constructor(response, basic) {
    this.QuerySelector = cheerio.load(response.data);
    const Office = this.QuerySelector("#job_container")
      .children()
      .eq(4)
      .children()
      .eq(1)
      .children()
      .eq(2);

    this.companyName = Office.children().eq(0).children().eq(1).text();
    this.managerName = Office.children().eq(0).children().eq(3).text();
    this.businessType = Office.children()
      .eq(1)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.businessName = Office.children()
      .eq(2)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");

    const Recruit = this.QuerySelector("#job_container")
      .children()
      .eq(5)
      .children()
      .eq(1)
      .children()
      .eq(2);

    this.workLocation = Recruit.children()
      .eq(0)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.recruitCount = Recruit.children().eq(1).children().eq(1).text();
    this.recruitSex = Recruit.children()
      .eq(1)
      .children()
      .eq(3)
      .text()
      .replace(/[\t\n]/g, "");
    this.ageInfo = Recruit.children().eq(2).children().eq(1).text();
    this.recruitStatus = Recruit.children()
      .eq(2)
      .children()
      .eq(3)
      .text()
      .replace(/[\t\n]/g, "");
    this.recruitField = Recruit.children()
      .eq(3)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.licenseRequire = Recruit.children()
      .eq(3)
      .children()
      .eq(3)
      .text()
      .replace(/[\t\n]/g, "");
    this.educationInfo = Recruit.children()
      .eq(4)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.titleName = Recruit.children()
      .eq(5)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.carrerInfo = Recruit.children()
      .eq(6)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.employmentType = Recruit.children()
      .eq(7)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.holiday = Recruit.children()
      .eq(8)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.salaryAmount = Recruit.children().eq(9).children().eq(1).text();
    this.worklifeBalance = Recruit.children()
      .eq(10)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.workTime = Recruit.children()
      .eq(11)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.elseRequire = Recruit.children()
      .eq(12)
      .children()
      .eq(1)
      .text()
      .replace(/[\t\n]/g, "");
    this.expireDate = basic["expireDate"];
    this.herf = basic["herf"];
  }
  ParseJson(jsonData) {
    jsonData.push({
      companyName: this.companyName,
      managerName: this.managerName,
      businessType: this.businessType,
      businessName: this.businessName,
      workLocation: this.workLocation,
      recruitCount: this.recruitCount,
      recruitSex: this.recruitSex,
      ageInfo: this.ageInfo,
      recruitStatus: this.recruitStatus,
      recruitField: this.recruitField,
      licenseRequire: this.licenseRequire,
      educationInfo: this.educationInfo,
      titleName: this.titleName,
      carrerInfo: this.carrerInfo,
      employmentType: this.employmentType,
      holiday: this.holiday,
      salaryAmount: this.salaryAmount,
      worklifeBalance: this.worklifeBalance,
      workTime: this.workTime,
      elseRequire: this.elseRequire,
      expireDate: this.expireDate,
      herf: this.herf,
    });
  }
}

class Editor {
  constructor(response) {
    this.QuerySelector = cheerio.load(response.data);
    this.expireDate = this.QuerySelector(".jc05")
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
    this.expireDate.splice(0, 1);
    this.herf.splice(0, 1);
  }
  isExpired(stringDate) {
    const year = 2000 + parseInt(stringDate.slice(0, 2));
    const month = parseInt(stringDate.slice(3, 5));
    const day = parseInt(stringDate.slice(6));
    const Today = new Date();
    if (year > Today.getFullYear()) {
      return false;
    }

    if (year == Today.getFullYear()) {
      if (month > Today.getMonth() + 1) {
        return false;
      }

      if (month == Today.getMonth() + 1) {
        if (day >= Today.getDate()) {
          return false;
        }
      }
    }
    return true;
  }
  ParseJson(jsonData) {
    for (let i = 0; i < this.expireDate.length; i++) {
      if (!this.isExpired(this.expireDate[i])) {
        jsonData.push({
          expireDate: this.expireDate[i],
          herf: this.herf[i],
        });
      }
    }
  }
}

// getData와 AdvancedgetData를 포함하는 fetchData 함수 정의
async function fetchData() {
  const Alldata = [];
  let indexes = 1;
  let pages = 1;

  while (indexes > 0) {
    const response = await axios.get(
      "https://www.busan50plus.or.kr/job/civilian_02_2",
      { params: { page: pages } }
    );
    const editor = new Editor(response);
    editor.RemoveHead();
    editor.ParseJson(Alldata);
    indexes = editor.expireDate.length;
    pages += 1;
  }

  // AdvancedgetData 함수를 호출하여 상세 데이터를 가져옴
  const detailedData = await AdvancedgetData(Alldata);
  return detailedData;
}

// AdvancedgetData 함수 정의
async function AdvancedgetData(data) {
  console.log("parsing");
  const Alldata = [];
  for (let i = 0; i < data.length; i++) {
    const response = await axios.get(data[i]["herf"]);
    const editor = new AdvancedEditor(response, data[i]);
    editor.ParseJson(Alldata);
  }
  console.log("completed All search");
  return Alldata;
}

// fetchData 함수를 모듈로 내보내기
module.exports = fetchData;
