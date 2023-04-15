const { camelToSnakeCase, escapeForSql } = require("./commonService");
const { getCoordinatesFromAddress } = require("./locationService");

let parseElectricFilters = () => {};

const getWhereClause = async (filters, isElectric = false) => {
  const whereArr = [];
  const unsupportedFilters = {};
  let latitude;
  let longitude;
  const meterDistance = filters.meterDistance || 1609;

  // generate filter predicate based on street address or coordinates
  // if both street address and coordinates are provided, use the coordinates
  if (
    Object.prototype.hasOwnProperty.call(filters, "latitude") &&
    Object.prototype.hasOwnProperty.call(filters, "longitude")
  ) {
    latitude = filters.latitude;
    longitude = filters.longitude;
  } else if (filters.streetAddress) {
    ({ latitude, longitude } = await getCoordinatesFromAddress());
  }

  if (latitude && longitude) {
    whereArr.push(
      `ST_Distance_Sphere(location, ST_SRID(ST_GEOMFROMTEXT('POINT(${longitude} ${latitude})'), 4326)) < ${meterDistance}`
    );
  }

  Object.keys(filters).forEach((key) => {
    const sqlColName = camelToSnakeCase(key); // default column names in MySQL if not specified
    const sqlColValue = escapeForSql(filters[key]);
    switch (key) {
      // filters that requires exact match
      case "state":
      case "city":
      case "zip":
      case "accessCode":
        whereArr.push(`${sqlColName}='${sqlColValue}'`);
        break;
      case "alwaysOpen":
        whereArr.push("access_days_time='24 hours daily'");
        break;
      // special filters that requires separate processing
      case "latitude":
      case "longitude":
      case "meterDistance":
      case "streetAddress":
        break;
      default:
        unsupportedFilters[key] = [filters[key]];
        break;
    }
  });

  let resultArr;
  if (isElectric) {
    resultArr = whereArr.concat(parseElectricFilters(unsupportedFilters));
  } else {
    resultArr = whereArr;
    Object.entries.forEach(([key, value]) => {
      console.log(
        `Station filter recognized but not supported yet: ${key}=${value}`
      );
    });
  }

  return resultArr.length > 0 ? `WHERE ${resultArr.join(" AND ")}` : "";
};

parseElectricFilters = (filters) => {
  const electricWhereArr = [];
  Object.keys(filters).forEach((key) => {
    switch (key) {
      case "vehiclePorts":
      case "stationPorts":
      case "adaptors":
      case "chargeLevel":
        break;
      default:
        console.log(
          `Station filter recognized but not supported yet: ${key}=${filters[key]}`
        );
        break;
    }
  });
  return electricWhereArr;
};

module.exports = { getWhereClause };
