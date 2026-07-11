// components/LevelCards.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout.jsx";

const LevelCards = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <div
          onClick={() => navigate("/beginner")}
          style={{
            flex: "1 1 250px",
            padding: "20px",
            background: "linear-gradient(90deg, #A8E6CF, #56C596)",
            borderRadius: "12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <h2>Beginner 🟢</h2>
          <p>Just started? Learn the basics and track your progress.</p>
        </div>

        <div
          onClick={() => navigate("/intermediate")}
          style={{
            flex: "1 1 250px",
            padding: "20px",
            background: "linear-gradient(90deg, #FFF3B0, #FFDD59)",
            borderRadius: "12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <h2>Intermediate 🟡</h2>
          <p>Level up with longer workouts and challenges.</p>
        </div>

        <div
          onClick={() => navigate("/pro")}
          style={{
            flex: "1 1 250px",
            padding: "20px",
            background: "linear-gradient(90deg, #FF7E5F, #FF3F34)",
            borderRadius: "12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <h2>Pro 🔴</h2>
          <p>Advanced routines for maximum results.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LevelCards;