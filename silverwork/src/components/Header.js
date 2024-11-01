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
      <nav>
        <ul style={navStyle}>
          <li>
            <Link to="/resume">resume</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
      </nav>
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

export default Header;
