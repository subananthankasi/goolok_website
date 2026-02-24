import jsPDF from "jspdf";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { AiFillClockCircle } from "react-icons/ai";
import DownloadIcon from "@mui/icons-material/Download";
import logo from "../../../assets/images/Goolok Final Logo copy.png";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import ServiceLegalPaymentGateway from "../ServiceLegalPaymentGateway";
import ServicePaymentGateway from "../ServicePaymentGateway";
import ServicePaymentPropertyValuation from "../ServicePaymentPropertyValuation";

const ServicePayments = ({ invoiceData, fetchInvoice, eid }) => {
    const contentRef = useRef(null);

    const calculateTotals = () => {
        const subtotal = invoiceData?.reduce((acc, item) => {
            const chargesTotal = Number(item.amount) || 0;
            return acc + chargesTotal;
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

    const thStyle = {
        border: "1px solid #ccc",
        padding: "5px",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "10px",
    };
    return (
        <div>
            {invoiceData[0]?.amount === null ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <h6
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            color: "#004aad",
                            fontSize: "18px",
                            marginBottom: "6px",
                        }}
                    >
                        <AiFillClockCircle style={{ color: "darkblue" }} /> Hold on — we’re waiting for your payment.
                    </h6>
                    <p
                        style={{
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            color: "#7d7d7d",
                            margin: 0,
                        }}
                    >
                        Once completed, your service will continue automatically.
                    </p>
                </div>

            ) : (
                <>
                    <div className=" d-flex justify-content-end">
                        <button className="btn " onClick={generatePdf}>
                            <DownloadIcon sx={{ color: "blue" }} />{" "}
                        </button>
                    </div>

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
                                    {invoiceData[0]?.customer}
                                </p>
                                <p
                                    style={{ margin: "4px 0", fontSize: "11px" }}
                                    className="roboto_left"
                                >
                                    {invoiceData[0]?.mobile}
                                </p>
                                <p
                                    style={{ margin: "4px 0", fontSize: "11px" }}
                                    className="roboto_left"
                                >
                                    {invoiceData[0]?.email_id}
                                </p>
                                <p
                                    style={{ margin: "4px 0", fontSize: "11px" }}
                                    className="roboto_left"
                                >
                                    123 Anywhere St, chennai-600001
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                                    <b>Invoice no :</b> {invoiceData[0]?.invoiceid}
                                </p>
                                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                                    <b>Date:</b> {DateFormateCustom(invoiceData[0]?.invoice_date)}
                                </p>
                                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                                    <b>Payment Mode:</b> Online
                                </p>
                                <p style={{ margin: "2px 0", fontSize: "11px" }}>
                                    <b>PropertyName:</b> Chennai
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
                                                {item.service_cat}
                                            </td>
                                            <td className="text-center" style={{ fontSize: "10px" }}>
                                                ₹ {item.amount}{" "}
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
                            <div style={{ width: "150px" }}>
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
                                        fontSize: "11px",
                                    }}
                                    className="roboto_left"
                                >
                                    <span>GST 0% :</span>
                                    <span></span>
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
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "5px",
                                        fontSize: "11px",
                                    }}
                                    className="roboto_left"
                                >
                                    <span>Received Amount:</span>
                                    <span>₹{calculateTotals().subtotal}</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "50px",
                                        fontSize: "11px",
                                    }}
                                    className="roboto_left"
                                >
                                    <span>Balance Amount:</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className="d-flex justify-content-between"
                            // style={{ marginBottom: "140px" }}
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
                            </div>
                        </div>
                        <section style={{ textAlign: "center" }} className="mt-5 mb-5">
                            {invoiceData[0]?.invoice_status === "pending" ? (
                                invoiceData[0]?.service_cat?.toLowerCase() === "legal opinion" ? (
                                    <ServiceLegalPaymentGateway
                                        invoiceData={invoiceData[0]}
                                        fetchInvoice={fetchInvoice}
                                        eid={eid}
                                    />
                                ) : invoiceData[0]?.service_cat?.toLowerCase() === "property valuation" ? (
                                    <ServicePaymentPropertyValuation
                                        invoiceData={invoiceData[0]}
                                        fetchInvoice={fetchInvoice}
                                        eid={eid}
                                    />
                                ) : invoiceData[0]?.service_cat?.toLowerCase() === "missing documents" ? (
                                    <ServicePaymentPropertyValuation
                                        invoiceData={invoiceData[0]}
                                        fetchInvoice={fetchInvoice}
                                        eid={eid}
                                    />
                                ) : (
                                    <ServicePaymentGateway
                                        invoiceData={invoiceData[0]}
                                        fetchInvoice={fetchInvoice}
                                        eid={eid}
                                    />
                                )
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
                                <span style={{ fontSize: "11px" }}>123-456-7890</span>
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
export default ServicePayments