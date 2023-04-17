import React, { useState, useEffect } from "react";

import { Card, Col, Row } from "antd";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Column } from "@ant-design/plots";

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

function EVFriendlinessTab() {
  return (
    <>
      <Row gutter={16} type="flex">
        <Col span={24}>
          <Card title="🏅 Title6">
            Paragraph 6<Card>Content 6{afsByTypeStateFig()}</Card>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} type="flex">
        <Col span={24}>
          <Card title="🏅 Title7">
            Paragraph 7<Card>Content 7{groupedChart()}</Card>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EVFriendlinessTab;
