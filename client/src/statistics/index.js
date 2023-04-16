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
          <div>
            {SelectComponent("state", "Select state:", "Select state:")}
          </div>
          <div>{SelectComponent("port", "Select port:", "Select port:")}</div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Statistics;
