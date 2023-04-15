const { camelToSnakeCase, escapeForSql } = require("./commonService");
const { getCoordinatesFromAddress } = require("./locationService");

const getWhereClause = async (filters) => {
  const whereArr = [];
  let latitude;
  let longitude;
  const meterDistance = filters.meterDistance || 1609;

  // if both street address and coordinates are provided
  // use the coordinates provided
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
        console.log(`unsupported filter: ${key}=${filters[key]}`);
        break;
    }
  });

  return whereArr.length > 0 ? `WHERE ${whereArr.join(" AND ")}` : "";
};

module.exports = { getWhereClause };
