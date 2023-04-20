import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogContent, Typography, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material/styles";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LanguageIcon from "@mui/icons-material/Language";
import EvStationIcon from "@mui/icons-material/EvStation";

import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import NearbyRestaurantsPopup from "./NearbyRestaurantsPopup";

const config = require("../config.json");

function StationPopup({ open, handleClose, stationId }) {
  const myTheme = useTheme();
  const [stationData, setStationData] = useState(null);

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/stations/electric/${stationId}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setStationData(resJson);
      });
  }, []);

  // Restaurant Search
  const [nearbyRestaurantsOpen, setNearbyRestaurantsOpen] =
    React.useState(false);

  const handleNearbyRestaurantsOpen = () => {
    setNearbyRestaurantsOpen(true);
  };
  const handleNearbyRestaurantsClose = () => {
    setNearbyRestaurantsOpen(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      {stationData ? (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Charging Station Details
          </BootstrapDialogTitle>
          <DialogContent sx={{ mx: 2, my: 1 }}>
            {stationData ? (
              <>
                <DialogTitle>
                  <Typography
                    gutterBottom
                    component="p"
                    variant="h4"
                    color="primary"
                  >
                    {stationData.station_name}
                  </Typography>
                </DialogTitle>
                {/* <Typography>ID: {stationData.sid}</Typography> */}
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <LocationOnIcon
                    sx={{
                      fontSize: "1.1em",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                      color: myTheme.palette.primary.light,
                    }}
                  />
                  <b>Address: </b>
                  {stationData.street_address}, {stationData.city},{" "}
                  {stationData.state}, {stationData.zip}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <ScheduleIcon
                    sx={{
                      fontSize: "1.1em",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                      color: myTheme.palette.primary.light,
                    }}
                  />
                  <b>Time/Constraints: </b>
                  {stationData.access_days_time}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <VpnKeyIcon
                    sx={{
                      fontSize: "1.1em",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                      color: myTheme.palette.primary.light,
                    }}
                  />
                  <b>Access: </b>
                  {stationData.access_code}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <LanguageIcon
                    sx={{
                      fontSize: "1.1em",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                      color: myTheme.palette.primary.light,
                    }}
                  />
                  <b>Network: </b>
                  {stationData.ev_network}
                </Typography>
                <Typography component="div" variant="body1">
                  <EvStationIcon
                    sx={{
                      fontSize: "1.1em",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                      color: myTheme.palette.primary.light,
                    }}
                  />
                  <b>Number of Charging Ports: </b>
                  <ul style={{ margin: 0 }}>
                    <li>{stationData.ev_dc_fast_num} DC fast charging ports</li>
                    <li>
                      {stationData.ev_level1_evse_num} AC level1 charging ports
                    </li>
                    <li>
                      {stationData.ev_level2_evse_num} AC level2 charging ports
                    </li>
                  </ul>
                </Typography>
              </>
            ) : (
              <Typography gutterBottom>Loading...</Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ mb: myTheme.spacing(2) }}>
            <Button
              autoFocus
              onClick={handleNearbyRestaurantsOpen}
              sx={{
                fontSize: 18,
                px: myTheme.spacing(3),
                mb: myTheme.spacing(2),
                margin: "0 auto",
                display: "block",
                color: myTheme.palette.success.contrastText,
                backgroundColor: myTheme.palette.success.main,
                "&:hover": {
                  backgroundColor: myTheme.palette.success.light,
                },
              }}
            >
              Search Nearby Restaurants
            </Button>
            <NearbyRestaurantsPopup
              open={nearbyRestaurantsOpen}
              handleClose={handleNearbyRestaurantsClose}
              longitude={stationData.location.x}
              latitude={stationData.location.y}
            />
          </DialogActions>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </BootstrapDialog>
  );
}

StationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  stationId: PropTypes.string,
};

StationPopup.defaultProps = {
  stationId: null,
};

export default StationPopup;
