import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import pin from "../assets/pin.svg";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map({
  curLocation,
  setCurLocation,
  stations,
  setStations,
}) {
  // console.log(curLocation);
  const [viewport, setViewport] = useState({
    zoom: 11,
    ...curLocation,
  });
  // eslint-disable-next-line no-unused-vars
  // const [zoom, setZoom] = useState(14);
  const mapRef = useRef();
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
      onViewStateChange={handleViewportChange}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {curLocation && (
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
      {stations?.map((station) => (
        <Marker
          latitude={station.location.y}
          longitude={station.location.x}
          key={station.sid}
        >
          <img
            src={pin}
            alt="pin"
            style={{ transform: "translate(-50%, -85%)" }}
          />
        </Marker>
      ))}
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
};

Map.defaultProps = { curLocation: {} };
