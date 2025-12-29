import React, { useEffect, useState } from "react";
import PropertyComparison from "./propertyomparison";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Placeholder } from 'rsuite';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@googlemaps/js-api-loader";
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ApartmentOwnerPre,
  ApartmentProjectOwnerPreview,
  CommercialOwnerPreview,
  HouseOwnerPreview,
  LandOwnerPreview,
  LayoutOwnerPreview,
  PlotOwnerPreview,
} from "./PreviewLandOwnerDetails/OwnerPreviewPageDetails";
import * as FaIcons from "react-icons/fa";
import { color } from "framer-motion";
// import * as FaIcons from "react-icons/fa6";
import { Skeleton } from "primereact/skeleton";


const loaderOptions = {
  id: "google-map-script",
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["geometry", "places"],
};

function Propertyaddress({ property, loading }) {
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        const loader = new Loader(loaderOptions);

        const google = await loader.load();

        const geocoder = new google.maps.Geocoder();

        const locationPromises = property.map(async (item, index) => {
          if (item.location) {
            const [lat, lng] = item.location.split(",").map(Number);
            if (isNaN(lat) || isNaN(lng)) {
              console.error(
                `Invalid coordinates for ${item.subpro_name}:`,
                item.location
              );
              return "Invalid coordinates";
            }

            return new Promise((resolve) => {
              geocoder.geocode(
                { location: { lat, lng } },
                (results, status) => {
                  if (status === "OK" && results.length > 0) {
                    resolve(results[0].formatted_address);
                  } else {
                    console.error(
                      `Geocoding failed for ${item.subpro_name}:`,
                      status
                    );
                    resolve("Location not found");
                  }
                }
              );
            });
          }
          return "No location provided";
        });

        const resolvedLocations = await Promise.all(locationPromises);

        setLocationNames(resolvedLocations);
      } catch (error) {
        console.error("Google Maps API error:", error);
      }
    };

    fetchLocationNames();
  }, [property]);

  const amenitiesData = property ? property[0]?.amenities : [];
  const generalFeatureData = property
    ? property.map((item) => item.general)
    : [];
  const interiorFeatureData = property
    ? property.map((item) => item.interior)
    : [];
  const exteriorFeatureData = property
    ? property.map((item) => item.exterior)
    : [];
  // const localities = property
  //   ? property.map((item) => item.nearByLocalities)
  //   : [];
  const localities = property[0]?.nearByLocalities


  const general = generalFeatureData.flat().map((item) => item);
  return (
    <>
      <div className="mt-2">
        {property?.map((item, index) => {
          const locationName = locationNames[index] || "not found location";
          return (
            <div className="single  homes-content1 details mb-30 " key={index}>
              <div className="row">
                <div className="col-md-12  ">
                  {loading ? (
                    <>
                      <Skeleton height="1.5rem" width="10%" className="mb-1 " />
                      <Skeleton height="1.5rem" width="40%" className="mb-1 " />
                    </>
                  ) : (
                    <>
                      <sub className="text-muted" style={{ fontSize: "16px" }}>
                        Address
                      </sub>
                      <h5
                        className="head-content mt-2"
                        style={{ wordWrap: "break-word" }}
                      >
                        {`${item.village}, ${item.taluk}, ${item.district}${item.pincode ? ` - ${item.pincode}` : ""
                          }`}

                      </h5>
                    </>
                  )}
                </div>
              </div>
              {/* Property Attributes */}

              <div className="row mt-3">
                <div className="col-md-5">
                  {loading ? (
                    <Skeleton height="550px" width="100%" className="mb-1 " />
                  ) : (
                    <Accordion defaultActiveKey={1} bordered>
                      <Accordion.Panel header={
                        <span style={{ fontSize: "18px", fontWeight: 600 }}>
                          <span style={{ color: "#0000ff" }}>P</span>
                          <span style={{ color: "#000" }}>roperty Attributes</span>
                        </span>
                      } eventKey={1} caretAs={FaAngleDoubleDown}>
                        <div style={{ fontFamily: "poppins" }}>
                          {item?.property_type === "Land" ? (
                            <LandOwnerPreview property={item} />
                          ) : item?.property_type === "Apartment" ? (
                            <ApartmentOwnerPre property={item} />
                          ) : item?.property_type === "House" ? (
                            <HouseOwnerPreview property={item} />
                          ) : item?.property_type === "Plot" ? (
                            <PlotOwnerPreview property={item} />
                          ) : item?.property_type === "Layout" ? (
                            <LayoutOwnerPreview property={item} />
                          ) : item?.property_type === "Commercial" ? (
                            <CommercialOwnerPreview property={item} />
                          ) : item?.property_type === "Apartment Project" ? (
                            <ApartmentProjectOwnerPreview property={item} />
                          ) : null}
                        </div>
                      </Accordion.Panel>
                    </Accordion>
                  )}
                </div>
                
                {/* property Description */}
                <div className="col-md-7">
                  {loading ? (
                    <>
                      <Skeleton height="1.5rem" width="25%" className="mb-1 " />
                      <Skeleton height="520px" width="100%" className="mb-1 " />
                    </>
                  ) : (
                    <>
                      <h5 className="mb-2">
                        <span style={{ color: "blue" }}>P</span>roperty Description
                      </h5>
                      <p style={{ textAlign: "justify" }}>{item.description}</p></>
                  )}

                </div>
              </div>
              {/* General Features */}
              <div className=" mt-3 accordion_width">
                {loading ? (<Skeleton height="4.5rem" width="100%" className="mb-1 " />) : (
                  <Accordion bordered>
                    <Accordion.Panel header={
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        <span style={{ color: "#0000ff" }}>G</span>
                        <span style={{ color: "#000" }}>eneral Features</span>
                      </span>
                    } eventKey={1} caretAs={FaAngleDoubleDown}>
                      {generalFeatureData?.flat().map((item, index) => {
                        return (
                          <div className="row mx-1" key={index} style={{ fontFamily: "poppins" }}>
                            <div className="col-md-6 border p-2 " style={{ fontWeight: "600" }}>
                              <p className=" ">{item.general}</p>
                            </div>
                            <div className="col-md-6 border p-2">
                              <p>{item.details}</p>
                            </div>
                          </div>
                        );
                      })}

                    </Accordion.Panel>
                  </Accordion>
                )}

              </div>

              {/* Interior Features  */}
              <div className=" mt-2 accordion_width" >
                {loading ? (
                  <Skeleton height="4.5rem" width="100%" className="mb-1 " />
                ) : (
                  <Accordion bordered>
                    <Accordion.Panel header={
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        <span style={{ color: "#0000ff" }}>I</span>
                        <span style={{ color: "#000" }}>nterior Features</span>
                      </span>
                    } eventKey={1} caretAs={FaAngleDoubleDown}>
                      {interiorFeatureData?.flat().map((item, index) => {
                        return (
                          <div className="row m-1" key={index} style={{ fontFamily: "poppins" }}>
                            <div className="col-md-6 border p-2  mr-1" style={{ fontWeight: "600" }}>
                              <p className=" ">{item.interiorName}</p>
                            </div>
                            <div className="col-md-6 border p-2">
                              <p>{item.interior_details}</p>
                            </div>
                          </div>
                        );
                      })}

                    </Accordion.Panel>
                  </Accordion>
                )}

              </div>

              {/* Exterior Features */}

              <div className=" mt-2 accordion_width">
                {loading ? (
                  <Skeleton height="4.5rem" width="100%" className="mb-1 " />
                ) : (
                  <Accordion bordered>
                    <Accordion.Panel header={
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        <span style={{ color: "#0000ff" }}>E</span>
                        <span style={{ color: "#000" }}>xterior Features</span>
                      </span>
                    } eventKey={1} caretAs={FaAngleDoubleDown}>
                      {exteriorFeatureData?.flat().map((item, index) => {
                        return (
                          <div className="row m-1" key={index} style={{ fontFamily: "poppins" }}>
                            <div className="col-md-6 border p-2  mr-1" style={{ fontWeight: "600" }}>
                              <p className=" ">{item.exteriorName}</p>
                            </div>
                            <div className="col-md-6 border p-2">
                              <p>{item.exterior_details}</p>
                            </div>
                          </div>
                        );
                      })}

                    </Accordion.Panel>
                  </Accordion>
                )}

              </div>

              {/* Localities */}
              <div className=" mt-2 accordion_width">
                {loading ? (
                  <Skeleton height="4.5rem" width="100%" className="mb-1 " />
                ) : (
                  <Accordion bordered>
                    <Accordion.Panel header={
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        <span style={{ color: "#0000ff" }}>L</span>
                        <span style={{ color: "#000" }}>ocalities</span>
                      </span>
                    } eventKey={1} caretAs={FaAngleDoubleDown}>
                      {localities?.map((item, index) => {
                        return (
                          <div className="row m-1" key={index} style={{ fontFamily: "poppins" }}>
                            <div className="col-md-6 border p-2  mr-1">
                              <p className="" style={{ textTransform: "capitalize", fontWeight: "600" }}>{item.division}</p>
                            </div>
                            <div className="col-md-6 border p-2">
                              <p>{item.title}</p>
                            </div>
                          </div>
                        );
                      })}

                    </Accordion.Panel>
                  </Accordion>
                )}

              </div>

              {/* Amenities */}
              {amenitiesData?.length > 0 && (
                <div className=" mt-2 accordion_width">
                  {loading ? (
                    <Skeleton height="4.5rem" width="100%" className="mb-1 " />
                  ) : (
                    <Accordion bordered>
                      <Accordion.Panel header={
                        <span style={{ fontSize: "18px", fontWeight: 600 }}>
                          <span style={{ color: "#0000ff" }}>A</span>
                          <span style={{ color: "#000" }}>menities</span>
                        </span>
                      } eventKey={1} caretAs={FaAngleDoubleDown}>
                        <div className="row mx-1">
                          {amenitiesData.map((item, index) => {
                            const IconComponent = FaIcons[item.icon];
                            return (
                              <div className="col-md-4  gap-2  p-2 d-flex align-items-center" key={index}>
                                {IconComponent && <IconComponent size={20} style={{ color: "#0000ff" }} />}
                                <span style={{ color: "black", fontFamily: "poppins" }}>{item.amenity}</span>
                              </div>
                            );
                          })}
                        </div>

                      </Accordion.Panel>
                    </Accordion>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Propertyaddress;
