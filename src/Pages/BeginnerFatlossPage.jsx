import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const BeginnerFatlossPage = () => {

  const navigate = useNavigate();

  // ✅ SAFE USER
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ CHECK GOAL
  const goal = localStorage.getItem("fitnessGoal");

  useEffect(() => {
    if (!user || goal !== "fatloss") {
      navigate("/goal-selection");
    }
  }, [user, goal, navigate]);

  if (!user) return null;

  // ✅ USER KEY (PER USER)
  const userKey = user?.id ? `user_${user.id}` : "guest";

  // ✅ GOAL KEY
  const goalKey = `${userKey}_fatloss`;

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
      alert("🎉 Fat Loss Program Completed!");
      newStreak = 0;
      newCompleted = 0;
    }

    localStorage.setItem(`streak_${goalKey}`, newStreak);
    localStorage.setItem(`completedWorkouts_${goalKey}`, newCompleted);
  };

  // ✅ HANDLE WORKOUT CLICK
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

        <div className="streak-card fatloss-streak">
          🔥 Fat Burn Streak  
          <h3>{streak} Days</h3>

          <p>
            {streak < 5 && "Start strong 💪"}
            {streak >= 5 && streak < 15 && "Great progress 🔥"}
            {streak >= 15 && "Beast mode ON 🐯"}
          </p>
        </div>

        <div className="progress-card">
          <p>Fat Loss Progress</p>

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
          <h3>HIIT Fat Burn</h3>
          <button onClick={() => handleWorkoutClick("HIIT Fat Burn", "/hiit-fat-burn")}>
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
        <h2 className="section-title">Fat Loss Training Programs</h2>

        <div className="workout-grid">

          {/* ✅ FIXED ROUTES */}
          <div className="workout-card" onClick={() => handleWorkoutClick("HIIT Fat Burn", "/hiit-fat-burn")}>
            🔥 HIIT Fat Burn
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Cardio Workout", "/beginner-cardio")}>
            🏃 Cardio Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Core Fat Burn", "/core-fat-burn")}>
            🧠 Core Fat Burn
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Full Body Burn", "/full-body-burn")}>
            💪 Full Body Burn
          </div>

          {/* OTHER WORKOUTS */}
          <div className="workout-card" onClick={() => handleWorkoutClick("Chest Fat Burn", "/beginner-chest")}>
            💪 Chest Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Back Fat Burn", "/beginner-back")}>
            🏋️ Back Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Biceps Fat Burn", "/beginner-biceps")}>
            🦾 Biceps Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Shoulder Fat Burn", "/beginner-shoulder")}>
            🧱 Shoulder Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Triceps Fat Burn", "/beginner-triceps")}>
            💥 Triceps Workout
          </div>

          <div className="workout-card" onClick={() => handleWorkoutClick("Leg Fat Burn", "/beginner-leg")}>
            🦵 Leg Workout
          </div>

          {/* WEEKLY */}
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

export default BeginnerFatlossPage;