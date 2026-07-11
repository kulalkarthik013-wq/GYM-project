import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ user }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gymUser");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #89CFF0, #1E90FF)",
        color: "white",
        padding: "12px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "18px"
      }}
    >

      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#1E90FF",
            color: "white",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ← Back
        </button>

        {/* App Name */}
        <div
          style={{ fontSize: "22px", letterSpacing: "1px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          GymExpert
        </div>

      </div>

      {/* NAVIGATION */}
      {!user ? (
        <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>

          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </span>
          <span style={{ cursor: "pointer" }}>About</span>
          <span style={{ cursor: "pointer" }}>Plans</span>
          <span style={{ cursor: "pointer" }}>Contact</span>

          <button
            onClick={() => navigate("/login")}
            style={{
              background: "white",
              color: "#1E90FF",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login
          </button>

        </nav>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              background: "#ff4d4d",
              border: "none",
              color: "white",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>

          {/* Profile Image */}
          <img
            src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : "https://i.pravatar.cc/40"}
            alt="User"
            onClick={() => navigate("/profile")}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              cursor: "pointer"
            }}
          />

        </div>
      )}

    </header>
  );
}

export default Header;