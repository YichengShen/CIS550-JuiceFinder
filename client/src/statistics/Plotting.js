import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import USAMap from "react-usa-map";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Column, Pie } from "@ant-design/plots";

import serverConfig from "../config.json";

// Stats-Fig #1
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
      offset: "-15%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    legend: {
      position: "bottom",
      flipPage: false,
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
// Stats-Fig #2
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

// Stats-Fig #3
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
// Stats-Fig #4
function vehicleByTypeStateBar(data) {
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
    // label: {
    //   position: "middle",
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 0.6,
    //   },
    //   offsetY: 8,
    //   formatter: ({ value }) => value,
    // },
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}

// Stats-Fig #5
function stationCountByPortStateBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "numStations",
    isGroup: false,
    isStack: true,
    seriesField: "portType",
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
    // label: {
    //   position: "top",
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 0.8,

    //   },
    //   offsetY: 8,
    //   formatter: ({ numStations }) => numStations,
    // },
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
// Stats-Fig #6
function stationCountBySpeedStateBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "numStations",
    isGroup: false,
    isStack: true,
    seriesField: "speedLevel",
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
    // label: {
    //   position: "middle",
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 0.6,
    //   },
    //   offsetY: 8,
    //   formatter: ({ value }) => value,
    // },
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
// Stats-Fig #7
function stationCountByNetworkStateBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "numStations",
    isGroup: false,
    isStack: true,
    seriesField: "network",
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
    // label: {
    //   position: "middle",
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 0.6,
    //   },
    //   offsetY: 8,
    //   formatter: ({ value }) => value,
    // },
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
// Stats-Fig #8
function stationToVehicleBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "nunberOf",
    isGroup: true,
    isStack: false,
    seriesField: "type",
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
      formatter: ({ stationToVehicleRatio }) => stationToVehicleRatio,
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
// Stats-Fig #9
function restaurantToStationBar(data) {
  const config = {
    data,
    xField: "state",
    yField: "nunberOf",
    isGroup: true,
    isStack: false,
    seriesField: "type",
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
      end: 1.0,
    },
    minColumnWidth: 10,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Column {...config} />;
}
export {
  afsByTypePie,
  afsByStateMap,
  afsByTypeStateBar,
  vehicleByTypeStateBar,
  stationCountByPortStateBar,
  stationCountBySpeedStateBar,
  stationCountByNetworkStateBar,
  stationToVehicleBar,
  restaurantToStationBar,
};
