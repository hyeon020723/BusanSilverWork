import React, { useEffect, useState } from "react";
import Map from "../components/Map";

function ListPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1234/list", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", JSON.stringify(data, null, 2));
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={containerStyle}>
      <Map />
      <div style={tableContainerStyle}>
        <h1 style={headingStyle}>채용 공고</h1>
        <p style={subHeadingStyle}>
          오늘 날짜를 기준으로 현재 채용 중인 공고입니다.
        </p>
        {data ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>제목</th>
                <th>기업명</th>
                <th>경력</th>
                <th>급여</th>
                <th>마감일</th>
              </tr>
            </thead>
            <tbody>
              {data.map((job, index) => (
                <tr key={index}>
                  <td>
                    <a
                      href={job.herf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}>
                      {job.titleName}
                    </a>
                  </td>
                  <td>{job.companyName}</td>
                  <td>{job.carrerInfo}</td>
                  <td>{job.salaryAmount}</td>
                  <td>{job.expireDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={loadingStyle}>Loading...</p>
        )}
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f3f3f3",
  minHeight: "100vh",
};

const tableContainerStyle = {
  width: "100%",
  maxWidth: "800px",
  margin: "20px auto",
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  marginBottom: "10px",
};

const subHeadingStyle = {
  fontSize: "20px",
  textAlign: "center",
  color: "#666",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "18px",
  marginTop: "10px",
};

const linkStyle = {
  color: "#1a73e8",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "18px",
};

const loadingStyle = {
  fontSize: "20px",
  color: "#888",
  textAlign: "center",
};

const searchButtonStyle = {
  padding: "15px 50px",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#6b8e23",
  border: "none",
  borderRadius: "50px",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  marginBottom: "30px",
};

searchButtonStyle["&:hover"] = {
  backgroundColor: "#556b2f",
  transform: "translateY(-3px)",
};

// 표 스타일
tableStyle["th"] = {
  backgroundColor: "#8fbc8f",
  color: "#fff",
  padding: "15px",
  borderBottom: "3px solid #ddd",
  fontSize: "20px",
};

tableStyle["td"] = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  fontSize: "25px", // 글씨 크기 25px로 조정
  color: "#333",
  margin: "10px 0",
};

export default ListPage;
