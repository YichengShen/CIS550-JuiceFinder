import * as React from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const stateOptions = [
  { key: "All", text: "All states" },
  { key: "AL", text: "Alabama" },
  { key: "AK", text: "Alaska" },
  { key: "AZ", text: "Arizona" },
  { key: "AR", text: "Arkansas" },
  { key: "CA", text: "California" },
  { key: "CO", text: "Colorado" },
  { key: "CT", text: "Connecticut" },
  { key: "DE", text: "Delaware" },
  { key: "FL", text: "Florida" },
  { key: "GA", text: "Georgia" },
  { key: "HI", text: "Hawaii" },
  { key: "ID", text: "Idaho" },
  { key: "IL", text: "Illinois" },
  { key: "IN", text: "Indiana" },
  { key: "IA", text: "Iowa" },
  { key: "KS", text: "Kansas" },
  { key: "KY", text: "Kentucky" },
  { key: "LA", text: "Louisiana" },
  { key: "ME", text: "Maine" },
  { key: "MD", text: "Maryland" },
  { key: "MA", text: "Massachusetts" },
  { key: "MI", text: "Michigan" },
  { key: "MN", text: "Minnesota" },
  { key: "MS", text: "Mississippi" },
  { key: "MO", text: "Missouri" },
  { key: "MT", text: "Montana" },
  { key: "NE", text: "Nebraska" },
  { key: "NV", text: "Nevada" },
  { key: "NH", text: "New Hampshire" },
  { key: "NJ", text: "New Jersey" },
  { key: "NM", text: "New Mexico" },
  { key: "NY", text: "New York" },
  { key: "NC", text: "North Carolina" },
  { key: "ND", text: "North Dakota" },
  { key: "OH", text: "Ohio" },
  { key: "OK", text: "Oklahoma" },
  { key: "OR", text: "Oregon" },
  { key: "PA", text: "Pennsylvania" },
  { key: "RI", text: "Rhode Island" },
  { key: "SC", text: "South Carolina" },
  { key: "SD", text: "South Dakota" },
  { key: "TN", text: "Tennessee" },
  { key: "TX", text: "Texas" },
  { key: "UT", text: "Utah" },
  { key: "VT", text: "Vermont" },
  { key: "VA", text: "Virginia" },
  { key: "WA", text: "Washington" },
  { key: "WV", text: "West Virginia" },
  { key: "WI", text: "Wisconsin" },
  { key: "WY", text: "Wyoming" },
];

const stationTypeOptions = [
  { key: "All", text: "All station types" },
  { key: "electric", text: "Electric" },
  { key: "e85", text: "E85" },
  { key: "lpg", text: "LPG" },
  { key: "cng", text: "CNG" },
  { key: "bd", text: "BD" },
  { key: "rd", text: "RD" },
  { key: "hy", text: "HY" },
  { key: "lng", text: "LNG" },
];

const vehicleTypeOptions = [
  { key: "All", text: "All vehicle types" },
  { key: "ev", text: "EV" },
  { key: "phev", text: "PHEV" },
  { key: "hev", text: "HEV" },
  { key: "biodiesel", text: "Biodiesel" },
  { key: "e85", text: "E85" },
  { key: "cng", text: "CNG" },
  { key: "propane", text: "Propane" },
  { key: "hydrogen", text: "Hydrogen" },
  { key: "gasoline", text: "Gasoline" },
  { key: "diesel", text: "Diesel" },
];

const portOptions = [
  { key: "All", text: "All ports" },
  { key: "type1", text: "Type-1" },
  { key: "type2", text: "Type-2" },
  { key: "ccs", text: "Ccs" },
  { key: "chademo", text: "Chademo" },
  { key: "tesla", text: "Tesla" },
  { key: "nema515", text: "NEMA-515" },
  { key: "nema520", text: "NEMA-520" },
  { key: "nema1450", text: "NEMA-1450" },
];

const speedOptions = [
  { key: "All", text: "All speeds" },
  { key: "acLevel1", text: "AC level-1" },
  { key: "acLevel2", text: "AC level-2" },
  { key: "dcfast", text: "DC fast charging" },
];

const network = [
  "Non-Networked",
  "Volta",
  "EV Connect",
  "POWERFLEX",
  "ChargePoint Network",
  "OpConnect",
  "SHELL_RECHARGE",
  "EVGATEWAY",
  "eVgo Network",
  "AMPUP",
  "Webasto",
  "SemaCharge Network",
  "UNIVERSAL",
  "EVCS",
  "Blink Network",
  "FCN",
  "Tesla",
  "Tesla Destination",
  "EVRANGE",
  "Electrify America",
  "CHARGELAB",
  "LIVINGSTON",
  "FLO",
  "ZEFNET",
  "FPLEV",
  "RIVIAN_WAYPOINTS",
  "RED_E",
  "SWTCH",
  "CIRCLE_K",
  "WAVE",
  "GRAVITI_ENERGY",
  "FLASH",
  "RIVIAN_ADVENTURE",
  "CHARGEUP",
];
// map an array to dictionary
// const networkOptions = Object.fromEntries(network.map(x => {"key":x, "value":x}));
const networkOptions = [];
networkOptions[0] = { key: "All", text: "All networks" };

function arrToDict(item, index) {
  networkOptions[index + 1] = { key: item, text: item };
}
// Sort by string order to make sure the plotting order is consistent.
network.sort().forEach(arrToDict);

function SelectComponent(type, label, defaultValue, handler, stateVariable) {
  // use theme for this page
  const theme = useTheme();
  // loaded menu options based on given type
  let obj = [];
  if (type === "port") {
    obj = portOptions;
  } else if (type === "state") {
    obj = stateOptions;
  } else if (type === "stationType") {
    obj = stationTypeOptions;
  } else if (type === "vehicleType") {
    obj = vehicleTypeOptions;
  } else if (type === "speed") {
    obj = speedOptions;
  } else if (type === "network") {
    obj = networkOptions;
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        // labelId="demo-select-small"
        // id="demo-select-small"
        defaultValue={defaultValue}
        value={stateVariable}
        label={label}
        onChange={handler}
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
        }}
      >
        {obj.map((row) => (
          <MenuItem value={row.key} color={theme.palette.background.default}>
            {row.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
