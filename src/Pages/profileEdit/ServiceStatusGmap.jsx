import { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import axiosInstance from "../../Api/axiosInstance";
import PattaServiceBooking from "./ProfileServiceReusable/PattaServiceBooking";
import ServiceDocumentVerification from "./ProfileServiceReusable/ServiceDocumentVerification";
import ServiceLocations from "./ProfileServiceReusable/ServiceLocations";


const ServiceStatusGmap = ({ eid }) => {
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
                <PattaServiceBooking pattaData={gMapData[0]} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === null ? true : gMapData[0]?.dpt_status === "Document_verify" ? true : false
        },
        {
            title: "Document Verification",
            details: (
                <ServiceDocumentVerification docData={gMapData[0]?.docdata} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Document_verify" ? true : false
        },

        {
            title: "Your Property Location",
            details: (
                <ServiceLocations gmapdata={gMapData[0]?.Gmap} fetchInvoice={fetchInvoice} eid={eid} />
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
