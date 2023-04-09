module.exports = {
  "server/**/*.{js,jsx,ts,tsx}": [
    "jest --coverage --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
  "client/**/*.{js,jsx,ts,tsx}": [
    "react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
