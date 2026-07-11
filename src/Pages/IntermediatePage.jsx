import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Components/DashboardLayout";
import gymBg from "../assets/gym4.jpg";
const IntermediatePage = () => {

  const navigate = useNavigate();

  // 🔥 ADD THIS (Fix double background issue)
  useEffect(() => {
    document.body.classList.add("goal-bg");

    return () => {
      document.body.classList.remove("goal-bg");
    };
  }, []);

  // ✅ ONLY CHANGE IS HERE
  const selectGoal = (goal) => {
    localStorage.setItem("fitnessGoal", goal);

    if (goal === "muscle") {
      navigate("/intermediate-muscle"); // ✅ FIXED
    } else if (goal === "fatloss") {
      navigate("/intermediate-fatloss");
    } else if (goal === "endurance") {
      navigate("/intermediate-endurance");
    } else if (goal === "diet") {
      navigate("/intermediate-diet");
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

        <h1>Select Your Intermediate Goal</h1>

        <div className="goal-grid">

          {/* Muscle */}
          <div
            className="goal-card muscle"
            onClick={() => selectGoal("muscle")}
          >
            <h2>💪 Muscle Gain</h2>
            <p>Advanced strength training</p>
          </div>

          {/* Fatloss */}
          <div
            className="goal-card fatloss"
            onClick={() => selectGoal("fatloss")}
          >
            <h2>🔥 Fat Loss</h2>
            <p>Burn fat & stay lean</p>
          </div>

          {/* Endurance */}
          <div
            className="goal-card endurance"
            onClick={() => selectGoal("endurance")}
          >
            <h2>⚡ Endurance</h2>
            <p>Boost stamina & performance</p>
          </div>

          {/* Diet */}
          <div
            className="goal-card diet"
            onClick={() => selectGoal("diet")}
          >
            <h2>🥗 Diet Plan</h2>
            <p>Nutrition & meal planning</p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default IntermediatePage;