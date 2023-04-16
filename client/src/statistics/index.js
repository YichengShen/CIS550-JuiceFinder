import React from "react";
import { Button, Card, Col, Row } from "antd";

// import {
//   // Form,
//   // FormInput,
//   // FormGroup,
//   Button,
//   Card,
//   CardBody,
//   CardTitle,
//   // Container,
// } from "shards-react";

import SelectComponent from "./SelectComponent";

function Statistics() {
  return (
    <div>
      <h1>Statistics</h1>
      <Button type="primary">Primary Button</Button>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="🏅 Title1">
            Paragraph 1
            <div>
              {SelectComponent("state", "Select state:", "Select state")}
            </div>
            <div>
              {SelectComponent(
                "stationType",
                "Select AFS station type:",
                "Select station type"
              )}
            </div>
            <div>
              {SelectComponent(
                "vehicleType",
                "Select light-duty vehicle type:",
                "Select vehicle type"
              )}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            {SelectComponent(
              "vehicleType",
              "Select light-duty vehicle type:",
              "Select vehicle type"
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card title="🏅 Title2" bordered={false}>
            Paragraph 2
            <div>
              {SelectComponent("port", "Select port:", "Select port_1")}
            </div>
            <div>
              {SelectComponent("port", "Select port:", "Select port_2")}
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
      </Row>
    </div>
  );
}

export default Statistics;
