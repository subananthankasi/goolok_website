import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import i1 from "../../assets/images/individual-house.jpg";
import a1 from "../../assets/images/villa1.jpg";
import a2 from "../../assets/images/apartment3.jpg";
import a3 from "../../assets/images/in3.jpg";

function Apartment() {
  return (
    <section className="section" style={{ backgroundColor: "#f5f7fb " }}>
      <div className="container">
        <div className="section-head mb-3">
          <Link to={`/property/`}>
            <h3>Recommend for You</h3>
          </Link>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-inner project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={i1}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="homes-content">
                    <h3>
                      <a href="#">Independent House</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                      <li className="the-icons mb-3"><span>Rebuild House in 10 Years</span></li>
                      <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>6000 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                      <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Anna Nagar</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        50000000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-inner project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a1}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="homes-content">
                    <h3>
                      <a href="#">Villa</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                      <li className="the-icons mb-3"><span>Brand New Villa in 2025</span></li>
                      <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>4500 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                      <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Nungambakkam</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        24500000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-inner project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a2}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="homes-content">
                    <h3>
                      <a href="#">Apartment</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                      <li className="the-icons mb-3"><span>luxurious Apartment in 2025</span></li>
                      <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>2000 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                      <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Avadi</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        15000000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-inner project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a3}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="homes-content">
                    <h3>
                      <a href="#">Individual House</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                      <li className="the-icons mb-3"><span>Rebuild House in 3.5 Years</span></li>
                      <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>2600 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                      <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Vadapalani</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        27500000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Apartment;
