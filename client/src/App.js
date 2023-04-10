import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import WithAuthRedirect from "./common/WithAuthRedirect";
import Landing from "./landingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Map from "./map";
import Statistics from "./statistics";
import Settings from "./settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<Map />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route
            path="/settings"
            element={
              <WithAuthRedirect>
                <Settings />
              </WithAuthRedirect>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
