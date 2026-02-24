import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import DownloadIcon from "@mui/icons-material/Download";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { TabView, TabPanel } from "primereact/tabview";
import { Table } from "antd";
import PattaServiceBooking from "./ProfileServiceReusable/PattaServiceBooking";
import ServiceDocumentVerification from "./ProfileServiceReusable/ServiceDocumentVerification";
import ServiceLocations from "./ProfileServiceReusable/ServiceLocations";
import ServicePayments from "./ProfileServiceReusable/ServicePayments";

const ServiceStatusLandSurvey = ({ eid }) => {
  const [gMapData, setGMapData] = useState([]);

  const fetchInvoice = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/surveypanel/${eid}`);
      setGMapData(response.data);
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
          pattaData={gMapData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        gMapData[0]?.dpt_status === null
          ? true
          : gMapData[0]?.dpt_status === "Document_verify"
            ? true
            : gMapData[0]?.dpt_status === "Location_verify"
              ? true
              : gMapData[0]?.dpt_status === "Service_verify"
                ? true
                : gMapData[0]?.dpt_status === "Payment_verify"
                  ? true
                  : gMapData[0]?.dpt_status === "App_verify"
                    ? true
                    : gMapData[0]?.dpt_status === "hub_verify"
                      ? true
                      : false,
    },
    {
      title: "Document Verification",
      details: (
        <ServiceDocumentVerification
          docData={gMapData[0]?.docdata}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        gMapData[0]?.dpt_status === "Document_verify"
          ? true
          : gMapData[0]?.dpt_status === "Location_verify"
            ? true
            : gMapData[0]?.dpt_status === "Service_verify"
              ? true
              : gMapData[0]?.dpt_status === "Payment_verify"
                ? true
                : gMapData[0]?.dpt_status === "App_verify"
                  ? true
                  : gMapData[0]?.dpt_status === "hub_verify"
                    ? true
                    : false,
    },
    {
      title: "Your Property Location",
      details: (
        <ServiceLocations
          gmapdata={gMapData[0]?.Gmap}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        gMapData[0]?.dpt_status === "Location_verify"
          ? true
          : gMapData[0]?.dpt_status === "Service_verify"
            ? true
            : gMapData[0]?.dpt_status === "Payment_verify"
              ? true
              : gMapData[0]?.dpt_status === "App_verify"
                ? true
                : gMapData[0]?.dpt_status === "hub_verify"
                  ? true
                  : false,
    },

    {
      title: "Service Confirmation Payment",
      details: (
        <ServicePayments
          invoiceData={gMapData}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        gMapData[0]?.dpt_status === "Payment_verify"
          ? true
          : gMapData[0]?.dpt_status === "App_verify"
            ? true
            : gMapData[0]?.dpt_status === "hub_verify"
              ? true
              : false,
    },
    {
      title: " FMB & Application",
      details: (
        <FMBApplication
          docData={gMapData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed:
        gMapData[0]?.dpt_status === "App_verify"
          ? true
          : gMapData[0]?.dpt_status === "hub_verify"
            ? true
            : false,
    },
    {
      title: "Land Survey Completed",
      details: (
        <LandSurveyCompleted
          docData={gMapData[0]}
          fetchInvoice={fetchInvoice}
          eid={eid}
        />
      ),
      completed: gMapData[0]?.dpt_status === "hub_verify" ? true : false,
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

export default ServiceStatusLandSurvey;

const FMBApplication = ({ docData, fetchInvoice, eid }) => {
  return (
    <>
      <TabView>
        <TabPanel header="FMB" headerClassName="custom-tab-header">
          <div className="row px-5 py-4">
            {docData?.fmb?.length > 0 ? (
              docData.fmb.map((item, index) => (
                <div className="col-6 mt-1" key={index}>
                  {item?.document ? (
                    <div
                      className="card"
                      style={{ width: "175px", height: "170px" }}
                    >
                      <div
                        className="pdf-wrapper"
                        onClick={() =>
                          window.open(
                            `${IMG_PATH}enquiry/sketch/${item.document}`,
                            "_blank"
                          )
                        }
                      >
                        <embed
                          src={`${IMG_PATH}enquiry/sketch/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
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
                          <p className="" style={{ fontSize: "12px" }}>
                            Fmb {index + 1} .pdf
                          </p>
                        </div>
                        <a
                          href={`${IMG_PATH}enquiry/sketch/${item.document}`}
                          download
                          target="_blank"
                          className="btn"
                        >
                          <DownloadIcon />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div>Waiting For Fmb Document</div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-4">
                <div className="alert alert-info">
                  Waiting for FMB documents to be uploaded
                </div>
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel header="Application">
          <div className="row px-5 py-4">
            {docData?.application?.map((item, index) => (
              <div className="col-6 mt-1">
                {item?.document ? (
                  <div
                    className="card"
                    style={{ width: "175px", height: "170px" }}
                  >
                    <div
                      className="pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}service/document/${item.document}`,
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
                        <p className="" style={{ fontSize: "10px" }}>
                          {" "}
                          {index + 1} .pdf
                        </p>
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
                ) : null}
              </div>
            ))}
          </div>
        </TabPanel>
      </TabView>
    </>
  );
};

const LandSurveyCompleted = ({ docData, fetchInvoice, eid }) => {
  const columns = [
    {
      title: "S.No",
      // dataIndex: ('key'),
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "Survey No",
      dataIndex: "survey_no",
      width: 100,
    },
    {
      title: "Sub Division",
      dataIndex: "sub_division",
      width: 100,
    },
    {
      title: "Area",
      dataIndex: "area",
      width: 100,
    },

    {
      title: "Dimension",
      children: [
        {
          title: "North",
          dataIndex: "north",
        },
        {
          title: "South",
          dataIndex: "south",
        },
        {
          title: "East",
          dataIndex: "east",
        },
        {
          title: "West",
          dataIndex: "west",
        },
        {
          title: "Other Sides",
          dataIndex: "other_side",
        },
      ],
    },
  ];

  return (
    <>
      <TabView>
        <TabPanel header="Final Fmb" headerClassName="custom-tab-header">
          <div className="row px-5 py-4">
            {docData?.Final_fmb ? (
              <div
                className="d-felx justify-content-center"
                style={{ display: "grid" }}
              >
                <div
                  className="card"
                  style={{ width: "175px", height: "170px" }}
                >
                  <div
                    className="pdf-wrapper"
                    onClick={() =>
                      window.open(
                        `${IMG_PATH}enquiry/${docData?.Final_fmb}`,
                        "_blank"
                      )
                    }
                  >
                    <embed
                      src={`${IMG_PATH}enquiry/${docData?.Final_fmb}#toolbar=0&navpanes=0&scrollbar=0`}
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
                      {/* <p className="" style={{ fontSize: "12px" }}>Fmb {index + 1} .pdf</p> */}
                    </div>
                    <a
                      href={`${IMG_PATH}enquiry/${docData?.Final_fmb}`}
                      download
                      target="_blank"
                      className="btn"
                    >
                      <DownloadIcon />
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </TabPanel>
        <TabPanel header="Survey Photos">
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
        <TabPanel header="Survey Videos">
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

      <div className="mt-3 p-2">
        <Table
          columns={columns}
          dataSource={docData?.survey_details}
          bordered
          size="middle"
          scroll={{ x: "calc(700px + 50%)", y: 47 * 5 }}
        />
      </div>
    </>
  );
};
