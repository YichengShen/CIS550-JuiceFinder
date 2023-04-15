const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const escapeForSql = (str) => str.replace(/'/g, `''`);

module.exports = { camelToSnakeCase, escapeForSql };
