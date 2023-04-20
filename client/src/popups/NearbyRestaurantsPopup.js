import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useTheme } from "@mui/material/styles";
import {
  Rating,
  Divider,
  TextField,
  MenuItem,
  Slider,
  Select,
  Switch,
  CircularProgress,
} from "@mui/material";

import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";

const config = require("../config.json");

function valuetext(value) {
  return `${value}:00`;
}

// eslint-disable-next-line react/prop-types
function CategoryTag({ label }) {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 128) + 127;
    const g = Math.floor(Math.random() * 100) + 88;
    const b = Math.floor(Math.random() * 128);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const tagStyle = {
    backgroundColor: getRandomColor(),
    opacity: 0.66,
    color: "white",
    borderRadius: "4px",
    padding: "2px 4px",
    fontSize: "12px",
    display: "inline-block",
    marginRight: "4px",
    marginBottom: "2px",
  };

  return <span style={tagStyle}>{label}</span>;
}

function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}

function formatHours(hoursString) {
  if (!hoursString) {
    return (
      <Typography variant="body2" color="text.secondary">
        Hours: Not available
      </Typography>
    );
  }
  const hours = JSON.parse(hoursString);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const anyHoursAvailable =
    hours &&
    days.some(
      // eslint-disable-next-line no-prototype-builtins
      (day) => hours[day] && hours.hasOwnProperty(day) !== "0:0-0:0"
    );

  if (!anyHoursAvailable) {
    return (
      <Typography variant="body2" color="text.secondary">
        Hours: Not available
      </Typography>
    );
  }

  const sameHoursEveryDay = days
    .slice(1)
    .every((day) => hours[day] === hours[days[0]]);

  if (sameHoursEveryDay) {
    return (
      <Typography variant="body2" color="text.secondary">
        Everyday: {hours[days[0]].split("-").map(formatTime).join(" - ")}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {days.slice(0, 3).map((day) => (
          <Typography key={day} variant="body2" color="text.secondary">
            {day}: {/* eslint-disable-next-line no-prototype-builtins */}
            {hours && hours.hasOwnProperty(day)
              ? hours[day].split("-").map(formatTime).join(" - ")
              : "Not available"}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={4}>
        {days.slice(3, 5).map((day) => (
          <Typography key={day} variant="body2" color="text.secondary">
            {day}: {/* eslint-disable-next-line no-prototype-builtins */}
            {hours && hours.hasOwnProperty(day)
              ? hours[day].split("-").map(formatTime).join(" - ")
              : "Not available"}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={4}>
        {days.slice(5).map((day) => (
          <Typography key={day} variant="body2" color="text.secondary">
            {day}: {/* eslint-disable-next-line no-prototype-builtins */}
            {hours && hours.hasOwnProperty(day)
              ? hours[day].split("-").map(formatTime).join(" - ")
              : "Not available"}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
}

function NearbyRestaurantsPopup({ open, handleClose, longitude, latitude }) {
  const myTheme = useTheme();
  const [searchResults, setSearchResults] = useState([]);

  // Filter states
  const [rating, setRating] = useState(3);
  const [distance, setDistance] = useState("5");
  const [category, setCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [timeRange, setTimeRange] = useState([0, 24]);
  const [sortByRating, setSortByRating] = useState(false); // sort
  const [page, setPage] = useState(1); // page is for pagination
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
    setPage(1);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setPage(1);
  };
  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
    setPage(1);
  };

  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = () => {
    setIsLoading(true);
    fetch(
      `http://${config.server_host}:${
        config.server_port
      }/restaurants/nearby/${longitude}/${latitude}?stars=${rating}&maxDistMile=${distance}${
        category && `&category=${category}`
      }${selectedDay && `&day=${selectedDay}`}${
        timeRange[0] === 0 && timeRange[1] === 24 ? "" : `&period=${timeRange}`
      }${sortByRating ? `&sortBy=stars` : ""}`
    )
      .then((res) => {
        if (res.status === 404) {
          throw new Error("No restaurant found in database");
        }
        return res.json();
      })
      .then((resJson) => {
        setSearchResults(resJson);
      })
      .catch((error) => {
        console.error(error.message);
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRestaurants();
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [rating, distance, category, selectedDay, timeRange, sortByRating]);

  // Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const itemsPerPage = 3;
  const displayResults =
    searchResults.length > 0
      ? searchResults.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : [];

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="nearby-restaurants-popup-title"
    >
      <BootstrapDialogTitle
        id="nearby-restaurants-popup-title"
        onClose={handleClose}
      >
        Nearby Restaurants
      </BootstrapDialogTitle>
      {searchResults ? (
        <Box p={2} sx={{ p: myTheme.spacing(3) }}>
          <Grid container spacing={2}>
            {/* filter components */}
            <Grid item xs={12} sm={3}>
              <Typography
                gutterBottom
                component="p"
                variant="h5"
                color="primary"
              >
                Filters
              </Typography>
              <Rating
                name="rating-filter"
                value={rating}
                precision={1}
                onChange={handleRatingChange}
                sx={{ fontSize: 25 }}
              />
              <Divider sx={{ width: "85%", my: myTheme.spacing(2) }} />

              <div>
                <Typography gutterBottom component="p">
                  Distance
                </Typography>
                <RadioGroup
                  aria-label="distance"
                  name="distance"
                  value={distance}
                  onChange={handleDistanceChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="1 mile"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="5 miles"
                  />
                  <FormControlLabel
                    value="10"
                    control={<Radio />}
                    label="10 miles"
                  />
                </RadioGroup>
              </div>
              <Divider sx={{ width: "85%", my: myTheme.spacing(2) }} />

              <div>
                <Typography gutterBottom component="p">
                  Category Search
                </Typography>
                <TextField
                  label="Category"
                  value={category}
                  onChange={handleCategoryChange}
                  variant="outlined"
                  size="small"
                  sx={{ width: "85%" }}
                />
              </div>
              <Divider sx={{ width: "85%", my: myTheme.spacing(2) }} />

              <div>
                <Typography gutterBottom component="p">
                  Open Time
                </Typography>
                <Typography
                  gutterBottom
                  display="inline"
                  component="p"
                  sx={{ mr: myTheme.spacing(1) }}
                >
                  Day
                </Typography>
                <Select
                  labelId="day-select-label"
                  id="day-select"
                  value={selectedDay}
                  onChange={handleDayChange}
                  variant="outlined"
                  sx={{
                    minWidth: 120,
                    marginBottom: myTheme.spacing(1),
                    height: 40,
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
                <Typography component="p">Hours</Typography>
                <Slider
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="time-range-slider"
                  getAriaValueText={valuetext}
                  min={0}
                  max={24}
                  step={1}
                  marks={[
                    { value: 0, label: "0:00" },
                    { value: 24, label: "24:00" },
                  ]}
                  sx={{ width: "80%", ml: myTheme.spacing(1) }}
                />
              </div>
            </Grid>

            {/* search results */}
            <Grid item xs={12} sm={9} sx={{ borderLeft: 2 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    gutterBottom
                    component="p"
                    variant="h5"
                    color="primary"
                  >
                    Search Results
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sortByRating}
                        size="large"
                        onChange={(event) =>
                          setSortByRating(event.target.checked)
                        }
                        color="success"
                      />
                    }
                    label="Sort by Rating"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {isLoading && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: myTheme.spacing(2),
                    }}
                  >
                    <CircularProgress />
                  </Grid>
                )}
                {!isLoading && searchResults.length === 0 && (
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ mt: myTheme.spacing(2), ml: myTheme.spacing(2) }}
                  >
                    No results found
                  </Typography>
                )}
                {!isLoading &&
                  searchResults.length > 0 &&
                  displayResults.map((result) => (
                    <Grid item xs={12} key={result.business_id}>
                      <Box>
                        <Typography component="div" variant="h6">
                          {result.name}{" "}
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: myTheme.spacing(2) }}
                          >
                            {(result.distance / 1609.34).toFixed(2)} miles
                          </Typography>
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Rating
                            value={result.stars}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: myTheme.spacing(2) }}
                          >
                            {result.review_count} reviews
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text">
                          {result.categories.split(",").map((c) => (
                            <CategoryTag
                              key={`${result.bussiness_id}-${c.trim()}`}
                              label={c.trim()}
                            />
                          ))}
                        </Typography>
                        <Typography variant="body2" color="text">
                          {result.address}, {result.city}, {result.state},{" "}
                          {result.postal_code}
                        </Typography>
                        {formatHours(result.hours)}
                      </Box>
                      <Divider />
                    </Grid>
                  ))}
              </Grid>
              <Pagination
                count={Math.ceil(searchResults.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography gutterBottom>Loading...</Typography>
      )}
    </BootstrapDialog>
  );
}

NearbyRestaurantsPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};

NearbyRestaurantsPopup.defaultProps = {
  longitude: null,
  latitude: null,
};

export default NearbyRestaurantsPopup;
