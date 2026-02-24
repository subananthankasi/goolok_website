import { useState, useEffect } from "react";
import axios from "axios";

const UseLocationFetcher = (callback) => {
    const [mapLoading, setMapLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            if (!navigator.geolocation) {
                console.warn("Geolocation not supported");
                callback({ lat: null, lon: null, neighborhood: "Chennai" });
                setMapLoading(false);
                return;
            }
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;

                    try {
                        const geoRes = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`
                        );

                        const components = geoRes.data.results[0]?.address_components || [];
                        const neighborhood =
                            components.find((c) => c.types.includes("sublocality_level_1"))
                                ?.long_name ||
                            components.find((c) => c.types.includes("locality"))?.long_name ||
                            components.find((c) =>
                                c.types.includes("administrative_area_level_2")
                            )?.long_name ||
                            components.find((c) => c.types.includes("country"))?.long_name ||
                            "Chennai";

                        callback({ lat, lon, neighborhood });
                    } catch (err) {
                        console.error("Reverse Geocode Failed:", err);
                        callback({ lat, lon, neighborhood: "Chennai" });
                    } finally {
                        setMapLoading(false);
                    }
                },
                (err) => {
                    console.warn("User Denied Location:", err);
                    callback({ lat: null, lon: null, neighborhood: "Chennai" });
                    setMapLoading(false);
                }
            );
        };

        fetchLocation();
    }, [callback]);

    return { mapLoading };
};

export default UseLocationFetcher;
