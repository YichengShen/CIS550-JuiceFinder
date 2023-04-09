module.exports = {
  "client/**/*.{js,jsx,ts,tsx}": ["eslint --config ./client/.eslintrc.json --max-warnings=0"],
  "client/**/*.{js,jsx,ts,tsx,json,css}": ["prettier --config ./client/.prettierrc --write"],
  "server/**/*.{js,jsx,ts,tsx}": ["eslint --config ./server/.eslintrc.json --max-warnings=0"],
  "server/**/*.{js,jsx,ts,tsx,json,css}": ["prettier --config ./server/.prettierrc --write"],
};
