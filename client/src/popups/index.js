import React, { useState } from "react";
import { Button } from "@mui/material";
import ChargingStationPopup from "./StationPopup";

function PopupTest() {
  const [popupOpen, setPopupOpen] = useState(false);
  const stationId = "149343"; // Replace with station id

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  return (
    <>
      <Button onClick={openPopup}>View Charging Station</Button>
      <ChargingStationPopup
        open={popupOpen}
        handleClose={handlePopupClose}
        stationId={stationId}
      />
    </>
  );
}

export default PopupTest;
