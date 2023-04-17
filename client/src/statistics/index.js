import React, { useState } from "react";
import { Card } from "antd";

// import React, { useState, useEffect } from "react";
// import { Card, Col, Row } from "antd";

// import {c
//   // Form,
//   // FormInput,
//   // FormGroup,
//   Button,
//   Card,
//   CardBody,
//   CardTitle,
//   // Container,
// } from "shards-react";

import OverviewTab from "./OverviewTab";
import ElectricStationTab from "./ElectricStationTab";
import EVFriendlinessTab from "./EVFriendlinessTab";

// variable for tab list
const tabListNoTitle = [
  {
    key: "Overview",
    tab: "AFS Resources Overview",
  },
  {
    key: "ElectricStation",
    tab: "Electric Charging Stations",
  },
  {
    key: "EVFriendliness",
    tab: "EV Friendliness",
  },
];

const contentListNoTitle = {
  Overview: <OverviewTab />,
  ElectricStation: <ElectricStationTab />,
  EVFriendliness: <EVFriendlinessTab />,
};

function Statistics() {
  const [activeTabKey, setActiveTabKey] = useState("app");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div>
      <h1>Statistics</h1>
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        // tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTabChange}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </div>
  );
}

export default Statistics;
