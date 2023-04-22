// import PropTypes from "prop-types";
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";

import chargingLevelArr from "../assets/charging_levels.json";
import stationPortArr from "../assets/port_types.json";

export default function PathInput({
  streetAddress,
  setStreetAddress,
  maxDistance,
  setMaxDistance,
  chargingLevels,
  setChargingLevels,
  preferredStationPorts,
  setPreferredStationPorts,
  adapters,
  setAdapters,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: "min-content" }}>
        <Box
          sx={{
            "& .MuiTextField-root": {
              my: 1,
              width: "30ch",
            },
          }}
        >
          <h3>Locations</h3>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Starting Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Ending Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <FormControl>
            <FormLabel id="distance-radio-buttons-group-label">
              Max Distance
            </FormLabel>
            <RadioGroup
              row
              defaultValue={1}
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value, 10))}
              aria-labelledby="distance-radio-buttons-group-label"
              name="distance-row-radio-buttons-group"
            >
              <FormControlLabel value={1} control={<Radio />} label="1 mile" />
              <FormControlLabel value={5} control={<Radio />} label="5 miles" />
              <FormControlLabel
                value={10}
                control={<Radio />}
                label="10 miles"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            "& .MuiTextField-root": { my: 1, width: "30ch" },
          }}
        >
          <h3>Advanced</h3>
          <Autocomplete
            multiple
            disableCloseOnSelect
            id="charging-levels"
            options={chargingLevelArr}
            defaultValue={[]}
            value={chargingLevels}
            filterSelectedOptions
            onChange={(e, value) => setChargingLevels(value)}
            renderInput={(params) => (
              <TextField {...params} label="Charging Level" />
            )}
          />
          <Autocomplete
            multiple
            disableCloseOnSelect
            id="station-port-types"
            options={stationPortArr}
            defaultValue={[]}
            value={preferredStationPorts}
            filterSelectedOptions
            onChange={(e, value) => setPreferredStationPorts(value)}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Station Port Type(s)"
              />
            )}
          />
          <Autocomplete
            multiple
            disableCloseOnSelect
            id="adapter-types"
            options={[]}
            // https://stackoverflow.com/a/74913444
            getOptionLabel={(option) => {
              return `${option?.vehiclePort} to ${option?.stationPort}`;
            }}
            defaultValue={[]}
            value={adapters}
            filterSelectedOptions
            onChange={(e, value) => setAdapters(value)}
            renderInput={(params) => (
              <TextField {...params} label="Adapters at Hand" />
            )}
          />
        </Box>
        <Box>
          <Button variant="contained" sx={{ py: 1, my: 3, width: "100%" }}>
            Show My Juice Track
          </Button>
        </Box>
      </Box>
    </form>
  );
}

PathInput.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  zip: PropTypes.string.isRequired,
  setZip: PropTypes.func.isRequired,
  streetAddress: PropTypes.string.isRequired,
  setStreetAddress: PropTypes.func.isRequired,
  maxDistance: PropTypes.number.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  chargingLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setChargingLevels: PropTypes.func.isRequired,
  preferredStationPorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPreferredStationPorts: PropTypes.func.isRequired,
  adapters: PropTypes.arrayOf(
    PropTypes.shape({
      vehiclePort: PropTypes.string.isRequired,
      stationPort: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAdapters: PropTypes.func.isRequired,
};
