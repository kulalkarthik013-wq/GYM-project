import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const BeginnerPage = () => {

  const navigate = useNavigate();

  // ✅ USER
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ GOAL
  const goal = localStorage.getItem("fitnessGoal");

  // ✅ ONLY USER CHECK
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // ✅ VERY IMPORTANT: NO REDIRECT HERE
  // ONLY SHOW MESSAGE
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

  // ✅ KEYS
  const userKey = user?.id ? `user_${user.id}` : "guest";
  const goalKey = `${userKey}_muscle`;

  const totalWorkouts = 8;

  const completedWorkouts =
    parseInt(localStorage.getItem(`completedWorkouts_${goalKey}`)) || 0;

  const progress = (completedWorkouts / totalWorkouts) * 100;

  const streak =
    parseInt(localStorage.getItem(`streak_${goalKey}`)) || 0;

  const [lastWorkout, setLastWorkout] = useState(
    localStorage.getItem(`lastWorkout_${goalKey}`)
  );

  // ✅ UPDATE STREAK
  const updateStreak = () => {
    let newStreak = streak + 1;
    let newCompleted = completedWorkouts + 1;

    if (newStreak >= totalWorkouts) {
      alert("🎉 Muscle Gain Program Completed!");
      newStreak = 0;
      newCompleted = 0;
    }

    localStorage.setItem(`streak_${goalKey}`, newStreak);
    localStorage.setItem(`completedWorkouts_${goalKey}`, newCompleted);
  };

  // ✅ CLICK
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
        <h2>Hello {user?.name || "User"} 👋</h2>
        <p>
          Age: {user?.age || "-"} | Weight: {user?.weight || "-"}kg | Height: {user?.height || "-"}cm | BMI: {user?.bmi || "-"}
        </p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="streak-card muscle-streak">
          🔥 Muscle Gain Streak  
          <h3>{streak} Days</h3>

          <p>
            {streak < 5 && "Start lifting 💪"}
            {streak >= 5 && streak < 15 && "Getting stronger 🔥"}
            {streak >= 15 && "Beast mode ON 🦁"}
          </p>
        </div>

        <div className="progress-card">
          <p>Muscle Gain Progress</p>

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
          <h3>Chest Workout</h3>
          <button onClick={() => handleWorkoutClick("Chest Workout", "/beginner-chest")}>
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
        <h2 className="section-title">Muscle Gain Training Programs</h2>

        <div className="workout-grid">

          <div className="workout-card" onClick={() => handleWorkoutClick("Mixed Workout", "/beginner-mixed")}>
            🏋️ Mixed Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Chest Workout", "/beginner-chest")}>
            💪 Chest Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Back Workout", "/beginner-back")}>
            🏋️ Back Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Biceps Workout", "/beginner-biceps")}>
            🦾 Biceps Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Shoulder Workout", "/beginner-shoulder")}>
            🧱 Shoulder Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Triceps Workout", "/beginner-triceps")}>
            💥 Triceps Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Leg Workout", "/beginner-leg")}>
            🦵 Leg Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Cardio", "/beginner-cardio")}>
            🏃 Cardio
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

export default BeginnerPage;