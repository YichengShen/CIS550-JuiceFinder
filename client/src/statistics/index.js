import React from "react";

// import { Select } from "antd";

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

/* Set up our drop-down menus */
// const { Option } = Select;

// const afsTypeOptions = [
//   { key: "All", value: "All Types" },
//   { key: "“electric”", value: "“Electric”" },
//   { key: "“e85”", value: "E85" },
//   { key: "“lpg”", value: "LPG" },
//   { key: "cng", value: "CNG" },
//   { key: "bd", value: "BD" },
//   { key: "rd", value: "RD" },
//   { key: "hy", value: "HY" },
//   { key: "lng", value: "LNG" },
// ];

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
          <div>{SelectComponent("state")}</div>
          <div>{SelectComponent("port")}</div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Statistics;
