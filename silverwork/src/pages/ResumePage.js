import React, { useState } from "react";
import axios from "axios";

// 아이콘 이미지 파일 import
import officeIcon from "../icons/사무경영.png";
import financeIcon from "../icons/금융.png";
import educationIcon from "../icons/교육연구사회복지.png";
import healthcareIcon from "../icons/보건의료.png";
import mediaIcon from "../icons/출판.png";
import transportIcon from "../icons/운송.png";
import salesIcon from "../icons/서비스.png";
import cleaningIcon from "../icons/경비미화.png";
import foodIcon from "../icons/결혼음식.png";
import constructionIcon from "../icons/기술.png";
import otherIcon from "../icons/기타.png";

function ResumePage() {
  const [age, setAge] = useState("");
  const [selectedJobCategories, setSelectedJobCategories] = useState([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const jobCategories = [
    { name: "사무,경영", icon: officeIcon },
    { name: "금융,보험,홍보", icon: financeIcon },
    { name: "교육,연구,사회복지", icon: educationIcon },
    { name: "보건, 의료", icon: healthcareIcon },
    { name: "문화,방송,출판", icon: mediaIcon },
    { name: "운전,운송", icon: transportIcon },
    { name: "영업, 판매, 서비스", icon: salesIcon },
    { name: "경비, 환경, 미화", icon: cleaningIcon },
    { name: "결혼, 음식", icon: foodIcon },
    { name: "기계, 생산, 건축", icon: constructionIcon },
    { name: "기타", icon: otherIcon },
  ];

  const employmentTypes = ["상용직", "계약직", "시간제", "파견근로"];

  // 체크박스 상태 변경 함수
  const handleCheckboxChange = (setFunction, selectedOptions, option) => {
    if (selectedOptions.includes(option)) {
      setFunction(selectedOptions.filter((item) => item !== option));
    } else {
      setFunction([...selectedOptions, option]);
    }
  };

  const handleSubmit = async () => {
    console.log("Selected Age:", age);
    console.log("Selected Job Categories:", selectedJobCategories);
    console.log("Selected Employment Types:", selectedEmploymentTypes);

    setStatusMessage("결과를 불러오는 중입니다...");

    try {
      await axios.post("/api/results", {
        age,
        selectedJobCategories,
        selectedEmploymentTypes,
      });
      setStatusMessage("결과를 성공적으로 불러왔습니다.");
    } catch (error) {
      setStatusMessage("오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>옵션 선택</h2>

      {/* 연령 선택 */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>연령</label>
        <input
          type="number"
          placeholder="나이를 입력하세요"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 업직종 선택 */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>업직종</label>
        <div style={iconButtonContainerStyle}>
          {jobCategories.map((category, index) => (
            <button
              key={index}
              onClick={() =>
                handleCheckboxChange(
                  setSelectedJobCategories,
                  selectedJobCategories,
                  category.name
                )
              }
              style={{
                ...iconButtonStyle,
                backgroundColor: selectedJobCategories.includes(category.name)
                  ? "#4CAF50"
                  : "#f1f1f1",
                color: selectedJobCategories.includes(category.name)
                  ? "white"
                  : "#333",
              }}>
              <img src={category.icon} alt={category.name} style={iconStyle} />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 고용형태 선택 */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>고용형태</label>
        <div style={buttonContainerStyle}>
          {employmentTypes.map((type, index) => (
            <button
              key={index}
              onClick={() =>
                handleCheckboxChange(
                  setSelectedEmploymentTypes,
                  selectedEmploymentTypes,
                  type
                )
              }
              style={{
                ...employmentButtonStyle,
                backgroundColor: selectedEmploymentTypes.includes(type)
                  ? "#4CAF50"
                  : "#e0e0e0",
                color: selectedEmploymentTypes.includes(type)
                  ? "white"
                  : "#333",
              }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 보기 버튼 */}
      <button onClick={handleSubmit} style={viewResultsButtonStyle}>
        결과 보기
      </button>

      {/* 상태 메시지 */}
      {statusMessage && <p style={statusMessageStyle}>{statusMessage}</p>}
    </div>
  );
}

// 스타일 정의
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "400px",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

const optionGroupStyle = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
};

const labelStyle = {
  fontSize: "18px",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const iconButtonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const iconButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  fontSize: "14px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  flexDirection: "column",
  width: "80px",
  height: "80px",
};

const iconStyle = {
  width: "32px",
  height: "32px",
  marginBottom: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const employmentButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

const viewResultsButtonStyle = {
  marginTop: "20px",
  padding: "15px 25px",
  fontSize: "18px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
};

const statusMessageStyle = {
  marginTop: "15px",
  fontSize: "16px",
  color: "#333",
  textAlign: "center",
};

export default ResumePage;
