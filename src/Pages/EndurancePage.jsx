import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const EndurancePage = () => {

  const navigate = useNavigate();

  // ✅ USER
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ GOAL
  const goal = localStorage.getItem("fitnessGoal");

  // ✅ FIXED REDIRECT LOGIC
  useEffect(() => {
    if (!user) {
      navigate("/goal-selection");
      return;
    }

    if (goal !== "endurance") {
      navigate("/goal-selection");
    }
  }, [user, goal, navigate]);

  // ✅ FIXED BLANK SCREEN
  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  // ✅ USER KEY
  const userKey = user?.id ? `user_${user.id}` : "guest";
  const goalKey = `${userKey}_endurance`;

  const totalWorkouts = 8;

  const completedWorkouts =
    parseInt(localStorage.getItem(`completedWorkouts_${goalKey}`)) || 0;

  const progress = (completedWorkouts / totalWorkouts) * 100;

  const streak =
    parseInt(localStorage.getItem(`streak_${goalKey}`)) || 0;

  const [lastWorkout, setLastWorkout] = useState(
    localStorage.getItem(`lastWorkout_${goalKey}`)
  );

  // ✅ STREAK UPDATE
  const updateStreak = () => {
    let newStreak = streak + 1;
    let newCompleted = completedWorkouts + 1;

    if (newStreak >= totalWorkouts) {
      alert("🎉 Endurance Program Completed!");
      newStreak = 0;
      newCompleted = 0;
    }

    localStorage.setItem(`streak_${goalKey}`, newStreak);
    localStorage.setItem(`completedWorkouts_${goalKey}`, newCompleted);
  };

  // ✅ CLICK HANDLER
  const handleWorkoutClick = (name, route) => {
    updateStreak();

    localStorage.setItem(`lastWorkout_${goalKey}`, name);
    setLastWorkout(name);

    navigate(route);
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="beginner-header">
        <h2>Hello {user.name} 👋</h2>
        <p>
          Age: {user.age} | Weight: {user.weight}kg | Height: {user.height}cm | BMI: {user.bmi}
        </p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="streak-card">
          🔥 Endurance Streak  
          <h3>{streak} / 8</h3>
        </div>

        <div className="progress-card">
          <p>Endurance Progress</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <small>{completedWorkouts} / {totalWorkouts} Completed</small>
        </div>
      </div>

      {/* RECOMMENDED */}
      <div className="recommend-container">

        <div className="recommend-card">
          ⭐ Recommended For You Today
          <h3>HIIT Endurance</h3>
          <button onClick={() => handleWorkoutClick("HIIT Endurance", "/endurance-hiit")}>
            Start Workout →
          </button>
        </div>

        <div className="previous-card">
          ⏱ Previous Workout
          {lastWorkout ? <h3>{lastWorkout}</h3> : <p>No workout yet</p>}
        </div>
      </div>

      {/* WORKOUT GRID */}
      <div style={{ marginTop: "35px" }}>
        <h2 className="section-title">Endurance Training Programs</h2>

        <div className="workout-grid">

          <div className="workout-card" onClick={() => handleWorkoutClick("HIIT Endurance", "/endurance-hiit")}>
            🔥 HIIT Endurance
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Running", "/endurance-running")}>
            🏃 Running
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Cycling", "/endurance-cycling")}>
            🚴 Cycling
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Full Body Endurance", "/endurance-fullbody")}>
            💪 Full Body Endurance
          </div>

          <div className="workout-card weekly-progress-card" onClick={() => navigate("/weekly-progress")}>
            📊 Weekly Progress
          </div>

          <div className="workout-card achievement-card" onClick={() => navigate("/achievements")}>
            🏆 Achievements
          </div>

        </div>
      </div>

    </DashboardLayout>
  );
};

export default EndurancePage;