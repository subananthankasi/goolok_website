import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { IMG_PATH } from "../../Api/api";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";

function Propertyagent({ property, giftData, loading }) {
  const data = Array.isArray(property) && property.length > 0 ? property : [];
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const broucherDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const layoutsDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const floorDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const buildingDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };

  return (
    <>
      <div className="widget-boxed-header mt-2">
        {loading ? (<Skeleton height="1.5rem" width="45%" className="mb-3 " />) : (
          <h6 class="mb-4 agent-name">Resources</h6>
        )}
      </div>
      <div className="widget-boxed-body text-center" style={{ fontFamily: "poppins" }}>
        <div className="sidebar-widget author-widget2">
          <div className="agent-contact-form-sidebar">
            {loading ? (
              <>
                <Skeleton height="2.5rem" width="100%" className="mb-1 " />
                <Skeleton height="2.5rem" width="100%" className="mb-1 " />
                <Skeleton height="2.5rem" width="100%" className="mb-1 " />
                <Skeleton height="2.5rem" width="100%" className="mb-1 " />
              </>
            ) : (
              <form name="contact_form" >
                <div className="i">
                  {data?.map((item) => {
                    const document = item.documents;
                    return (
                      <>
                        {document?.brochures && (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="message-btn "
                            onClick={() =>
                              broucherDownload(
                                `${IMG_PATH}/enquiry/attach/${document?.brochures}`
                              )
                            }

                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ marginRight: "10px" }}
                            />
                            Download Brochure
                          </button>
                        )}

                        {document?.layouts && (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="message-btn "
                            onClick={() =>
                              layoutsDownload(
                                `${IMG_PATH}/enquiry/attach/${document?.layouts}`
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ marginRight: "10px" }}
                            />
                            Views Layout
                          </button>
                        )}

                        {document?.floor && (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="message-btn "
                            onClick={() =>
                              floorDownload(
                                `${IMG_PATH}/enquiry/attach/${document?.floor}`
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ marginRight: "10px" }}
                            />
                            View Floor Plan
                          </button>
                        )}

                        {document?.building && (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="message-btn "
                            onClick={() =>
                              buildingDownload(
                                `${IMG_PATH}/enquiry/attach/${document?.building}`
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ marginRight: "10px" }}
                            />
                            View Floor Plan
                          </button>
                        )}
                        {document?.mapping && (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="message-btn "
                            onClick={() =>
                              buildingDownload(
                                `${IMG_PATH}/enquiry/attach/${document?.mapping}`
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ marginRight: "10px" }}
                            />
                            View Location
                          </button>
                        )}
                      </>
                    );
                  })}

                </div>
              </form>
            )}

          </div>
        </div>
      </div>
      {giftData.length !== 0 && (
        <div className="container my-4 mt-5">
          <h3
            className="text-center mb-2"
            style={{ fontWeight: "bold", color: "rgb(47, 79, 79)" }}
          >
             Our Exclusive Gifts
          </h3>

          <div className="row p-0">
            {giftData?.map((item, index) => (
              <div className=" mb-2" key={index}>
                <div className="h-100  border-0 rounded-3 gift-car">
                  <img
                    src={`${IMG_PATH}/gifts/${item.image}`}
                    className="card-img-top"
                    alt={item.discription}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                  <div className="card-body text-center">
                    <p className="card-text fw-semibold">{item.discription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog
        header={
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4> PDF Preview </h4>
          </div>
        }
        visible={pdfVisible}
        onHide={() => setPdfVisible(false)}
        style={{ width: "70rem", height: "70rem" }}
        breakpoints={{ "1440px": "80vw", "960px": "75vw", "641px": "100vw" }}
      >
        {pdfUrl ? (
          pdfUrl.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              style={{ border: "none", height: "550px", width: "100%" }}
            />
          ) : pdfUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
            <img
              src={pdfUrl}
              alt="Preview"
              style={{
                maxHeight: "550px",
                width: "100%",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
            />
          ) : (
            <p style={{ textAlign: "center" }}>Unsupported file format</p>
          )
        ) : (
          <p style={{ textAlign: "center" }}>No file to display.</p>
        )}
      </Dialog>
    </>
  );
}

export default Propertyagent;
  