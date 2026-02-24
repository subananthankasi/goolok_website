import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import MapTheme from "../../../Utils/MapTheme";

const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.082125,
  lng: 80.251417,
};


function OfficeLocations({ allOffices }) {
  const { isLoaded } = useJsApiLoader(loaderOptions);

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    styles: MapTheme,
  };

  return isLoaded ? (
    <div className="mb-5">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={mapOptions}
      >
        {allOffices?.map((office, index) => {
          if (!office.location || !office.location.includes(",")) return null;
          const [lat, lng] = office.location.split(",").map(Number);
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <React.Fragment key={index}>
              <Marker position={{ lat, lng }} />
              <OverlayView
                position={{ lat, lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div
                  style={{
                    backgroundColor: "#374550",
                    color: "#fff",
                    padding: "3px 5px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    // fontWeight: "600",
                    whiteSpace: "nowrap",
                    transform: "translate(-50%, -195%)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    letterSpacing: "0.3px",
                    opacity: 0.95,
                    position: "absolute",
                    fontFamily: "poppins"
                  }}
                >
                  {office.address_type}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #374550",
                      margin: "0 ",
                      marginTop: "2px",
                    }}
                  ></div>
                </div>
              </OverlayView>
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </div>
  ) : null;
}

export default OfficeLocations;
