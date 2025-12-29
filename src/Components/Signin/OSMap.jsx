import React from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OSMMap = ({ center = [13.0827, 80.2707], polygonCoords = [] }) => {
  return (
    <MapContainer
      center={center}
      zoom={9}
      style={{ height: "500px", width: "100%" }}
    >
      {/* 🗺️ OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Optional marker */}
      <Marker position={center} />

      {/* Optional polygon */}
      {polygonCoords.length > 0 && <Polygon positions={polygonCoords} color="blue" />}
    </MapContainer>
  );
};

export default OSMMap;