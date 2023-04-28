/* eslint-disable prettier/prettier */
const express = require("express");

const router = express.Router();
const connection = require("../db");

// Route 1: GET  /stats/overview/afsByType
router.get("/overview/afsByType", (req, res) => {
  connection.query(
    `
        SELECT 'electric' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM electric_stations
        UNION
        SELECT 'e85' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM e85
        UNION
        SELECT 'lpg' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM lpg
        UNION
        SELECT 'cng' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM cng
        UNION
        SELECT 'bd' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM bd
        UNION
        SELECT 'rd' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM rd
        UNION
        SELECT 'hy' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM hy
        UNION
        SELECT 'lng' AS fuelType, COUNT(DISTINCT(sid)) AS numStations FROM lng
        ORDER BY numStations desc
    `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.status(500).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 2: GET /stats/overview/afsByState
router.get("/overview/afsByState", (req, res) => {
  connection.query(
    `
        SELECT state, COUNT(sid) AS numStations FROM stations
        GROUP BY state
    `,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 3: GET /stats/overview/afsByTypeState
router.get("/overview/afsByTypeState", (req, res) => {
  // route parameter
  const stationType = String(req.query.stationType);

  // clause for querying over different stationType
  let selectClause = ``;

  if (stationType === "All") {
    selectClause = `
            SELECT * FROM electric
            UNION ALL
            SELECT * FROM e85
            UNION ALL
            SELECT * FROM lpg
            UNION ALL
            SELECT * FROM cng
            UNION ALL
            SELECT * FROM bd
            UNION ALL
            SELECT * FROM rd
            UNION ALL
            SELECT * FROM hy
            UNION ALL
            SELECT * FROM lng
        `;
  } else {
    selectClause = `SELECT allState.state, IFNULL(numStations,0) AS numStations, IFNULL(stype, '${stationType}') AS stype
                    FROM ${stationType} 
                    RIGHT JOIN allState
                    ON ${stationType}.state = allState.state`;
  }
  connection.query(
    `
        WITH electric AS (
            SELECT state, count(sid) AS numStations, 'electric' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM electric_stations
                JOIN stations S on S.sid = electric_stations.sid     ) AS A
            GROUP BY state
        ),
        e85 AS (
            SELECT state, count(sid) AS numStations, 'e85' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM e85
                JOIN stations S on S.sid = e85.sid     ) AS A
            GROUP BY state
        ),
        lpg AS (
            SELECT state, count(sid) AS numStations, 'lpg' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM lpg
                JOIN stations S on S.sid = lpg.sid     ) AS A
            GROUP BY state
        ),
        cng AS (
            SELECT state, count(sid) AS numStations, 'cng' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM cng
                JOIN stations S on S.sid = cng.sid     ) AS A
            GROUP BY state
        ),
        bd AS (
            SELECT state, count(sid) AS numStations, 'bd' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM bd
                JOIN stations S on S.sid = bd.sid     ) AS A
            GROUP BY state
        ),
        rd AS (
            SELECT state, count(sid) AS numStations, 'rd' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM rd
                JOIN stations S on S.sid = rd.sid     ) AS A
            GROUP BY state
        ),
        hy AS (
            SELECT state, count(sid) AS numStations, 'hy' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM hy
                JOIN stations S on S.sid = hy.sid     ) AS A
            GROUP BY state
        ),
        lng AS (
            SELECT state, count(sid) AS numStations, 'lng' AS stype FROM
            (   SELECT DISTINCT S.sid, state FROM lng
                JOIN stations S on S.sid = lng.sid     ) AS A
            GROUP BY state
        ),
        allState AS (
            SELECT DISTINCT(state) FROM stations
            WHERE state IN ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')
        )
        ${selectClause} ORDER BY numStations desc`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 4: GET /stats/overview/vehicleByTypeState
router.get("/overview/vehicleByTypeState", (req, res) => {
  // route parameter
  const vehicleType = String(req.query.vehicleType);
  // clause for querying over different vehicleType
  let selectClause = ``;
  // assign clause based on type
  if (vehicleType === "All") {
    selectClause = `
            SELECT * FROM ev
            UNION ALL
            SELECT * FROM phev
            UNION ALL
            SELECT * FROM hev
            UNION ALL
            SELECT * FROM biodiesel
            UNION ALL
            SELECT * FROM e85
            UNION ALL
            SELECT * FROM cng
            UNION ALL
            SELECT * FROM propane
            UNION ALL
            SELECT * FROM hydrogen
            UNION ALL
            SELECT * FROM gasoline
            UNION ALL
            SELECT * FROM diesel
        `;
  } else {
    selectClause = `SELECT * FROM ${vehicleType}`;
  }
  connection.query(
    `
        WITH ev AS (
            SELECT state, ev AS numVehicle, 'ev' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        phev AS (
            SELECT state, phev AS numVehicle, 'phev' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        hev AS (
            SELECT state, hev AS numVehicle, 'hev' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        biodiesel AS (
            SELECT state, biodiesel AS numVehicle, 'biodiesel' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        e85 AS (
            SELECT state, e85 AS numVehicle, 'e85' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        cng AS (
            SELECT state, cng AS numVehicle, 'cng' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        propane AS (
            SELECT state, propane AS numVehicle, 'propane' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        hydrogen AS (
            SELECT state, hydrogen AS numVehicle, 'hydrogen' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        gasoline AS (
            SELECT state, gasoline AS numVehicle, 'gasoline' AS vtype FROM light_duty_vehicle_registration_2021
        ),
        diesel AS (
            SELECT state, diesel AS numVehicle, 'diesel' AS vtype FROM light_duty_vehicle_registration_2021
    ) ${selectClause} ORDER BY numVehicle desc`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 5: GET /stats/electricStation/searchPort
router.get("/electricStation/searchPort", (req, res) => {
  // route parameter
  const state1 = String(req.query.state1);
  const state2 = String(req.query.state2);
  const port1 = String(req.query.port1);
  const port2 = String(req.query.port2);

  // filter applied in having clause
  let stateFilter = ``;
  let portFilter = ``;
  let selectClause = ``;

  // assign filter based on state value
  if (state1 === "All" || state2 === "All") {
    stateFilter = `
            ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')`;
  } else {
    stateFilter = `('${state1}','${state2}')`;
  }

  // assign filter based on port value
  if (port1 === "All" || port2 === "All") {
    portFilter = `('type1', 'type2', 'nema515', 'nema520', 'nema1450', 'ccs', 'chademo', 'tesla')`;
  } else {
    portFilter = `('${port1}','${port2}')`;
  }
  // assign select clause
  if (
    state1 !== "All" &&
    state2 !== "All" &&
    port1 !== "All" &&
    port2 !== "All"
  ) {
    selectClause = `SELECT F.state, F.portType, IFNULL(numStations, 0 ) AS numStations
                    FROM fullTable AS F
                    LEFT JOIN aggTable AS A
                    ON A.state=F.state AND A.portType=F.portType
                    ORDER BY state ASC, portType ASC`;
  } else {
    selectClause = `SELECT * FROM aggTable ORDER BY state ASC, portType ASC`;
  }
  connection.query(
    `
    WITH elecStations AS (
        SELECT sid, state FROM electric_stations
        NATURAL JOIN stations
    ),
    elecStationsPort AS (
        SELECT * FROM elecStations
        NATURAL JOIN station_ports
    ),
    aggTable AS (
        SELECT state, COUNT(DISTINCT(sid)) AS numStations, port AS portType 
        FROM elecStationsPort
        GROUP BY state, portType
        HAVING state IN ${stateFilter} AND portType IN ${portFilter}
    ),
    fullTable AS (
        SELECT * FROM
        (
            SELECT '${state1}' AS state
            UNION SELECT '${state2}' AS state ) AS stateList,
        (
            SELECT '${port1}' AS portType
            UNION SELECT '${port2}' AS portType ) AS portList
    ) 
    ${selectClause}`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 6: GET /stats/electricStation/searchSpeed
router.get("/electricStation/searchSpeed", (req, res) => {
  // route parameter
  const state1 = String(req.query.state1);
  const state2 = String(req.query.state2);
  const speed1 = String(req.query.speed1);
  const speed2 = String(req.query.speed2);

  // filter applied in having clause
  let stateFilter = ``;
  let speedFilter = ``;
  let selectClause = ``;

  // assign filter based on state value
  if (state1 === "All" || state2 === "All") {
    stateFilter = `
            ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')`;
  } else {
    stateFilter = `('${state1}','${state2}')`;
  }

  // assign filter based on port value
  if (speed1 === "All" || speed2 === "All") {
    speedFilter = `('acLevel1','acLevel2','dcFast')`;
  } else {
    speedFilter = `('${speed1}','${speed2}')`;
  }
  // assign select clause
  if (
    state1 !== "All" &&
    state2 !== "All" &&
    speed1 !== "All" &&
    speed2 !== "All"
  ) {
    selectClause = `SELECT F.state, F.speedLevel, IFNULL(numPort, 0 ) AS numPort
                    FROM fullTable AS F
                    LEFT JOIN aggTable AS A
                    ON A.state=F.state AND A.speedLevel=F.speedLevel
                    ORDER BY state ASC, speedLevel ASC`;
  } else {
    selectClause = `SELECT state, speedLevel, numPort FROM aggTable ORDER BY state ASC, speedLevel ASC`;
  }
  connection.query(
    `
    WITH elec_stations AS (
        SELECT state, COUNT(sid) AS numStations, 
                SUM(ev_dc_fast_num) AS num_dc_fast,
                    SUM(ev_level1_evse_num) AS num_level1,
                    SUM(ev_level2_evse_num) AS num_level2 
        FROM electric_stations
        NATURAL JOIN stations
        GROUP BY state
    ),
    dc AS (
        SELECT state, numStations, num_dc_fast AS numPort, 'dcFast' AS speedLevel FROM elec_stations
    ),
    level1 AS (
        SELECT state, numStations, num_level1 AS numPort, 'acLevel1' AS speedLevel FROM elec_stations
    ),
    level2 AS (
        SELECT state, numStations, num_level2 AS numPort, 'acLevel2' AS speedLevel FROM elec_stations
    ), 
    allSpeed AS (
        SELECT * FROM dc
        UNION
        SELECT * FROM level1
        UNION
        SELECT * FROM level2
    ),
    aggTable AS (
        SELECT * FROM allSpeed
        GROUP BY state, speedLevel
        HAVING state IN ${stateFilter} AND speedLevel IN ${speedFilter}
    ),
    fullTable AS (
        SELECT * FROM
        (
            SELECT '${state1}' AS state
            UNION SELECT '${state2}' AS state ) AS stateList,
        (
            SELECT '${speed1}' AS speedLevel
            UNION SELECT '${speed2}' AS speedLevel ) AS speedList
    ) 
    ${selectClause}`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 7: GET /stats/electricStation/searchNetwork
router.get("/electricStation/searchNetwork", (req, res) => {
  // route parameter
  const state1 = String(req.query.state1);
  const state2 = String(req.query.state2);
  const network1 = String(req.query.network1);
  const network2 = String(req.query.network2);

  // filter applied in having clause
  let stateFilter = ``;
  let networkFilter = ``;
  let selectClause = ``;

  // assign filter based on state value
  if (state1 === "All" || state2 === "All") {
    stateFilter = `
            ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')`;
  } else {
    stateFilter = `('${state1}','${state2}')`;
  }

  // assign filter based on port value
  if (network1 === "All" || network2 === "All") {
    networkFilter = `
        ('Non-Networked', 'Volta', 'EV Connect', 'POWERFLEX', 'ChargePoint Network',
        'OpConnect', 'SHELL_RECHARGE', 'EVGATEWAY', 'eVgo Network', 'AMPUP', 'Webasto',
        'SemaCharge Network', 'UNIVERSAL', 'EVCS', 'Blink Network', 'FCN', 'Tesla',
        'Tesla Destination', 'EVRANGE', 'Electrify America', 'CHARGELAB','LIVINGSTON',
        'FLO', 'ZEFNET', 'FPLEV', 'RIVIAN_WAYPOINTS','RED_E', 'SWTCH', 'CIRCLE_K',
        'WAVE', 'GRAVITI_ENERGY', 'FLASH', 'RIVIAN_ADVENTURE', 'CHARGEUP')
        `;
  } else {
    networkFilter = `('${network1}','${network2}')`;
  }

  // assign select clause
  if (
    state1 !== "All" &&
    state2 !== "All" &&
    network1 !== "All" &&
    network2 !== "All"
  ) {
    selectClause = `SELECT F.state, F.network, IFNULL(numStations, 0 ) AS numStations
                    FROM fullTable AS F
                    LEFT JOIN aggTable AS A
                    ON A.state=F.state AND A.network=F.network
                    ORDER BY state ASC, network ASC`;
  } else {
    selectClause = `SELECT state, network, numStations FROM aggTable ORDER BY state ASC, network ASC`;
  }
  connection.query(
    ` WITH networkCountByState AS (
        SELECT state, COUNT(sid) AS numStations, ev_network AS network FROM electric_stations
        NATURAL JOIN stations
        GROUP BY state, network
    ),
    fullTable AS (
        SELECT * FROM
        (
            SELECT '${state1}' AS state
            UNION SELECT '${state2}' AS state ) AS stateList,
        (
            SELECT '${network1}' AS network
            UNION SELECT '${network2}' AS network ) AS networkList
    ),
    aggTable AS (
        SELECT * FROM networkCountByState 
        WHERE state IN ${stateFilter} AND network IN ${networkFilter}
    )
    ${selectClause}`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 8: GET /stats/friendliness/stationToVehicle
router.get("/friendliness/stationToVehicle", (req, res) => {
  connection.query(
    `
        WITH elec_stations AS (
            SELECT state, COUNT(sid) AS numStations FROM electric_stations
            NATURAL JOIN stations
            GROUP BY state
        )
        SELECT EV.state, numStations, numVehicles, numStations/numVehicles AS stationToVehicleRatio FROM elec_stations
        NATURAL JOIN (SELECT state, registration_count AS numVehicles FROM ev_registration) AS EV
        ORDER BY stationToVehicleRatio desc
    `,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// Route 9: GET /stats/friendliness/restaurantToStation
router.get("/friendliness/restaurantToStation", (req, res) => {
  connection.query(
    `
        WITH elec_stations AS (
            SELECT state, COUNT(sid) AS numStations FROM electric_stations
            NATURAL JOIN stations
            GROUP BY state
        )
        SELECT state, numStations, numRestaurants, numRestaurants/numStations AS restaurantToStationRatio
        FROM (SELECT state, COUNT(business_id) AS numRestaurants FROM restaurants GROUP BY state ) AS R
        NATURAL JOIN elec_stations
        ORDER BY restaurantToStationRatio desc
    `,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({});
      } else if (data.length === 0) {
        res.status(204).json({});
      } else {
        res.status(200).json(data);
      }
    }
  );
});

module.exports = router;
