import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import gymBg from "../assets/gym4.jpg";
// ✅ SOUND IMPORTS (FIXED)
import startSoundFile from "../assets/sounds/start.mp3";
import tickSoundFile from "../assets/sounds/tick.mp3";
import endSoundFile from "../assets/sounds/end.mp3";

const BeginnerShoulder = () => {

  // ✅ GET USER FROM LOCAL STORAGE
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ BLOCK PAGE IF NOT LOGGED IN
  if (!user || !user.id) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Please login to start workout
      </div>
    );
  }

  // ✅ UNIQUE KEY PER USER (USING ID)
  const userKey = `workoutLogs_${user.id}`;
   // 🔥 TIMER FUNCTION (NEW)
    const getSeconds = (detail) => {
      if (detail.includes("min")) return parseInt(detail) * 60;
      if (detail.includes("sec")) return parseInt(detail);
      return 0;
    };
       // ✅ SOUND REFS (FIXED)
    const startSound = useRef(null);
    const tickSound = useRef(null);
    const endSound = useRef(null);
  
    useEffect(() => {
      startSound.current = new Audio(startSoundFile);
      tickSound.current = new Audio(tickSoundFile);
      endSound.current = new Audio(endSoundFile);
    }, []);

  const workouts = [
  { section: "Warm Up", name: "Arm Circles", detail: "2 min", rest: "20s", video: "https://www.youtube.com/embed/140RTNMciH8" },
  { section: "Warm Up", name: "Shoulder Rolls", detail: "2 min", rest: "20s", video: "https://www.youtube.com/embed/qEwKCR5JCog" },

  { section: "Strength", category: "Shoulder", name: "Overhead Press", detail: "4 × 12", rest: "30s", video: "https://www.youtube.com/embed/B-aVuyhvLHU" },
  { section: "Strength", category: "Shoulder", name: "Lateral Raises", detail: "3 × 15", rest: "30s", video: "https://www.youtube.com/embed/3VcKaXpzqRo" },
  { section: "Strength", category: "Shoulder", name: "Front Raises", detail: "3 × 12", rest: "30s", video: "https://www.youtube.com/embed/-t7fuZ0KhDA" },
  { section: "Strength", category: "Shoulder", name: "Arnold Press", detail: "3 × 10", rest: "30s", video: "https://www.youtube.com/embed/vj2w851ZHRM" },

  { section: "Core", name: "Plank", detail: "30 sec", rest: "20s", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
  { section: "Core", name: "Side Plank", detail: "2 × 20 sec", rest: "20s", video: "https://www.youtube.com/embed/K2VljzCC16g" },

  { section: "Cooldown", name: "Shoulder Stretch", detail: "2 min", rest: "-", video: "https://www.youtube.com/embed/3VcKaXpzqRo" },
  { section: "Cooldown", name: "Neck Stretch", detail: "2 min", rest: "-", video: "https://www.youtube.com/embed/X3-gKPNyrTA" }
];

  const [selectedSection, setSelectedSection] = useState("Warm Up");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [recordedTime, setRecordedTime] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);

 // 🔥 NEW TIMER STATES
   const [activeExercise, setActiveExercise] = useState(null);
   const [exerciseTime, setExerciseTime] = useState(0);
 
   const goalTime = 3600;
 
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

  // ✅ MAIN TIMER
    useEffect(() => {
      let timer;
      if (running) {
        timer = setInterval(() => setTime(prev => prev + 1), 1000);
      }
      return () => clearInterval(timer);
    }, [running]);
  
  
    // 🔥 EXERCISE TIMER
    // 🔥 EXERCISE TIMER WITH SOUNDS
  useEffect(() => {
    if (exerciseTime <= 0) return;
  
    const timer = setInterval(() => {
      setExerciseTime(prev => {
        const newTime = prev - 1;
  
        // 🔔 last 10 sec → STOP tick, play end sound
        if (newTime <= 10) {
          if (tickSound.current) {
            tickSound.current.pause();
            tickSound.current.currentTime = 0;
          }
  
          if (newTime === 10 && endSound.current) {
            endSound.current.currentTime = 0;
            endSound.current.play().catch(() => {});
          }
        } 
        // 🔊 normal ticking (only before 10 sec)
        else {
          if (tickSound.current) {
            tickSound.current.currentTime = 0;
            tickSound.current.play().catch(() => {});
          }
        }
  
        return newTime;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [exerciseTime]);
  

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

    // ✅ CLOCK IN
    if (!running) {
      setClockInTime(now);
      setRunning(true);
      setTime(0);
      setRecordedTime(null);
      return;
    }

    // ❌ SAFETY CHECK
    if (!clockInTime) {
      alert("Clock In first!");
      return;
    }

    setRunning(false);

    const durationSeconds = Math.max(
      0,
      Math.floor((now - clockInTime) / 1000)
    );

    if (durationSeconds <= 0) {
      alert("Invalid workout duration");
      return;
    }

    const newLog = {
      date: now.toISOString().split("T")[0],
      category: "Shoulder Workout",
      clockIn: formatTime(clockInTime),
      clockOut: formatTime(now),
      hours: durationSeconds,
      timestamp: Date.now(),
    };

    // ✅ SAVE ONLY FOR THIS USER
    const logs = JSON.parse(localStorage.getItem(userKey)) || [];

    logs.push(newLog);
    logs.sort((a, b) => b.timestamp - a.timestamp);

    localStorage.setItem(userKey, JSON.stringify(logs));

    console.log("Saved for:", userKey);

    // ✅ LAST WORKOUT
    localStorage.setItem(`lastWorkout_${user.id}`, "Shoulder Workout");

    // ✅ LIVE UPDATE
    window.dispatchEvent(new Event("workoutUpdated"));

    setRecordedTime(durationSeconds);
    setTime(0);
    setClockInTime(null);

    alert("Shoulder workout logged!");
  };

  return (
    <DashboardLayout noPadding={true}>
  <div
    style={{
      backgroundImage: `url(${gymBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100%",
    }}
  >
    <div className="mixed-container">

        <div className="workout-left">
          <h2 className="mixed-title">🧱 Beginner Shoulder Workout</h2>

          <div className="section-buttons">
            <button onClick={() => setSelectedSection("Warm Up")}>Warm Up</button>
            <button onClick={() => setSelectedSection("Strength")}>Strength</button>
            <button onClick={() => setSelectedSection("Core")}>Core</button>
            <button onClick={() => setSelectedSection("Cooldown")}>Cooldown</button>
          </div>

          {selectedSection === "Strength" && (
            <h3 className="strength-hint">
              Focus on shoulder strength & stability
            </h3>
          )}

          <div className="exercise-grid">
            {Object.keys(groupedWorkouts).map((group, gIndex)=> (
              <div key={gIndex}>
                {selectedSection === "Strength" && (
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
                       <iframe
                            className="exercise-video"
                            src={ex.video}
                            title={ex.name}
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>

                          {/* 🔥 START BUTTON */}
                          <button
                          onClick={() => {
                          // 🔊 play start sound
                          if (startSound.current) {
                            startSound.current.currentTime = 0;
                            startSound.current.play().catch(() => {});
                          }

                          setActiveExercise(ex.name);

                          // ⏳ wait 3 seconds before starting timer
                          setTimeout(() => {
                            setExerciseTime(getSeconds(ex.detail));
                          }, 3000);
                        }}
                        >
                          ▶ Start
                        </button>

                          {/* 🔥 TIMER DISPLAY */}
                          {activeExercise === ex.name && (
                            <div className="exercise-timer">
                              ⏱ {Math.floor(exerciseTime / 60)}:
                              {exerciseTime % 60 < 10 ? "0" : ""}
                              {exerciseTime % 60}
                            </div>
                          )}

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
                💪 Great job! Workout completed!
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeginnerShoulder;