// server.js
const express = require("express");
const fetchData = require("./crawler");
const cors = require("cors"); // cors 모듈 가져오기

const app = express();
const PORT = 1234;

app.use(cors()); // 모든 도메인에서 접근을 허용
app.use(express.json());

require("dotenv").config();
const mailer = require("./mailer.js");

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

app.get("/", (req, res) => {
  res.send("Hello, Backend!");
});

app.get("/list", (req, res) => {
  if (cachedData) {
    res.json(cachedData);
  } else {
    res.status(500).send("Data not available");
  }
});

app.post("/sendemail", (req, res) => {
  console.log("Request body:", req.body);
  const { data } = req.body;

  // Construct the email content from `data`
  let emailContent = "신청자 정보 \n\n";
  for (const [key, value] of Object.entries(data)) {
    emailContent += `${key}: ${value || "N/A"}\n`;
  }

  // Pass constructed email content directly to the `mailer`
  const senderName = "Form Submission"; // A default name or a value from `data` if available
  const senderEmail = "noreply@example.com"; // Default email if you don't have the sender's email

  mailer(senderName, senderEmail, "구직 신청서", emailContent)
    .then((response) => {
      if (response === "success") {
        res.status(200).json({
          status: "Success",
          code: 200,
          message: "Message Sent Successfully!",
        });
      } else {
        res.status(500).json({
          status: "Fail",
          code: response.code,
        });
      }
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({
        status: "Fail",
        code: 500,
        message: "Error sending email",
      });
    });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
