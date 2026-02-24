import { useState } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {  ListGroup } from "react-bootstrap";
import { Steps } from "antd";
import { Dialog } from "primereact/dialog";

const EmiPlans = ({ items }) => {
  const [emiShow, setEmiShow] = useState(false);
  const [selectedBank, setSelectedBank] = useState(
    items?.pay_option?.[0]?.schedule || ""
  );
  const getInstallments = (schedule) => {
    const option = items?.pay_option?.find((opt) => opt.schedule === schedule);
    if (!option) return [];
    if (option.schedule === "Full payment") {
      return [
        { installment: "Booking", amnt: items?.booking_amount },
        {
          installment: option.payment_details,
          paymentname: option.schedule,
          days: option.days,
          emi_amount: option?.emi_amount,
        },
      ];
    }

    if (option.installment_details) {
      try {
        const parsed = JSON.parse(option.installment_details);
        return [
          { installment: "Booking", amnt: items?.booking_amount },
          ...parsed,
        ];
      } catch (err) {
        console.error("Invalid JSON in installment_details", err);
        return [];
      }
    }

    return [];
  };

  const installments = getInstallments(selectedBank);

  return (
    <>
      <p className="text-center" style={{ alignItems: "center" }}>
        <EventAvailableIcon style={{ color: "green" }} /> Payment options here
        <span
          style={{
            color: "#5174f0",
            cursor: "pointer",
            fontSize: "13px",
            textDecoration: "underline",
          }}
          onClick={() => setEmiShow(true)}
          className=""
        >
          <b>
            {" "}
            View plans <ChevronRightIcon />
          </b>
        </span>
      </p>
      <Dialog
        visible={emiShow}
        style={{ width: "52rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Payment plans"
        modal
        onHide={() => setEmiShow(false)}
      >
        <div className="d-flex" style={{ height: "32rem", overflow: "hidden" }}>
          {/* Left Side */}
          <div
            style={{
              width: "40%",
              borderRight: "1px solid #ddd",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <ListGroup variant="flush">
              {items?.pay_option?.map((option, i) => (
                <ListGroup.Item
                  key={i}
                  action
                  active={selectedBank === option.schedule}
                  onClick={() => setSelectedBank(option.schedule)}
                >
                  {option.schedule}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          {/* right Side */}
          <div
            style={{
              width: "60%",
              paddingLeft: "20px",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <h6>{selectedBank} plans</h6>

            <div className="text-center mt-3">
              {installments.length > 0 ? (
                <Steps
                  direction="vertical"
                  current={-1}
                  items={installments.map((plan) => ({
                    title:
                      plan.paymentname === "Full payment" ? (
                        <p
                          className=""
                          style={{ fontWeight: "600", color: "black" }}
                        >
                          Pay 100% upfront-Registration <br></br> within{" "}
                          {plan.days} days
                        </p>
                      ) : (
                        <p
                          className=""
                          style={{ fontWeight: "600", color: "black" }}
                        >
                          {plan.installment}
                        </p>
                      ),
                    description:
                      plan.installment === "Booking" ? (
                        <div className="d-flex justify-content-between">
                          <p style={{ fontWeight: "400", color: "black" }}>
                            Token Advance
                          </p>
                          <p style={{ fontWeight: "600", color: "black" }}>
                            ₹ {plan.amnt}
                          </p>
                        </div>
                      ) : plan.paymentname === "Full payment" ? (
                        <div className="d-flex justify-content-end">
                          <p style={{ fontWeight: "600", color: "black" }}>
                            ₹{" "}
                            {/* {items?.disc_status === "true"
                              ? toNumber(items?.total_aft_disc) -
                                toNumber(items?.booking_amount)
                              : toNumber(items?.price) -
                                toNumber(items?.booking_amount)} */}
                            {plan.emi_amount}
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between">
                          <p
                            style={{ fontWeight: "400", color: "black" }}
                          >{`${plan.percentage_of_amount}% within ${plan.days} days`}</p>

                          <p style={{ fontWeight: "600", color: "black" }}>
                            ₹{" "}
                            {/* {customRound(
                              ((items.disc_status === "true"
                                ? toNumber(items?.total_aft_disc) -
                                  toNumber(items?.booking_amount)
                                : toNumber(items?.price) -
                                  toNumber(items?.booking_amount)) *
                                Number(plan.percentage_of_amount)) /
                                100
                            )} */}
                            {plan?.emi_amount}
                          </p>
                        </div>
                      ),
                  }))}
                />
              ) : (
                <p className="mt-3">
                  {items?.pay_option?.find(
                    (opt) => opt.schedule === selectedBank
                  )?.payment_details || "No installment details available."}
                </p>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EmiPlans;
