import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  OverlayView,
} from "@react-google-maps/api";

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
  const mapTheme = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#686868",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          lightness: "-22",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          saturation: "11",
        },
        {
          lightness: "-51",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [
        {
          saturation: "3",
        },
        {
          lightness: "-56",
        },
        {
          weight: "2.20",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          lightness: "-52",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "6.13",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [
        {
          lightness: "-10",
        },
        {
          gamma: "0.94",
        },
        {
          weight: "1.24",
        },
        {
          saturation: "-100",
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          saturation: "-41",
        },
        {
          lightness: "-41",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "5.46",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "0.72",
        },
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          lightness: "-37",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#b7e4f4",
        },
        {
          visibility: "on",
        },
      ],
    },
  ];
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    styles: mapTheme,
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
