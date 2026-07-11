import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const IntermediateMuscleGain = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const goal = localStorage.getItem("fitnessGoal");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  if (goal !== "muscle") {
    return (
      <DashboardLayout>
        <div style={{ padding: "20px" }}>
          <h2>⚠️ Please select Muscle Gain goal</h2>
          <button onClick={() => navigate("/goal-selection")}>
            Go to Goal Selection
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const userKey = user?.id ? `user_${user.id}` : "guest";
  const goalKey = `${userKey}_muscle`;

  const totalWorkouts = 12;

  const completedWorkouts =
    parseInt(localStorage.getItem(`completedWorkouts_${goalKey}`)) || 0;

  const progress = (completedWorkouts / totalWorkouts) * 100;

  const streak =
    parseInt(localStorage.getItem(`streak_${goalKey}`)) || 0;

  const [lastWorkout, setLastWorkout] = useState(
    localStorage.getItem(`lastWorkout_${goalKey}`)
  );

  const updateStreak = () => {
    let newStreak = streak + 1;
    let newCompleted = completedWorkouts + 1;

    if (newStreak >= totalWorkouts) {
      alert("🔥 Intermediate Program Completed!");
      newStreak = 0;
      newCompleted = 0;
    }

    localStorage.setItem(`streak_${goalKey}`, newStreak);
    localStorage.setItem(`completedWorkouts_${goalKey}`, newCompleted);
  };

  const handleWorkoutClick = (name, route) => {
    updateStreak();
    localStorage.setItem(`lastWorkout_${goalKey}`, name);
    setLastWorkout(name);
    navigate(route);
  };

  return (
    <DashboardLayout>

      <div className="int-header">
        <h1>🔥 Intermediate Muscle Builder</h1>
        <p>Push your limits. Build real strength.</p>
      </div>

      <div className="int-stats">

        <div className="int-card">
          <h3>🔥 Streak</h3>
          <p>{streak} Days</p>
        </div>

        <div className="int-card">
          <h3>📊 Progress</h3>
          <div className="bar">
            <div className="fill" style={{ width: `${progress}%` }}></div>
          </div>
          <small>{completedWorkouts}/{totalWorkouts}</small>
        </div>

        <div className="int-card">
          <h3>⏱ Last Workout</h3>
          <p>{lastWorkout || "None"}</p>
        </div>

      </div>

      <div className="int-recommend">
        <h2>⭐ Recommended Today</h2>
        <button onClick={() => handleWorkoutClick("Back + Biceps", "/intermediate-back")}>
          Start Back + Biceps →
        </button>
      </div>

      <div className="int-grid">

        <div onClick={() => handleWorkoutClick("Chest + Triceps", "/intermediate-chest")} className="int-workout">
          💪 Chest + Triceps
        </div>

        <div onClick={() => handleWorkoutClick("Back + Biceps", "/intermediate-back")} className="int-workout">
          🏋️ Back + Biceps
        </div>

        <div onClick={() => handleWorkoutClick("Leg Day", "/intermediate-leg")} className="int-workout">
          🦵 Leg Day
        </div>

        <div onClick={() => handleWorkoutClick("Shoulders + Core", "/intermediate-shoulder")} className="int-workout">
          🔥 Shoulders + Core
        </div>
        <div onClick={() => handleWorkoutClick("Cardio","/intermediate-cardio")} className="int-workout">
          🏃 Cardio Blast
        </div>
        <div onClick={() => handleWorkoutClick("Activity Tracker","/intermediate-activity tracker")} className="int-workout">
          📈 Activity Tracker
        </div>
      </div>

    </DashboardLayout>
  );
};

export default IntermediateMuscleGain;