/* placeholder code */
// eslint-disable-next-line no-unused-vars
const getCoordinates = async (fullAddress) => {
  console.log("fetching coordinates of the address");
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // coordinates of Moore School Building
  return { latitude: 39.95259936520524, longitude: -75.1903160090228 };
};

module.exports = { getCoordinates };
