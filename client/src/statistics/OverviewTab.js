import React, { useState, useCallback, useEffect } from "react";
import { Card, Col, Row } from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import USAMap from "react-usa-map";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Column, Pie } from "@ant-design/plots";

import SelectComponent from "./SelectComponent";
import serverConfig from "../config.json";

function afsByTypePie() {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/afsByType`
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
    appendPadding: 10,
    data,
    angleField: "numStations",
    colorField: "fuelType",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Pie {...config} />;
}

function afsByStateMap() {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/afsByState`
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

  const dataDict = {};

  function toDict(item) {
    dataDict[item.state] = { numStations: item.numStations };
  }
  data.forEach(toDict);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <USAMap customize={dataDict} />;
}

function afsByTypeStateBar(data) {
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

function vehicleByTypeBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "numVehicle",
    isGroup: true,
    isStack: false,
    seriesField: "vtype",
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}

function OverviewTab() {
  // state variable for station type select menu
  const [stationType, setStationType] = useState("All");
  const [vehicleType, setVehicleType] = useState("All");

  // event handler
  const handleStationTypeChange = useCallback((event) => {
    setStationType(event);
  }, []);
  const handleVehicleTypeChange = useCallback((event) => {
    setVehicleType(event);
  }, []);

  // state variable for fetched data
  const [afsByTypeStateData, setAfsByTypeStateData] = useState([]);
  const [vehicleByTypeData, setVehicleByTypeData] = useState([]);

  // fetcher
  const getAfsByTypeState = (stype) => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/afsByTypeState?stationType=${stype}`
    )
      .then((response) => response.json())
      .then((json) => setAfsByTypeStateData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };

  const getVehicleByType = (vtype) => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/overview/vehicleByTypeState?vehicleType=${vtype}`
    )
      .then((response) => response.json())
      .then((json) => setVehicleByTypeData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };
  // render
  useEffect(() => {
    getAfsByTypeState(stationType);
  }, [stationType]);

  useEffect(() => {
    getVehicleByType(vehicleType);
  }, [vehicleType]);

  return (
    <>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 US Alternating fueling resources">
            {" "}
            {afsByTypePie()}
          </Card>
        </Col>
        <Col span={18}>
          <Card title="🏅 Energy Resources Heat map"> {afsByStateMap()}</Card>
        </Col>
      </Row>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title2">
            Paragraph 2
            <div>
              {SelectComponent(
                "stationType",
                "Select AFS station type:",
                "Select station type",
                handleStationTypeChange
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 2{afsByTypeStateBar(afsByTypeStateData)}</Card>
        </Col>
      </Row>
      <Row gutter={16} type="flex">
        <Col span={6}>
          <Card title="🏅 Title3">
            Paragraph 3
            <div>
              {SelectComponent(
                "vehicleType",
                "Select light-duty vehicle type:",
                "Select vehicle type",
                handleVehicleTypeChange
              )}
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card>Content 3{vehicleByTypeBar(vehicleByTypeData)}</Card>
        </Col>
      </Row>
    </>
  );
}

export default OverviewTab;
