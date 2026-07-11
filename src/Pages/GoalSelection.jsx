import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Components/DashboardLayout";
import gymBg from "../assets/gym4.jpg";


const GoalSelection = () => {

  const navigate = useNavigate();

  const selectGoal = (goal) => {
    localStorage.setItem("fitnessGoal", goal);

    if (goal === "muscle") {
      navigate("/beginner"); // open BeginnerPage
    } else if (goal === "fatloss") {
      navigate("/beginner-fatloss"); // ✅ FIXED
    } else if (goal === "endurance") {
      navigate("/beginner-endurance"); // ✅ FIXED
    }
  };

  return (
    <DashboardLayout noPadding>

      <div
        className="goal-page"
        style={{
          backgroundImage: `url(${gymBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <h1>Select Your Fitness Goal</h1>

        <div className="goal-grid">

          {/* Muscle Gain Card */}
          <div
            className="goal-card muscle"
            onClick={() => selectGoal("muscle")}
          >
            <h2>💪 Muscle Gain</h2>
            <p>Build strength and increase muscle mass.</p>
          </div>

          {/* Fat Loss Card */}
          <div
            className="goal-card fatloss"
            onClick={() => selectGoal("fatloss")}
          >
            <h2>🔥 Fat Loss</h2>
            <p>Burn calories and reduce body fat.</p>
          </div>

          {/* Endurance Card */}
          <div
            className="goal-card endurance"
            onClick={() => selectGoal("endurance")}
          >
            <h2>⚡ Endurance</h2>
            <p>Improve stamina and cardio fitness.</p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default GoalSelection;