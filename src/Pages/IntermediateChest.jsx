import React, { useState, useEffect } from "react";
import DashboardLayout from "../Components/DashboardLayout";

const IntermediateChest = () => {

  // ✅ TIMER
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  // ✅ POPUP
  const [showPopup, setShowPopup] = useState(false);

  // ✅ EXERCISES
  const initialExercises = [
    { name: "Bench Press", done: false },
    { name: "Incline Dumbbell Press", done: false },
    { name: "Chest Fly", done: false },
    { name: "Push Ups", done: false },

    { name: "Tricep Dips", done: false },
    { name: "Tricep Pushdown", done: false },
    { name: "Overhead Tricep Extension", done: false },
    { name: "Close Grip Bench Press", done: false },
  ];

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("chestWorkout");
    return saved ? JSON.parse(saved) : initialExercises;
  });

  // ✅ SAVE PROGRESS
  useEffect(() => {
    localStorage.setItem("chestWorkout", JSON.stringify(exercises));
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

      // ⏱ 1hr 30min = 5400 sec
      if (time < 5400) {
        setShowPopup(true);
        return;
      }

      // ✅ RESET
      localStorage.removeItem("chestWorkout");
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

        <h1>💪 Chest + Triceps Workout</h1>

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
                  localStorage.removeItem("chestWorkout");
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

export default IntermediateChest;