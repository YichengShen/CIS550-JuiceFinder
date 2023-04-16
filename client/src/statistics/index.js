import React from "react";

import {
  // Form,
  // FormInput,
  // FormGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  // Container,
} from "shards-react";

import SelectComponent from "./SelectComponent";

function Statistics() {
  return (
    <div>
      <h1>Statistics</h1>
      <Button type="primary">Primary Button</Button>
      <Card>
        <CardBody>
          <CardTitle>
            <div
              style={{
                width: "80vw",
                margin: "auto auto",
                marginTop: "3vh",
                marginBottom: "3vh",
              }}
            >
              <h3> 🏅 Title1 </h3>
            </div>
          </CardTitle>
          <div
            style={{
              width: "80vw",
              margin: "auto auto",
              marginTop: "3vh",
              marginBottom: "3vh",
            }}
          >
            Paragraph 1
          </div>
          <div>{SelectComponent("state", "Select state:", "Select state")}</div>
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
          <div>{SelectComponent("port", "Select port:", "Select port_1")}</div>
          <div>{SelectComponent("port", "Select port:", "Select port_2")}</div>
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
        </CardBody>
      </Card>
    </div>
  );
}

export default Statistics;
