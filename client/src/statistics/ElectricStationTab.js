import React, { useState, useCallback, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectComponent from "./SelectComponent";
import * as plt from "./Plotting";
import serverConfig from "../config.json";

function ElectricStationTab() {
  // use theme for this page
  const theme = useTheme();

  // State variable for station type select menu
  const [state1, setState1] = useState("All");
  const [state2, setState2] = useState("All");
  const [port1, setPort1] = useState("All");
  const [port2, setPort2] = useState("All");
  const [speed1, setSpeed1] = useState("All");
  const [speed2, setSpeed2] = useState("All");
  const [network1, setNetwork1] = useState("All");
  const [network2, setNetwork2] = useState("All");

  // Event handler
  const handleState1Change = useCallback((event) => {
    setState1(event.target.value);
  }, []);
  const handleState2Change = useCallback((event) => {
    setState2(event.target.value);
  }, []);
  const handlePort1Change = useCallback((event) => {
    setPort1(event.target.value);
  }, []);
  const handlePort2Change = useCallback((event) => {
    setPort2(event.target.value);
  }, []);
  const handleSpeed1Change = useCallback((event) => {
    setSpeed1(event.target.value);
  }, []);
  const handleSpeed2Change = useCallback((event) => {
    setSpeed2(event.target.value);
  }, []);
  const handleNetwork1Change = useCallback((event) => {
    setNetwork1(event.target.value);
  }, []);
  const handleNetwork2Change = useCallback((event) => {
    setNetwork2(event.target.value);
  }, []);

  // state variable for fetched data
  const [stationCountByPortState, setStationCountByPortStateData] = useState(
    []
  );
  const [stationCountBySpeedState, setStationCountBySpeedStateData] = useState(
    []
  );
  const [stationCountByNetworkState, setStationCountByNetworkStateData] =
    useState([]);
  /*  #5
      Route: /stats/electricStation/searchPort
      Description: Returns the electric station count aggregate by given port and state, order by portType(ascending) and numStations(descending)
      Request Method: GET
      Route Parameter(s): None
      Query Parameter(s): state1(String) (default: All), state2(String) (default: All), port1(String) (default: All),  port2(String) (default: All)
      Route Handler: /electricStation/searchPort(req, res)
      Return Type: JSON Array
      Return Parameters: 
          {results (JSON array of {state(string), numStations(int), portType(string)} )}
          , where port = [“All”, “type1”, “type2”, “nema515”, “nema520”, “nema1450”, “ccs”, “chademo”, “tesla”]
      Expected (Output) Behavior:
          - Example: /stats/electricStation/searchPort?state1=All&state2=CA&port1=All&port2=type1
              results = [ {“CA”, 50, ”ccs”},  {“NY”, 40, ”tesla”}, {“PA”, 30, ”type1”},  {“WA”, 20, ”type2”},...]
          - Example: /stats/electricStation/searchPort?state1=NY&state2=CA&port1=type1&port2=type2
              results = [ {“CA”, 50, ”type1”},  {“NY”, 40,, ”type2”}, {“NY”, 30, ”type1”},  {“CA”, 20, ”type2”},...]
  */
  const getStationCountByPortState = (st1, st2, prt1, prt2) => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/electricStation/searchPort?state1=${st1}&state2=${st2}&port1=${prt1}&port2=${prt2}`
    )
      .then((response) => response.json())
      .then((json) => setStationCountByPortStateData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };
  /*  #6
      Route: /stats/electricStation/searchSpeed
      Description: Returns the electric charging station count aggregate by user-specified charging speed and state, order by speedLevel(ascending) and numStations(descending)
      Request Method: GET
      Route Parameter(s): None
      Query Parameter(s): state1(String) (default: All), state2(String) (default: All), speed1(String) (default: All),  speed2(String) (default: All)
      Route Handler: /electricStation/searchSpeed(req, res)
      Return Type: JSON Array
      Return Parameters: 
          {results (JSON array of {state(string), numStations(int), numPort(int), speedLevel(string)} )}
          - speed = [“All”, “acLevel1”, “acLevel2”, “dcFast”]
      Expected (Output) Behavior:
          -Example:
              /stats/electricStation/searchSpeed?state1=All&state2=CA&speed1=All&speed2=dcFast
              results = [ {“CA”, 50, 35, ”acLevel1”},  {“NY”, 30, 42, ”acLevel1”}, {“PA”, 20, 31, ”acLevel2”},  {“AZ”, 10, 49, ”dcFast”},...]
          -Example:
              /stats/electricStation/searchSpeed?state1=NY&state2=CA&speed1=acLevel1&speed2=acLevel2
              results = [ {“CA”, 50, 35, ”acLevel1”},  {“NY”, 30, 42, ”acLevel1”}, {“CA”, 20, 31, ”acLevel2”},  {“NY”, 10, 49, ”acLevel2”}]
          -Example: 
              /stats/electricStation/searchSpeed?state1=NY&state2=NY&speed1=acLevel1&speed2=All
              results = [ {“NY”, 50, 35, ”acLevel1”},  {“NY”, 30, 42, ”acLevel2”}, {“NY”, 20, 51, ”dcFast”}]
  */
  const getStationCountBySpeedState = (st1, st2, spd1, spd2) => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/electricStation/searchSpeed?state1=${st1}&state2=${st2}&speed1=${spd1}&speed2=${spd2}`
    )
      .then((response) => response.json())
      .then((json) => setStationCountBySpeedStateData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };
  /*  #7
      Route: /stats/electricStation/searchNetwork
      Description: Returns the electric charging station count aggregate by given network and state, order by state(ascending) and numStations (descending)
      Request Method: GET
      Route Parameter(s): None
      Query Parameter(s): state1(String) (default: All), state2(String) (default: All), network1(String) (default: All),  network2(String) (default: All)
      Route Handler: /electricStation/searchNetwork(req, res)
      Return Type: JSON Array
      Return Parameters: 
          {results (JSON array of {state(string), numStations(int), network(string)} )}
          - network= [‘All’, 'Non-Networked', 'Volta', 'EV Connect', 'POWERFLEX',
                  'ChargePoint Network', 'OpConnect', 'SHELL_RECHARGE', 'EVGATEWAY',
                  'eVgo Network', 'AMPUP', 'Webasto', 'SemaCharge Network',
                  'UNIVERSAL', 'EVCS', 'Blink Network', 'FCN', 'Tesla',
                  'Tesla Destination', 'EVRANGE', 'Electrify America', 'CHARGELAB',
                  'LIVINGSTON', 'FLO', 'ZEFNET', 'FPLEV', 'RIVIAN_WAYPOINTS',
                  'RED_E', 'SWTCH', 'CIRCLE_K', 'WAVE', 'GRAVITI_ENERGY', 'FLASH',
                  'RIVIAN_ADVENTURE', 'CHARGEUP']
      Expected (Output) Behavior:
          - Example: 
              /stats/electricStation/searchNetwork?state1=All&state2=CA&network1=Tesla&network2=Volta
              results = [ {“CA”, 50, ”Tesla”},  {“NY”, 40, ”Volta”}, {“PA”, 30, ”Tesla”},  {“WA”, 20, ”Volta”},...]
          - Example: 
              /stats/electricStation/searchNetwork?state1=NY&state2=CA&network1='ChargePoint Network&network2=Tesla
              results = [ {“CA”, 50, ”ChargePoint Network”},  {“CA”, 40, ”Tesla”}, {“NY”, 30, ”ChargePoint Network”},  {“NY”, 20, ”Tesla”}]
  */
  const getStationCountByNetworkState = (st1, st2, ntwk1, ntwk2) => {
    fetch(
      `http://${serverConfig.server_host}:${serverConfig.server_port}/stats/electricStation/searchNetwork?state1=${st1}&state2=${st2}&network1=${ntwk1}&network2=${ntwk2}`
    )
      .then((response) => response.json())
      .then((json) => setStationCountByNetworkStateData(json))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("fetch data failed", error);
      });
  };

  // render
  useEffect(() => {
    getStationCountByPortState(state1, state2, port1, port2);
  }, [state1, state2, port1, port2]);

  useEffect(() => {
    getStationCountBySpeedState(state1, state2, speed1, speed2);
  }, [state1, state2, speed1, speed2]);

  useEffect(() => {
    getStationCountByNetworkState(state1, state2, network1, network2);
  }, [state1, state2, network1, network2]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Container>
              {SelectComponent(
                "state",
                "Select state 1:",
                "All states",
                handleState1Change,
                state1
              )}
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Container>
              {SelectComponent(
                "state",
                "Select state 2:",
                "All states",
                handleState2Change,
                state2
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              🏅 Number of electric stations with different ports in US
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Container>
              {SelectComponent(
                "port",
                "Select port 1:",
                "All ports",
                handlePort1Change,
                port1
              )}
              {SelectComponent(
                "port",
                "Select port 2:",
                "All ports",
                handlePort2Change,
                port2
              )}
            </Container>
          </Grid>
          <Grid item xs={9}>
            <Container>
              {plt.stationCountByPortStateBar(stationCountByPortState)}
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              🏅 Number of electric stations with different charging speed in US
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Container>
              {SelectComponent(
                "speed",
                "Select charging speed 1:",
                "All speeds",
                handleSpeed1Change,
                speed1
              )}
              {SelectComponent(
                "speed",
                "Select charging speed 2:",
                "All speeds",
                handleSpeed2Change,
                speed2
              )}
            </Container>
          </Grid>
          <Grid item xs={9}>
            <Container>
              {plt.stationCountBySpeedStateBar(stationCountBySpeedState)}
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              🏅 Number of electric stations with different networks in US
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Container>
              {SelectComponent(
                "network",
                "Select network 1:",
                "All networks",
                handleNetwork1Change,
                network1
              )}
              {SelectComponent(
                "network",
                "Select network 2:",
                "All networks",
                handleNetwork2Change,
                network2
              )}
            </Container>
          </Grid>
          <Grid item xs={9}>
            <Container>
              {plt.stationCountByNetworkStateBar(stationCountByNetworkState)}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ElectricStationTab;
