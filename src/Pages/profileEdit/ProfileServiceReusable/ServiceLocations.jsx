import { useEffect, useState } from 'react'
import { AiFillClockCircle } from 'react-icons/ai';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import MapTheme from '../../../Utils/MapTheme';

const containerStyle = {
    width: "100%",
    height: "50vh",
};

const staticCenter = {
    lat: 13.078187,
    lng: 79.972347,
};

const loaderOptions = {
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
};

const ServiceLocations = ({ gmapdata, fetchInvoice, eid }) => {
    const { isLoaded } = useJsApiLoader(loaderOptions);
    const options = {
        styles: MapTheme,
    };
    const [center, setCenter] = useState(staticCenter)
    useEffect(() => {
        if (gmapdata && gmapdata.length > 0 && gmapdata[0]?.location) {
            const [lat, lng] = gmapdata[0].location.split(",").map(parseFloat);
            if (!isNaN(lat) && !isNaN(lng)) {
                setCenter({ lat, lng });
            }
        }
    }, [gmapdata]);

    return isLoaded ? (
        <div>
            {gmapdata?.every(item => item.location === null) ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <h6
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            color: "#004aad",
                            fontSize: "17px",
                            marginBottom: "6px",
                        }}
                    >
                        <AiFillClockCircle style={{ color: "darkblue", fontSize: "20px", marginRight: "5px" }} />Waiting for your Gmap Location...!
                    </h6>
                    <p
                        style={{
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            color: "#7d7d7d",
                            margin: 0,
                        }}
                    >
                        Once completed, your gmap details will appear here.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mt-3">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            options={options}
                        >
                            {gmapdata?.map((item, index) => {
                                if (!item.location) return null;
                                const [lat, lng] = item.location.split(",").map(parseFloat);
                                return (
                                    <>
                                        <Marker
                                            key={index}
                                            position={{ lat, lng }}
                                            tooltip="Confirm to proceed"

                                        />
                                    </>
                                )
                            })}
                            <Polygon
                                path={
                                    gmapdata?.filter(item => item.location)?.map(item => {
                                        const [lat, lng] = item.location.split(",").map(parseFloat);
                                        return { lat, lng };
                                    })
                                }
                                options={{
                                    fillColor: "#99FFCC",
                                    fillOpacity: 0.7,
                                    strokeColor: "green",
                                    strokeOpacity: 1,
                                    strokeWeight: 2,
                                }}
                            />
                        </GoogleMap>
                    </div>
                    <div className="mt-2">
                        <div className="p-2 mt-4">
                            <h6>Survey Details :</h6>
                            <div className="table-responsive mt-2">
                                <table className="table premium-table align-middle">
                                    <thead className="text-center">
                                        <tr>
                                            <th> S.No </th>
                                            <th>Survey no</th>
                                            <th> Location </th>
                                            <th> Gmap Link </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {gmapdata?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.survey_no}</td>
                                                <td>{item?.location}</td>
                                                <td><a
                                                    href={`https://www.google.com/maps?q=${item.location}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mb-5"
                                                    style={{ textDecoration: "underline", color: "blue", marginBottom: "20px" }}
                                                >
                                                    https://www.google.com/maps?q=${item.location}
                                                </a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    ) : null
}

export default ServiceLocations