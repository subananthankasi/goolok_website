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
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { HiDocumentText } from "react-icons/hi2";
import { AiFillClockCircle } from "react-icons/ai";

const ServiceStatusGetPatta = ({ invoiceData, fetchInvoice, eid }) => {
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
          : invoiceData[0]?.dpt_status === "Document_verify" || invoiceData[0]?.dpt_status === "Location_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Service_verify"
              ? true
              : invoiceData[0]?.dpt_status === "Payment_verify"
                ? true
                : invoiceData[0]?.dpt_status === "App_verify"
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
        invoiceData[0]?.dpt_status === "Document_verify" || invoiceData[0]?.dpt_status === "Location_verify"
          ? true
          : invoiceData[0]?.dpt_status === "Service_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Payment_verify"
              ? true
              : invoiceData[0]?.dpt_status === "App_verify"
                ? true
                : invoiceData[0]?.dpt_status === "hub_verify"
                  ? true
                  : false,
    },

    {
      title: "Service Confirmation Payment",
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
          : invoiceData[0]?.dpt_status === "App_verify"
            ? true
            : invoiceData[0]?.dpt_status === "hub_verify"
              ? true
              : false,
    },

    {
      title: "Patta Application",
      details: (
        <PattaApplication
          appdata={invoiceData[0]?.pattaAppdetails[0]}
          surveyData={invoiceData[0]?.pattaAppsurvey}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === "App_verify"
          ? true
          : invoiceData[0]?.dpt_status === "hub_verify"
            ? true
            : false,
    },
    {
      title: " Application Status",
      details: (
        <ApplicationStatus
          statusData={invoiceData[0]?.application_status}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "hub_verify" ? true : false,
    },
    {
      title: "Your Patta",
      details: (
        <YourPatta
          yourPatta={invoiceData[0]?.pattaDetails}
          survey={invoiceData[0]?.surveyDetails}
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

export default ServiceStatusGetPatta;

const PattaServiceBooked = ({ pattaData, fetchInvoice, eid }) => {
  return (
    // <>
    //   <div className="price-box">
    //     <div className="d-flex align-items-center justify-content-between gap-3">
    //       <div>
    //         <p className="fw-bold mb-0">Service Id:</p>
    //       </div>
    //       <div className="fw-bold">
    //         <p className="mb-0">{pattaData?.propertyid}</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="price-box">
    //     <div className="d-flex align-items-center justify-content-between gap-3">
    //       <div>
    //         <p className="fw-bold mb-0">Service Type :</p>
    //       </div>
    //       <div className="fw-bold">
    //         <p className="mb-0">{pattaData?.service_cat}</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="price-box">
    //     <div className="d-flex align-items-center justify-content-between gap-3">
    //       <div>
    //         <p className="fw-bold mb-0">Service Recieved On:</p>
    //       </div>
    //       <div className="fw-bold">
    //         <p className="mb-0">
    //           {pattaData?.created_at},{pattaData?.time}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="price-box">
    //     <div className="d-flex align-items-center justify-content-between gap-3">
    //       <div>
    //         <p className="fw-bold mb-0">Property Type :</p>
    //       </div>
    //       <div className="fw-bold">
    //         <p className="mb-0"> {pattaData?.property_type} </p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="price-box">
    //     <div className="d-flex align-items-center justify-content-between gap-3">
    //       <div>
    //         <p className="fw-bold mb-0">Sub Property Type :</p>
    //       </div>
    //       <div className="fw-bold">
    //         <p className="mb-0">{pattaData?.subpro_name} </p>
    //       </div>
    //     </div>
    //   </div>
    // </>
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
        {
          label: "Service Received On",
          value: `${pattaData?.created_at}, ${pattaData?.time}`,
        },
        { label: "Property Type", value: pattaData?.property_type },
        { label: "Sub Property Type", value: pattaData?.subpro_name },
      ].map((item, i) => (
        <div
          key={i}
          className={`row-item ${i !== 4 ? "with-border" : ""}`}
        >
          <span className="label-text">{item.label}</span>
          <span className="value-text">{item.value}</span>
        </div>
      ))}
    </div>


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
  const [fileNames, setFileNames] = useState({});

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
  );
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
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            <AiFillClockCircle style={{ color: "darkblue" }} /> Hold on — we’re waiting for your payment.
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
              {invoiceData[0]?.invoice_status === "pending" ? (
                invoiceData[0]?.service_cat?.toLowerCase() === "legal opinion" ? (
                  <ServiceLegalPaymentGateway
                    invoiceData={invoiceData[0]}
                    fetchInvoice={fetchInvoice}
                    eid={eid}
                  />
                ) : (
                  <ServicePaymentGateway
                    invoiceData={invoiceData[0]}
                    fetchInvoice={fetchInvoice}
                    eid={eid}
                  />
                )
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

const PattaApplication = ({ appdata, surveyData, fetchInvoice, eid }) => {
  return (
    // <>
    //   {appdata === undefined ? (
    //     <div className="d-flex justify-content-center p-3">
    //       <h6 className="premium-text">Waiting for Your Patta Application...</h6>
    //     </div>
    //   ) : (
    //     <>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0"> Patta Application No:</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.application_no} </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0"> Patta Application Date:</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.patta_date}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0">Sale deed No :</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.saledeed_no} </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0">District :</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.districtName}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0"> Taluk:</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.talukName}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0">Village :</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">{appdata?.villageName}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="price-box">
    //         <div className="d-flex align-items-center justify-content-between gap-3">
    //           <div>
    //             <p className="fw-bold mb-0">Survey no :</p>
    //           </div>
    //           <div className="fw-bold">
    //             <p className="mb-0">
    //               {surveyData?.map((item) => item.survey_no).join(",")}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </>
    <div
      style={{
        background: "#ffffff",
        padding: "18px",
        // borderRadius: "12px",
        border: "1px solid #e6e6e6",
      }}
    >
      {appdata === undefined ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h6
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#004aad",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            <AiFillClockCircle style={{ color: "darkblue" }} /> Patta Application Pending
          </h6>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#7d7d7d",
              margin: 0,
            }}
          >
            Once completed, your application details will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Title */}
          <div style={{ marginBottom: "16px" }}>
            <h5
              style={{
                margin: 0,
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "18px",
                color: "#1a1a1a",
                position: "relative",
                paddingBottom: "6px",
                display: "inline-block",
              }}
            >
              <HiDocumentText style={{ color: "darkblue" }} /> Patta Application Details
              <span
                style={{
                  content: "",
                  display: "block",
                  width: "45%",
                  height: "3px",
                  background: "#004aad",
                  marginTop: "5px",
                  borderRadius: "3px",
                }}
              ></span>
            </h5>
          </div>

          {/* Rows */}
          {[
            { label: "Application No", value: appdata?.application_no },
            { label: "Application Date", value: appdata?.patta_date },
            { label: "Sale Deed No", value: appdata?.saledeed_no },
            { label: "District", value: appdata?.districtName },
            { label: "Taluk", value: appdata?.talukName },
            { label: "Village", value: appdata?.villageName },
            {
              label: "Survey No",
              value: surveyData?.map((item) => item.survey_no).join(", "),
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: i !== 6 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  color: "#4d4d4d",
                  fontWeight: 500,
                }}
              >
                {row.label}
              </span>

              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const ApplicationStatus = ({ statusData, fetchInvoice, eid }) => {
  return (
    <>
      {statusData?.length === 0 ? (
        // <div className="d-flex justify-content-center p-3">
        //   <h6 className="mb-3"> Waiting for Your Application Status....!</h6>
        // </div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h6
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#004aad",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            <AiFillClockCircle style={{ color: "darkblue" }} />Waiting for Your Application Status....!
          </h6>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#7d7d7d",
              margin: 0,
            }}
          >
            Once completed, your application status will appear here.
          </p>
        </div>
      ) : (
        <div className="p-2">
          {/* <table className="table table-bordered mt-3">
            <thead>
              <tr className="">
                <th> Last FollowUp Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {statusData?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.last_follow}</td>
                  <td>{item?.remark}</td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="table-responsive mt-3">
            <table className="table premium-table align-middle">
              <thead className="text-center">
                <tr>
                  <th> Last Follow Up Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {statusData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.last_follow}</td>
                    <td>{item?.remark}</td>
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

const YourPatta = ({ yourPatta, survey, fetchInvoice, eid }) => {
  return (
    <>
      {yourPatta === null ? (
        // <div className="d-flex justify-content-center p-3">
        //   <h6 className="mb-3"> Waiting for Your Patta ....!</h6>
        // </div>
         <div style={{ textAlign: "center", padding: "20px" }}>
          <h6
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#004aad",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            <AiFillClockCircle style={{ color: "darkblue" }} /> Waiting for Your Patta ....!
          </h6>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#7d7d7d",
              margin: 0,
            }}
          >
            Once completed, your patta details will appear here.
          </p>
        </div>
      ) : (
        // <>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Patta no:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.pattano} </p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Patta name:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.pattaname}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Fathers Name:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.father_name}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Patta date:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.date}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> District:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.districtName}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Taluk:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.talukName}</p>
        //       </div>
        //     </div>
        //   </div>

        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Revenue village:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.villageName}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="price-box">
        //     <div className="d-flex align-items-center justify-content-between gap-3">
        //       <div>
        //         <p className="fw-bold mb-0"> Land classification:</p>
        //       </div>
        //       <div className="fw-bold">
        //         <p className="mb-0">{yourPatta?.classification}</p>
        //       </div>
        //     </div>
        //   </div>
        //   <hr />
        // </>
        <div
          style={{
            background: "#ffffff",
            padding: "18px",
            border: "1px solid #e6e6e6",
            marginTop: "20px",
          }}
        >
          {/* Title */}
          <div style={{ marginBottom: "16px" }}>
            <h5
              style={{
                margin: 0,
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "18px",
                color: "#1a1a1a",
                position: "relative",
                paddingBottom: "6px",
                display: "inline-block",
              }}
            >
              <HiDocumentText style={{ color: "darkblue" }} /> Your Patta Details
              <span
                style={{
                  display: "block",
                  width: "45%",
                  height: "3px",
                  background: "#004aad",
                  marginTop: "5px",
                  borderRadius: "3px",
                }}
              ></span>
            </h5>
          </div>

          {/* Rows */}
          {[
            { label: "Patta No", value: yourPatta?.pattano },
            { label: "Patta Name", value: yourPatta?.pattaname },
            { label: "Father’s Name", value: yourPatta?.father_name },
            { label: "Patta Date", value: yourPatta?.date },
            { label: "District", value: yourPatta?.districtName },
            { label: "Taluk", value: yourPatta?.talukName },
            { label: "Revenue Village", value: yourPatta?.villageName },
            { label: "Land Classification", value: yourPatta?.classification },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: i !== 7 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  color: "#4d4d4d",
                  fontWeight: 500,
                }}
              >
                {row.label}
              </span>

              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>


      )}
      {survey?.length === 0 ? null : (
        <div className="p-2 mt-2">
          <h6 style={{ fontFamily: "poppins" }}>Survey Details :</h6>

          <div className="table-responsive mt-2">
            <table className="table premium-table align-middle">
              <thead className="text-center">
                <tr>
                  <th> S.No </th>
                  <th>Survey no</th>
                  <th> sub division </th>
                  <th> Hectare-Are </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {survey?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.survey_no}</td>
                    <td>{item?.sub_division}</td>
                    <td>{item?.hectare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <table className="table table-bordered mt-3">
            <thead>
              <tr className="table-">
                <th> S.No </th>
                <th>Survey no</th>
                <th> sub division </th>
                <th> Hectare-Are </th>
              </tr>
            </thead>
            <tbody>
              {survey?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.survey_no}</td>
                  <td>{item?.sub_division}</td>
                  <td>{item?.hectare}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      )}
    </>
  );
};
