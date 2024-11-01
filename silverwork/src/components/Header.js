import React from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/logo.png";

function Header() {
  return (
    <header style={headerStyle}>
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "120px", height: "100px", marginRight: "10px" }}
        />
      </Link>
      <Link to="/resume">
        <button style={searchButtonStyle}>구직 신청하기</button>
      </Link>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f2dfd3",
  color: "#333",
};

const navStyle = {
  listStyle: "none",
  display: "flex",
  gap: "15px",
};

const searchButtonStyle = {
  padding: "15px 50px",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#4CAF50",
  border: "none",
  borderRadius: "50px",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  margin: "10px",
};

export default Header;
