import { FaDumbbell, FaHeartbeat, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../Components/PublicHeader.jsx";
import PublicFooter from "../Components/PublicFooter.jsx";

function GetStarted() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* Header */}
      <PublicHeader />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <div className="getstarted-container">
          <h1 className="title">Gym Expert</h1>

          <p className="subtitle">
            Unleash your <span className="highlight">power</span>.
            Transform your <span className="highlight">body</span>.
            Become <span className="highlight">unstoppable</span>.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Join Now
          </button>

          <div className="features">

            <div className="card">
              <FaDumbbell className="icon" size={40} color="#ff512f" />
              <h3>Muscle Training</h3>
              <p>Build muscle with professional gym trainers.</p>
            </div>

            <div className="card">
              <FaHeartbeat className="icon" size={40} color="#19f05d" />
              <h3>Health & Fitness</h3>
              <p>Improve stamina and overall health.</p>
            </div>

            <div className="card">
              <FaUsers className="icon" size={40} color="#ff7b2c" />
              <h3>Expert Trainers</h3>
              <p>Train with certified professionals.</p>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />

    </div>
  );
}

export default GetStarted;