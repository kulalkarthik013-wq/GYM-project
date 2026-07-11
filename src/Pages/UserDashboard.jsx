import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import gymBg from "../assets/gym4.jpg";

function UserDashboard() {
  const userData = localStorage.getItem("gymUser");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();
  
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${gymBg})`,   // ✅ ADDED
        backgroundSize: "cover",            // ✅ ADDED
        backgroundPosition: "center",       // ✅ ADDED
        backgroundRepeat: "no-repeat",      // ✅ ADDED
        backgroundAttachment: "fixed"       // optional nice effect
      }}
    >
      
      {/* Header */}
      <Header user={user} />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "0",
          margin: "0",
          width: "100%",
        }}
      >
        {user ? (
          <>
          <h1 style={{  color: "#4298f4", marginBottom: "30px" }}>
              Hi {user.name} 👋 Welcome to GymExpert
            </h1>

            <p style={{ color: "#00ffcc", marginBottom: "30px" }}>
              Choose your workout level:
            </p>
            {/* Level Cards */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* Beginner Card */}
              <div
                onClick={() => navigate("/goal-selection")}
                style={{
                  flex: "1 1 250px",
                  padding: "20px",
                  background: "linear-gradient(90deg, #89CFF0, #1E90FF)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h2>🔰 Beginner</h2>
                <p>Just started? Learn the basics and track your progress.</p>
              </div>

              {/* Intermediate Card */}
              <div
                onClick={() => navigate("/intermediate")}
                style={{
                  flex: "1 1 250px",
                  padding: "20px",
                  background: "linear-gradient(90deg, #56C596, #1E90FF)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h2>Intermediate</h2>
                <p>Level up with longer workouts and challenges.</p>
              </div>

              {/* Pro Card */}
              <div
                onClick={() => navigate("/pro")}
                style={{
                  flex: "1 1 250px",
                  padding: "20px",
                  background: "linear-gradient(90deg, #1E90FF, #0D47A1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h2>Pro</h2>
                <p>Advanced routines for maximum results.</p>
              </div>
            </div>
          </>
        ) : (
          <h1>No user data found</h1>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserDashboard;