import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { logEvent, isSupported } from "firebase/analytics";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import { analytics } from "../auth/Firebase";

function Landing({ toggleTheme }) {
  const theme = useTheme();
  useEffect(() => {
    // Log a page_view event when the HomePage component is mounted
    isSupported().then((yes) =>
      yes
        ? logEvent(analytics, "page_view", { page_title: "HomePage" })
        : () => {}
    );
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" sx={{ color: theme.palette.primary.main }}>
        Landing Page
      </Typography>
      <Button variant="contained" color="secondary" onClick={toggleTheme}>
        Click here to test Toggle Light/Dark Theme
      </Button>
    </Box>
  );
}

Landing.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default Landing;
