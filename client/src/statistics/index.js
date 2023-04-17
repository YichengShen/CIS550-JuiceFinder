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

// variable for tab list
const tabListNoTitle = [
  {
    key: "Overview",
    tab: "AFS Resources Overview",
  },
  {
    key: "Tab2",
    tab: "Tab2",
  },
  {
    key: "Tab3",
    tab: "Tab3",
  },
];

const contentListNoTitle = {
  Overview: <OverviewTab />,
  Tab2: <p>Under construction</p>,
  Tab3: <p>Under construction</p>,
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
