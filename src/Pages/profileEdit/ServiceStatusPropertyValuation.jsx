import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import DownloadIcon from "@mui/icons-material/Download";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { TabView, TabPanel } from "primereact/tabview";
import PattaServiceBooking from "./ProfileServiceReusable/PattaServiceBooking";
import ServiceDocumentVerification from "./ProfileServiceReusable/ServiceDocumentVerification";
import ServiceLocations from "./ProfileServiceReusable/ServiceLocations";
import ServicePayments from "./ProfileServiceReusable/ServicePayments";


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
        <ServiceLocations
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
        <ServicePayments
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
