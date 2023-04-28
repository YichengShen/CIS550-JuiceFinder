import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { logEvent, isSupported } from "firebase/analytics";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RINGS from "vanta/dist/vanta.rings.min";

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

  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    // Function to initialize the Vanta effect
    const initVantaEffect = () => {
      if (myRef.current) {
        setVantaEffect(
          RINGS({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            backgroundColor: theme.palette.background.landing,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
          })
        );
      }
    };

    // If the Vanta effect doesn't exist, initialize it
    if (!vantaEffect) {
      initVantaEffect();
    } else {
      // If the Vanta effect exists, destroy it and reinitialize it to update the background color
      vantaEffect.destroy();
      initVantaEffect();
    }

    // Cleanup function to destroy the Vanta effect when the component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [theme]);

  return (
    <div
      ref={myRef}
      style={{
        backgroundColor: theme.palette.background.default,
        height: "calc(100vh - 95px)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              ml: theme.spacing(15),
              mt: theme.spacing(10),
              position: "relative",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: theme.palette.primary.main,
                fontSize: "15vh",
              }}
            >
              JuiceFinder
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                left: "50%",
                fontSize: "3vh",
              }}
            >
              Fuel your journey with JuiceFinder <br /> - where EV routes,
              charging stations, and food come together!
            </Typography>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                position: "absolute",
                left: "50%",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  color: theme.palette.text.primary,
                  mt: theme.spacing(2),
                  textTransform: "none",
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  boxShadow: `0 4px 6px 3px ${theme.palette.success.dark}`,
                  padding: theme.spacing(0, 8),
                  fontSize: "1.5rem",
                  transform: "translateX(-50%)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(45deg, ${theme.palette.success.light} 30%, ${theme.palette.info.light} 88%)`,
                    zIndex: -1,
                  },
                }}
              >
                Let&apos;s GO!
              </Button>
            </Link>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={toggleTheme}
            sx={{ height: 30 }}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

Landing.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default Landing;
