import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { Column } from "@ant-design/plots";

import SelectComponent from "./SelectComponent";
import serverConfig from "../config.json";

function afsByTypeStateFig() {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/afsByTypeState?stationType=All`
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: "state",
    yField: "numStations",
    isGroup: true,
    isStack: false,
    seriesField: "stype",
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}

function groupedChart() {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/afsByTypeState?stationType=electric`
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: "state",
    yField: "numStations",
    isGroup: true,
    isStack: true,
    seriesField: "stype",
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}

function OverviewTab() {
  return (
    <>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title1">
            Paragraph 1
            <div>
              {SelectComponent(
                "stationType",
                "Select AFS station type:",
                "Select station type"
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 1{afsByTypeStateFig()}</Card>
        </Col>
      </Row>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title2">
            Paragraph 2
            <div>
              {SelectComponent(
                "vehicleType",
                "Select light-duty vehicle type:",
                "Select vehicle type"
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 2{groupedChart()}</Card>
        </Col>
      </Row>
    </>
  );
}

export default OverviewTab;
