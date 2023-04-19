import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import USAMap from "react-usa-map";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Column, Pie } from "@ant-design/plots";

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

// Figure plotting
function afsByTypeStateBar(data) {
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
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
      offsetY: 8,
      formatter: ({ value }) => value,
    },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => v,
      },
    },
    legend: {
      position: "top",
      flipPage: false,
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    slider: {
      start: 0,
      end: 1,
    },
    minColumnWidth: 10,
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
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
      offsetY: 8,
      formatter: ({ value }) => value,
    },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => v,
      },
    },
    legend: {
      position: "top",
      flipPage: false,
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    slider: {
      start: 0,
      end: 1,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}

export { afsByTypePie, afsByStateMap, afsByTypeStateBar, vehicleByTypeBar };
