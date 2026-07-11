import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";

const IntermediateShoulder = () => {

  // ✅ TIMER
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  // ✅ POPUP
  const [showPopup, setShowPopup] = useState(false);

  // ✅ EXERCISES
  const initialExercises = [
    // 🧱 SHOULDERS (6)
    { name: "Overhead Press", done: false },
    { name: "Lateral Raises", done: false },
    { name: "Front Raises", done: false },
    { name: "Arnold Press", done: false },
    { name: "Rear Delt Fly", done: false },
    { name: "Upright Row", done: false },

    // 🔥 CORE (4)
    { name: "Plank", done: false },
    { name: "Russian Twists", done: false },
    { name: "Leg Raises", done: false },
    { name: "Mountain Climbers", done: false },
  ];

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("shoulderWorkout");
    return saved ? JSON.parse(saved) : initialExercises;
  });

  // ✅ SAVE
  useEffect(() => {
    localStorage.setItem("shoulderWorkout", JSON.stringify(exercises));
  }, [exercises]);

  // ✅ TIMER RUN
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  // ✅ TOGGLE CHECKBOX
  const toggleExercise = (index) => {
    const updated = [...exercises];
    updated[index].done = !updated[index].done;
    setExercises(updated);
  };

  // ✅ CLOCK IN / OUT
  const handleTimer = () => {
    if (!running) {
      setRunning(true);
      setTime(0);
    } else {
      setRunning(false);

      if (time < 5400) {
        setShowPopup(true);
        return;
      }

      localStorage.removeItem("shoulderWorkout");
      window.location.reload();
    }
  };

  // ✅ TIME FORMAT
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <DashboardLayout>

      {/* 🔥 HEADER */}
      <div className="workout-header">

        <h1>🔥 Shoulder + Core Workout</h1>

        <div className="timer-box">
          <div className="time-display">
            ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
          </div>

          <button
            onClick={handleTimer}
            className={running ? "clock-out" : "clock-in"}
          >
            {running ? "🔴 Clock Out" : "🟢 Clock In"}
          </button>
        </div>

      </div>

      {/* 🧱 SHOULDER SECTION */}
      <h2 className="section-title">🧱 Shoulder Workouts</h2>

      <div className="exercise-list">
        {exercises.slice(0, 6).map((exercise, index) => (
          <div key={index} className="exercise-item">

            <input
              type="checkbox"
              checked={exercise.done}
              onChange={() => toggleExercise(index)}
            />

            <span className={exercise.done ? "done-text" : ""}>
              {exercise.name}
            </span>

            {exercise.done && <small className="completed">✔ Completed</small>}

          </div>
        ))}
      </div>

      {/* 🔥 CORE SECTION */}
      <h2 className="section-title">🔥 Core Workouts</h2>

      <div className="exercise-list">
        {exercises.slice(6, 10).map((exercise, index) => {
          const actualIndex = index + 6;

          return (
            <div key={actualIndex} className="exercise-item">

              <input
                type="checkbox"
                checked={exercise.done}
                onChange={() => toggleExercise(actualIndex)}
              />

              <span className={exercise.done ? "done-text" : ""}>
                {exercise.name}
              </span>

              {exercise.done && <small className="completed">✔ Completed</small>}

            </div>
          );
        })}
      </div>

      {/* 🚨 POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <h2>⚠ Workout Incomplete</h2>
            <p>Your workout isn’t complete yet 💪</p>
            <p>Finish strong next time 🔥</p>

            <div className="popup-buttons">

              <button
                className="continue-btn"
                onClick={() => {
                  setShowPopup(false);
                  setRunning(true);
                }}
              >
                Continue
              </button>

              <button
                className="end-btn"
                onClick={() => {
                  localStorage.removeItem("shoulderWorkout");
                  window.location.reload();
                }}
              >
                End Anyway
              </button>

            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default IntermediateShoulder;