import React, { useEffect, useRef, useState } from "react";
import { PaymentSuccess } from "../../PaymentGateway/PaymentResponse";
import axiosInstance from "../../../Api/axiosInstance";
import { encryptData } from "../../../Utils/encryptData";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/images/Goolok Final Logo copy.png";
import DownloadIcon from "@mui/icons-material/Download";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import { PAYMENT_KEY, PAYMENT_KEY_SECRET } from "../../../Api/api";
import { useRazorpay } from "react-razorpay";
import { useAlert } from "react-alert";
import Skeleton from "react-loading-skeleton";

const AdvancePayment = ({ id }) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();
  const [data, setData] = useState({});
  const [invoiceData, setInvoiceData] = useState([]);
  const contentRef = useRef();
  const navigate = useNavigate();

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
  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce((acc, item) => {
      const chargesTotal = item.advance?.amount;

      return acc + (chargesTotal || 0);
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
  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/enquiry/${id}`);
      setData(response.data);
      setInvoiceData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  const thStyle = {
    border: "1px solid #ccc",
    padding: "5px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "10px",
  };
  const [paymentLoading, setPaymentLoading] = useState(false)
  const paymentIdHandle = async (response) => {
    if (!data || data?.length === 0) return;

    const payload = {
      id: data[0]?.id,
      invoiceId: data[0]?.advance?.id,
      invoice: data[0]?.advance?.invoice_id,
    };
    setPaymentLoading(true)
    try {
      const res = await axiosInstance.put(
        `/vendor/invoice/${response.razorpay_payment_id}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      alert.success("Payment successful!");
      setPaymentLoading(false)
      fetch()
      // setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Payment update error:", error);
      alert.error("Payment update failed!");
      setPaymentLoading(false)
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!data[0]?.advance?.amount) {
      alert.error("Invalid payment amount");
      return;
    }

    const options = {
      key: PAYMENT_KEY,
      key_secret: PAYMENT_KEY_SECRET,
      amount: data[0]?.advance?.amount * 100,
      currency: "INR",
      name: "Gharuda Infotech",
      description: "Advance Payment",
      order_id: data[0]?.advance?.order_id,
      handler: function (response) {
        paymentIdHandle(response);
      },
      prefill: {
        name: data[0]?.customer,
        email: data[0]?.email_id,
        contact: data[0]?.mobile,
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
    <div>
      {data[0]?.advance === null ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Advance Payment...</h6>
        </div>
      ) : paymentLoading ? (
        <div>  
         <Skeleton height= "600px" style={{ marginBottom: "10px"}} />
        </div>
      ):(
        <>
          {data[0]?.advance?.status === "pending" ? (
            ""
          ) : (
            <div className="d-flex justify-content-end">
              <button
                onClick={generatePdf}
                className="btn shadow-sm d-flex align-items-center justify-content-center"
                style={{
                  background: "rgb(55, 68, 79)",
                  border: "none",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "3px",
                  padding: "8px 8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgb(70, 85, 97)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgb(55, 68, 79)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.2)";
                }}
              >
                <DownloadIcon style={{ fontSize: "20px" }} />
              </button>
            </div>
          )}

          {/* <article className="p-4" ref={contentRef} style={{ background: "#fff", }} >
                                <h3 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h3>
                                <hr />
                                <div className="d-flex justify-content-between ">
                                    <div className="mt-3 mb-5">
                                        <img src={logo} alt="goolok" style={{ width: "100px", height: "25px" }} />
                                        <div className="m-0">
                                            <p className='p-0 m-0' style={{ fontSize: "11px" }}><b>  Goolok Pvt ltd </b></p>
                                            <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>2nd Floor, 129,</b></p>
                                            <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Nungambakkam, Chennai,</b> </p>
                                            <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Tamil Nadu 600034 </b></p>
                                        </div>
                                    </div>
                                    {invoiceData?.map((item, index) => {
                                        return (
                                            <div className="mt-3 mb-5" key={index}>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {item.advance?.invoice_id}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {item.customer}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {item.advance?.invoice_date} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{item.email_id} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{item.mobile} </p>

                                            </div>
                                        )
                                    })}

                                </div>
                                <section className="line-items  ">
                                    <table className="items--table w-100 mt-5 p-2 table-bordered">
                                        <thead className="p-1">
                                            <tr className="p-1">
                                                <th className="p-1 text-center" style={{ fontSize: "11px" }}>S.NO</th>
                                                <th className='text-center' style={{ fontSize: "11px" }}>Qty</th>
                                                <th className='text-center' style={{ fontSize: "11px" }}>Description</th>
                                                <th className='text-center' style={{ fontSize: "11px" }}>Advance Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoiceData?.map((item, index) => (

                                                <tr className="p-1" key={index}>
                                                    <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>Advance payment</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.advance?.amount} </td>
                                                </tr>

                                            ))}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}>Sub Total</td>
                                                <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>{calculateTotals().subtotal} </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}> GST(0%)</td>
                                                <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>0.00 </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "11px" }}>Total</td>
                                                <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "11px" }}>{calculateTotals().total} </td>
                                            </tr>

                                        </tfoot>
                                    </table>
                                    <div className="mt-5 mb-5 w-50">
                                        <p className="p-0 m-0 fw-bold">Terms & Conditions</p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
                                    </div>
                                    {data[0]?.advance?.status === "pending" ? (
                                        <div className="row">
                                            <div className="mt-3 mt-md-0">
                                                <section className="car d p-4 cardheight">
                                                  
                                                    <div className="text-center">
                                                        <button
                                                            className="btn  mt-3 text-white"
                                                            style={{
                                                                backgroundColor: "#2f4f4f",
                                                                minWidth: "200px",
                                                            }}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/notification_details/${encryptData(
                                                                        data[0]?.advance?.id
                                                                    )}`
                                                                );
                                                            }}
                                                        >
                                                            Pay {data[0]?.advance?.amount}
                                                        </button>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-5">
                                            <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
                                        </div>
                                    )

                                    }


                                </section>

                            </article> */}
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
            {invoiceData?.map((item) => (
              <section
                key={item.invoice_id}
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
                    {item.customer}
                  </p>
                  <p
                    style={{ margin: "4px 0", fontSize: "11px" }}
                    className="roboto_left"
                  >
                    {item.mobile}
                  </p>
                  <p
                    style={{ margin: "4px 0", fontSize: "11px" }}
                    className="roboto_left"
                  >
                    {item.email_id}
                  </p>
                  {/* <p
                    style={{ margin: "4px 0", fontSize: "11px" }}
                    className="roboto_left"
                  >
                    123 Anywhere St, chennai-600001
                  </p> */}
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b>Invoice no :</b> {item.advance?.invoice_id}
                  </p>
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b>Date:</b> {DateFormateCustom(item.advance?.invoice_date)}
                  </p>
                  {/* <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b>Payment Mode:</b> Online
                  </p> */}
                  <p style={{ margin: "2px 0", fontSize: "11px" }}>
                    <b>PropertyName:</b> {item?.subpro_name}
                  </p>
                </div>
              </section>
            ))}

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
                        Advance Payment{" "}
                      </td>
                      <td className="text-center" style={{ fontSize: "10px" }}>
                        ₹ {item.advance?.amount}{" "}
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
              <div style={{ width: "150px", marginBottom: "160px" }}>
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
              </div>
            </div>
            <div>
              {/* <div
                className="d-flex justify-content-between"
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
              </div> */}
            </div>
            <section
              style={{ textAlign: "center", marginBottom: "300px" }}
              className="mt-5 mb-5"
            >
              {data[0]?.advance?.status === "pending" ? (
                <div className="row">
                  <div className="mt-3 mt-md-0">
                    <section className="car d p-4 cardheight">
                      <div className="text-center">
                        <button
                          className="btn  mt-3 text-white"
                          style={{
                            backgroundColor: "#0000ff",
                            minWidth: "150px",
                            fontFamily:"poppins",
                            borderRadius:"0px",
                            fontWeight:"600"
                          }}
                          // onClick={() => {
                          //   navigate(
                          //     `/notification_details/${encryptData(
                          //       data[0]?.advance?.id
                          //     )}`
                          //   );
                          // }}
                          onClick={handlePayment}
                        >
                          Pay {data[0]?.advance?.amount}
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
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
                <span style={{ fontSize: "13px" }}>123-456-7890</span>
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

export default AdvancePayment;
