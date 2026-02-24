import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import DownloadIcon from "@mui/icons-material/Download";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { AiFillClockCircle } from "react-icons/ai";
import PattaServiceBooking from "./ProfileServiceReusable/PattaServiceBooking";
import ServiceDocumentVerification from "./ProfileServiceReusable/ServiceDocumentVerification";
import ServiceLocations from "./ProfileServiceReusable/ServiceLocations";
import ServicePayments from "./ProfileServiceReusable/ServicePayments";


const ServiceStatusLegaling = ({ eid }) => {
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
        <PattaServiceBooking
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
                  : invoiceData[0]?.dpt_status === "Lawyer_verify"
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
        invoiceData[0]?.dpt_status === "Document_verify"
          ? true
          : invoiceData[0]?.dpt_status === "Location_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Service_verify"
              ? true
              : invoiceData[0]?.dpt_status === "Payment_verify"
                ? true
                : invoiceData[0]?.dpt_status === "Lawyer_verify"
                  ? true
                  : false,
    },
    {
      title: "Your Property Location",
      details: (
        <ServiceLocations
          gmapdata={invoiceData[0]?.Gmap}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        invoiceData[0]?.dpt_status === "Location_verify"
          ? true
          : invoiceData[0]?.dpt_status === "Document_verify"
            ? true
            : invoiceData[0]?.dpt_status === "Service_verify"
              ? true
              : invoiceData[0]?.dpt_status === "Payment_verify"
                ? true
                : invoiceData[0]?.dpt_status === "Lawyer_verify"
                  ? true
                  : false,
    },
    {
      title: "legaling Confirmation Payment",
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
          : invoiceData[0]?.dpt_status === "Lawyer_verify"
            ? true
            : false,
    },
    {
      title: "Wanted Documents",
      details: (
        <WantedDocuments
          docData={invoiceData[0]?.Gmap}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "Lawyer_verify" ? true : false,
    },
    {
      title: " Legal Opinion Status",
      details: (
        <LegalOpinionStatus
          statusData={invoiceData[0]?.opinionStatus}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "Lawyer_verify" ? true : false,
    },
    {
      title: " Legal Opinion",
      details: (
        <LegalOpinion
          statusData={invoiceData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: invoiceData[0]?.dpt_status === "Lawyer_verify" ? true : false,
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

export default ServiceStatusLegaling;

const WantedDocuments = ({ docData, fetchInvoice, eid }) => {

  return (
    <>
      <div className="m-3">
        <div className="d-flex justify-content-center" style={{ flexWrap: "wrap", gap: "20px" }}>
          {docData?.length === 0 ? (
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
                <AiFillClockCircle style={{ color: "darkblue", fontSize: "20px", marginRight: "5px" }} />Waiting for your document...!
              </h6>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  color: "#7d7d7d",
                  margin: 0,
                }}
              >
                Once completed, your document will appear here.
              </p>
            </div>
          ) : docData?.map((item, index) => (
            <div className=" ">
              <div className="card" style={{ height: "150px", width: "155px" }}>
                <div
                  className="pdf-wrapper"
                  onClick={() =>
                    window.open(`${IMG_PATH}enquiry/${item?.wanted}`, "_blank")
                  }
                >
                  <embed
                    src={`${IMG_PATH}enquiry/${item.wanted}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="pdf-hidden-scroll"
                    type="application/pdf"
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-1 px-3">
                    <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                  </div>
                  <a
                    href={`${IMG_PATH}enquiry/${item.wanted}`}
                    download
                    target="_blank"
                    className="btn"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const LegalOpinionStatus = ({ statusData, fetchInvoice, eid }) => {
  return (
    <>
      {statusData?.length === 0 ? (

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
            <AiFillClockCircle style={{ color: "darkblue", fontSize: "20px", marginRight: "5px" }} /> Waiting for Your Application Status....!
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
          <div className="table-responsive">
            <table className="table premium-table align-middle">
              <thead className="text-center">
                <tr className="">
                  <th> Last FollowUp Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {statusData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.open_date}</td>
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

const LegalOpinion = ({ statusData, fetchInvoice, eid }) => {


  return (
    <div className="d-flex justify-content-center p-2">
      <div className="w-80" style={{ width: "30%" }}>
        {statusData?.opinion ? (
          <div className="card" style={{ height: "150px" }}>
            <div
              className="pdf-wrapper"
              onClick={() =>
                window.open(
                  `${IMG_PATH}enquiry/lawyer/${statusData?.opinion}`,
                  "_blank"
                )
              }
            >
              <embed
                src={`${IMG_PATH}enquiry/lawyer/${statusData?.opinion}#toolbar=0&navpanes=0&scrollbar=0`}
                className="pdf-hidden-scroll"
                type="application/pdf"
              />
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-1 px-2">
                <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
              </div>
              <a
                href={`${IMG_PATH}enquiry/lawyer/${statusData?.opinion}`}
                download
                target="_blank"
                className="btn"
                rel="noopener noreferrer"
              >
                <DownloadIcon />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
