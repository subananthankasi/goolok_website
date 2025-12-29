import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Tooltip } from "primereact/tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import loc from "../../assets/loc.png";
import school from "../../assets/school.png";
import bus from "../../assets/bus.png";
import { Skeleton } from "primereact/skeleton";

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
  lat: 13.078187,
  lng: 79.972347,
};

function Propertylocation({ property, loading }) {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const data = Array.isArray(property) && property.length > 0 ? property : [];
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (data.length > 0) {
      const [lat, lng] = data[0].location.split(",").map(parseFloat);
      setCenter({ lat, lng });
    }
  }, [data]);

  // const localities = data.map((item) => item.nearByLocalities)
  const localities = data.map((item) => item.nearByLocalities).flat();
  const [mapRef, setMapRef] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const handleMarkerHover = (index) => {
    setHoveredMarker(index);
  };
  const mainLocation = data[0]?.location.split(",").map(parseFloat) || [0, 0];

  const calculateDistance = (lat, lng) => {
    if (!isLoaded || !window.google?.maps?.geometry?.spherical) return 0;

    const centerLatLng = new window.google.maps.LatLng(
      mainLocation[0],
      mainLocation[1]
    );
    const markerLatLng = new window.google.maps.LatLng(lat, lng);
    const distanceInMeters =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        centerLatLng,
        markerLatLng
      );
    return (distanceInMeters / 1000).toFixed(2);
  };

  const closeClick = () => {
    setHoveredMarker(null);
  };

  const [handleMarker, setHandleMarker] = useState(null);

  const handleMarking = (index) => {
    setHandleMarker(index);
  };

  useEffect(() => { }, [hoveredMarker]);

  const marking = data[0]?.locationAll || [];

  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const handleMarkerClick = (markerId) => {
    setActiveMarkerId((prevMarkerId) =>
      prevMarkerId === markerId ? null : markerId
    );
  };

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
    styles: mapTheme,
    disableDefaultUI: false,
    zoomControl: true,
  };

  return isLoaded ? (
    <div>
      {!loading && (
        <div className="d-flex flex-wrap gap-3 flex-md-row flex-column mb-2">
          {[
            { label: "All", color: "rgb(47, 79, 79)", key: "all" },
            {
              label: "School & Colleges",
              color: "rgb(110, 151, 255)",
              key: "school & colleges",
            },
            {
              label: "Transport Facility",
              color: "rgb(0, 230, 77)",
              key: "transport facility",
            },
            {
              label: "Major Land Mark",
              color: "rgb(252, 245, 106)",
              key: "majar",
            },
            {
              label: "New Developments",
              color: "rgb(255, 153, 0)",
              key: "new developments",
            },
          ].map((item) => (
            <div className="d-flex align-items-center gap-2" key={item.key}>
              <strong
                style={{
                  backgroundColor: item.color,
                  height: "15px",
                  width: "15px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCategory(item.key)}
              ></strong>
              <p style={{ fontSize: "13px", marginBottom: "0" }}>{item.label}</p>
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <Skeleton height="300px" width="100%" className="mb-1 " />
      ) : (
        <div className="property-location map">
          <div className="divider-fade" />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onLoad={(map) => setMapRef(map)}
            options={mapOptions}
          >
            {marking.length > 0 && (
              <Polygon
                path={marking
                  .filter((item) => item.location)
                  .map((item) => {
                    const [lat, lng] = item.location.split(",").map(parseFloat);
                    return { lat, lng };
                  })}
                options={{
                  fillColor: "#c8e0f4",
                  fillOpacity: 0.7,
                  strokeColor: "#2673b0",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )}

            {marking?.map((item, index) => {
              if (!item.location) return null;
              const [lat, lng] = item.location.split(",").map(parseFloat);
              return (
                <React.Fragment key={item.id}>
                  <Marker
                    position={{ lat, lng }}
                    onClick={() => {
                      setHandleMarker(index);
                      setHoveredMarker(null);
                    }}
                    tooltip="Confirm to proceed"
                    icon={{
                      url: loc,
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                  {handleMarker === index && (
                    <InfoWindow
                      position={{ lat, lng }}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -30),
                        maxWidth: 500,
                      }}
                      onCloseClick={() => setHandleMarker(null)}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          height: "50px",
                          overflow: "hidden",
                        }}
                        className="p-0"
                      >
                        <h6 style={{ fontWeight: "400", fontSize: "15px" }}>
                          {" "}
                          Surveyggg No : {item.survey_no}
                        </h6>
                        <p>
                          <LocationOnIcon sx={{ color: "red", fontSize: 17 }} />{" "}
                          {item.location}{" "}
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </React.Fragment>
              );
            })}

            {localities?.map((item, index) => {
              if (item.location && typeof item.location === "string") {
                const [lat, lng] = item.location.split(",").map(parseFloat);
                const distance = calculateDistance(lat, lng);

                const markerColor =
                  item.division === "school & colleges"
                    ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    : item.division === "transport facility"
                      ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                      : item.division === "majar"
                        ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                        : item.division === "new developments"
                          ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                          : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

                if (
                  selectedCategory === "all" ||
                  item.division === selectedCategory
                ) {
                  return (
                    <React.Fragment key={item.id}>
                      <Marker
                        position={{ lat, lng }}
                        icon={markerColor}
                        onClick={() => {
                          setHoveredMarker(index);
                          setHandleMarker(null);
                        }}
                        tooltip="Confirm to proceed"
                      />
                      {hoveredMarker === index && (
                        <InfoWindow
                          position={{ lat, lng }}
                          options={{
                            pixelOffset: new window.google.maps.Size(0, -30),
                            maxWidth: 500,
                          }}
                          onCloseClick={() => setHoveredMarker(null)}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              height: "50px",
                              overflow: "hidden",
                            }}
                            className="p-0"
                          >
                            <h6 style={{ fontWeight: "400", fontSize: "15px" }}>
                              {item.title}
                            </h6>
                            <p>
                              <LocationOnIcon
                                sx={{ color: "red", fontSize: 17 }}
                              />{" "}
                              distance from {distance} km{" "}
                            </p>
                          </div>
                        </InfoWindow>
                      )}
                    </React.Fragment>
                  );
                }
              }
              return null;
            })}
          </GoogleMap>

          <div />
        </div>
      )}

    </div>
  ) : null;
}

export default Propertylocation;
