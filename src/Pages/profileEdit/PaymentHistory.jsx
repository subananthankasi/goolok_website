import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/images/Goolok Final Logo copy.png";
import { decryptData } from "../../Utils/encryptData";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef();
  const [selectedItem, setSelectedItem] = useState([]);
  const historyFetch = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/payment`);
      setHistory(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    historyFetch();
  }, []);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedHistory = history.slice(first, first + rows);
  const thStyle = {
    border: "1px solid #ccc",
    padding: "5px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "10px",
  };

  // const generatePdf = (item) => {
  //   setSelectedItem(item);

  //   setTimeout(() => {
  //     const input = contentRef.current;
  //     if (!input) return;

  //     html2canvas(input, { scale: 2 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const imgWidth = 210;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       pdf.save(`${item.invoiceid || "invoice"}.pdf`);
  //     });
  //   }, 100);
  // };

  const generatePdf = () => {
    const input = contentRef.current;
    input.style.display = "block";

    setTimeout(() => {
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");

          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("invoice.pdf");

          input.style.display = "none";
        })
        .catch((err) => console.error("HTML2Canvas error →", err));
    }, 200);
  };

  // useEffect(() => {
  //   if (selectedItem) {
  //     const input = contentRef.current;
  //     input.style.display = "none";
  //   }
  // }, [selectedItem]);




  const calculateTotals = () => {
    const items = Array.isArray(selectedItem)
      ? selectedItem
      : selectedItem
        ? [selectedItem]
        : [];

    if (!items?.length) {
      return { subtotal: 0, gst: 0, total: 0 };
    }

    const subtotal = items.reduce((acc, item) => {
      const amt = Number(item?.amount);
      const safeAmt = Number.isFinite(amt) ? amt / 100 : 0;

      return acc + safeAmt;
    }, 0);

    const gst = subtotal * 0;
    const total = subtotal + gst;

    return {
      subtotal,
      gst,
      total,
    };
  };


  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);


  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const [day, month, year] = dateStr.split("-");

    if (!day || !month || !year) return dateStr;

    return `${day}/${month}/${year}`;
  };


  // const stored = localStorage.getItem("address");
  // const decrypted = decryptData(stored);
  // const parsedData = JSON.parse(decrypted);


  const stored = localStorage.getItem("address");

  let parsedData = [];

  if (stored) {
    try {
      const decrypted = decryptData(stored);
      parsedData = JSON.parse(decrypted);
    } catch (error) {
      console.error("Decryption or JSON parsing failed:", error);
    }
  }

  const breakAfterTwoCommas = (text) => {
    if (!text) return "";

    return text
      .split(",")
      .map(item => item.trim())
      .reduce((acc, curr, i) => {
        return i % 2 === 1 ? acc + curr + ",\n" : acc + curr + ", ";
      }, "")
      .trim();
  };

  const formattedAddress = breakAfterTwoCommas(parsedData[0]?.address);

  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar /> */}

      <div style={{ paddingTop: 50 }}>
        <div>
          <h5 className="text-center" style={{ color: "#36454f" }}>
            Payment History
          </h5>
          <hr className="hr-gradient" />
        </div>

        <div className="container mt-4">
          <div className="table-responsive">
            <table className="table premium-table align-middle">
              <thead className="text-center">
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Invoice ID</th>
                  <th>Service Name</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {loading ? (
                  Array.from({
                    length:
                      history?.length === 0
                        ? 10
                        : Math.min(rows, history?.length || rows),
                  }).map((_, i) => (
                    <tr key={i}>
                      {[...Array(7)].map((_, j) => (
                        <td key={j}>
                          <Skeleton height="1rem" className="mb-1" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : history?.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="d-flex flex-column align-items-center text-muted">
                        <i
                          className="bi bi-inbox"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <p className="mt-2 mb-0">No records found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{first + index + 1}</td>
                      <td style={{ minWidth: "100px" }}>
                        {item.created_at}
                        <br />
                        <small className="text-muted">{item.time}</small>
                      </td>
                      <td
                        style={{
                          maxWidth: "200px",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.invoiceid}
                      </td>
                      <td className="text-lightgray">{item.type}</td>
                      <td className="text-lightgray">
                        {(item.amount / 100).toFixed(2)}
                      </td>
                      <td
                        style={{
                          color:
                            item.method?.toLowerCase() === "upi"
                              ? "#ff7b00"
                              : "#4caf50",
                          fontWeight: 500,
                        }}
                      >
                        {item.method}
                      </td>
                      <td>
                        <button
                          className=" download-btn"
                          onClick={() => { setSelectedItem(item); generatePdf(item) }}
                        >
                          <FileDownloadIcon sx={{ fontSize: 20 }} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center mt-4">
            {!loading && history?.length > 10 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={history?.length}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}

      {selectedItem && (
        <article
          className="p-4"
          ref={contentRef}
          style={{
            background: "#fff",
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            padding: "15mm",
            boxSizing: "border-box",
            position: "relative",
            display: "none",
            flexDirection: "column",
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

          <section
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
                {selectedItem.customer}
              </p>
              <p
                style={{ margin: "4px 0", fontSize: "11px" }}
                className="roboto_left"
              >
                {selectedItem.mobile}
              </p>
              <p
                style={{ margin: "4px 0", fontSize: "11px" }}
                className="roboto_left"
              >
                {selectedItem.vendor_email}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>

              <p style={{ margin: "2px 0", fontSize: "11px" }}>
                <b>Invoice no :</b> {selectedItem?.invoiceid}
              </p>
              <p style={{ margin: "2px 0", fontSize: "11px" }}>
                <b>Date:</b> {formatDate(selectedItem?.created_at)}
              </p>
              <p style={{
                margin: " 0",
                fontWeight: "700",
                fontSize: "15px",
              }}>
                <b>Goolok</b>
              </p>
              <p style={{
                margin: "2px 0",
                fontSize: "11px",
                whiteSpace: "pre-line"
              }}>
                {formattedAddress}
              </p>


            </div>
          </section>

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
              {/* {selectedItem?.map((item, index) => ( */}
              <React.Fragment>
                <tr
                  style={
                    {
                      // background: index % 2 === 0 ? "#e7e6e6ff" : "white",
                    }
                  }
                >
                  <td className="p-2 text-center" style={{ fontSize: "10px" }}>
                    {" "}
                    1
                  </td>
                  <td className="text-center" style={{ fontSize: "10px" }}>
                    1
                  </td>
                  <td className="text-center" style={{ fontSize: "10px" }}>
                    {selectedItem?.type}
                  </td>
                  <td className="text-center" style={{ fontSize: "10px" }}>
                    {/* ₹ {selectedItem?.amount}{" "} */}
                    ₹ {(selectedItem.amount / 100).toFixed(2)}
                  </td>
                </tr>
              </React.Fragment>
              {/* ))} */}
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
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: "180px" }}
            >
              <div>
                <h6 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  PAYMENT DETAILS :
                </h6>
                <p style={{ margin: "2px 0" }}>
                  <b> Payment Method :</b> {selectedItem?.method}
                </p>
                <p style={{ margin: "2px 0" }}>
                  <b> Payment ID :</b> {selectedItem?.payment_id}
                </p>
              </div>

            </div>
          </div>

          <section
            style={{ textAlign: "center", marginBottom: "300px", marginTop: "auto" }}
            className="mt-5 mb-5"
          >
            <div className="mt-5" style={{ marginTop: "auto" }}>
              <h5 className="text-center mt-5">
                Thank you for business with us!
              </h5>
            </div>
          </section>
          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                margin: "20px 0",
                border: "1px solid #000000ff",
              }}
            />
            <div
              className="d-flex justify-content-between"
              style={{
                borderTop: "none",
                paddingTop: "4px",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <i
                  class="fa-solid fa-phone-volume"
                  style={{ fontSize: "13px" }}
                ></i>{" "}
                <span style={{ fontSize: "13px" }}> {parsedData[0]?.mobile}</span>
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
                  {parsedData[0]?.email}
                </a>
              </div>
            </div>
          </div>
        </article>

      )}
    </>
  );
};

export default PaymentHistory;
