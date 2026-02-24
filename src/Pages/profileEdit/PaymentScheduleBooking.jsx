import { useState, useEffect } from "react";
import { Message } from "primereact/message";
import axiosInstance from "../../Api/axiosInstance";
import { ThreeDots } from "react-loader-spinner";
import {
  PAYMENT_KEY,
  PAYMENT_KEY_SECRET,
} from "../../Api/api";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import { Dialog } from "primereact/dialog";
import { Radio, RadioGroup } from "rsuite";
import { useAlert } from "react-alert";
import { useRazorpay } from "react-razorpay";

const PaymentScheduleBooking = ({
  paymentData,
  statusData,
  sheduleData,
  wholeStatusData,
}) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();
  const [docData, setDocData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [errorSchedule, setErrorSchedule] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);


  const fetchInvoiceDoc = async (bid) => {
    try {
      const response = await axiosInstance.get(`vendor/paymentschedule/${bid}`);
      setDocData(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

  useEffect(() => {
    if (statusData?.bid) {
      fetchInvoiceDoc(statusData?.bid);
    }
  }, [statusData?.bid]);

  const [dueAmount, setDueAmount] = useState([]);
  const [loadingRow, setLoadingRow] = useState(null);
  const [getBookingId, setGetBookingId] = useState(null);
  const handlePay = async (row) => {
    setLoadingRow(row?.emiId);
    setGetBookingId(row?.bookigid);
    try {
      const response = await axiosInstance.get(`vendor/payemi/${row?.emiId}`);
      setDueAmount(response.data);
      setLoadingRow(null);
      setVisible(true);
    } catch (error) {
      console.error("Error during the request:", error);
      setLoadingRow(null);
    }
  };

  const handlePayNow = async () => {
    if (!selectedOption) {
      setErrorSchedule("Please select a payment option");
      return;
    }
    if (selectedOption === "Custom amount") {
      if (!otherAmount.trim()) {
        setErrorSchedule("Please enter an amount");
        return;
      }
      if (Number(otherAmount) > dueAmount?.total_due) {
        setErrorSchedule(
          `Amount cannot exceed your total due amount of ${formatCurrency(
            dueAmount?.total_due
          )}`
        );
        return;
      }
    }
    setErrorSchedule("");
    let sendAmount;
    if (selectedOption === "Total due amount") {
      sendAmount = dueAmount?.total_due;
    } else if (selectedOption === "Current due amount") {
      sendAmount = dueAmount?.current_due;
    } else if (selectedOption === "Custom amount") {
      sendAmount = otherAmount;
    }

    const payload = {
      amount: sendAmount,
      vacantid: wholeStatusData?.map((item) => item.block_id),
      option: selectedOption,
    };
    setPaymentLoading(true);

    try {
      const response = await axiosInstance.post(`/vendor/payemi`, payload);
      const orderData = response.data;
      setVisible(false);
      setSelectedOption("");
      setErrorSchedule("");
      setOtherAmount("");
      setPaymentLoading(false);

      const options = {
        key: PAYMENT_KEY,
        key_secret: PAYMENT_KEY_SECRET,
        amount: sendAmount * 100,
        currency: "INR",
        name: "Gharuda infotech",
        description: "for testing purpose",
        order_id: orderData.order_id,

        handler: async function (razorpayResponse) {
          const finalPayload = {
            invoiceId: orderData?.invoice_id,
            bookingId: getBookingId,
          };

          try {
            const finalResponse = await axiosInstance.put(
              `/vendor/payemi/${razorpayResponse?.razorpay_payment_id}`,
              finalPayload
            );
            alert.success("Payment successful!");
            fetchInvoiceDoc(statusData?.bid);
          } catch (submitError) {
            console.error("Final API Error:", submitError);
          }
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentLoading(false);
      console.error("Payment API Error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    if (
      selectedOption &&
      !(selectedOption === "Custom amount" && !otherAmount.trim())
    ) {
      setErrorSchedule("");
    }
  }, [selectedOption, otherAmount]);

  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatNumber = (num) => {
    if (!num) return "";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const isBookingCanceled = wholeStatusData[0]?.booking_status === "cancel";

  return (
    <>
      {docData?.length === 0 ? (
        <div className="text-center m-3">
          <Message
            severity="error"
            text="No payment details available."
            className="text-center"
          />
        </div>
      ) : (
        <div className="p-2">
          <div style={{ maxWidth: "100%", overflowX: "auto", fontFamily: "poppins" }}>
            <table className="table table-hover table-bordered shadow-sm rounded-4 text-nowrap">
              <thead className="table-dark">
                <tr>
                  <th>S.no</th>
                  <th className="w-100">Payment Name</th>
                  <th>EMI Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Paid Amount</th>
                  <th>Emi Balance</th>
                </tr>
              </thead>
              <tbody>
                {docData.map((item, index) => {
                  const isDisabled = isBookingCanceled ? true :
                    item.status !== "Paid" &&
                    index > 0 &&
                    docData[index - 1].status !== "Paid";

                  return (
                    <tr key={item.pid}>
                      <td className="fw-semibold">{index + 1}</td>
                      <td>{item.payment_name}</td>
                      <td className="text-success fw-bold">
                        ₹ {item.emi_amount}
                      </td>
                      <td className="text-muted">{item.emi_date}</td>
                      <td>
                        {item.status === "Paid" ? (
                          <span
                            className="badge bg-success d-flex justify-content-center align-items-center gap-1 py-2"
                            style={{
                              borderRadius: "20px",
                              fontSize: "14px",
                              width: "93px",
                            }}
                          >
                            <CheckCircleIcon fontSize="small" />
                            Paid
                          </span>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<PaymentIcon />}
                            disabled={isDisabled}
                            sx={{
                              borderRadius: "20px",
                              textTransform: "none",
                              fontWeight: 600,
                              boxShadow: 2,
                              "&:hover": {
                                backgroundColor: "#0a58ca",
                              },
                            }}
                            onClick={() => handlePay(item)}
                          >
                            {loadingRow === item.emiId ? (
                              <ThreeDots
                                visible={true}
                                height="23"
                                width="52"
                                color="#ffffff"
                                radius="18"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{
                                  justifyContent: "center",
                                  fontSize: "12px",
                                }}
                              />
                            ) : (
                              "Pay now"
                            )}
                          </Button>
                        )}
                      </td>
                      <td className="text-success fw-bold">
                        {item.paid_amount != null
                          ? `₹ ${item.paid_amount}`
                          : "-"}
                      </td>
                      <td>
                        {item.emi_balance != null
                          ? `₹ ${item.emi_balance}`
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Dialog
        header="Payment option"
        visible={visible}
        style={{ width: "32rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setSelectedOption("");
          setErrorSchedule("");
          setOtherAmount("");
        }}
      >
        <RadioGroup
          name="radio-group"
          onChange={(val) => setSelectedOption(val)}
        >
          <Radio value="Total due amount">
            {/* Total due amount ({formatCurrency(dueAmount?.total_due)}) */}
            Total due amount   (₹{dueAmount?.total_due})
          </Radio>
          <Radio value="Current due amount">
            {/* Current due amount ({formatCurrency(dueAmount?.current_due)}) */}
            Current due amount  (₹{(dueAmount?.current_due)})
          </Radio>

          <Radio value="Custom amount">Custom amount</Radio>
        </RadioGroup>

        {selectedOption === "Custom amount" && (
          <div className="mt-3">
            <label htmlFor="otherAmount" className="form-label fw-semibold">
              Enter Amount :
            </label>
            <input
              id="otherAmount"
              type="text"
              value={formatNumber(otherAmount)}
              onChange={(e) => {
                let value = e.target.value
                  .replace(/,/g, "")
                  .replace(/[^0-9]/g, "");
                setOtherAmount(value);
              }}
              placeholder="Enter custom amount"
              className="form-control w-100"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>
        )}
        {errorSchedule && (
          <div
            className="text-danger mt-2 fw-semibold"
            style={{ fontSize: "0.8rem" }}
          >
            {errorSchedule}
          </div>
        )}
        <div className="mt-3 d-flex justify-content-end">
          <Button
            variant="contained"
            size="small"
            startIcon={<PaymentIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#333333",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
            onClick={handlePayNow}
            disabled={paymentLoading}
          >
            {paymentLoading ? (
              <ThreeDots
                visible={true}
                height="23"
                width="52"
                color="#ffffff"
                radius="18"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  justifyContent: "center",
                  fontSize: "12px",
                }}
                wrapperClass=""
              />
            ) : (
              "Pay now"
            )}
          </Button>
        </div>
      </Dialog>
    </>
  );
};
export default PaymentScheduleBooking;
