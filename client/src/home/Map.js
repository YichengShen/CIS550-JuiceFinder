import MapGL, { Marker, NavigationControl, Layer, Source } from "react-map-gl";
import { getBoundsOfDistance } from "geolib";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import pin from "../assets/pin.svg";

import ChargingStationPopup from "../popups/StationPopup";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const BBOX_RATIO = 0.67; // features should be within the bbox of 2/3 the size of the viewport
const LAT_SPAN_11 = 0.2414907913; // viewport latitude span at zoom level 11
const LNG_SPAN_11 = 0.374714631; // viewport longitude span at zoom level 11
const METER_PER_MILE = 1609.34;

export default function Map({
  curLocation,
  srcLocation,
  destLocation,
  path,
  stations,
  distance,
}) {
  const [viewport, setViewport] = useState({
    zoom: 11,
    ...curLocation,
  });
  const mapRef = useRef(null);

  useEffect(() => {
    if (curLocation && curLocation.latitude && curLocation.longitude) {
      const bounds = getBoundsOfDistance(
        curLocation,
        distance * METER_PER_MILE
      );
      const latSpan =
        Math.abs(bounds[0].latitude - bounds[1].latitude) / BBOX_RATIO;
      const lngSpan =
        Math.abs(bounds[0].longitude - bounds[1].longitude) / BBOX_RATIO;
      let zoomValue = Math.min(
        Math.log2(LAT_SPAN_11 / latSpan) + 11,
        Math.log2(LNG_SPAN_11 / lngSpan) + 11
      );
      zoomValue = Math.min(Math.max(zoomValue, 1), 20); // limit zoom range to [1,20]

      setViewport((prevViewport) => ({
        ...prevViewport,
        zoom: zoomValue,
        latitude: curLocation.latitude,
        longitude: curLocation.longitude,
      }));
    }
  }, [curLocation]);

  useEffect(() => {
    if (srcLocation && srcLocation.latitude && srcLocation.longitude) {
      const latSpan =
        Math.abs(srcLocation.latitude - destLocation.latitude) / BBOX_RATIO;
      const lngSpan =
        Math.abs(srcLocation.longitude - destLocation.longitude) / BBOX_RATIO;
      let zoomValue = Math.min(
        Math.log2(LAT_SPAN_11 / latSpan) + 11,
        Math.log2(LNG_SPAN_11 / lngSpan) + 11
      );
      zoomValue = Math.min(Math.max(zoomValue, 1), 20); // limit zoom range to [1,20]
      setViewport((prevViewport) => ({
        ...prevViewport,
        zoom: zoomValue,
        latitude: (srcLocation.latitude + destLocation.latitude) / 2,
        longitude: (srcLocation.longitude + destLocation.longitude) / 2,
      }));
    }
  }, [srcLocation, destLocation]);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // eslint-disable-next-line no-unused-vars
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const [popupOpen, setPopupOpen] = useState(null);

  const handlePopupClose = () => {
    setPopupOpen(null);
  };
  const openPopup = (sid) => {
    setPopupOpen(sid);
  };

  const routeGeojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: path,
    },
  };

  return (
    <MapGL
      ref={mapRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      width="100%"
      height="100%"
      // zoom={zoom}
      // latitude={viewport.latitude}
      // longitude={viewport.longitude}
      onViewportChange={handleViewportChange}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <div style={{ position: "absolute", top: 20, right: 70 }}>
        <NavigationControl showZoom zoomInLabel="+" zoomOutLabel="-" />
      </div>
      {Array.isArray(stations) &&
        stations.length > 0 &&
        stations.map((station) => (
          <Marker
            latitude={station.location.y}
            longitude={station.location.x}
            key={station.sid}
          >
            <button
              type="button"
              onClick={() => openPopup(station.sid)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
              }}
            >
              <img
                src={pin}
                alt="pin"
                style={{ transform: "translate(-50%, -85%)" }}
              />
            </button>
            <ChargingStationPopup
              open={popupOpen === station.sid}
              handleClose={handlePopupClose}
              stationId={`${station.sid}`}
            />
          </Marker>
        ))}
      {curLocation && curLocation.latitude && curLocation.longitude && (
        <Marker
          latitude={curLocation.latitude}
          longitude={curLocation.longitude}
          draggable
        >
          <img
            src={pin}
            alt="pin"
            style={{
              transform: "translate(-50%, -85%)",
              filter: "hue-rotate(160deg) saturate(3)",
            }}
          />
        </Marker>
      )}
      {srcLocation && srcLocation.latitude && srcLocation.longitude && (
        <Marker
          latitude={srcLocation.latitude}
          longitude={srcLocation.longitude}
          draggable
        >
          <img
            src={pin}
            alt="pin"
            style={{
              transform: "translate(-50%, -85%)",
              filter: "hue-rotate(160deg) saturate(3)",
            }}
          />
        </Marker>
      )}
      {destLocation && destLocation.latitude && destLocation.longitude && (
        <Marker
          latitude={destLocation.latitude}
          longitude={destLocation.longitude}
          draggable
        >
          <img
            src={pin}
            alt="pin"
            style={{
              transform: "translate(-50%, -85%)",
              filter: "hue-rotate(280deg) saturate(3)",
            }}
          />
        </Marker>
      )}
      <Source id="route-source" type="geojson" data={routeGeojson}>
        <Layer
          id="plannedPath"
          type="line"
          source="route-source"
          paint={{ "line-color": "#007F00", "line-width": 5 }}
        />
      </Source>
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        position="top-left"
        countries="us"
      />
    </MapGL>
  );
}

Map.propTypes = {
  curLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  setCurLocation: PropTypes.func.isRequired,
  srcLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  setSrcLocation: PropTypes.func.isRequired,
  destLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  setDestLocation: PropTypes.func.isRequired,
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      sid: PropTypes.number.isRequired,
      location: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
  setStations: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
  path: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

Map.defaultProps = { curLocation: {} };
