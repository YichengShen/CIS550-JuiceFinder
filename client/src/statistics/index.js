import React from "react";

// import PropTypes from 'prop-types';
// import { Box, Tab, Tabs, Typography } from "@mui/material";

// import { useTheme } from "@mui/material/styles";
// const theme = useTheme();

import { Tabs, Typography } from "antd";

// import three js files for tab menu
import OverviewTab from "./OverviewTab";

import ElectricStationTab from "./ElectricStationTab";

import EVFriendlinessTab from "./EVFriendlinessTab";

const { TabPane } = Tabs;
const { Title } = Typography;

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// statistics page
function Statistics() {
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div>
      {/* <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="AFS Resources Overview" value="1" />
            <Tab label="Electric Charging Stations" value="2" />
            <Tab label="EV Friendliness" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OverviewTab />
        </TabPanel>
        <TabPanel value="2">
          <ElectricStationTab />
        </TabPanel>
        <TabPanel value="3">
          <EVFriendlinessTab /> 
        </TabPanel>
      </TabContext>
    </Box> */}
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="AFS Resources Overview"  value="1" />
          <Tab label="Electric Charging Stations"  value="2" />
          <Tab label="EV Friendliness"  value="3" />
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
      </TabPanel> */}

      <Title>Statistics</Title>
      <Tabs>
        <TabPane tab="AFS Resources Overview" key="Overview">
          <OverviewTab />
        </TabPane>
        <TabPane tab="Electric Charging Stations" key="ElectricStation">
          <ElectricStationTab />
        </TabPane>
        <TabPane tab="EVFriendliness" key="EVFriendliness">
          <EVFriendlinessTab />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Statistics;
