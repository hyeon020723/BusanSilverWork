import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResultsPage() {
  const { state } = useLocation();
  const { formData } = state || {};

  useEffect(() => {
    if (formData) {
      console.log("Received Form Data:", formData);
    }
  }, [formData]);

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:1234/sendemail", {
        data: formData,
      });
      alert("이메일 전송 완료");
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "'Arial', sans-serif",
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#f2f2f2",
        borderRadius: "15px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}>
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "25px",
          fontSize: "24px",
        }}>
        신청 결과
      </h2>
      {formData ? (
        <div
          style={{
            padding: "25px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          }}>
          <div>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "15px", fontSize: "20px" }}>
                <strong style={{ color: "#333" }}>{key}: </strong>
                <span style={{ color: "#555" }}>{value}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <button
              onClick={handleSendEmail}
              style={{
                marginTop: "20px",
                padding: "15px",
                fontSize: "25px",
                fontWeight: "bold",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}>
              전송하기
            </button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#777", fontSize: "20px" }}>
          데이터를 로드하는 중입니다...
        </p>
      )}
    </div>
  );
}

export default ResultsPage;
