import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("gymUser")) || {};

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}> {/* ✅ reduced height */}
      <Header user={user} />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a2d50"
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #89CFF0, #1E90FF)", // ✅ blue gradient
            padding: "30px",
            marginTop:"35px",
            marginBottom:"30px",
            borderRadius: "12px",
            width: "360px",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            position: "relative"
          }}
        >
          {/* Close Button */}
          <button
            className="close-btn"
            onClick={() => navigate(-1)}
            style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
          >
            ✕
          </button>

          {/* Profile Image */}
          {user.profilePic ? (
            <img
              src={`http://localhost:5000/uploads/${user.profilePic}`}
              alt="profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px"
              }}
            />
          ) : (
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "#50cdf3",
                margin: "0 auto 15px auto"
              }}
            />
          )}

          <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

          <p><b>Full Name:</b> {user.name || "Not added"}</p>
          <p><b>Username:</b> {user.username || "Not added"}</p>
          <p><b>Age:</b> {user.age || "Not added"}</p>
          <p><b>Weight:</b> {user.weight ? user.weight + " kg" : "Not added"}</p>
          <p><b>Height:</b> {user.height ? user.height + " cm" : "Not added"}</p>
          <p><b>BMI:</b> {user.bmi || "Not calculated"}</p>

          {/* ✅ Edit Profile Button */}
          <button
            onClick={() => navigate("/edit-profile")} // navigate to Edit Profile page
            style={{
              marginTop: "25px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#1E90FF",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Edit Profile
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;