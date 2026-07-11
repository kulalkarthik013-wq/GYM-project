import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";
import PublicHeader from "../Components/PublicHeader.jsx";
import PublicFooter from "../Components/PublicFooter.jsx";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 // ✅ ADD THIS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin Login
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        alert("Admin Login Successful ✅");
        navigate("/admin");
      } else {
        alert("Invalid Admin Credentials ❌");
      }
      return;
    }

    // User Login
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (data.message === "Login successful ✅") {

        localStorage.setItem("gymUser", JSON.stringify(data.user));
        alert(data.message);

        navigate("/user");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Cannot connect to server ❌");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>

      {/* Header */}
      <PublicHeader />

      {/* Main Content */}
      <main style={{flex:1}}>

        <div className="login-container">

        
          <div className="login-card">
            <h1 className="login-title">GymExpert 💪</h1>

            {!role && (
              <div className="role-container">

                <div
                  className="role-card"
                  onClick={() => setRole("admin")}
                >
                  <FaUserShield className="role-icon" />
                  <h3>Admin Login</h3>
                  <p>Manage gym members</p>
                </div>

                <div
                  className="role-card"
                  onClick={() => setRole("user")}
                >
                  <FaUser className="role-icon" />
                  <h3>User Login</h3>
                  <p>Access your workouts</p>
                </div>

              </div>
            )}

            {role && (
              <>
                <button
                  className="back-role"
                  onClick={() => setRole(null)}
                >
                  ← Change Role
                </button>

                <form className="login-form" onSubmit={handleSubmit}>

                  <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>

                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />

                  <button type="submit" className="login-btn">
                    Login
                  </button>

                  {role === "user" && (
                    <div className="login-links">
                      <p onClick={() => navigate("/signup")}>
                        Create Account
                      </p>

                      <p onClick={() => navigate("/forgot-password")}>
                        Forgot Password?
                      </p>
                    </div>
                  )}

                </form>
              </>
            )}

          </div>
        </div>

      </main>

      {/* Footer */}
      <PublicFooter />

    </div>
  );
}

export default Login;