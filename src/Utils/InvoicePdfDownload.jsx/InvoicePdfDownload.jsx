import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';


export const InvoicePdfDownload = () => {
  return (
    <div>
      <div className='container' style={{ maxWidth: "950px" }}>
        <h1 className="text-center mb-3">INVOICE</h1>
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
              {/* <img src= {paid}  style={{width:"150px",height:"150px"}}/> */}
            </div>



          </div>
        </div>

      </div>
    </div>
  );
};


export const InvoicePdfDownloadButton = () => {
  const downloadPdf = () => {

    const container = document.createElement('div');
    document.body.appendChild(container);


    const root = createRoot(container);
    root.render(<InvoicePdfDownload />);

    const doc = new jsPDF();
    doc.html(container, {
      callback: (pdf) => {
        pdf.save('invoice.pdf');
        document.body.removeChild(container);
      },
      html2canvas: {
        scale: 0.2,
        x: 275,
        y: -50
      }
    });
  };

  return (

    <button
      className="btn btn_pdf btn-outline-danger ps-3 pe-3 p-1 mt-1"
      style={{ fontWeight: "600" }}
      onClick={downloadPdf}
    >
      PDF
    </button>
  );
};