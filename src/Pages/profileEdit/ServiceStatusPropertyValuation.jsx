import React, { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import logo from "../../assets/images/Goolok Final Logo copy.png";
import ServicePaymentGateway from "./ServicePaymentGateway";
import ServiceLegalPaymentGateway from "./ServiceLegalPaymentGateway";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { useAlert } from "react-alert";
import ServicePaymentPropertyValuation from "./ServicePaymentPropertyValuation";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
  Polyline,
  Polygon,
  InfoWindow,
} from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import markerIcon from "../../assets/marker.svg";
import { useCallback } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Table } from "antd";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { HiDocumentText } from "react-icons/hi2";
import { AiFillClockCircle } from "react-icons/ai";
const containerStyle = {
  width: "100%",
  height: "50vh",
};

const centers = {
  lat: 13.078187,
  lng: 79.972347,
};
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};
const mapTheme = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#9c9c9c",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
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
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
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
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
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
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
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
        color: "#46bcec",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c8d7d4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

const options = {
  styles: mapTheme,
};
const ServiceStatusPropertyValuation = ({ eid }) => {
  const [invoiceData, setInvoiceData] = useState([]);

  const fetchInvoice = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/surveypanel/${eid}`);
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);

  const steps = [
    {
      title: "Patta Service Booked",
      details: (
        <PattaServiceBooked
          pattaData={invoiceData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === null
          ? true
          : invoiceData[0]?.dpt_status === "Document_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Location_verify"
              ? true
              : invoiceData[0]?.dpt_status === "Service_verify"
                ? true
                : invoiceData[0]?.dpt_status === "Payment_verify"
                  ? true
                  : invoiceData[0]?.dpt_status === "hub_verify"
                    ? true
                    : false,
    },
    {
      title: "Document Verification",
      details: (
        <DocumentVerification
          docData={invoiceData[0]?.docdata}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === "Document_verify"
          ? true
          : invoiceData[0]?.dpt_status === "Location_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Service_verify"
              ? true
              : invoiceData[0]?.dpt_status === "Payment_verify"
                ? true
                : invoiceData[0]?.dpt_status === "hub_verify"
                  ? true
                  : false,
    },
    {
      title: "Your Property Location",
      details: (
        <YourPropertyLocation
          gmapdata={invoiceData[0]?.Gmap}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === "Location_verify"
          ? true
          : invoiceData[0]?.dpt_status === "Service_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Payment_verify"
              ? true
              : invoiceData[0]?.dpt_status === "hub_verify"
                ? true
                : false,
    },
    {
      title: "Service Confirmation payment",
      details: (
        <ServiceConfirmationPayment
          invoiceData={invoiceData}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === "Payment_verify"
          ? true
          : invoiceData[0]?.dpt_status === "hub_verify"
            ? true
            : false,
    },
    {
      title: "Schedule For Property valuation",
      details: (
        <ShedulePropertyValuation
          property={invoiceData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "hub_verify" ? true : false,
    },
    {
      title: "Property valuation Report",
      details: (
        <PropertyValuationReport
          docData={invoiceData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "hub_verify" ? true : false,
    },
  ];

  const timelineRef = useRef(null);

  const lastCompletedIndex = steps
    .map((step) => step.completed)
    .lastIndexOf(true);

  useEffect(() => {
    if (!timelineRef.current) return;

    const updateTimelineHeight = () => {
      const lastCompletedStep = document.getElementById(
        `step-${lastCompletedIndex}`
      );
      if (lastCompletedStep) {
        const header = lastCompletedStep.querySelector(".accordion-header");
        const body = lastCompletedStep.querySelector(".accordion-body");

        const headerHeight = header?.offsetHeight || 0;
        const bodyHeight = body?.offsetHeight || 0;
        const isExpanded = body?.style.display !== "none";

        const height =
          lastCompletedStep.offsetTop +
          headerHeight +
          (isExpanded ? bodyHeight : headerHeight / 2) -
          50;

        timelineRef.current.style.height = `${height}px`;
      }
    };

    updateTimelineHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateTimelineHeight();
    });

    const stepElements = document.querySelectorAll('[id^="step-"]');
    stepElements.forEach((el) => resizeObserver.observe(el));

    return () => {
      stepElements.forEach((el) => resizeObserver.unobserve(el));
      resizeObserver.disconnect();
    };
  }, [lastCompletedIndex, steps.length]);

  const [activeKey, setActiveKey] = useState("");

  return (
    <div className="mt-4">
      <div className="position-relative ps-3" style={{ paddingBottom: "0" }}>
        <div
          className="position-absolute bg-secondary"
          style={{
            width: "6px",
            top: "10px",
            left: "12px",
            bottom: "40px",
            // height: "0"
          }}
        ></div>

        <div
          ref={timelineRef}
          className="position-absolute bg-success"
          style={{
            width: "6px",
            top: "10px",
            left: "12px",
            height: "0px",
            bottom: "40px",
            transition: "height 0.3s ease-in-out",
          }}
        ></div>

        <Accordion defaultActiveKey={activeKey}>
          {steps.map((step, index) => (
            <div
              key={index}
              className="position-relative ps-4 mb-3"
              id={`step-${index}`}
            >
              <span
                className={`position-absolute start-0 translate-middle rounded-circle border border-white ${step.completed ? "bg-success" : "bg-secondary"
                  }`}
                style={{
                  width: "15px",
                  height: "15px",
                  top: "10px",
                  left: "7px",
                  zIndex: 1,
                  border: "2px solid #6c757d",
                  ...(step.completed && { borderColor: "#198754" }),
                }}
              ></span>

              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>{step.title}</Accordion.Header>
                <Accordion.Body className="p-0">{step.details}</Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ServiceStatusPropertyValuation;

const PattaServiceBooked = ({ pattaData, fetchInvoice, eid }) => {
  return (
    <>
      {/* <div className="price-box">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-bold mb-0">Service Id:</p>
          </div>
          <div className="fw-bold">
            <p className="mb-0">{pattaData?.propertyid}</p>
          </div>
        </div>
      </div>
      <div className="price-box">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-bold mb-0">Service Type :</p>
          </div>
          <div className="fw-bold">
            <p className="mb-0">{pattaData?.service_cat}</p>
          </div>
        </div>
      </div>
      <div className="price-box">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-bold mb-0">Service Recieved On:</p>
          </div>
          <div className="fw-bold">
            <p className="mb-0">
              {pattaData?.created_at},{pattaData?.time}
            </p>
          </div>
        </div>
      </div>
      <div className="price-box">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-bold mb-0">Property Type :</p>
          </div>
          <div className="fw-bold">
            <p className="mb-0"> {pattaData?.property_type} </p>
          </div>
        </div>
      </div>
      <div className="price-box">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <p className="fw-bold mb-0">Sub Property Type :</p>
          </div>
          <div className="fw-bold">
            <p className="mb-0">{pattaData?.subpro_name} </p>
          </div>
        </div>
      </div> */}
      <div className="booking-box">
        <div className="booking-title">
          <h5>
            <HiDocumentText className="icon" /> Service Booking Details
            <span className="underline"></span>
          </h5>
        </div>

        {[
          { label: "Service ID", value: pattaData?.propertyid },
          { label: "Service Type", value: pattaData?.service_cat },
          { label: "Service Received On", value: `${pattaData?.created_at}, ${pattaData?.time}` },
          { label: "Property Type", value: pattaData?.property_type },
          { label: "Sub Property Type", value: pattaData?.subpro_name },
        ].map((item, i) => (
          <div key={i} className={`row-item ${i !== 4 ? "with-border" : ""}`}>
            <span className="label-text">{item.label}</span>
            <span className="value-text">{item.value}</span>
          </div>
        ))}
      </div>

    </>
  );
};

const DocumentVerification = ({ docData, fetchInvoice, eid }) => {
  const alert = useAlert();
  const [showFull, setShowFull] = useState(false);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState({});

  const validTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  // const handleFileChange = (e, id) => {
  //   const file = e.target.files[0];

  //   if (!validTypes.includes(file.type)) {
  //     alert.error(
  //       "Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file."
  //     );
  //     return;
  //   }

  //   setFiles((prevFiles) => ({
  //     ...prevFiles,
  //     [id]: file,
  //   }));
  // };

  // Handle file upload

  const [fileNames, setFileNames] = useState({});
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      alert.error("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
      return;
    }

    //  KEEP your existing logic (no breaking)!
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: file,
    }));

    //  Separate state ONLY for showing selected file name
    setFileNames((prev) => ({
      ...prev,
      [id]: file.name,
    }));
  };


  const handleFileUpload = async (id) => {
    if (!files[id]) {
      alert.error("Please select a file before submitting.");
      return;
    }

    setLoading((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));

    const formData = new FormData();
    formData.append("document", files[id]);
    formData.append("id", id);

    try {
      const response = await axiosInstance.post(
        "/vendor/fileupdate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Gl-Status": "user",
          },
        }
      );
      fetchInvoice();

      alert.success("Document submitted successfully!");
    } catch (error) {
      alert.error("Error! Please try again later");
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [id]: false,
      }));
      // window.location.reload();
    }
  };

  return (
    <div className="row p-2">
      {/* {docData?.map((item, index) => (
        <div className="col-md-6 mt-3">
          <div className="w-100">
            {item?.document ? (
              <div className="card">
                <div
                  className="pdf-wrapper"
                  onClick={() =>
                    window.open(`${IMG_PATH}enquiry/${item.document}`, "_blank")
                  }
                >
                  <embed
                    src={`${IMG_PATH}enquiry/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="pdf-hidden-scroll"
                    type="application/pdf"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="d-flex p-2 gap-1">
                    <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                    <p className=""> {item.doc_type}.pdf</p>
                  </div>
                  <a
                    href={`${IMG_PATH}enquiry/${item.document}`}
                    download
                    target="_blank"
                    className="btn"
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </div>
            ) : (
              <div className="card p-3">
                <h6 className="mb-3 p-2"> {item.doc_type} </h6>
                <div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, item.id)}
                  />
                </div>
                <div className="mt-2 text-end">
                  <button
                    className="btn mt-3 text-white"
                    style={{ backgroundColor: "#2f4f4f" }}
                    onClick={() => handleFileUpload(item.id)}
                    disabled={loading[item.id]}
                  >
                    {loading[item.id] ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))} */}
      {docData?.map((item, index) => (
        <div className="col-md-6 mt-3" key={item.id}>

          {item.document && item.status !== "redo" ? (
            <div className="card">
              <div
                className="pdf-wrapper"
                onClick={() =>
                  window.open(`${IMG_PATH}enquiry/${item.document}`, "_blank")
                }
              >
                <embed
                  src={`${IMG_PATH}enquiry/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="pdf-hidden-scroll"
                  type="application/pdf"
                />
              </div>
              <hr className="m-0 p-0" />
              <div className="p-2 d-flex justify-content-between align-items-center">
                <p className="" style={{ fontFamily: "poppins", fontWeight: "600" }}> {item.doc_type} </p>
                <a
                  href={`${IMG_PATH}enquiry/${item.document}`}
                  download
                  target="_blank"
                  className="btn"
                >
                  <DownloadIcon sx={{ color: "#0000ff" }} />
                </a>
              </div>
            </div>
          ) : (
            <section className="card p-4 cardheight text-center justify-content-center">
              <div className="premium-upload-wrapper">
                <label className="premium-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, item.id)}
                  />
                  <div className="upload-icon">📁</div>
                  {fileNames[item.id] ? (
                    <p className="uploaded-file-name">{fileNames[item.id]}</p>
                  ) : (
                    <p className="upload-title">Click to Upload</p>
                  )}

                  {/* <span className="upload-hint">Supported: PDF, JPG, PNG</span> */}
                </label>
              </div>
              <div className=" d-flex justify-content-between align-items-center mt-2 text-end">
                <p className="" style={{ fontFamily: "poppins", fontWeight: "600" }}>{item.doc_type}</p>
                <button
                  className="text-white"
                  style={{ backgroundColor: "#0000ff", padding: "7px 10px", fontFamily: "poppins" }}
                  onClick={() => handleFileUpload(item.id)}
                  disabled={loading[item.id]}
                >
                  {loading[item.id] ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

const YourPropertyLocation = ({ gmapdata, fetchInvoice, eid }) => {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [handleMarker, setHandleMarker] = useState(null);
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleMarkerClick = (markerId) => {
    setSelected(markerId);
  };

  return isLoaded ? (
    <div>
      {gmapdata?.every((item) => item.location === null) ? (

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
              center={centers}
              zoom={10}
              options={options}
            >
              {/* Markers */}
              {gmapdata?.map((item, index) => {
                if (!item.location) return null;
                const [lat, lng] = item.location.split(",").map(parseFloat);
                const markerId = `${lat},${lng}`;
                return (
                  <React.Fragment key={markerId}>
                    <Marker
                      key={item.id}
                      position={{ lat, lng }}
                      icon={{
                        url: markerIcon,
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                      onClick={() => handleMarkerClick(markerId)}
                    />
                  </React.Fragment>
                );
              })}

              {/* Polygon */}
              <Polygon
                path={gmapdata
                  ?.filter((item) => item.location)
                  ?.map((item) => {
                    const [lat, lng] = item.location.split(",").map(parseFloat);
                    return { lat, lng };
                  })}
                options={{
                  fillColor: "#e67772",
                  fillOpacity: 0.7,
                  strokeColor: "#ff3d00",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            </GoogleMap>
          </div>

          <div className="mt-2">
            <div className="p-2 mt-4">
              <h6>Survey Details :</h6>
              <hr />
              {/* <table className="table table-bordered mt-3  table-striped">
                <thead>
                  <tr className="table-">
                    <th> S.No </th>
                    <th style={{ minWidth: "100px" }}>Survey no</th>
                    <th> Location </th>
                    <th> Gmap Link </th>
                  </tr>
                </thead>
                <tbody>
                  {gmapdata?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.survey_no}</td>
                      <td>{item?.location}</td>
                      <td>
                        <a
                          href={`https://www.google.com/maps?q=${item.location}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-5"
                          style={{
                            textDecoration: "underline",
                            color: "blue",
                            marginBottom: "20px",
                          }}
                        >
                          https://www.google.com/maps?q=${item.location}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}

              <div className="table-responsive">
                <table className="table premium-table align-middle">
                  <thead className="text-center">
                    <tr>
                      <th> S.No </th>
                      <th style={{ minWidth: "100px" }}>Survey no</th>
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
                        <td>
                          <a
                            href={`https://www.google.com/maps?q=${item.location}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-5"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                              marginBottom: "20px",
                            }}
                          >
                            https://www.google.com/maps?q=${item.location}
                          </a>
                        </td>
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
  ) : null;
};

const ServiceConfirmationPayment = ({ invoiceData, fetchInvoice, eid }) => {
  const contentRef = useRef(null);

  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce((acc, item) => {
      const chargesTotal = Number(item.amount) || 0;
      return acc + chargesTotal;
    }, 0);

    const gst = subtotal * 0;
    // const total = subtotal + gst;
    const total = subtotal;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      subtotal: currencyFormatter.format(subtotal),
      gst: currencyFormatter.format(gst),
      total: currencyFormatter.format(total),
    };
  };
  const generatePdf = () => {
    const input = contentRef.current;
    if (!input) {
      console.error("contentRef is not available");
      return;
    }

    // input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      // input.style.display = "none";
    });
  };
  const thStyle = {
    border: "1px solid #ccc",
    padding: "5px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "10px",
  };
  return (
    <div>
      {invoiceData[0]?.amount === null ? (

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
            <AiFillClockCircle style={{ color: "darkblue", fontSize: "20px", marginRight: "5px" }} />Waiting for Your Payment....!
          </h6>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#7d7d7d",
              margin: 0,
            }}
          >
            Once completed, your service will continue automatically.
          </p>
        </div>
      ) : (
        <>
          <div className=" d-flex justify-content-end">
            <button className="btn " onClick={generatePdf}>
              <DownloadIcon sx={{ color: "blue" }} />{" "}
            </button>
          </div>
          {/* <article className="p-4" ref={contentRef} style={{ background: "#fff", }} >
                            <h3 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h3>
                            <hr />
                            <div className="d-flex justify-content-between ">
                                <div className="mt-3 mb-5">
                                    <img src={logo} alt="goolok" style={{ width: "100px", height: "25px" }} />
                                    <div className="m-0">
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}><b>  Goolok Pvt ltd </b></p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>2nd Floor, 129,</b></p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Nungambakkam, Chennai,</b> </p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Tamil Nadu 600034 </b></p>
                                    </div>
                                </div>
                                <div className="mt-3 mb-5">
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {invoiceData[0]?.invoiceid}  </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {invoiceData[0]?.customer}  </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {invoiceData[0]?.invoice_date} </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{invoiceData[0]?.email_id} </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{invoiceData[0]?.mobile} </p>
                                </div>
                            </div>
                            <section className="line-items  ">
                                <table className="items--table w-100 mt-5 p-2 table-bordered">
                                    <thead className="p-1">
                                        <tr className="p-1">
                                            <th className="p-1 text-center" style={{ fontSize: "11px" }}>S.NO</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}>Qty</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}>Description</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}> Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData?.map((item, index) => (
                                            <>
                                                <tr className="p-1" key={index}>
                                                    <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>{item.service_cat} </td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.amount} </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}>Sub Total</td>
                                            <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>{calculateTotals().subtotal} </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}> GST(0%)</td>
                                            <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>0.00 </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "11px" }}>Total</td>
                                            <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "11px" }}>{calculateTotals().total} </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="mt-5 mb-5 w-50">
                                    <p className="p-0 m-0 fw-bold">Terms & Conditions</p>
                                    <p className='p-0 m-0' style={{ fontSize: "11px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
                                </div>
                                <div>
                                    {invoiceData[0]?.invoice_status === "pending" ? (
                                        invoiceData[0]?.service_cat === "Property Valuation" ? (
                                            <ServicePaymentPropertyValuation invoiceData={invoiceData[0]} fetchInvoice={fetchInvoice} eid={eid} />
                                        ) : null
                                    ) : (
                                        <div className="mt-5">
                                            <h4 className="text-center mt-5">Thank You For Your Business!</h4>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </article> */}

          <article
            className="p-4"
            ref={contentRef}
            style={{ background: "#fff" }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={logo}
                  alt="Goolok"
                  style={{
                    width: "130px",
                    height: "35px",
                    marginBottom: "10px",
                  }}
                />
              </div>

              <h1
                style={{
                  fontWeight: "800",
                  fontSize: "28px",
                  textTransform: "uppercase",
                  color: "#222",
                }}
              >
                INVOICE
              </h1>
            </header>
            <div className="d-flex align-items-center">
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#000",
                  height: "2px",
                  border: "none",
                  margin: 0,
                  color: "#000",
                }}
              />
              <h6
                style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: "11px",
                  color: "#000000ff",
                  marginLeft: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                GOOLOK.COM
              </h6>
            </div>

            <section
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
              className="mt-5"
            >
              <div>
                <h6 style={{ fontWeight: "500", fontSize: "13px" }}>
                  Invoice to :
                </h6>
                <p
                  style={{
                    margin: " 0",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {invoiceData[0]?.customer}
                </p>
                <p
                  style={{ margin: "4px 0", fontSize: "11px" }}
                  className="roboto_left"
                >
                  {invoiceData[0]?.mobile}
                </p>
                <p
                  style={{ margin: "4px 0", fontSize: "11px" }}
                  className="roboto_left"
                >
                  {invoiceData[0]?.email_id}
                </p>
                <p
                  style={{ margin: "4px 0", fontSize: "11px" }}
                  className="roboto_left"
                >
                  123 Anywhere St, chennai-600001
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                  <b>Invoice no :</b> {invoiceData[0]?.invoiceid}
                </p>
                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                  <b>Date:</b> {DateFormateCustom(invoiceData[0]?.invoice_date)}
                </p>
                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                  <b>Payment Mode:</b> Online
                </p>
                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                  <b>PropertyName:</b> Chennai
                </p>
              </div>
            </section>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
                fontSize: "14px",
              }}
              className="table-striped mb-2"
            >
              <thead style={{ background: "#000000ff", color: "white" }}>
                <tr>
                  <th style={thStyle}>NO</th>
                  <th style={thStyle}>QTY</th>
                  <th style={thStyle}>DESCRIPTION</th>
                  <th style={thStyle}>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr
                      style={{
                        background: index % 2 === 0 ? "#e7e6e6ff" : "white",
                      }}
                    >
                      <td
                        className="p-2 text-center"
                        style={{ fontSize: "10px" }}
                      >
                        {" "}
                        1
                      </td>
                      <td className="text-center" style={{ fontSize: "10px" }}>
                        1
                      </td>
                      <td className="text-center" style={{ fontSize: "10px" }}>
                        {item.service_cat}
                      </td>
                      <td className="text-center" style={{ fontSize: "10px" }}>
                        ₹ {item.amount}{" "}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              className=""
            >
              <div style={{ width: "150px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "11px",
                  }}
                  className="roboto_left mt-2 "
                >
                  <span>Sub Total :</span>
                  <span>₹{calculateTotals().subtotal}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "11px",
                  }}
                  className="roboto_left"
                >
                  <span>GST 0% :</span>
                  <span></span>
                </div>
                {/* <hr
                                  style={{ margin: "10px 0", border: "1px solid #ccc" }}
                                /> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontWeight: "600",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "11px",
                  }}
                  className="p-1 "
                >
                  <span>TOTAL AMOUNT:</span>
                  <span>₹{calculateTotals().total}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "11px",
                  }}
                  className="roboto_left"
                >
                  <span>Received Amount:</span>
                  <span>₹{calculateTotals().subtotal}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "50px",
                    fontSize: "11px",
                  }}
                  className="roboto_left"
                >
                  <span>Balance Amount:</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="d-flex justify-content-between"
              // style={{ marginBottom: "140px" }}
              >
                <div>
                  <h6
                    style={{
                      fontWeight: "700",
                      marginBottom: "10px",
                      fontSize: "12px",
                    }}
                  >
                    PAYMENT METHOD :
                  </h6>
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b> Bank Name :</b> State Bank of India
                  </p>
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b> Account Number :</b> 123-456-7890
                  </p>
                </div>
                <div>
                  <h6
                    style={{
                      fontWeight: "700",
                      marginBottom: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Term and Conditions :
                  </h6>
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    Please send payment within 30 days <br /> of receiving this
                    invoice.
                  </p>
                </div>
              </div>
            </div>
            <section style={{ textAlign: "center" }} className="mt-5 mb-5">
              {invoiceData[0]?.invoice_status === "pending" &&
                invoiceData[0]?.service_cat?.toLowerCase() === "property valuation" ? (
                <ServicePaymentPropertyValuation
                  invoiceData={invoiceData[0]}
                  fetchInvoice={fetchInvoice}
                  eid={eid}
                />

              ) : (
                <div className="mt-5">
                  <h5 className="text-center mt-5">
                    Thank you for business with us!
                  </h5>
                </div>
              )}
            </section>
            <div style={{ margin: "20px 0", border: "1px solid #000000ff" }} />
            <div
              className="d-flex justify-content-between"
              style={{ bottom: "0" }}
            >
              <div className="d-flex align-items-center gap-2">
                <i
                  class="fa-solid fa-phone-volume"
                  style={{ fontSize: "13px" }}
                ></i>{" "}
                <span style={{ fontSize: "11px" }}>123-456-7890</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i
                  className="fa-regular fa-envelope"
                  style={{ fontSize: "13px" }}
                ></i>
                <a
                  href="mailto:goolok@gmail.com?subject=Invoice%20Request&body=Hello%20Team,"
                  style={{ color: "black", fontSize: "11px" }}
                >
                  goolok@gmail.com
                </a>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  );
};
const ShedulePropertyValuation = ({ property }) => {
  return (
    <>
      {property?.confirm?.length === 0 ? (
        <div className="row px-4 py-4">
          <div className="col-12 text-center py-4">
            <h6 className="alert alert-info">
              Waiting for Valuation date confirmation
            </h6>
          </div>
        </div>
      ) : (
        <div className=" p-2">
          <p className="text-center mt-3">
            {" "}
            <b> Valuation Date Confirmation</b>{" "}
          </p>
          <hr />
          <div>
            <table className="table table-bordered mt-3  table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Status </th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {property?.confirm?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.followup_date}</td>
                    <td>{item?.followup_status}</td>
                    <td>{item?.followup_remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
const PropertyValuationReport = ({ docData, fetchInvoice, eid }) => {
  return (
    <>
      {docData?.valuation?.length === 0 ? (
        <div className="row px-4 py-4">
          <div className="col-12 text-center py-4">
            <h6 className="alert alert-info">
              Waiting for Property Valuation Report
            </h6>
          </div>
        </div>
      ) : (
        <TabView>
          <TabPanel
            header="Property Valuation Report"
            headerClassName="custom-tab-header"
          >
            <div className="d-flex " style={{ flexWrap: "wrap", gap: "20px" }}>
              {docData?.valuation.map((item, index) => (
                <div className=" ">
                  <div
                    className="card"
                    style={{ height: "150px", width: "150px" }}
                  >
                    <div
                      className="pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}service/document/${item?.document}`,
                          "_blank"
                        )
                      }
                    >
                      <embed
                        src={`${IMG_PATH}service/document/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="pdf-hidden-scroll"
                        type="application/pdf"
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-1 px-3">
                        <i
                          className="pi pi-file-pdf"
                          style={{ color: "red" }}
                        ></i>
                      </div>
                      <a
                        href={`${IMG_PATH}service/document/${item.document}`}
                        download
                        target="_blank"
                        className="btn"
                      >
                        <DownloadIcon />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Photos">
            <div className="row">
              {docData?.photo?.map((item, index) => (
                <div className="col-6 mt-1">
                  {item?.document ? (
                    <div className="card w-100 h-100">
                      <div
                        className="w-100 h-100"
                        onClick={() =>
                          window.open(
                            `${IMG_PATH}/service/document/${item.document}`,
                            "_blank"
                          )
                        }
                      >
                        <img
                          src={`${IMG_PATH}/service/document/${item.document}`}
                          alt="document"
                          className="rounded "
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Videos">
            <div className="row">
              {docData?.video?.map((item, index) => (
                <div className="col-6 mt-1">
                  {item?.document ? (
                    <div className="card w-100 h-100">
                      <div className="w-100 h-100">
                        <video
                          controls
                          className="rounded"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        >
                          <source
                            src={`${IMG_PATH}/service/document/${item.document}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </TabPanel>
        </TabView>
      )}
    </>
  );
};
