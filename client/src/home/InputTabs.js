import React, { useState } from "react";
import { Box, Tabs, Tab, AppBar } from "@mui/material";
import PropTypes from "prop-types";
import StationInput from "./StationInput";
import PathInput from "./PathInput";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `input-tab-${index}`,
    "aria-controls": `input-tabpanel-${index}`,
  };
}

export default function InputTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Switch between map and pathfinding"
        >
          <Tab label="Find Stations" {...a11yProps(0)} />
          <Tab label="Plan Path" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <StationInput />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PathInput />
      </TabPanel>
    </Box>
  );
}

InputTabs.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  zip: PropTypes.string.isRequired,
  setZip: PropTypes.func.isRequired,
  streetAddress: PropTypes.string.isRequired,
  setStreetAddress: PropTypes.func.isRequired,
  maxDistance: PropTypes.number.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  chargingLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setChargingLevels: PropTypes.func.isRequired,
  preferredStationPorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPreferredStationPorts: PropTypes.func.isRequired,
  adapters: PropTypes.arrayOf(
    PropTypes.shape({
      vehiclePort: PropTypes.string.isRequired,
      stationPort: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAdapters: PropTypes.func.isRequired,
};
