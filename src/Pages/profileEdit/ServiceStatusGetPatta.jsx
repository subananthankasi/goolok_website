import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import { HiDocumentText } from "react-icons/hi2";
import { AiFillClockCircle } from "react-icons/ai";
import PattaServiceBooking from "./ProfileServiceReusable/PattaServiceBooking";
import ServiceDocumentVerification from "./ProfileServiceReusable/ServiceDocumentVerification";
import ServicePayments from "./ProfileServiceReusable/ServicePayments";

const ServiceStatusGetPatta = ({ invoiceData, fetchInvoice, eid }) => {
  const steps = [
    {
      title: "Patta Service Booked",
      details: (
        <PattaServiceBooking
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
        <ServiceDocumentVerification
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
        <ServicePayments
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
        <div
          style={{
            background: "#ffffff",
            padding: "18px",
            border: "1px solid #e6e6e6",
            marginTop: "20px",
          }}
        >
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
        </div>
      )}
    </>
  );
};
