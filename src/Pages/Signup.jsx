import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../Components/PublicHeader.jsx";
import Footer from "../Components/PublicFooter.jsx";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const calculateBMI = (w, h) => {
    if (w && h) {
      const heightInMeters = h / 100;
      const bmiValue = (w / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const handleWeight = (e) => {
    const w = e.target.value;
    setWeight(w);
    calculateBMI(w, height);
  };

  const handleHeight = (e) => {
    const h = e.target.value;
    setHeight(h);
    calculateBMI(weight, h);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (!profilePic) {
      alert("Please upload profile picture ❌");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("username", username);
      formData.append("age", age);
      formData.append("weight", weight);
      formData.append("height", height);
      formData.append("bmi", bmi);
      formData.append("password", password);
      formData.append("profilePic", profilePic);

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      alert(data.message);

      if (data.message === "Account created successfully") {
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div>
      {/* ✅ Add pre-login header */}
      <PublicHeader />

      {/* ✅ Existing signup code stays exactly the same */}
      <div className="signup-container">

        

        <div className="signup-card">

          <h1>Create Account</h1>

          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={handleWeight}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeight}
                  required
                />
              </div>

              <div className="form-group">
                <label>BMI</label>
                <input
                  type="text"
                  value={bmi}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <label>Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setProfilePic(e.target.files[0])}
            />

            <div style={{ textAlign: "center", marginTop: "20px" }}>
             <button type="submit">Save</button>
            </div>

          </form>

        </div>
      </div>

      {/* ✅ Add pre-login footer */}
      <Footer />
    </div>
  );
}

export default Signup;