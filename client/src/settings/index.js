import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { styled } from "@mui/system";
import { useAuth } from "../auth/AuthContext";
import config from "../config.json";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

function Settings() {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const navigate = useNavigate();

  const fetchVehicleInfo = async () => {
    try {
      const token = await currentUser.getIdToken(/* forceRefresh */ true);

      const response = await fetch(
        `http://${config.server_host}:${config.server_port}/users/info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVehicleInfo(data);
      } else {
        setVehicleInfo(null);
      }
    } catch (error) {
      // console.error("Error fetching vehicle info:", error);
      setVehicleInfo(null);
    }
  };

  // Fetch vehicle information when the component mounts or the vehicleId changes
  useEffect(() => {
    fetchVehicleInfo();
  }, [currentUser, vehicleId]);

  // Log out the current user and navigate to the login page
  const handleLogout = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (logoutError) {
      setErrorMsg(`Failed to log out. ${logoutError.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update the vehicle information based on the provided vehicle ID and re-fetch the updated information
  const updateVehicle = async (vid) => {
    try {
      const token = await currentUser.getIdToken(/* forceRefresh */ true);
      const response = await fetch(
        `http://${config.server_host}:${config.server_port}/users/updateInfo/${vid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // const data = await response.json();
        // console.log(data);
        fetchVehicleInfo(); // Re-fetch the updated vehicle information
      } else {
        // console.error("Error updating vehicle info:", response.statusText);
      }
    } catch (error) {
      // console.error("Error updating vehicle info:", error);
    }
  };

  const handleUpdateVehicle = () => {
    updateVehicle(vehicleId);
  };

  return (
    <StyledContainer
      maxWidth="md"
      sx={{
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(10),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        color="primary"
        sx={{ textAlign: "center" }}
      >
        JuiceFinder
      </Typography>
      <Avatar
        sx={{
          margin: theme.spacing(1),
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.success.main,
        }}
      >
        <OfflineBoltIcon />
      </Avatar>
      <div>
        {errorMsg && (
          <Box>
            <Typography color="error">{errorMsg}</Typography>
          </Box>
        )}
        <Box sx={{ fontWeight: "Bold", marginTop: theme.spacing(3) }}>
          <Typography variant="h4">Account Information</Typography>
        </Box>
        <Typography>
          <b>Email:</b> {currentUser.email}
        </Typography>
        <Typography>
          <b>User ID:</b> {currentUser.uid}
        </Typography>

        {vehicleInfo && (
          <div style={{ marginTop: theme.spacing(3) }}>
            <Box sx={{ fontWeight: "Bold" }}>
              <Typography variant="h4">Saved Vehicle Information</Typography>
            </Box>
            <Typography>
              <b>Vehicle ID:</b> {vehicleInfo.id}
            </Typography>
            <Typography>
              <b>Brand:</b> {vehicleInfo.brand}
            </Typography>
            <Typography>
              <b>Type:</b> {vehicleInfo.vehicle_type}
            </Typography>
            <Typography>
              <b>Model:</b> {vehicleInfo.model}
            </Typography>
            <Typography>
              <b>Release Year:</b> {vehicleInfo.release_year}
            </Typography>
            <Typography>
              <b>Variant:</b> {vehicleInfo.variant}
            </Typography>
            <Typography>
              <b>Vehicle Type:</b> {vehicleInfo.type}
            </Typography>
            <Typography>
              <b>Usable Battery Size:</b> {vehicleInfo.usable_battery_size}
            </Typography>
            <Typography>
              <b>Energy Consumption:</b> {vehicleInfo.energy_consumption}
            </Typography>
          </div>
        )}
      </div>

      <Box>
        <Typography variant="h6">
          Add/Update Vehicle ID (for testing):
        </Typography>
        <StyledForm>
          <TextField
            fullWidth
            value={vehicleId}
            placeholder="Type in vehicle id"
            onChange={(e) => setVehicleId(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateVehicle}
          >
            Update Vehicle
          </Button>
        </StyledForm>
      </Box>

      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleLogout}
      >
        Logout (for testing)
      </Button>
    </StyledContainer>
  );
}

export default Settings;
