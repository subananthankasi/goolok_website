import React, { useRef } from 'react';
import jsPDF from 'jspdf';


const PdfDownloadPage = () => {
  const contentRef = useRef();

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.html(contentRef.current, {
      callback: (pdf) => {
        pdf.save('invoice.pdf');
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 0.2 },
    });
  };

  return (
    <div >
      <div ref={contentRef} className='container' style={{ maxWidth: "950px" }}>
        <h1 className="header--i nvoice m-auto mb-3">INVOICE</h1>
        <header className="headerinvoice">
          <h1 className="header--invoice">
            <div className="invoice--number">
              INVOICE NO :
              <span>
                {/* <b>{invoiceData.invoice_id}</b> */}
                <b>inv001</b>
              </span>
            </div>
            <div className="invoice--date">
              10/12/2024
              {/* {DateFormateCustom(invoiceData.invoice_date)} */}
            </div>
          </h1>
          <nav className="header--logo">
            <div className="header--logo-text">Goolok Pvt ltd</div>
            <div className="logo--address">
              2nd Floor, 129, <br />
              <strong>Nungambakkam, Chennai, </strong>
              <br />
              <strong>Tamil Nadu 600034</strong>
            </div>
          </nav>
        </header>

        <section className="line-items mt-5 mb-5">
          <table className="items--table">
            <thead>
              <tr>
                <td>S.NO</td>
                <td>Charges</td>
                <td>Qty</td>
                <td>Fee</td>
                <td>Total</td>
              </tr>
            </thead>
            {/* <tbody>
              {invoiceData.quentity?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.remark}</td>
                  <td>1</td>
                  <td>{data.amount}</td>
                  <td>{data.amount}</td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid #ece0e0" }}>
                <td colSpan={3}></td>
                <td className="total-price">Subtotal</td>
                <td className="total-price">{invoiceData.amount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td style={{ borderBottom: "1px solid #ece0e0", fontSize: "11px" }}>
                  GST(0%)
                </td>
                <td style={{ borderBottom: "1px solid #ece0e0", fontSize: "11px" }}>
                  00.00
                </td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="total-price">Total</td>
                <td className="total-price">{invoiceData.amount}</td>
              </tr>
            </tbody> */}
          </table>
        </section>

        <div className="row align-items-center">
          <div className="col-7">
            <h5>Payment Instructions</h5>
            <p>
              Ensure to reference Invoice Number
              {/* <b>{invoiceData.invoice_id}</b>  */}
              in your payment.
              Thank you for your prompt attention to this matter.
            </p>
          </div>
          <div className="col-5 text-end">

            <div className="text-end">
              <img
                // src= {paid}  
                style={{ width: "150px", height: "150px" }} alt='paid'/>
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadPdf} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Download as PDF
      </button>
    </div>
  );
};

export default PdfDownloadPage;
