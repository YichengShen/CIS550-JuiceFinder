import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Footer from "./Footer";
import ResponsiveAppBar from "./AppBar";

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ResponsiveAppBar />
      <Box sx={{ height: "calc(100% - 15px)", flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
