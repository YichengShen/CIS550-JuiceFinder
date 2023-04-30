import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import "./index.css";
import App from "./App";

function Main() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // <React.StrictMode>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
    // </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
