import { Select } from "antd";

/* Set up our drop-down menus */
const { Option } = Select;

const stateOptions = [
  { key: "All", value: "All states" },
  { key: "AL", value: "Alabama" },
  { key: "AK", value: "Alaska" },
  { key: "AZ", value: "Arizona" },
  { key: "AR", value: "Arkansas" },
  { key: "CA", value: "California" },
  { key: "CO", value: "Colorado" },
  { key: "CT", value: "Connecticut" },
  { key: "DE", value: "Delaware" },
  { key: "FL", value: "Florida" },
  { key: "GA", value: "Georgia" },
  { key: "HI", value: "Hawaii" },
  { key: "ID", value: "Idaho" },
  { key: "IL", value: "Illinois" },
  { key: "IN", value: "Indiana" },
  { key: "IA", value: "Iowa" },
  { key: "KS", value: "Kansas" },
  { key: "KY", value: "Kentucky" },
  { key: "LA", value: "Louisiana" },
  { key: "ME", value: "Maine" },
  { key: "MD", value: "Maryland" },
  { key: "MA", value: "Massachusetts" },
  { key: "MI", value: "Michigan" },
  { key: "MN", value: "Minnesota" },
  { key: "MS", value: "Mississippi" },
  { key: "MO", value: "Missouri" },
  { key: "MT", value: "Montana" },
  { key: "NE", value: "Nebraska" },
  { key: "NV", value: "Nevada" },
  { key: "NH", value: "New Hampshire" },
  { key: "NJ", value: "New Jersey" },
  { key: "NM", value: "New Mexico" },
  { key: "NY", value: "New York" },
  { key: "NC", value: "North Carolina" },
  { key: "ND", value: "North Dakota" },
  { key: "OH", value: "Ohio" },
  { key: "OK", value: "Oklahoma" },
  { key: "OR", value: "Oregon" },
  { key: "PA", value: "Pennsylvania" },
  { key: "RI", value: "Rhode Island" },
  { key: "SC", value: "South Carolina" },
  { key: "SD", value: "South Dakota" },
  { key: "TN", value: "Tennessee" },
  { key: "TX", value: "Texas" },
  { key: "UT", value: "Utah" },
  { key: "VT", value: "Vermont" },
  { key: "VA", value: "Virginia" },
  { key: "WA", value: "Washington" },
  { key: "WV", value: "West Virginia" },
  { key: "WI", value: "Wisconsin" },
  { key: "WY", value: "Wyoming" },
];

const stationTypeOptions = [
  { key: "All", value: "All Types" },
  { key: "electric", value: "Electric" },
  { key: "“e85”", value: "E85" },
  { key: "lpg", value: "LPG" },
  { key: "cng", value: "CNG" },
  { key: "bd", value: "BD" },
  { key: "rd", value: "RD" },
  { key: "hy", value: "HY" },
  { key: "lng", value: "LNG" },
];

const vehicleTypeOptions = [
  { key: "All", value: "All vehicle types" },
  { key: "ev", value: "EV" },
  { key: "phev", value: "PHEV" },
  { key: "hev", value: "HEV" },
  { key: "biodiesel", value: "Biodiesel" },
  { key: "e85", value: "E85" },
  { key: "cng", value: "CNG" },
  { key: "propane", value: "Propane" },
  { key: "hydrogen", value: "Hydrogen" },
  { key: "gasoline", value: "Gasoline" },
  { key: "diesel", value: "Diesel" },
];

const portOptions = [
  { key: "All", value: "All ports" },
  { key: "type1", value: "Type 1" },
  { key: "type2", value: "Type 2" },
  { key: "ccs", value: "CCS" },
  { key: "chademo", value: "CHADEMO" },
  { key: "tesla", value: "Tesla" },
  { key: "nema515", value: "NEMA-515" },
  { key: "nema520", value: "NEMA-520" },
  { key: "nema1450", value: "NEMA-1450" },
];

const speedOptions = [
  { key: "All", value: "All charging speeds" },
  { key: "acLevel1", value: "AC level-1" },
  { key: "acLevel2", value: "AC level-2" },
  { key: "dcfast", value: "DC fast charging" },
];

function SelectComponent(type, text, defaultValue) {
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
  }
  return (
    <div
      style={{
        width: "80vw",
        margin: "auto auto",
        marginTop: "3vh",
        marginBottom: "3vh",
      }}
    >
      <p>{text}</p>
      <Select
        defaultValue={defaultValue}
        style={{ width: 500 }}
        // onChange={this.handlePortChange}
      >
        {obj.map((option) => (
          <Option key={option.key}>{option.value}</Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectComponent;
