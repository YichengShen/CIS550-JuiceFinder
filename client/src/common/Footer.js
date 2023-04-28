import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function CircleButton({ initials, URL }) {
  const myTheme = useTheme();

  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: myTheme.palette.secondary.contrastText,
          backgroundColor: myTheme.palette.secondary.main,
          "&:hover": {
            backgroundColor: myTheme.palette.secondary.light,
          },
          borderRadius: "50%",
          width: "26px",
          height: "26px",
          marginRight: "8px",
        }}
      >
        <Typography variant="body2" color="inherit">
          {initials}
        </Typography>
      </Box>
    </a>
  );
}
CircleButton.propTypes = {
  initials: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired,
};

function Footer() {
  const myTheme = useTheme();

  return (
    <Box
      sx={{
        height: "15px",
        pt: myTheme.spacing(2),
        pb: myTheme.spacing(2),
        backgroundColor: myTheme.palette.primary.main,
        color: myTheme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="body1" align="left" sx={{ ml: myTheme.spacing(3) }}>
        Copyright © {new Date().getFullYear()} JuiceFinder
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", mr: myTheme.spacing(3) }}
      >
        <Typography
          variant="body1"
          sx={{ display: "inline", mr: myTheme.spacing(1) }}
        >
          Contributors:
        </Typography>
        <CircleButton
          initials="CL"
          URL="https://github.com/AdvisorChuanChuan"
        />
        <CircleButton initials="WL" URL="https://github.com/lewei22" />
        <CircleButton initials="YS" URL="https://www.yichengshen.com" />
        <CircleButton initials="ZL" URL="https://github.com/lizyn" />
      </Box>
    </Box>
  );
}

export default Footer;
