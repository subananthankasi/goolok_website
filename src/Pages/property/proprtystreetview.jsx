import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";


const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

function PropertyStreetView({ property, loading }) {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [isStreetViewAvailable, setIsStreetViewAvailable] = useState(true);

  const data = property ? property : {};
  const locationStringArray = data?.flat().map((item) => item.location) || [];
  const locationString =
    locationStringArray.length > 0 ? locationStringArray[0] : null;

  const locationArray = locationString ? locationString.split(",") : [];
  const location =
    locationArray.length === 2
      ? {
        lat: parseFloat(locationArray[0].trim()),
        lng: parseFloat(locationArray[1].trim()),
      }
      : null;

  useEffect(() => {
    if (!isLoaded || !location) return;

    // ensure google maps API is ready
    if (window.google && window.google.maps && window.google.maps.StreetViewService) {
      const service = new window.google.maps.StreetViewService();
      service.getPanorama({ location, radius: 50 }, (data, status) => {
        if (status === "OK") {
          setIsStreetViewAvailable(true);
        } else {
          setIsStreetViewAvailable(false);
        }
      });
    } else {
      console.warn("Google Maps StreetViewService not ready yet.");
    }
  }, [isLoaded, location]);

  const streetViewURL = location
    ? `https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${location.lat},${location.lng}&heading=0&pitch=0&fov=90`
    : "";

  return isLoaded ? (
    <div className="property-location map mt-3">
      <div className="divider-fade" />
      {loading && (
        <Skeleton height="300px" width="100%" className="mb-1 " />
      )}
      {isStreetViewAvailable && location && !loading && (
        <iframe
          src={streetViewURL}
          width="100%"
          height="350px"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setIsStreetViewAvailable(false)}
        />
      )}
    </div>
  ) : null;
}

export default PropertyStreetView;
