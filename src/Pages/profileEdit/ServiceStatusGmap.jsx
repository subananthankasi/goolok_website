import React, { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import logo from "../../assets/images/Goolok Final Logo copy.png"
import ServicePaymentGateway from "./ServicePaymentGateway";
import ServiceLegalPaymentGateway from "./ServiceLegalPaymentGateway";
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { useAlert } from "react-alert";
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    Marker,
    Polyline,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";
import LocationOnIcon from '@mui/icons-material/LocationOn';
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

const ServiceStatusGmap = ({ invoiceData, eid }) => {
    const [gMapData, setGMapData] = useState([])

    const fetchInvoice = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/service/${eid}/edit`);
            setGMapData(response.data);
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }
    };
    useEffect(() => {
        fetchInvoice()
    }, [])


    const steps = [
        {
            title: " Service Recieved Details",
            details: (
                <ServiceRecived pattaData={gMapData[0]} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === null ? true : gMapData[0]?.dpt_status === "Document_verify" ? true : false
        },
        {
            title: "Document Verification",
            details: (
                <DocumentVerification docData={gMapData[0]?.docdata} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Document_verify" ? true : false
        },

        {
            title: "Your Property Location",
            details: (
                <YourPropertyLocation gmapdata={gMapData[0]?.Gmap} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Document_verify" ? true : false

        },
    ];


    const timelineRef = useRef(null);

    const lastCompletedIndex = steps
        .map((step) => step.completed)
        .lastIndexOf(true);





    useEffect(() => {
        if (!timelineRef.current) return;

        const updateTimelineHeight = () => {
            const lastCompletedStep = document.getElementById(`step-${lastCompletedIndex}`);
            if (lastCompletedStep) {
                const header = lastCompletedStep.querySelector(".accordion-header");
                const body = lastCompletedStep.querySelector(".accordion-body");

                const headerHeight = header?.offsetHeight || 0;
                const bodyHeight = body?.offsetHeight || 0;
                const isExpanded = body?.style.display !== "none";


                const height = lastCompletedStep.offsetTop +
                    headerHeight +
                    (isExpanded ? bodyHeight : headerHeight / 2) - 50;

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
                                className={`position-absolute start-0 translate-middle rounded-circle border border-white ${step.completed ? "bg-success" : "bg-secondary"}`}
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

export default ServiceStatusGmap;



const ServiceRecived = ({ pattaData, fetchInvoice, eid }) => {

    return (

        // <>
        //     <div className="price-box">
        //         <div className="d-flex align-items-center justify-content-between gap-3">
        //             <div>
        //                 <p className="fw-bold mb-0">Service Id:</p>
        //             </div>
        //             <div className="fw-bold">
        //                 <p className="mb-0">{pattaData?.propertyid}</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="price-box">
        //         <div className="d-flex align-items-center justify-content-between gap-3">
        //             <div>
        //                 <p className="fw-bold mb-0">Service Type :</p>
        //             </div>
        //             <div className="fw-bold">
        //                 <p className="mb-0">{pattaData?.service_cat}</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="price-box">
        //         <div className="d-flex align-items-center justify-content-between gap-3">
        //             <div>
        //                 <p className="fw-bold mb-0">Service Recieved On:</p>
        //             </div>
        //             <div className="fw-bold">
        //                 <p className="mb-0">{pattaData?.created_at},{pattaData?.time}</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="price-box">
        //         <div className="d-flex align-items-center justify-content-between gap-3">
        //             <div>
        //                 <p className="fw-bold mb-0">Property Type :</p>
        //             </div>
        //             <div className="fw-bold">
        //                 <p className="mb-0"> {pattaData?.property_type} </p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="price-box">
        //         <div className="d-flex align-items-center justify-content-between gap-3">
        //             <div>
        //                 <p className="fw-bold mb-0">Sub Property Type :</p>
        //             </div>
        //             <div className="fw-bold">
        //                 <p className="mb-0">{pattaData?.subpro_name} </p>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="booking-box">
            <div className="booking-title">
                <h5>
                    <HiDocumentText className="icon" /> Service Recieved Details
                    <span className="underline"></span>
                </h5>
            </div>

            {[
                { label: "Service ID", value: pattaData?.propertyid },
                { label: "Service Type", value: pattaData?.service_cat },
                {
                    label: "Service Received On",
                    value: `${pattaData?.created_at}, ${pattaData?.time}`,
                },
                { label: "Property Type", value: pattaData?.property_type },
                { label: "Sub Property Type", value: pattaData?.subpro_name },
            ].map((item, index) => (
                <div key={index} className={`row-item ${index !== 4 ? "with-border" : ""}`}>
                    <span className="label-text">{item.label}:</span>
                    <span className="value-text">{item.value}</span>
                </div>
            ))}
        </div>

    )

}

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
    //     const file = e.target.files[0];

    //     if (!validTypes.includes(file.type)) {
    //         alert.error("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
    //         return;
    //     }


    //     setFiles((prevFiles) => ({
    //         ...prevFiles,
    //         [id]: file,
    //     }));
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
                        "Gl-Status": "user"
                    },
                }
            );
            fetchInvoice()

            alert.success("Document submitted successfully!")

        } catch (error) {
            alert.error(
                "Error! Please try again later"
            );
        }
        finally {
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
                                <div className="pdf-wrapper" onClick={() => window.open(`${IMG_PATH}enquiry/${item.document}`, "_blank")}>
                                    <embed
                                        src={`${IMG_PATH}enquiry/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="pdf-hidden-scroll"
                                        type="application/pdf"
                                    />
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-3 p-2"> {item.doc_type} </h6>
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
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
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
                            {/* <div>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, item.id)}
                />
              </div> */}
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

                    {/* <section className="card p-4 cardheight text-center justify-content-center">
            <h6 className="mb-3 ">{item.doc_type}</h6>
            {item.document && item.status !== "redo" ?
              <div>
                <a
                  href={`${IMG_PATH}/enquiry/${item.document}`}
                  class="btn btn-warning ms-2"
                  download="download"
                >
                  {" "}
                  <i class="fa fa-download"></i>dd
                </a>
              </div>
             
              : (
                <>
                  <div>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e, item.id)}
                    />
                  </div>
                  <div className="mt-2 text-end">
                    <button
                      className=" mt-3 text-white"
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
                </>
              )}

          </section> */}
                </div>
            ))}

        </div>
    )
}

