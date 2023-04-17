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

function ElectricStationTab() {
  return (
    <>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title3">
            Paragraph 3
            <div>
              {SelectComponent("state", "Select state:", "Select state")}
            </div>
            <div>
              {SelectComponent("port", "Select port:", "Select port_1")}
            </div>
            <div>
              {SelectComponent("port", "Select port:", "Select port_2")}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 3{afsByTypeStateFig()}</Card>
        </Col>
      </Row>

      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title4">
            Paragraph 4
            <div>
              {SelectComponent("state", "Select state:", "Select state")}
            </div>
            <div>
              {SelectComponent(
                "speed",
                "Select charging speed level:",
                "Select speed_1"
              )}
            </div>
            <div>
              {SelectComponent(
                "speed",
                "Select charging speed level:",
                "Select speed_2"
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 4{groupedChart()}</Card>
        </Col>
      </Row>

      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title5">
            Paragraph 5
            <div>
              {SelectComponent("state", "Select state:", "Select state")}
            </div>
            <div>
              {SelectComponent(
                "network",
                "Select network:",
                "Select network_1"
              )}
              {SelectComponent(
                "network",
                "Select network:",
                "Select network_2"
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 5{groupedChart()}</Card>
        </Col>
      </Row>
    </>
  );
}

export default ElectricStationTab;
