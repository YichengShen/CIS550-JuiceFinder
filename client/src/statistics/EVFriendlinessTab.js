import React, { useState, useEffect } from "react";

import { Card, Col, Row } from "antd";

import * as plt from "./Plotting";
import serverConfig from "../config.json";

function EVFriendlinessTab() {
  // state variable for fetched data
  const [stationToVehicle, setStationToVehicleData] = useState([]);
  const [restaurantToStation, setRestaurantToStationData] = useState([]);

  // transform the json data for plotting
  function transformVehicle(data) {
    // processing data for plotting
    const plotData = [];
    // explode data and add type
    const len = Object.keys(data).length;
    if (len !== 0) {
      for (let i = 0; i < len; i += 1) {
        plotData.push(
          {
            state: data[i].state,
            nunberOf: data[i].numStations,
            type: "Electric Charging Stations",
          },
          {
            state: data[i].state,
            nunberOf: data[i].numVehicles,
            type: "Electric Vehicles",
          },
          {
            state: data[i].state,
            nunberOf: data[i].numStations / data[i].numVehicles,
            type: "StationToVehicleRatio",
          }
        );
      }
    }
    return plotData;
  }
  function transformRestaurant(data) {
    // processing data for plotting
    const plotData = [];
    // explode data and add type
    const len = Object.keys(data).length;
    if (len !== 0) {
      for (let i = 0; i < len; i += 1) {
        plotData.push(
          {
            state: data[i].state,
            nunberOf: data[i].numStations,
            type: "Electric Charging Stations",
          },
          {
            state: data[i].state,
            nunberOf: data[i].numRestaurants,
            type: "Restaurants",
          },
          {
            state: data[i].state,
            nunberOf: data[i].numRestaurants / data[i].numStations,
            type: "RestaurantToStationRatio",
          }
        );
      }
    }
    return plotData;
  }
  // fetchers
  /*  #8
      Route: /stats/friendliness/stationToVehicle
      Description: Returns the electric station count, electric vehicle count, and the ratio of the station to vehicle aggregate by state, ordered by ratio(descending)
      Route Parameter(s): None
      Query Parameter(s): None
      Route Handler: stationToVehicle(req, res)
      Return Type: JSON Array
      Return Parameters:
          {results (JSON array of {state(string), numStations(int), numVehicles(int), stationToVehicleRatio(float)} )}
      Expected (Output) Behavior:
          - Example: results = [ {“CA”, 15, 30, 0.5},  {“CA”, 20, 60, 0.33}, {“PA”, 25, 100, 0.25},  {“NY”, 6,  60, 0.1},...]
  */
  const getStationToVehicle = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/friendliness/stationToVehicle`
    )
      .then((response) => response.json())
      .then((json) => setStationToVehicleData(transformVehicle(json)))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };
  /*  #9
    Route: /stats/friendliness/restaurantToStation
    Description: Returns the restaurant count, the electric station count, and the ratio of the restaurant to station aggregate by state, ordered by ratio(descending)
    Route Parameter(s): None
    Query Parameter(s): None
    Route Handler: restaurantToStation(req, res)
    Return Type: JSON Array
    Return Parameters:
        {results (JSON array of {state(string), numStations(int), numRestaurants(int), restaurantToStationRatio(float)} )}
    Expected (Output) Behavior:
        -  Example: results = [ {“CA”, 30, 165, 5.5 },  {“NY”, 70, 20, 3.5}, {“PA”, 25, 10, 2.5},  {“NY”, 25, 25, 1},...]
  */
  const getRestaurantToStation = () => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/friendliness/restaurantToStation`
    )
      .then((response) => response.json())
      .then((json) => setRestaurantToStationData(transformRestaurant(json)))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };
  // render
  useEffect(() => {
    getStationToVehicle();
    getRestaurantToStation();
  }, []);

  return (
    <Card>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Card title="🏅 How hard to find a charging stations?">
                <Card>{plt.stationToVehicleBar(stationToVehicle)}</Card>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title="🏅 Charge yourself when you are charging your car!">
                <Card>{plt.restaurantToStationBar(restaurantToStation)}</Card>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default EVFriendlinessTab;
