const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const escapeForSql = (str) => str.replace(/'/g, `\\'`);

const getWhereClause = (filters) => {
  const whereArr = [];
  Object.keys(filters).forEach((key) => {
    const sqlColName = camelToSnakeCase(key); // default column names in MySQL if not specified
    const sqlValue = escapeForSql(filters[key]);
    switch (key) {
      case "state":
      case "city":
      case "zip":
      case "streetAddress":
      case "accessCode":
        whereArr.push(`${sqlColName}='${sqlValue}'`);
        break;
      case "alwaysOpen":
        whereArr.push("access_days_time='24 hours daily'");
        break;
      case "latitude":
      case "longitute":
      case "meterDistance":
        break;
      default: // requires exact match
        console.log(`unsupported filter: ${key}: ${filters[key]}`);
        break;
    }
    // if (obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitute") && obj.hasOwnProperty("meterDistance")) {

    // }
    // console.log(`${key}: ${filters[key]}`);
  });
  return whereArr.length > 0 ? `WHERE ${whereArr.join(" AND ")}` : "";
};

module.exports = { getWhereClause };
