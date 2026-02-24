import axios from "axios";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/images/Goolok Final Logo copy.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import { useAlert } from "react-alert";
import axiosInstance from "../../Api/axiosInstance";
import { LOGIN_BASE_URL, PAYMENT_KEY, PAYMENT_KEY_SECRET } from "../../Api/api";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { Skeleton } from "primereact/skeleton";
import "./LinkPages.css";

const LinkPage = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const location = useLocation();
  const isLegalPay = location.pathname.startsWith("/legalpay");
  const alert = useAlert();
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const contentRef = useRef();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce((acc, item) => {
      const chargesTotal = item.amount;
      return acc + (chargesTotal || 0);
    }, 0);

    const gst = subtotal * 0;
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



  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(
            `${LOGIN_BASE_URL}/customer/onlinepayments`,
            {
              headers: { "Gl-Status": id },
            }
          );
          if (response?.data?.length === 0) {
            navigate("/")
          } else {
            setInvoiceData(response.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchInvoice();
    } else {
      navigate("/");
    }
  }, [id]);

  const paymentIdHandle = async (response) => {
    if (!invoiceData || invoiceData?.length === 0) return;
    const payload = {
      invoiceId: invoiceData[0]?.invoice_id,
      invoice: invoiceData[0]?.invoice_no,
      customerId: invoiceData[0]?.customerId,
    };

    try {
      const res = await axiosInstance.put(
        `/customer/onlinepayments/${response.razorpay_payment_id}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      alert.success("Payment successful!");
      fetch();
    } catch (error) {
      console.error("Payment update error:", error);
      alert.error("Payment update failed!");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!invoiceData[0]?.amount) {
      alert.error("Invalid payment amount");
      return;
    }

    const options = {
      key: PAYMENT_KEY,
      key_secret: PAYMENT_KEY_SECRET,
      amount: invoiceData[0]?.amount * 100,
      currency: "INR",
      name: "Gharuda Infotech",
      description: "Advance Payment",
      order_id: invoiceData[0]?.order_id,
      handler: function (response) {
        paymentIdHandle(response);
      },
      prefill: {
        name: invoiceData[0]?.customer,
        email: invoiceData[0]?.email_id,
        contact: invoiceData[0]?.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#2f4f4f",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div
      style={{
        // backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        minHeight: "100vh",
        fontFamily: "poppins",
      }}
    >
      {loading ? (
        <Skeleton height="210mm" width="210mm" />
      ) : invoiceData[0]?.status === "pending" ? (
        <article className="invoice-a4 advance-u-invoice p-4" ref={contentRef}>
          <div className="advance-u-header p-0 m-0">
            <div>
              <img src={logo} alt="Goolok" className="advance-u-logo" />
            </div>
            <p className="advance-u-title">INVOICE</p>
          </div>

          <div className="advance-u-divider">
            <div className="advance-u-line" />
            <h6 className="advance-u-site">GOOLOK.COM</h6>
          </div>

          {invoiceData?.map((item) => (
            <div
              key={item.invoice_id}
              className="advance-u-bill-section mt-2 mt-md-5"
            >
              <div className="advance-u-bill-to">
                <h6 className="">Invoice to :</h6>
                <p className="advance-u-bill-name">{item.customer}</p>
                <p className="advance-u-bill-mobile">{item.mobile}</p>
                <p className="advance-u-bill-email">
                  {item.email_id === "null" ? "" : item.email_id}
                </p>
              </div>

              <div className="advance-u-bill-info">
                <p className="">
                  <b>Invoice no :</b> {item.invoice_no}
                </p>
                <p>
                  <b>Date:</b> {DateFormateCustom(item.invoice_date)}
                </p>
              </div>
            </div>
          ))}

          <table className="advance-u-table table-striped mb-2 ">
            <thead className="p-3">
              <tr className="p-3">
                <th
                  style={{ fontWeight: "500" }}
                  className="text-center tablehead"
                >
                  NO
                </th>
                <th
                  style={{ fontWeight: "500" }}
                  className="text-center tablehead"
                >
                  QTY
                </th>
                <th
                  style={{ fontWeight: "500" }}
                  className="text-center tablehead"
                >
                  DESCRIPTION
                </th>
                <th
                  style={{ fontWeight: "500" }}
                  className="text-center tablehead"
                >
                  PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#e7e6e6ff" : "white",
                  }}
                >
                  <td className="text-center">1</td>
                  <td className="text-center">1</td>
                  <td className="text-center">Advance Payment</td>
                  <td className="text-center">₹ {item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="advance-u-total-section mt-4">
            <div className="advance-u-total-box">
              <div className="advance-u-subtotal">
                <span>Sub Total :</span>
                <span>₹{calculateTotals().subtotal}</span>
              </div>
              <div className="advance-u-grandtotal">
                <span>TOTAL AMOUNT:</span>
                <span>₹{calculateTotals().total}</span>
              </div>
            </div>
          </div>

          <section className="advance-u-payment-section mb-5 text-center">
            {invoiceData[0]?.status === "pending" ? (
              <div className="advance-u-pay-row">
                <button className="advance-pay-btn" onClick={handlePayment}>
                  Pay {invoiceData[0]?.amount}
                </button>
              </div>
            ) : (
              <div className="advance-u-success">
                <i className="fa-solid fa-circle-check"></i>
                <h6>Payment Successful!</h6>
              </div>
            )}
          </section>

          <div className="advance-u-separator" />

          <div className="advance-u-footer d-flex justify-content-between">
            <div className="advance-u-contact">
              <i className="fa-solid fa-phone-volume"></i>{" "}
              <span>123-456-7890</span>
            </div>
            <div className="advance-u-mail ">
              <i
                className="fa-regular fa-envelope"
                style={{ marginRight: "4px" }}
              ></i>
              <a href="mailto:goolok@gmail.com?subject=Invoice%20Request&body=Hello%20Team,">
                goolok@gmail.com
              </a>
            </div>
          </div>
        </article>
      ) : (
        <div
          className="link-success mt-5 "
        >
          <i
            className="fa-solid fa-circle-check link-success-tick mt-3 mt-md-5"
          ></i>
          <h2>
            Payment Successful!
          </h2>
          <button className="linkback-btn mt-3 mt-sm-2 mb-4" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left me-2"></i> Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkPage;