const YourPropertyLocation = ({ gmapdata, fetchInvoice, eid }) => {
    const { isLoaded } = useJsApiLoader(loaderOptions);
    const [handleMarker, setHandleMarker] = useState(null);

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
                            center={centers}
                            zoom={10}
                        >
                            {/* Markers */}
                            {gmapdata?.map((item, index) => {
                                if (!item.location) return null;
                                const [lat, lng] = item.location.split(",").map(parseFloat);
                                return (
                                    <>
                                        <Marker
                                            key={index}
                                            position={{ lat, lng }}
                                            onClick={() => setHandleMarker(index)}
                                            tooltip="Confirm to proceed"

                                        />
                                        {/* {handleMarker === index && (
                                    <InfoWindow
                                        position={{ lat, lng }}
                                        options={{
                                            pixelOffset: new window.google.maps.Size(0, -30),
                                            maxWidth: 500,
                                        }}
                                        onCloseClick={() => setHandleMarker(null)}

                                    >
                                        <div style={{ textAlign: "center", height: "80px", overflow: "hidden" }} className="p-0">

                                            <h6 style={{ fontWeight: "400", fontSize: '15px' }}> Survey No : {item.survey_no}</h6>
                                            <p className="mb-5">
                                                <LocationOnIcon sx={{ color: "red", fontSize: 17 }} />
                                                <a
                                                    href={`https://www.google.com/maps?q=${item.location}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mb-5"
                                                    style={{ textDecoration: "none", color: "blue", marginBottom: "20px" }}
                                                >
                                                    https://www.google.com/maps?q=${item.location}
                                                </a>
                                            </p>
                                        </div>
                                    </InfoWindow>
                                )} */}
                                    </>
                                )
                            })}

                            {/* Polygon */}
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
