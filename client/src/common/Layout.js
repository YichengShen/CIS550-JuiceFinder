import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Footer from "./Footer";
import ResponsiveAppBar from "./AppBar";

import { useHasMapGL } from "./HasMapGLContext";

function Layout({ children, toggleTheme }) {
  const { hasMapGL } = useHasMapGL();

  const getSx1 = () => {
    if (hasMapGL) {
      return { display: "flex", flexDirection: "column", height: "100vh" };
    }
    return {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    };
  };

  const getSx2 = () => {
    if (hasMapGL) {
      return { height: "calc(100% - 15px)", flexGrow: 1 };
    }
    return {
      minHeight: "calc(100% - 15px)",
      flexGrow: 1,
    };
  };

  return (
    <Box sx={getSx1()}>
      <ResponsiveAppBar toggleTheme={toggleTheme} />
      <Box sx={getSx2()}>{children}</Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Layout;
