import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";

const IntermediateBack = () => {

  // ✅ TIMER
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  // ✅ POPUP
  const [showPopup, setShowPopup] = useState(false);

  // ✅ EXERCISES
  const initialExercises = [
    // 🏋️ BACK
    { name: "Pull Ups", done: false },
    { name: "Lat Pulldown", done: false },
    { name: "Seated Cable Row", done: false },
    { name: "Deadlift", done: false },

    // 🦾 BICEPS
    { name: "Barbell Curl", done: false },
    { name: "Dumbbell Curl", done: false },
    { name: "Hammer Curl", done: false },
    { name: "Concentration Curl", done: false },
  ];

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("backWorkout");
    return saved ? JSON.parse(saved) : initialExercises;
  });

  // ✅ SAVE
  useEffect(() => {
    localStorage.setItem("backWorkout", JSON.stringify(exercises));
  }, [exercises]);

  // ✅ TIMER RUN
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  // ✅ TOGGLE
  const toggleExercise = (index) => {
    const updated = [...exercises];
    updated[index].done = !updated[index].done;
    setExercises(updated);
  };

  // ✅ CLOCK
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

      localStorage.removeItem("backWorkout");
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

        <h1>🏋️ Back + Biceps Workout</h1>

        <div className="timer-box">

          <div className="time-display">
            <p>
              ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
            </p>
          </div>

          <button
            onClick={handleTimer}
            className={running ? "clock-out" : "clock-in"}
          >
            {running ? "🔴 Clock Out" : "🟢 Clock In"}
          </button>

        </div>

      </div>

      {/* 💪 EXERCISES */}
      <div className="exercise-list">

        {exercises.map((exercise, index) => (
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

      {/* 🚨 POPUP */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">
            <h2>⚠ Workout Incomplete</h2>
            <p>Your workout isn’t complete yet 💪</p>
            <p>Push harder and finish strong next time 🔥</p>

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
                  localStorage.removeItem("backWorkout");
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

export default IntermediateBack;