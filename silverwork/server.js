// server.js
const express = require("express");
const fetchData = require("./crawler");
const cors = require("cors"); // cors 모듈 가져오기

const app = express();
const PORT = 1234;

app.use(cors()); // 모든 도메인에서 접근을 허용
app.use(express.json());

// 미들웨어 설정
app.use(express.json());

let cachedData = null; // 데이터를 캐싱할 변수
async function loadData() {
  try {
    cachedData = await fetchData();
    console.log("Data loaded successfully:", cachedData);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadData(); // 서버 시작 시 데이터 로드

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.send("Hello, Backend!");
});

// /list 엔드포인트에서 데이터 반환
app.get("/list", (req, res) => {
  if (cachedData) {
    res.json(cachedData);
  } else {
    res.status(500).send("Data not available");
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});