import React, { useState, useCallback, useEffect } from "react";
import { Card, Col, Row } from "antd";

import SelectComponent from "./SelectComponent";
import serverConfig from "../config.json";
import * as plt from "./Plotting";

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
            {plt.afsByTypePie()}
          </Card>
        </Col>
        <Col span={18}>
          <Card title="🏅 Energy Resources Heat map">
            {" "}
            {plt.afsByStateMap()}
          </Card>
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
          <Card>Content 2{plt.afsByTypeStateBar(afsByTypeStateData)}</Card>
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
          <Card>Content 3{plt.vehicleByTypeBar(vehicleByTypeData)}</Card>
        </Col>
      </Row>
    </>
  );
}

export default OverviewTab;
