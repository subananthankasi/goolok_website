import React from "react";
import { Accordion } from "react-bootstrap";



const PriceDetails = ({ pricingData }) => {
  const parsePricingData = pricingData ? JSON.parse(pricingData) : null;
  const totalPrice = parsePricingData
    ? parsePricingData[0].reduce((acc, item) => acc + item.price, 0)
    : 0;

  return (
    <div className=" mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span style={{ flex: 1 }}>Price Details</span>
            <span className="me-2"> ₹ {totalPrice}</span>
          </Accordion.Header>

          {/* <Accordion.Body className="p-0" >
            {parsePricingData &&
              parsePricingData[0].map((item, index) => (
                <div className="price-box" key={index}>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <p className="fw-bold mb-0">{item.charges}:</p>
                    </div>
                    <div>
                      <p className="mb-0">{item.unit ? item.unit : ""}</p>
                    </div>
                    <div className="fw-bold">
                      <p className="mb-0"> ₹ {item.price}/-</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between ">
                <div>
                  <p className="fw-bold mb-0" style={{ fontSize: "16px" }}>
                    <span className="total-price">Total Price:</span>
                  </p>
                </div>
                <div className="fw-bold" style={{ fontSize: "16px" }}>
                  <p className="mb-0">₹ {totalPrice}/-</p>
                </div>
              </div>
            </div>
          </Accordion.Body> */}
          <Accordion.Body className="p-0">
            <div className="premium-pricing-wrapper-blue" style={{ fontFamily: "poppins" }}>
              {parsePricingData &&
                parsePricingData[0].map((item, index) => (
                  <div className="premium-row-blue" key={index}>
                    <div className="row-title">{item.charges}</div>
                    <div className="row-unit">{item.unit || ""}</div>
                    <div className="row-price">₹ {item.price}/-</div>
                  </div>
                ))}

              <div className="premium-total-blue">
                <span>Total Price</span>
                <strong>₹ {totalPrice}/-</strong>
              </div>
            </div>
          </Accordion.Body>


        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PriceDetails;
