import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Map from "./Map";
import InputTabs from "./InputTabs";
import {
  getNearbyStations,
  getCoordinatesFromAddress,
  getStationsNearPath,
} from "../common/APIUtils";

export default function HomePage() {
  const DEFAULT_LOCATION = {
    latitude: 39.9524657202615,
    longitude: -75.19028570489878,
  };
  const [curLocation, setCurLocation] = useState(DEFAULT_LOCATION);
  const [srcLocation, setSrcLocation] = useState({});
  const [destLocation, setDestLocation] = useState({});

  // Props for StationInput
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [maxDistance, setMaxDistance] = useState(1);
  const [chargingLevels, setChargingLevels] = useState([]);
  const [preferredStationPorts, setPreferredStationPorts] = useState([]);
  const [adapters, setAdapters] = useState([]);
  const [stationFormError, setStationFormError] = useState(false);
  const [stationFormErrorText, setStationFormErrorText] = useState("");

  // Props for PathInput
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [pathFormError, setPathFormError] = useState(false);
  const [pathFormErrorText, setPathFormErrorText] = useState("");

  // Props for Map
  const [stations, setStations] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    getNearbyStations(
      curLocation,
      maxDistance,
      chargingLevels,
      preferredStationPorts,
      { isElectric: true }
    ).then((response) => {
      setStations(response);
      if (!response || response.length === 0) {
        setStationFormError(true);
        setStationFormErrorText(
          "No stations found within the specified distance and location. Please try again with a different distance or location."
        );
      }
    });
  }, [curLocation]);

  const handleStationInputSubmit = async () => {
    setPath([]);
    setSrcLocation({});
    setDestLocation({});

    getCoordinatesFromAddress(`${streetAddress} ${state} ${city} ${zip}`).then(
      (response) => {
        if (response && response.latitude && response.longitude) {
          setCurLocation(response);
          setStations([]);
        } else {
          setStationFormError(true);
          setStationFormErrorText(
            "Invalid address. Please try again with a valid address."
          );
        }
      }
    );
  };

  const handlePathInputSubmit = async () => {
    setCurLocation({});
    setPath([]);

    Promise.all([
      getCoordinatesFromAddress(startAddress),
      getCoordinatesFromAddress(endAddress),
    ])
      .then(([srcCoor, destCoor]) => {
        setSrcLocation(srcCoor);
        setDestLocation(destCoor);
      })
      .catch(() => {
        setPathFormError(true);
        setPathFormErrorText(
          "Invalid address. Please try again with a valid address."
        );
      });

    getStationsNearPath(
      startAddress,
      endAddress,
      maxDistance,
      chargingLevels,
      preferredStationPorts
    ).then((response) => {
      setPath(response.waypoints);
      const stationData = response.stations.map((station) => {
        return {
          sid: station.sid,
          location: {
            y: station.latitude,
            x: station.longitude,
          },
        };
      });
      // console.log(response);
      // console.log(stationData);
      setStations(stationData);

      if (!response || response.length === 0) {
        setStationFormError(true);
        setStationFormErrorText(
          "No stations found given the specified distance and locations. Please try again with different distance or locations."
        );
      }
    });
  };

  return (
    <div style={{ width: "100vw" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
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
            stationFormError={stationFormError}
            setStationFormError={setStationFormError}
            stationFormErrorText={stationFormErrorText}
            setStationFormErrorText={setStationFormErrorText}
            handleStationInputSubmit={handleStationInputSubmit}
            startAddress={startAddress}
            setStartAddress={setStartAddress}
            endAddress={endAddress}
            setEndAddress={setEndAddress}
            pathFormError={pathFormError}
            setPathFormError={setPathFormError}
            pathFormErrorText={pathFormErrorText}
            setPathFormErrorText={setPathFormErrorText}
            handlePathInputSubmit={handlePathInputSubmit}
          />
        </Box>
        <Box>
          <Map
            curLocation={curLocation}
            setCurLocation={setCurLocation}
            srcLocation={srcLocation}
            setSrcLocation={setSrcLocation}
            destLocation={destLocation}
            setDestLocation={setDestLocation}
            stations={stations}
            setStations={setStations}
            path={path}
            setPath={setPath}
          />
        </Box>
      </Box>
    </div>
  );
}
