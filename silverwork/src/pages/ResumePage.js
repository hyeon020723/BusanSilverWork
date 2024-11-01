import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    이름: "",
    주민번호: "",
    연령: "",
    휴대전화: "",
    최종학력: "",
    국민기초생활수급여부: "",
    주소: "",
    컴퓨터능력: "",
    운전: "",
    희망업직종: ["", "", ""],
    희망급여: "",
    고용형태: "",
  });
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

  const pcSkillsOptions = [
    "활용능력없음",
    "문서작성",
    "표계산",
    "인터넷",
    "프레젠테이션",
    "홈페이지제작",
    "기타",
  ];

  const drivingOptions = ["불가능", "가능 (수동)", "가능 (오토)"];

  const salaryOptions = [
    "50~60만원",
    "70~90만원",
    "100~120만원",
    "120~150만원",
    "150만원 이상",
  ];

  const employmentOptions = ["상용직", "일용직", "상관없음"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJobCategoryChange = (category) => {
    const newCategories = formData.희망업직종.includes(category)
      ? formData.희망업직종.filter((item) => item !== category)
      : [...formData.희망업직종, category];

    setFormData({ ...formData, 희망업직종: newCategories });
  };

  const handleEmploymentTypeChange = (type) => {
    const newEmploymentTypes = selectedEmploymentTypes.includes(type)
      ? selectedEmploymentTypes.filter((item) => item !== type)
      : [...selectedEmploymentTypes, type];

    setSelectedEmploymentTypes(newEmploymentTypes);
    setFormData({ ...formData, 고용형태: newEmploymentTypes.join(", ") });
  };

  const handleSubmit = () => {
    // 각 항목에 대한 유효성 검증 조건
    const validationErrors = [];

    if (!formData.이름 || formData.이름.trim() === "") {
      validationErrors.push("이름");
    }
    if (!formData.주민번호 || formData.주민번호.length !== 13) {
      validationErrors.push("주민번호 (13자리 입력)");
    }
    if (!formData.연령 || isNaN(formData.연령) || formData.연령 <= 0) {
      validationErrors.push("연령 (올바른 나이 입력)");
    }
    if (
      !formData.휴대전화 ||
      !/^01[0-9]-\d{3,4}-\d{4}$/.test(formData.휴대전화)
    ) {
      validationErrors.push("휴대전화 (올바른 형식)");
    }
    if (!formData.최종학력 || formData.최종학력.trim() === "") {
      validationErrors.push("최종학력");
    }
    if (
      !formData.국민기초생활수급여부 ||
      formData.국민기초생활수급여부.trim() === ""
    ) {
      validationErrors.push("국민기초생활수급여부");
    }
    if (!formData.주소 || formData.주소.trim() === "") {
      validationErrors.push("주소");
    }
    if (!formData.컴퓨터능력 || formData.컴퓨터능력.trim() === "") {
      validationErrors.push("컴퓨터 활용 능력");
    }
    if (!formData.운전 || formData.운전.trim() === "") {
      validationErrors.push("운전 여부");
    }
    if (formData.희망업직종.length === 0) {
      validationErrors.push("희망 업직종");
    }
    if (!formData.희망급여 || formData.희망급여.trim() === "") {
      validationErrors.push("희망 급여");
    }
    if (!formData.고용형태 || formData.고용형태.trim() === "") {
      validationErrors.push("고용 형태");
    }

    // 경고 메시지 출력
    if (validationErrors.length > 0) {
      alert(`다음 항목을 확인해 주세요: ${validationErrors.join(", ")}`);
      setStatusMessage(""); // 경고창 후 상태 메시지 초기화
    } else {
      alert("모든 정보를 입력하셨습니다. 작성이 완료되었습니다.");
      setStatusMessage("결과를 불러오는 중입니다...");
      const formDataWithSelections = {
        ...formData,
        희망업직종: selectedJobCategories.join(", "),
        고용형태: selectedEmploymentTypes.join(", "),
      };
      console.log("Form Data:", formDataWithSelections);

      // 데이터 전송 없이 바로 이동
      navigate("/results", { state: { formData: formDataWithSelections } });

      setStatusMessage("신청내역을 확인해주세요");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        부산광역시 장노년일자리지원센터
        <br />
        담당자에게 전송될 구직 신청 내용입니다.
      </h2>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>이름</label>
        <input
          type="text"
          name="이름"
          placeholder="이름을 입력하세요"
          value={formData.이름}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>주민번호</label>
        <input
          type="text"
          name="주민번호"
          placeholder="주민번호를 입력하세요"
          value={formData.주민번호}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>연령</label>
        <input
          type="number"
          name="연령"
          placeholder="나이를 입력하세요"
          value={formData.연령}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>휴대전화</label>
        <input
          type="tel"
          name="휴대전화"
          placeholder="휴대폰 번호를 입력하세요"
          value={formData.휴대전화}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>최종학력</label>
        <input
          type="text"
          name="최종학력"
          placeholder="최종학력을 입력하세요"
          value={formData.최종학력}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>국민기초생활수급여부</label>
        <input
          type="text"
          name="국민기초생활수급여부"
          placeholder="수급 여부를 입력하세요"
          value={formData.국민기초생활수급여부}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>주소</label>
        <input
          type="text"
          name="주소"
          placeholder="주소를 입력하세요"
          value={formData.주소}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>컴퓨터 활용 능력</label>
        <div style={buttonContainerStyle}>
          {pcSkillsOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setFormData({ ...formData, 컴퓨터능력: option })}
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.컴퓨터능력 === option ? "#4CAF50" : "#e0e0e0",
                color: formData.컴퓨터능력 === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>운전 여부</label>
        <div style={buttonContainerStyle}>
          {drivingOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setFormData({ ...formData, 운전: option })}
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.운전 === option ? "#4CAF50" : "#e0e0e0",
                color: formData.운전 === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>희망 업직종</label>
        <div style={iconButtonContainerStyle}>
          {jobCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleJobCategoryChange(category.name)}
              style={{
                ...iconButtonStyle,
                backgroundColor: formData.희망업직종.includes(category.name)
                  ? "#4CAF50"
                  : "#f1f1f1",
                color: formData.희망업직종.includes(category.name)
                  ? "white"
                  : "#333",
              }}>
              <img src={category.icon} alt={category.name} style={iconStyle} />
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>희망 급여</label>
        <div style={buttonContainerStyle}>
          {salaryOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setFormData({ ...formData, 희망급여: option })}
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.희망급여 === option ? "#4CAF50" : "#e0e0e0",
                color: formData.희망급여 === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>고용 형태</label>
        <div style={buttonContainerStyle}>
          {employmentOptions.map((type, index) => (
            <button
              key={index}
              onClick={() => handleEmploymentTypeChange(type)}
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.고용형태 === type ? "#4CAF50" : "#e0e0e0",
                color: formData.고용형태 === type ? "white" : "#333",
              }}>
              {type}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit} style={viewResultsButtonStyle}>
        작성완료
      </button>
      {statusMessage && <p style={statusMessageStyle}>{statusMessage}</p>}
    </div>
  );
}

// 스타일 정의
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  maxWidth: "90%",
  margin: "20px auto",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
  textAlign: "center",
};

const optionGroupStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
};

const labelStyle = {
  fontSize: "25px",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  fontSize: "25px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
};

const employmentButtonStyle = {
  padding: "12px 24px",
  fontSize: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const viewResultsButtonStyle = {
  marginTop: "20px",
  padding: "15px",
  fontSize: "22px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  width: "100%",
  maxWidth: "300px",
};

const statusMessageStyle = {
  marginTop: "15px",
  fontSize: "20px",
  color: "#333",
  textAlign: "center",
};

const iconButtonContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: "16px",
  padding: "16px",
  width: "100%",
};

const iconButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  fontSize: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
  flexDirection: "column",
  width: "100px",
  height: "100px",
  transition: "background-color 0.2s",
};

const iconStyle = {
  width: "32px",
  height: "32px",
  marginBottom: "5px",
};

export default ResumePage;
