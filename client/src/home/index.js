import React, { useState } from "react";
import { Box } from "@mui/material";
import Map from "./Map";
import InputTabs from "./InputTabs";

export default function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [curLocation, setCurLocation] = useState({
    latitude: 39.9524657202615,
    longitude: -75.19028570489878,
  });
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [maxDistance, setMaxDistance] = useState(1);
  const [chargingLevels, setChargingLevels] = useState([]);
  const [preferredStationPorts, setPreferredStationPorts] = useState([]);
  const [adapters, setAdapters] = useState([]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <InputTabs
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            zip={zip}
            setZip={setZip}
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            maxDistance={maxDistance}
            setMaxDistance={setMaxDistance}
            chargingLevels={chargingLevels}
            setChargingLevels={setChargingLevels}
            preferredStationPorts={preferredStationPorts}
            setPreferredStationPorts={setPreferredStationPorts}
            adapters={adapters}
            setAdapters={setAdapters}
          />
        </Box>
        <Box>
          <Map
            curLocation={curLocation}
            state={state}
            city={city}
            zip={zip}
            streetAddress={streetAddress}
            maxDistance={maxDistance}
            chargingLevel={chargingLevels}
            stationPorts={preferredStationPorts}
            adapters={adapters}
          />
        </Box>
      </Box>
    </div>
  );
}
