import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider } from "./auth/AuthContext";
import { HasMapGLProvider } from "./common/HasMapGLContext";
import WithAuthRedirect from "./common/WithAuthRedirect";
import Layout from "./common/Layout";
import Landing from "./landingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import HomePage from "./home";
import Statistics from "./statistics";
import Settings from "./settings";
import PopupTest from "./popups";

function App({ toggleTheme }) {
  return (
    <Router>
      <AuthProvider>
        <HasMapGLProvider>
          <Layout>
            <Routes>
              <Route
                exact
                path="/"
                element={<Landing toggleTheme={toggleTheme} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<HomePage hasMapGL />} />
              <Route path="/popup-test" element={<PopupTest />} />
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
          </Layout>
        </HasMapGLProvider>
      </AuthProvider>
    </Router>
  );
}

App.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default App;
