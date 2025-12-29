import React, { useState } from "react";

function MapListingResultsSummary() {
  const [showModal, setShowModal] = useState(false);

  const handleSaveSearch = () => {
    if (window.IRESendEvent) {
      window.IRESendEvent("kvc_save_search.map");
    }
    setShowModal(true); 
  };
  // document.getElementById("content-title").classList.remove("container");
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
    id="content-title"
      className="content-title map-listing-results-summary"
      style={{
        backgroundColor: "#919191",
        marginBottom: "15px",
      }}
    >
      <div className="container">
       <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
       
      }}>
       <div className="mt-3">
        <p className="text-white ms-2" style={{ visibility: "visible" }}>
          <strong className="results-count">4159</strong> <span>results</span>{" "}
          <span>in</span>{" "}
          <strong style={{ overflowWrap: "anywhere" }}>Bay</strong>
        </p>
      </div>
      <div>
        <button
          className="saveSearchButton btn btn-white me-2"
          type="button"
          style={{
            minWidth: "137px",
            backgroundColor: "white",
            borderRadius: "0px",
          }}
          onClick={handleSaveSearch}
        >
          Save Search
        </button>
      </div>
       </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-center">Save this Search</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                  style={{border:"none"}}
                >
                  <span aria-hidden="true" style={{ fontSize: "25px" }}>
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form id="searchAlertModalForm">
                  <div className="form-group mb-2">
                    <label htmlFor="search-alert-name">Search Name</label>
                    <input
                      type="text"
                      name="searchname"
                      id="search-alert-name"
                      className="form-control"
                      placeholder="My Saved Search"
                    />
                  </div>
                  <div
                    className="form-group email-frequency-group"
                    style={{ marginBottom: "32px" }}
                  >
                    <label className="mb-2">Email Frequency</label>
                    <div className="email-frequency-container">
                      <div className="form-check">
                        <input
                          id="instant"
                          type="radio"
                          name="emailfrequency"
                          value="4"
                          className="form-check-input"
                        />
                        <label htmlFor="instant" className="form-check-label">
                          Instant
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="daily"
                          type="radio"
                          name="emailfrequency"
                          value="0"
                          className="form-check-input"
                        />
                        <label htmlFor="daily" className="form-check-label">
                          Daily
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="weekly"
                          type="radio"
                          name="emailfrequency"
                          value="2"
                          className="form-check-input"
                        />
                        <label htmlFor="weekly" className="form-check-label">
                          Once Weekly
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="twiceweekly"
                          type="radio"
                          name="emailfrequency"
                          value="1"
                          className="form-check-input"
                          defaultChecked
                        />
                        <label
                          htmlFor="twiceweekly"
                          className="form-check-label"
                        >
                          Twice Weekly
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="monthly"
                          type="radio"
                          name="emailfrequency"
                          value="5"
                          className="form-check-input"
                        />
                        <label htmlFor="monthly" className="form-check-label">
                          Once A Month
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="bimonthly"
                          type="radio"
                          name="emailfrequency"
                          value="6"
                          className="form-check-input"
                        />
                        <label htmlFor="bimonthly" className="form-check-label">
                          Twice A Month
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="never"
                          type="radio"
                          name="emailfrequency"
                          value="3"
                          className="form-check-input"
                        />
                        <label htmlFor="never" className="form-check-label">
                          Never
                        </label>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="alertnumber"
                      id="alertnumber"
                      value="3"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      id="modal-save-search-btn"
                      className="message-btn1 w-100"
                      type="button"
                    >
                      Save Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default MapListingResultsSummary;
