import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Footer from "./Footer";
import ResponsiveAppBar from "./AppBar";

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ResponsiveAppBar />
      <Box sx={{ minHeight: "calc(100% - 15px)", flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
