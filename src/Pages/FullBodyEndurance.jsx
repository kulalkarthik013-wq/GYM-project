import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";

const FullBodyEndurance = () => {

  // ✅ SAFE USER
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.id) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Please login to start workout
      </div>
    );
  }

  // ✅ UNIQUE KEY
  const userKey = `workoutLogs_${user.id}`;

  // ✅ FULL BODY ENDURANCE WORKOUT
  const workouts = [
    { section: "Warm Up", name: "Jump Rope", detail: "3 min", rest: "20s" },
    { section: "Warm Up", name: "Dynamic Stretch", detail: "3 min", rest: "20s" },

    { section: "Workout", category: "Full Body", name: "Burpees", detail: "30 sec", rest: "15s" },
    { section: "Workout", category: "Full Body", name: "Push Ups", detail: "30 sec", rest: "15s" },
    { section: "Workout", category: "Full Body", name: "Squats", detail: "45 sec", rest: "15s" },
    { section: "Workout", category: "Full Body", name: "Mountain Climbers", detail: "30 sec", rest: "15s" },
    { section: "Workout", category: "Full Body", name: "Jump Lunges", detail: "30 sec", rest: "15s" },
    { section: "Workout", category: "Full Body", name: "Plank Jacks", detail: "30 sec", rest: "15s" },

    { section: "Core", name: "Plank", detail: "45 sec", rest: "20s" },
    { section: "Core", name: "Russian Twist", detail: "3 × 20", rest: "20s" },

    { section: "Cooldown", name: "Full Body Stretch", detail: "3 min", rest: "-" },
    { section: "Cooldown", name: "Breathing Exercise", detail: "2 min", rest: "-" }
  ];

  const [selectedSection, setSelectedSection] = useState("Warm Up");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [recordedTime, setRecordedTime] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);

  const goalTime = 2100; // ⏱ 35 mins

  const filteredWorkouts = workouts.filter(w => w.section === selectedSection);

  const groupedWorkouts = filteredWorkouts.reduce((acc, workout) => {
    const key = workout.category || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(workout);
    return acc;
  }, {});

  const toggleComplete = (exerciseName) => {
    setCompletedExercises(prev =>
      prev.includes(exerciseName)
        ? prev.filter(e => e !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  // ✅ TIMER
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const workoutPercent = Math.min(Math.floor((time / goalTime) * 100), 100);

  const formatTime = (date) => {
    if (!date) return "-";
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const handleClockToggle = () => {
    const now = new Date();

    if (!running) {
      setClockInTime(now);
      setRunning(true);
      setTime(0);
      setRecordedTime(null);
      return;
    }

    if (!clockInTime) {
      alert("Clock In first!");
      return;
    }

    setRunning(false);

    const durationSeconds = Math.floor((now - clockInTime) / 1000);

    if (durationSeconds <= 0) {
      alert("Invalid workout duration");
      return;
    }

    const newLog = {
      date: now.toISOString().split("T")[0],
      category: "Full Body Endurance",
      clockIn: formatTime(clockInTime),
      clockOut: formatTime(now),
      hours: durationSeconds,
      timestamp: Date.now()
    };

    const logs = JSON.parse(localStorage.getItem(userKey)) || [];
    logs.push(newLog);
    logs.sort((a, b) => b.timestamp - a.timestamp);

    localStorage.setItem(userKey, JSON.stringify(logs));

    // ✅ LAST WORKOUT UPDATE
    localStorage.setItem(`lastWorkout_user_${user.id}_endurance`, "Full Body");

    window.dispatchEvent(new Event("workoutUpdated"));

    setRecordedTime(durationSeconds);
    setTime(0);
    setClockInTime(null);

    alert("💪 Full Body workout logged!");
  };

  return (
    <DashboardLayout>
      <div className="mixed-container">

        <div className="workout-left">
          <h2 className="mixed-title">💪 Full Body Endurance</h2>

          <div className="section-buttons">
            <button onClick={() => setSelectedSection("Warm Up")}>Warm Up</button>
            <button onClick={() => setSelectedSection("Workout")}>Workout</button>
            <button onClick={() => setSelectedSection("Core")}>Core</button>
            <button onClick={() => setSelectedSection("Cooldown")}>Cooldown</button>
          </div>

          {selectedSection === "Workout" && (
            <h3 className="strength-hint">
              Train your whole body ⚡ endurance mode ON
            </h3>
          )}

          <div className="exercise-grid">
            {Object.keys(groupedWorkouts).map((group, gIndex) => (
              <div key={gIndex}>
                {selectedSection === "Workout" && (
                  <h3 className="muscle-heading">{group}</h3>
                )}

                <div className="exercise-card">
                  {groupedWorkouts[group].map((ex, index) => {
                    const completed = completedExercises.includes(ex.name);
                    return (
                      <div key={index} className="exercise-inside">
                        <div className="exercise-top">
                          <h4>{ex.name}</h4>
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => toggleComplete(ex.name)}
                          />
                        </div>

                        <div className="exercise-info">
                          <span>🏋 {ex.detail}</span>
                          <span>⏳ Rest: {ex.rest}</span>
                        </div>

                        <div className="exercise-footer">
                          {completed ? "✔ Completed" : "Mark when finished"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="timer-panel">
          <div className="timer-left">
            ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
          </div>

          <button
            className={running ? "clockout" : "clockin"}
            onClick={handleClockToggle}
          >
            {running ? "🔴 Clock Out" : "🟢 Clock In"}
          </button>

          {!running && recordedTime !== null && recordedTime < goalTime && (
            <div className="timer-message">
              {workoutPercent}% completed<br />⚠ Keep going!
            </div>
          )}

          {!running && recordedTime >= goalTime && (
            <div className="timer-message success">
              💪 Great job! Full Body completed!
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default FullBodyEndurance;