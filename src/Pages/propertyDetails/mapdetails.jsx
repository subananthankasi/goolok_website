import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Mapdetails =({data,loading})=> { 
    const [activeAccordion, setActiveAccordion] = useState("collapseOne"); 
    const handleAccordionClick = (accordionId) => {
      setActiveAccordion(activeAccordion === accordionId ? null : accordionId);
    };  
  return (
    <div>
      <Tabs
        defaultActiveKey="home"
        id="fill-tab-example"
        className=" "
        fill
      >
        <Tab eventKey="home" title="Transit">
          <div className="accordion" id="faqAccordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button
                    className={`btn1 ${activeAccordion === "collapseOne" ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => handleAccordionClick("collapseOne")}
                    aria-expanded={activeAccordion === "collapseOne"}
                    aria-controls="collapseOne"
                  >
                    <i className="fa-solid fa-bus"></i> Bus Stations
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                className={`collapse ${activeAccordion === "collapseOne" ? "show" : ""}`}
                aria-labelledby="headingOne"
                data-parent="#faqAccordion"
              >
                <div className="card-body">
                  <ul className="list-unstyled list-unstyled1">
                    <li>
                      <span>Kalavakkam</span> <span>2.4 km | 29 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur</span> <span>3.3 km | 11 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Bus Stand</span> 
                      <span>1.3 km | 41 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Temple</span> 
                      <span>5.3 km | 31 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Kovil</span>{" "}
                      <span>3.3 km | 27 mins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                   className={`btn1 ${activeAccordion === "collapseOne" ? "" : "collapsed"}`}
                   type="button"
                   onClick={() => handleAccordionClick("collapseTwo")}
                   aria-expanded={activeAccordion === "collapseTwo"}
                   aria-controls="collapseOne"
                  >
                    <i className="fa-solid fa-plane"></i> Airport
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className={`collapse ${activeAccordion === "collapseTwo" ? "show" : ""}`}
                aria-labelledby="headingTwo"
                data-parent="#faqAccordion"
              >
                <div className="card-body">
                  <ul className="list-unstyled list-unstyled1">
                    <li>
                      <span>Chennai International Airport</span>{" "}
                      <span>43.0 km | 1 hour 19 mins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button
                     className={`btn1 ${activeAccordion === "collapseThree" ? "" : "collapsed"}`}
                     type="button"
                     onClick={() => handleAccordionClick("collapseThree")}
                     aria-expanded={activeAccordion === "collapseThree"}
                    aria-controls="collapseThree"
                  >
                    <i className="fa-solid fa-train-subway"></i> Metro Stations
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                className={`collapse ${activeAccordion === "collapseThree" ? "show" : ""}`}
                aria-labelledby="headingThree"
                data-parent="#faqAccordion"
              >
                <div className="card-body">
                  <ul className="list-unstyled list-unstyled1">
                    <li>
                      <span>Alandur</span> <span>2.4 km | 29 mins</span>
                    </li>
                    <li>
                      <span>St.Thomas Mount Metro</span>{" "}
                      <span>3.3 km | 11 mins</span>
                    </li>
                    <li>
                      <span>Alandur</span> <span>1.3 km | 41 mins</span>
                    </li>
                    <li>
                      <span>Guindy</span> <span>5.3 km | 31 mins</span>
                    </li>
                    <li>
                      <span>Little Mount</span> <span>3.3 km | 27 mins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingFour">
                <h2 className="mb-0">
                  <button
                    className={`btn1 ${activeAccordion === "collapseFour" ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => handleAccordionClick("collapseFour")}
                    aria-expanded={activeAccordion === "collapseFour"}
                    aria-controls="collapseFour"
                  >
                    <i className="fa-solid fa-train"></i> Train Stations
                  </button>
                </h2>
              </div>
              <div
                id="collapseFour"
                className={`collapse ${activeAccordion === "collapseFour" ? "show" : ""}`}
                aria-labelledby="headingFour"
                data-parent="#faqAccordion"
              >
                <div className="card-body">
                  <ul className="list-unstyled list-unstyled1">
                    <li>
                      <span>Kalavakkam</span> <span>2.4 km | 29 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur</span> <span>3.3 km | 11 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Bus Stand</span>{" "}
                      <span>1.3 km | 41 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Temple</span>{" "}
                      <span>5.3 km | 31 mins</span>
                    </li>
                    <li>
                      <span>Thiruporur Kovil</span>{" "}
                      <span>3.3 km | 27 mins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Essentials">
           hlo
        </Tab>
        <Tab eventKey="longer-tab" title="Utility">
          hloo
        </Tab>
      </Tabs>
    </div>
  );
}

export default Mapdetails;
