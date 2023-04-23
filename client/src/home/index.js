import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Map from "./Map";
import InputTabs from "./InputTabs";
import {
  getNearbyStations,
  getCoordinatesFromAddress,
  getPath,
} from "../common/APIUtils";

export default function HomePage() {
  const DEFAULT_LOCATION = {
    latitude: 39.9524657202615,
    longitude: -75.19028570489878,
  };
  const [curLocation, setCurLocation] = useState(DEFAULT_LOCATION);

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
    getNearbyStations(curLocation, maxDistance).then((response) => {
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
    const [startCoordinates, endCoordinates] = await Promise.all([
      getCoordinatesFromAddress(startAddress),
      getCoordinatesFromAddress(endAddress),
    ]);
    if (
      startCoordinates &&
      startCoordinates.latitude &&
      startCoordinates.longitude &&
      endCoordinates &&
      endCoordinates.latitude &&
      endCoordinates.longitude
    ) {
      getPath(startCoordinates, endCoordinates).then((response) => {
        setPath(response);
      });
    } else {
      setPathFormError(true);
      setPathFormErrorText(
        "Invalid address(es). Please try again with valid addresses."
      );
    }
  };

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
