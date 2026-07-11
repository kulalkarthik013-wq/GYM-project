import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import gymBg from "../assets/gym4.jpg";
// ✅ SOUND IMPORTS (FIXED)
import startSoundFile from "../assets/sounds/start.mp3";
import tickSoundFile from "../assets/sounds/tick.mp3";
import endSoundFile from "../assets/sounds/end.mp3";
const BeginnerLeg = () => {

  // ✅ GET USER
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ BLOCK IF NOT LOGGED IN
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
  { section: "Warm Up", name: "Jumping Jacks", detail: "2 min", rest: "20s", video: "https://www.youtube.com/embed/c4DAnQ6DtF8" },
  { section: "Warm Up", name: "High Knees", detail: "2 min", rest: "20s", video: "https://www.youtube.com/embed/OAJ_J3EZkdY" },

  { section: "Strength", category: "Legs", name: "Squats", detail: "4 × 12", rest: "30s", video: "https://www.youtube.com/embed/aclHkVaku9U" },
  { section: "Strength", category: "Legs", name: "Lunges", detail: "3 × 10 each leg", rest: "30s", video: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
  { section: "Strength", category: "Legs", name: "Leg Press", detail: "3 × 12", rest: "30s", video: "https://www.youtube.com/embed/IZxyjW7MPJQ" },
  { section: "Strength", category: "Legs", name: "Calf Raises", detail: "3 × 15", rest: "30s", video: "https://www.youtube.com/embed/-M4-G8p8fmc" },

  { section: "Core", name: "Plank", detail: "30 sec", rest: "20s", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
  { section: "Core", name: "Leg Raises", detail: "3 × 12", rest: "20s", video: "https://www.youtube.com/embed/l4kQd9eWclE" },

  { section: "Cooldown", name: "Hamstring Stretch", detail: "2 min", rest: "-", video: "https://www.youtube.com/embed/2MJGg-dUKh0" },
  { section: "Cooldown", name: "Kneeling Quad Stretch", detail: "2 min", rest: "-",   video: "https://www.youtube.com/embed/uWTysf0TAkg"}
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

  // ✅ TIMER
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
      category: "Leg Workout",
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
    localStorage.setItem(`lastWorkout_${user.id}`, "Leg Workout");

    // ✅ UPDATE WEEKLY PAGE
    window.dispatchEvent(new Event("workoutUpdated"));

    setRecordedTime(durationSeconds);
    setTime(0);
    setClockInTime(null);

    alert("Leg workout logged!");
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
          <h2 className="mixed-title">🦵 Beginner Leg Workout</h2>

          <div className="section-buttons">
            <button onClick={() => setSelectedSection("Warm Up")}>Warm Up</button>
            <button onClick={() => setSelectedSection("Strength")}>Strength</button>
            <button onClick={() => setSelectedSection("Core")}>Core</button>
            <button onClick={() => setSelectedSection("Cooldown")}>Cooldown</button>
          </div>

          {selectedSection === "Strength" && (
            <h3 className="strength-hint">Focus on lower body strength</h3>
          )}

          <div className="exercise-grid">
            {Object.keys(groupedWorkouts).map((group, gIndex) => (
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

export default BeginnerLeg;