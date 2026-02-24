import { useEffect, useRef } from "react";
import { Accordion } from "react-bootstrap";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { Empty } from "antd";
import PaymentScheduleBooking from "./PaymentScheduleBooking";


const TimeLineAccordian = ({ statusData, wholeStatusData }) => {
  const steps = [
    {
      title:
        statusData?.bid === null
          ? "Waiting For Your Booking."
          : "Your Property Is Successfully Booked",
      completed:
        statusData?.tracker === 1
          ? true
          : statusData?.tracker === 2
            ? true
            : statusData?.tracker === 3
              ? true
              : statusData?.tracker === 4
                ? true
                : statusData?.tracker === 5
                  ? true
                  : false,
      details: (
        <BookingDetails
          paymentData={statusData?.payment}
          statusData={statusData}
          sheduleData={statusData?.schedule}
        />
      ),
    },
    {
      title: "Your Payment Schedule",
      details: (
        <PaymentScheduleBooking
          paymentData={statusData?.payment}
          statusData={statusData}
          sheduleData={statusData?.schedule}
          wholeStatusData={wholeStatusData}
        />
      ),
      completed:
        statusData?.tracker === 2
          ? true
          : statusData?.tracker === 3
            ? true
            : statusData?.tracker === 4
              ? true
              : statusData?.tracker === 5
                ? true
                : false,
    },
    {
      title: "Registration Date",
      details: <RegistrationDate regData={statusData?.regDate} />,
      completed:
        statusData?.tracker === 3
          ? true
          : statusData?.tracker === 4
            ? true
            : statusData?.tracker === 5
              ? true
              : false,
    },
    {
      title: "Registration",
      details: <Registration regData={statusData?.registration} />,
      completed:
        statusData?.tracker === 4
          ? true
          : statusData?.tracker === 5
            ? true
            : false,
    },
    {
      title: "Your Property Documents",
      details: <YourPropertyDocuments docData={statusData?.prop_doc} />,
      completed: statusData?.tracker === 5 ? true : false,
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
  return (
    <div className=" mt-4">
      <h5>Status</h5>
      <div className="mt-4">
        <div className="position-relative ps-3" style={{ paddingBottom: "0" }}>
          <div
            className="position-absolute bg-secondary"
            style={{
              width: "6px",
              top: "10px",
              left: "12px",
              bottom: "40px",
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

          <Accordion>
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
                  <Accordion.Header
                  >
                    {step.title}
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    {step.details}
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default TimeLineAccordian;

const BookingDetails = ({ paymentData, statusData, scheduleData }) => {

  const formatCurrency = (value) => {
    if (!value) return "₹ 0.00";
    return Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <>
      {statusData?.bid === null ? (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      ) : (
        <div className="billing-summary-wrapper">
          {[
            { label: "Booking ID", value: statusData?.booking_id },
            { label: "Total Price", value: statusData?.price ? `₹ ${statusData?.price}` : null },
            { label: "Advance Amount", value: statusData?.advance ? formatCurrency(statusData?.advance) : null },
            {
              label: "Discount Amount",
              value: statusData?.disc_status === "true" ? formatCurrency(statusData?.discout) : null
            },
            {
              label: "Coupon Amount",
              value: statusData?.coupon_amount ? formatCurrency(statusData?.coupon_amount) : null
            }
          ]
            .filter(item => item.value) 
            .map((item, index) => (
              <div className="billing-row" key={index}>
                <span className="label">{item.label}</span>
                <span className="value">{item.value}</span>
              </div>
            ))}
          <div className="billing-total">
            <span>Payable Amount</span>
            <strong>{formatCurrency(statusData?.payble_amount)}</strong>
          </div>

        </div>

      )}
    </>
  );
};

const RegistrationDate = ({ regData }) => {
  return (
    <>
      {regData === null ? (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      ) : (
        <div className="billing-summary-wrapper">
          {[
            { label: "Registration Date", value: regData?.reg_date },
            { label: "Registration Time", value: regData?.reg_time },
            { label: "Registration ID", value: regData?.reg_id },
            { label: "SRO", value: regData?.sro_title },
            { label: "District", value: regData?.districtName },
            { label: "Taluk", value: regData?.talukName },
            { label: "Village", value: regData?.villageName }
          ]
            .filter(item => item.value)
            .map((item, index) => (
              <div className="billing-row" key={index}>
                <p className="label">{item.label}:</p>
                <p className="value">{item.value}</p>
              </div>
            ))}
        </div>

      )}
    </>
  );
};

const Registration = ({ regData }) => {
  return (
    <>
      {regData === null ? (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      ) : (
        <div className="billing-summary-wrapper">
          {[
            { label: "Registration Status", value: regData?.reg_status },
            { label: "Registration Date", value: regData?.reg_date, format: true }
          ]
            .filter(item => item.value)
            .map((item, index) => (
              <div className="billing-row" key={index}>
                <p className="label">{item.label}:</p>
                <p className="value">
                  {item.format ? DateFormateCustom(item.value) : item.value}
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

const YourPropertyDocuments = ({ docData }) => {
  const docFields = [
    { label: "Registration ID", value: docData?.reg_id },
    { label: "Registration Date", value: DateFormateCustom(docData?.reg_date) },
    { label: "Category", value: docData?.categoryName },
    { label: "Sub Category", value: docData?.sub_catName },
    { label: "Property Type", value: docData?.prop_type },
    { label: "Extent in Units", value: docData?.extent_units },
    { label: "Sale Deed No", value: docData?.sd_no },
    { label: "Sale Deed Name", value: docData?.sd_name },
    { label: "Sale Deed Hard Copy", value: docData?.sd_hard_copy },
    { label: "Tracking Id", value: docData?.tracking_id },
    { label: "Patta Application No", value: docData?.patta_app_no },
    { label: "Patta No", value: docData?.patta_no },
    { label: "Patta Name", value: docData?.patta_name },
    { label: "Survey No", value: docData?.survey_no },
    { label: "Area", value: docData?.area },
  ];

  return (
    <>
      {docData ? (
        <div className="billing-summary-wrapper">
          {docFields.map(
            (item, index) =>
              item.value && (
                <div className="billing-row" key={index}>
                  <p className="label">{item.label}:</p>
                  <p className="value">{item.value}</p>
                </div>
              )
          )}
        </div>

      ) : (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      )}
    </>
  );
};
