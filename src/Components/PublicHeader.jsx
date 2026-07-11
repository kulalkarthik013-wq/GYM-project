import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PublicHeader() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #89CFF0, #1E90FF)", // Light blue creative gradient
        color: "white",
        padding: "12px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >

      {/* Left Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#1E90FF", // Updated to match header theme
              border: "none",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            ← Back
          </button>
        )}

        <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
          GymExpert 💪
        </h2>

      </div>

      {/* Right Side */}
      <div style={{ display: "flex", gap: "25px", fontWeight: "bold" }}>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>

      </div>

    </header>
  );
}

export default PublicHeader;