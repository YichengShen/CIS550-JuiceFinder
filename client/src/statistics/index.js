import React from "react";

import { Select } from "antd";

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

/* Set up our drop-down menus */
const { Option } = Select;

const portOptions = [
  { key: "All", value: "All Types" },
  { key: "type1", value: "Type 1" },
  { key: "type2", value: "Type 2" },
  { key: "chademo", value: "CHADEMO" },
  { key: "tesla", value: "Tesla" },
  { key: "ccs", value: "CCS" },
  { key: "nema515", value: "NEMA-515" },
];

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
          <div
            style={{
              width: "80vw",
              margin: "auto auto",
              marginTop: "3vh",
              marginBottom: "3vh",
            }}
          >
            <p>Select state</p>
            <Select
              defaultValue="ALL"
              style={{ width: 500 }}
              // onChange={this.handleStateChange}
            >
              <Option value="ALL">All States</Option>
              <Option value="AL">Alabama</Option>
              <Option value="AK">Alaska</Option>
              <Option value="AZ">Arizona</Option>
              <Option value="AR">Arkansas</Option>
              <Option value="CA">California</Option>
              <Option value="CO">Colorado</Option>
              <Option value="CT">Connecticut</Option>
              <Option value="DE">Delaware</Option>
              <Option value="FL">Florida</Option>
              <Option value="GA">Georgia</Option>
              <Option value="HI">Hawaii</Option>
              <Option value="ID">Idaho</Option>
              <Option value="IL">Illinois</Option>
              <Option value="IN">Indiana</Option>
              <Option value="IA">Iowa</Option>
              <Option value="KS">Kansas</Option>
              <Option value="KY">Kentucky</Option>
              <Option value="LA">Louisiana</Option>
              <Option value="ME">Maine</Option>
              <Option value="MD">Maryland</Option>
              <Option value="MA">Massachusetts</Option>
              <Option value="MI">Michigan</Option>
              <Option value="MN">Minnesota</Option>
              <Option value="MS">Mississippi</Option>
              <Option value="MO">Missouri</Option>
              <Option value="MT">Montana</Option>
              <Option value="NE">Nebraska</Option>
              <Option value="NV">Nevada</Option>
              <Option value="NH">New Hampshire</Option>
              <Option value="NJ">New Jersey</Option>
              <Option value="NM">New Mexico</Option>
              <Option value="NY">New York</Option>
              <Option value="NC">North Carolina</Option>
              <Option value="ND">North Dakota</Option>
              <Option value="OH">Ohio</Option>
              <Option value="OK">Oklahoma</Option>
              <Option value="OR">Oregon</Option>
              <Option value="PA">Pennsylvania</Option>
              <Option value="RI">Rhode Island</Option>
              <Option value="SC">South Carolina</Option>
              <Option value="SD">South Dakota</Option>
              <Option value="TN">Tennessee</Option>
              <Option value="TX">Texas</Option>
              <Option value="UT">Utah</Option>
              <Option value="VT">Vermont</Option>
              <Option value="VA">Virginia</Option>
              <Option value="WA">Washington</Option>
              <Option value="WV">West Virginia</Option>
              <Option value="WI">Wisconsin</Option>
              <Option value="WY">Wyoming</Option>
            </Select>
          </div>

          <div
            style={{
              width: "80vw",
              margin: "auto auto",
              marginTop: "3vh",
              marginBottom: "3vh",
            }}
          >
            <p>Select port type</p>
            <Select
              defaultValue="All"
              style={{ width: 500 }}
              // onChange={this.handlePortChange}
            >
              {portOptions.map((option) => (
                <Option key={option.key}>{option.value}</Option>
              ))}
              {/* <Option value="All">All Networks</Option>
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type2</Option>
              <Option value="chademo">CHADEMO</Option>
              <Option value="tesla">TESLA</Option> */}
            </Select>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Statistics;
