import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider } from "./auth/AuthContext";
import WithAuthRedirect from "./common/WithAuthRedirect";
import Landing from "./landingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Map from "./map";
import Statistics from "./statistics";
import Settings from "./settings";

function App({ toggleTheme }) {
  // console.log("trigger client tests. Can safely delete this line later.");
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={<Landing toggleTheme={toggleTheme} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<Map />} />
          <Route
            path="/statistics"
            element={<Statistics toggleTheme={toggleTheme} />}
          />
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

App.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default App;
