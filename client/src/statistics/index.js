import React from "react";

import { Tabs, Typography } from "antd";

// import three js files for tab menu
import OverviewTab from "./OverviewTab";

import ElectricStationTab from "./ElectricStationTab";

import EVFriendlinessTab from "./EVFriendlinessTab";

const { TabPane } = Tabs;
const { Title } = Typography;

// statistics page
function Statistics() {
  return (
    <div>
      <Title>Statistics</Title>
      <Tabs defaultActiveKey="Overview">
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
