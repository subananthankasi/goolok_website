import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "primereact/skeleton";


const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

function PropertyStreetView({ property, loading }) {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [isStreetViewAvailable, setIsStreetViewAvailable] = useState(true);

  const data = useMemo(() => property || {}, [property]);

  const locationStringArray = useMemo(() => {
    const arr = Array.isArray(data) ? data.flat() : [];
    return arr.map((item) => item.location);
  }, [data]);

  const locationString = useMemo(() => {
    return locationStringArray.length > 0 ? locationStringArray[0] : null;
  }, [locationStringArray]);

  const locationArray = useMemo(() => {
    return locationString ? locationString.split(",") : [];
  }, [locationString]);

  const location = useMemo(() => {
    if (locationArray.length === 2) {
      return {
        lat: parseFloat(locationArray[0].trim()),
        lng: parseFloat(locationArray[1].trim()),
      };
    }
    return null;
  }, [locationArray]);

  useEffect(() => {
    if (!isLoaded || !location) return;
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
          title="Google Street View"
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
