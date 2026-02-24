import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polygon,
  OverlayView,
} from "@react-google-maps/api";
import { IMG_PATH } from "../../Api/api";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { decryptData } from "../../Utils/encryptData";
import loc from "../../assets/loc.png";
import "leaflet/dist/leaflet.css";
import tamilNaduPolygon from "../../Utils/TamilnaduPolygon";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};

const LIBRARIES = ["places", "geometry"];
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: LIBRARIES,
};

const SearchLocation = ({ propertyData }) => {

  const [activeMarker, setActiveMarker] = useState(null);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);

  const coverLocation = sessionStorage.getItem("location");
  const decryCoverLocation = coverLocation ? decryptData(coverLocation) : "";
  const data =
    Array.isArray(propertyData) && propertyData.length > 0 ? propertyData : [];

  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    const createRoundedPolygon = (
      minLat,
      maxLat,
      minLon,
      maxLon,
      segments = 64
    ) => {
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLon + maxLon) / 2;
      const radiusLat = (maxLat - minLat) / 2;
      const radiusLng = (maxLon - minLon) / 2;

      const coords = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * 2 * Math.PI;
        const lat = centerLat + radiusLat * Math.sin(angle);
        const lng = centerLng + radiusLng * Math.cos(angle);
        coords.push({ lat, lng });
      }
      return coords;
    };

    const showTamilNaduBoundary = () => {
      setPolygonCoords(tamilNaduPolygon);

      const center = tamilNaduPolygon.reduce(
        (acc, curr) => ({ lat: acc.lat + curr.lat, lng: acc.lng + curr.lng }),
        { lat: 0, lng: 0 }
      );

      setMapCenter({
        lat: center.lat / tamilNaduPolygon.length,
        lng: center.lng / tamilNaduPolygon.length,
      });
      setMapZoom(6);
      // setMapCenter({
      //   lat: 13.078187,
      //   lng: 79.972347
      // });

    };

    if (!decryCoverLocation) {
      showTamilNaduBoundary();
      return;
    }

    const fetchBoundary = async () => {
      try {
        const nominatimRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(
            decryCoverLocation + ", Tamil Nadu, India"
          )}`
        );
        const nominatimData = await nominatimRes.json();
        if (!nominatimData?.length) {
          console.warn("No location found, showing Tamil Nadu fallback.");
          return showTamilNaduBoundary();
        }
        const bestMatch = nominatimData[0];
        const { lat, lon, boundingbox, geojson, display_name } = bestMatch;

        const centerLat = parseFloat(lat);
        const centerLng = parseFloat(lon);

        if (
          geojson &&
          (geojson.type === "Polygon" || geojson.type === "MultiPolygon")
        ) {
          const coords =
            geojson.type === "Polygon"
              ? geojson.coordinates[0].map(([lng, lat]) => ({ lat, lng }))
              : geojson.coordinates[0][0].map(([lng, lat]) => ({ lat, lng }));

          setPolygonCoords(coords);
          setMapCenter({ lat: centerLat, lng: centerLng });
          setMapZoom(10)
        } else if (boundingbox) {
          const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);

          // Create a rounded polygon
          const roundedPolygon = createRoundedPolygon(
            minLat,
            maxLat,
            minLon,
            maxLon,
            64
          );
          setPolygonCoords(roundedPolygon);
          setMapCenter({ lat: centerLat, lng: centerLng });
          setMapZoom(10)

          console.warn(
            ` Polygon missing — using rounded bounding box for ${display_name}`
          );
        } else {
          // fallback to Tamil Nadu polygon
          showTamilNaduBoundary();
        }
      } catch (err) {
        console.error("Boundary fetch error:", err);
        showTamilNaduBoundary();
      }
    };

    fetchBoundary();
  }, [decryCoverLocation]);

  const onLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      if (polygonCoords.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        polygonCoords.forEach((p) => bounds.extend(p));
        mapInstance.fitBounds(bounds);
      }
    },
    [polygonCoords]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);


  const handleMarkerHover = (index) => {
    setActiveMarker((prevIndex) => {
      if (prevIndex === index) {
        return null;
      }
      return null;
    });

    setTimeout(() => {
      setActiveMarker(index);
    }, 0);
  };

  const closeClick = (id) => {
    setActiveMarker(null);
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
    <section style={{ marginTop: "0px" }}>
      <div className="">
        <div
          className="map-container p-2"
          style={{ height: "725px", margin: "10px" }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            // zoom={10}
            zoom={mapZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {data?.map((item, index) => {
              if (!item.location || !item.location.includes(",")) {
                console.warn("Invalid location format:", item.location);
                return null;
              }
              const [lat, lng] = item.location?.split(",").map(Number);

              if (isNaN(lat) || isNaN(lng)) {
                console.warn("Invalid coordinates:", { lat, lng });
                return null;
              }
              return (
                <>
                  {(() => {
                    const currentProduct = data.find((p) => p.id === item.id);
                    return (
                      <>
                        <Marker
                          key={index}
                          position={{ lat, lng }}
                          onClick={() => handleMarkerHover(index)}
                          icon={{
                            url: loc,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        >
                          {activeMarker === index && (
                            <InfoWindow
                              position={{ lat, lng }}
                              options={{
                                pixelOffset: new window.google.maps.Size(0, 5),
                                maxWidth: 400,
                              }}
                              onCloseClick={closeClick}
                            >
                              <div className="infowindow-detail">
                                {currentProduct && (
                                  <Link
                                    to={`/property/${currentProduct.id}/${currentProduct.propertyType}`}
                                    key={currentProduct.id}
                                    className="text-decoration-none text-dark"
                                  >
                                    {currentProduct.video ? (
                                      <video
                                        src={`${IMG_PATH}enquiry/video/${currentProduct.video}`}
                                        controls
                                        className="infowindow-media"
                                      />
                                    ) : (
                                      <Carousel
                                        interval={3000}
                                        controls={true}
                                        indicators={false}
                                        className="infowindow-carousel"
                                      >
                                        {currentProduct.images?.map((img, i) => (
                                          <Carousel.Item key={i}>
                                            <img
                                              src={`${IMG_PATH}enquiry/gallery/${img}`}
                                              alt={`slide-${i}`}
                                              className="infowindow-media"
                                            />
                                          </Carousel.Item>
                                        ))}
                                      </Carousel>
                                    )}

                                    <div className="infowindow-content p-2">
                                      <h5 className="p-0 m-0">{currentProduct.landType}</h5>
                                      <h5 className="p-0 m-0" style={{ color: "gray" }}>
                                        {currentProduct.propertyName}
                                      </h5>
                                      <p className="mb-1" style={{ letterSpacing: "0.5px" }}>
                                        <i className="fa fa-map-marker me-2 " />
                                        {currentProduct.taluk}
                                      </p>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span style={{ fontWeight: "600" }}>
                                          <i className="fa-solid fa-ruler-combined me-1" />
                                          {currentProduct.units}
                                        </span>
                                        <span className="infowindow-price">
                                          <i className="fa fa-inr me-1" />
                                          {currentProduct.price}
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </InfoWindow>
                          )}
                        </Marker>

                        {/* 🔹 Overlay updated to use currentProduct */}
                        {currentProduct && (
                          <OverlayView
                            position={{ lat: lat, lng: lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                          >
                            <div className="custom-tooltip">{currentProduct.propertyName}</div>
                          </OverlayView>
                        )}
                      </>
                    );
                  })()}
                </>
              );
            })}
            {polygonCoords.length > 0 && (
              <Polygon
                paths={polygonCoords}
                options={{
                  strokeColor: "#05599F",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#78BDF6",
                  fillOpacity: 0.35,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </section>
  ) : null;
};

export default SearchLocation;
