import axios from "axios";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/images/Goolok Final Logo copy.png";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { LOGIN_BASE_URL } from "../../Api/api";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";

const AutoInvoiceDownload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef();

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
        `${LOGIN_BASE_URL}/customer/onlinepayments/${id}`
      );
      setInvoiceData(response.data);
    } catch (err) {
      console.error(err);
      navigate("/", { replace: true });
    }
  };

  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce(
      (acc, item) => acc + (item.amount || 0),
      0
    );
    return { subtotal, total: subtotal };
  };

  const generatePdf = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      const basePath = window.location.pathname.includes("/goolokweb")
        ? "/"
        : "/";
      navigate(basePath, { replace: true });
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  useEffect(() => {
    if (invoiceData.length > 0) {
       generatePdf();
    }
  }, [invoiceData]);

  const thStyle = {
    border: "1px solid #ccc",
    padding: "5px",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "10px",
  };

  return (
    <>
      {loading && (
        <> 
          <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
         <Skeleton height={120} width="100%" style={{ marginTop: 10 }} />
          </>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm",
          opacity: 0,
          pointerEvents: "none",
          backgroundColor: "#fff",
        }}
      >
        <article
          className="invoice-a4 p-4"
          ref={contentRef}
          style={{
            background: "#fff",
            margin: "0 auto",
            boxShadow: "0 0 10px rgba(0,0,0,0.15)",
            width: "210mm",
            minHeight: "297mm",
            padding: "20mm",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
          }}
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
                <h6 style={{ fontWeight: "500", fontSize: "12px" }}>
                  Invoice to :
                </h6>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {item.customer}
                </p>
                <p style={{ margin: "4px 0", fontSize: "12px" }}>
                  {item.mobile}
                </p>
                <p style={{ margin: "4px 0", fontSize: "12px" }}>
                  {item.email_id}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "2px 0", fontSize: "12px" }}>
                  <b>Invoice no :</b> {item.invoice_id}
                </p>
                <p style={{ margin: "2px 0", fontSize: "12px" }}>
                  <b>Date:</b> {DateFormateCustom(item.invoice_date)}
                </p>
                <p style={{ margin: "2px 0", fontSize: "12px" }}>
                  <b>Property Name:</b> {item?.subpro_name}
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
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#e7e6e6ff" : "white",
                  }}
                >
                  <td className="p-2 text-center" style={{ fontSize: "12px" }}>
                    1
                  </td>
                  <td className="text-center" style={{ fontSize: "12px" }}>
                    1
                  </td>
                  <td className="text-center" style={{ fontSize: "12px" }}>
                    Advance Payment
                  </td>
                  <td className="text-center" style={{ fontSize: "12px" }}>
                    ₹ {item.amount}
                  </td>
                </tr>
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
                  fontSize: "12px",
                }}
                className="mt-2"
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
                  fontSize: "12px",
                }}
                className="p-1"
              >
                <span>TOTAL AMOUNT:</span>
                <span>₹{calculateTotals().total}</span>
              </div>
            </div>
          </div>

          <section
            style={{ textAlign: "center", marginBottom: "300px" }}
            className="mt-5 mb-5"
          >
            {invoiceData[0]?.status === "pending" ? (
              <div className="row">
                <div className="mt-3 mt-md-0">
                  <section className=" p-4">
                    <div className="text-center">
                      <button
                        className="btn mt-3 text-white"
                        style={{
                          backgroundColor: "#2f4f4f",
                          minWidth: "200px",
                        }}
                      >
                        Pay {invoiceData[0]?.amount}
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

          <div
            style={{
              margin: "20px 0",
              border: "1px solid #000000ff",
              marginTop: "350px",
            }}
          />
          <div
            className="d-flex justify-content-between"
            style={{ bottom: "0", fontSize: "16px" }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-phone-volume"></i>{" "}
              <span>123-456-7890</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="fa-regular fa-envelope"></i>
              <a
                href="mailto:goolok@gmail.com?subject=Invoice%20Request&body=Hello%20Team,"
                style={{ color: "black", fontSize: "16px" }}
              >
                goolok@gmail.com
              </a>
            </div>
          </div>
          <div
            style={{
              height: "600px",
              backgroundColor: "#fff",
              display: "none",
            }}
          />
        </article>
      </div>
    </>
  );
};

export default AutoInvoiceDownload;
