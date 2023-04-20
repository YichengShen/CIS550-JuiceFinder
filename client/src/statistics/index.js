/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import .js files, each page will be rendered when the tab was toggled
import OverviewTab from "./OverviewTab";
import ElectricStationTab from "./ElectricStationTab";
import EVFriendlinessTab from "./EVFriendlinessTab";

// functions required by MUI-tab component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// statistics page
function Statistics() {
  // use theme for this page
  const theme = useTheme();

  // state varirable for tab toggling
  const [value, setValue] = React.useState(0);
  // handler for tan toggling
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
        Statistics
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: theme.palette.secondary.main }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab
            label="AFS Resources Overview"
            {...a11yProps(0)}
            sx={{ color: theme.palette.primary.main }}
          />
          <Tab
            label="Electric Charging Stations"
            {...a11yProps(1)}
            sx={{ color: theme.palette.primary.main }}
          />
          <Tab
            label="EV Friendliness"
            {...a11yProps(2)}
            sx={{ color: theme.palette.primary.main }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ElectricStationTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EVFriendlinessTab />
      </TabPanel>
    </Box>
  );
}

export default Statistics;
