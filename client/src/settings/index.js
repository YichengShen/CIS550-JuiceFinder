import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const config = require("../config.json");

function Settings() {
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
    <div className="settings">
      <h1>Settings</h1>
      {errorMsg && <div>{errorMsg}</div>}
      <div>
        <h3>Email:</h3>
        <p>{currentUser.email}</p>
      </div>
      <div>
        <h3>Creation Time:</h3>
        <p>{new Date(currentUser.metadata.creationTime).toLocaleString()}</p>
      </div>
      <div>
        <h3>User ID:</h3>
        <p>{currentUser.uid}</p>
      </div>

      {vehicleInfo && (
        <div>
          <h3>Vehicle Information:</h3>
          <p>ID: {vehicleInfo.id}</p>
          <p>Brand: {vehicleInfo.brand}</p>
          <p>Type: {vehicleInfo.vehicle_type}</p>
          <p>Model: {vehicleInfo.model}</p>
          <p>Release Year: {vehicleInfo.release_year}</p>
          <p>Variant: {vehicleInfo.variant}</p>
          <p>Vehicle Type: {vehicleInfo.type}</p>
          <p>Usable Battery Size: {vehicleInfo.usable_battery_size}</p>
          <p>Energy Consumption: {vehicleInfo.energy_consumption}</p>
        </div>
      )}

      <button type="button" disabled={loading} onClick={handleLogout}>
        Logout (for testing)
      </button>
      <div>
        <h3>Add/Update Vehicle ID (for testing):</h3>
        <input
          type="text"
          value={vehicleId}
          placeholder="Type in vehicle id"
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <button type="button" onClick={handleUpdateVehicle}>
          Update Vehicle
        </button>
      </div>
    </div>
  );
}

export default Settings;
