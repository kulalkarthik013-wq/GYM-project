import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./Pages/GetStarted.jsx";
import Login from "./Pages/Login.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import Signup from "./Pages/Signup.jsx";
import Profile from "./Pages/Profile.jsx";

// ⭐ Import new pages
import GoalSelection from "./Pages/GoalSelection";
import BeginnerPage from "./Pages/BeginnerPage.jsx";
import IntermediatePage from "./Pages/IntermediatePage.jsx";
import ProPage from "./Pages/ProPage.jsx";
import BeginnerMixed from "./Pages/BeginnerMixed";
import BeginnerChest from "./Pages/BeginnerChest";
import BeginnerBack from "./Pages/BeginnerBack";
import BeginnerBiceps from "./Pages/BeginnerBiceps";
import BeginnerShoulder from "./Pages/BeginnerShoulder";
import BeginnerTriceps from "./Pages/BeginnerTriceps";
import BeginnerLeg from "./Pages/BeginnerLeg";
import BeginnerCardio from "./Pages/BeginnerCardio";
import WeeklyProgress from "./Pages/WeeklyProgress";
import BeginnerFatlossPage from "./Pages/BeginnerFatlossPage";
import HiitFatBurn from "./Pages/HiitFatBurn";
import CoreFatBurn from "./Pages/CoreFatBurn";
import FullBodyBurn from "./Pages/FullBodyBurn";
import EndurancePage from "./Pages/EndurancePage";
import HiitEndurance from "./Pages/HiitEndurance";
import RunningEndurance from "./Pages/RunningEndurance";
import CyclingEndurance from "./Pages/CyclingEndurance";
import FullBodyEndurance from "./Pages/FullBodyEndurance";
import IntermediateMuscleGain from "./Pages/IntermediateMuscleGain";
import IntermediateChest from "./Pages/IntermediateChest";
import IntermediateBack from "./Pages/IntermediateBack";
import IntermediateLeg from "./Pages/IntermediateLeg";
import IntermediateShoulder from "./Pages/IntermediateShoulder";


function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* Main Pages */}
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* User Level */}
          <Route path="/goal-selection" element={<GoalSelection />} />
          <Route path="/beginner" element={<BeginnerPage />} />
          <Route path="/intermediate" element={<IntermediatePage />} />
          <Route path="/pro" element={<ProPage />} />

          {/* Beginner */}
          <Route path="/beginner-mixed" element={<BeginnerMixed />} />
          <Route path="/beginner-chest" element={<BeginnerChest />} />
          <Route path="/beginner-back" element={<BeginnerBack />} />
          <Route path="/beginner-biceps" element={<BeginnerBiceps />} />
          <Route path="/beginner-shoulder" element={<BeginnerShoulder />} />
          <Route path="/beginner-triceps" element={<BeginnerTriceps />} />
          <Route path="/beginner-leg" element={<BeginnerLeg />} />
          <Route path="/beginner-cardio" element={<BeginnerCardio />} />
          <Route path="/weekly-progress" element={<WeeklyProgress />} />
          <Route path="/beginner-fatloss" element={<BeginnerFatlossPage />} />

          {/* Fat Loss */}
          <Route path="/hiit-fat-burn" element={<HiitFatBurn />} />
          <Route path="/core-fat-burn" element={<CoreFatBurn />} />
          <Route path="/full-body-burn" element={<FullBodyBurn />} />

          {/* Endurance */}
          <Route path="/beginner-endurance" element={<EndurancePage />} />
          <Route path="/endurance-hiit" element={<HiitEndurance />} />
          <Route path="/endurance-running" element={<RunningEndurance />} />
          <Route path="/endurance-cycling" element={<CyclingEndurance />} />
          <Route path="/endurance-fullbody" element={<FullBodyEndurance />} />

          {/* Intermediate */}
          <Route path="/intermediate-muscle" element={<IntermediateMuscleGain />} />
          <Route path="/intermediate-chest" element={<IntermediateChest />} />
          <Route path="/intermediate-back" element={<IntermediateBack />} />
          <Route path="/intermediate-leg" element={<IntermediateLeg />} />
          <Route path="/intermediate-shoulder" element={<IntermediateShoulder />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;