import React from "react";
import { Accordion } from "react-bootstrap";

const PriceDetails = ({ pricingData, plotPricing }) => {
  const parsePricingData = pricingData ? JSON.parse(pricingData) : null;
  const totalPrice = parsePricingData
    ? parsePricingData[0].reduce((acc, item) => acc + item.price, 0)
    : 0;
  const data = plotPricing?.plot_pricing;

  const totalPriceValue =
    plotPricing?.property_type?.toLowerCase() === "layout" &&
      plotPricing?.plot_type?.toLowerCase() === "with"
      ? plotPricing?.plot_pricing?.total_with_registration
      : plotPricing?.property_type?.toLowerCase() === "layout" &&
        plotPricing?.plot_type?.toLowerCase() !== "with"
        ? plotPricing?.plot_pricing?.total_without_registration
        : totalPrice;


  return (
    <div className=" mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span style={{ flex: 1 }}>Price Details</span>
            <span className="me-2"> ₹ {totalPriceValue}</span>
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <div
              className="premium-pricing-wrapper-blue"
              style={{ fontFamily: "poppins" }}
            >
              {plotPricing?.property_type?.toLowerCase() !== "layout" &&
                parsePricingData &&
                parsePricingData[0].map((item, index) => (
                  <div className="premium-row-blue" key={index}>
                    <div className="row-title">{item.charges}</div>
                    <div className="row-unit">{item.unit || ""}</div>
                    <div className="row-price">₹ {item.price}/-</div>
                  </div>
                ))}
              {plotPricing?.property_type?.toLowerCase() === "layout" && (
                <>
                  <div className="premium-row-blue">
                    <div className="row-title">Basic Cost</div>
                    <div className="row-price">₹ {data?.basic_cost ?? 0}/-</div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">Development Charges</div>
                    <div className="row-price">
                      ₹ {data?.development_charges ?? 0}/-
                    </div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">Infrastructure Charges</div>
                    <div className="row-price">
                      ₹ {data?.infrastructure_cost ?? 0}/-
                    </div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">Corpus Amount</div>
                    <div className="row-price">
                      ₹ {data?.corpus_amount ?? 0}/-
                    </div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">Maintenance Amount</div>
                    <div className="row-price">
                      ₹ {data?.maintenance_amount ?? 0}/-
                    </div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">Miscellaneous Charges</div>
                    <div className="row-price">
                      ₹ {data?.misc_charges ?? 0}/-
                    </div>
                  </div>

                  <div className="premium-row-blue">
                    <div className="row-title">GST</div>
                    <div className="row-price">₹ {data?.gst_amount ?? 0}/-</div>
                  </div>
                  {
                    plotPricing?.plot_type?.toLowerCase() === "with" && (
                      <>
                        <div className="premium-row-blue">
                          <div className="row-title">Registration Charges</div>
                          <div className="row-price">
                            ₹ {data?.registration_charges ?? 0}/-
                          </div>
                        </div>

                        <div className="premium-row-blue">
                          <div className="row-title">Documentation Charges</div>
                          <div className="row-price">
                            ₹ {data?.documentation_charges ?? 0}/-
                          </div>
                        </div>
                      </>
                    )
                  }

                </>
              )}

              <div className="premium-total-blue">
                <span>Total Price</span>
                <strong>₹ {totalPriceValue}/-</strong>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PriceDetails;
