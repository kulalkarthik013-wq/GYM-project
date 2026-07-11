import React from "react";
import DashboardLayout from "../Components/DashboardLayout";

const ProPage = () => {
  const user = JSON.parse(localStorage.getItem("gymUser"));

  return (
    <DashboardLayout>
      <h1>Hello {user.name}, Welcome to Pro Workouts! 🔴</h1>
      <p>Age: {user.age} | Weight: {user.weight}kg | Height: {user.height}cm | BMI: {user.bmi}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Today's Advanced Routine:</h3>
        <ul>
          <li>HIIT 30 min ⚡</li>
          <li>Strength & Power Lifts: 40 min 🏋️‍♂️</li>
          <li>Core & Stability: 20 min 🤸‍♂️</li>
          <li>Stretching & Recovery: 15 min 🧘‍♂️</li>
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Pro Tip:</h3>
        <p>Push your limits safely. Track your performance and aim for small daily improvements!</p>
      </div>
    </DashboardLayout>
  );
};

export default ProPage;