import React from "react";
import { Accordion } from "react-bootstrap";

const Serviceprice = () => {
  return (
    <div className=" mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span style={{ flex: 1 }}>Price Details</span>
            <span className="me-2">[₹ 2,000]</span>
          </Accordion.Header>

          <Accordion.Body className="p-0">
            {/* Total Land Cost */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Total Land Cost:</p>
                  <p className="text-muted mb-0" style={{ fontSize: "10px" }}>
                    Exclusive of Documentation & Registration
                  </p>
                </div>
                <div>
                  <p className="mb-0">2400 Sq ft X ₹ 1000</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹24,000,000/-</p>
                </div>
              </div>
            </div>

            {/* Registration Charges */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Registration Charges:</p>
                </div>
                <div>
                  <p className="mb-0">300 x 2400 x 2%</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹14,100/-</p>
                </div>
              </div>
            </div>

            {/* Stamp Duty */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Stamp Duty:</p>
                  <p className="text-muted mb-0" style={{ fontSize: "10px" }}>
                    (SECTION 41)
                  </p>
                </div>
                <div>
                  <p className="mb-0">300 X 2400 X 7%</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹50,400/-</p>
                </div>
              </div>
            </div>

            {/* Documentation Charges */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Documentation Charges:</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹20,000/-</p>
                </div>
              </div>
            </div>

            {/* Miscellaneous Charges */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Miscellaneous Charges:</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹3,500/-</p>
                </div>
              </div>
            </div>

            {/* Amenities Charges */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Amenities Charges:</p>
                </div>
                <div className="fw-bold">
                  <p className="mb-0">= ₹20,000/-</p>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between ">
                <div>
                  <p className="fw-bold mb-0" style={{ fontSize: "16px" }}>
                    <span className="total-price">Total Price:</span>
                  </p>
                </div>
                <div className="fw-bold" style={{ fontSize: "16px" }}>
                  <p className="mb-0">= ₹2,000/-</p>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Serviceprice;
