import React from "react";
import h1 from "../../assets/images/apartment1.jpg";
import h2 from "../../assets/images/apartment2.jpg";
import h3 from "../../assets/images/apartment3.jpg";
import h4 from "../../assets/images/apartment4.jpg";
import v1 from "../../assets/images/villa1.jpg";
import v2 from "../../assets/images/villa2.jpg";
import v3 from "../../assets/images/villa3.jpg";
import v4 from "../../assets/images/villa4.jpg";
import i1 from "../../assets/images/in1.jpg";
import i2 from "../../assets/images/in2.jpg";
import i3 from "../../assets/images/in3.jpg";
import i4 from "../../assets/images/in4.jpg";
import p1 from "../../assets/images/land9.jpg";
import p2 from "../../assets/images/land10.jpg";
import p3 from "../../assets/images/land8.jpg";
import p4 from "../../assets/images/land7.jpg";
import { Link } from "react-router-dom";
import Recommended from "./Recommended";

function ApartmentDetails() {
  return (
    <>
      <section className="visited-cities bg-white-3 rec-pro">
        <div className="container">
          {/* <div className="sec-title">
                <h2>
                  <span>Most Popular </span>Places
                </h2>
                <p>Explore the world of real estate.</p>
              </div> */}
          <div className="row">
            <div className="col-lg-3 col-md-6" data-aos="fade-right">
              <div className="img-box hover-effect">
                <h6 className="text-dark p-3">Plot Price Starting From*</h6>
                <div className="row p-2 ps-3 pe-3">
                  <div className="col-6">
                    <Link to="/property_details">
                      <img src={p1} className="apartment_img" alt="image" />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6">
                    <Link to="/property_details">
                      <img src={p2} className="apartment_img" alt="image" />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/property_details">
                      <img src={p3} className="apartment_img" alt="image" />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/property_details">
                      <img src={p4} className="apartment_img" alt="image" />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>
                </div>

                <div className="text-end pe-3">
                  <Link to="/properties" className="text-dark ">
                    ...see more
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 mt-4 mt-md-0"
              data-aos="fade-right"
            >
              <div className="img-box hover-effect">
                <h6 className="text-dark p-3">
                  Apartment Price Starting From*
                </h6>
                <div className="row p-2 ps-3 pe-3">
                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={h1} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={h2} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={h3} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={h4} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>
                </div>
                <div className="text-end pe-3">
                  <Link to="/properties" className="text-dark ">
                    ...see more
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 mt-4 mt-md-0"
              data-aos="fade-right"
            >
              <div className="img-box hover-effect">
                <h6 className="text-dark p-3">Villa Price Starting From*</h6>
                <div className="row p-2 ps-3 pe-3">
                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={v1} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={v2} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={v3} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={v4} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>
                </div>

                <div className="text-end pe-3">
                  <Link to="/properties" className="text-dark ">
                    ...see more
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 mt-4 mt-md-0"
              data-aos="fade-right"
            >
              <div className="img-box hover-effect">
                <h6 className="text-dark p-3">Independ House Price From*</h6>
                <div className="row p-2 ps-3 pe-3">
                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={i1} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6">
                    <Link to="/apartment_details">
                      <img src={i2} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={i3} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>

                  <div className="col-6 mt-3">
                    <Link to="/apartment_details">
                      <img src={i4} className="apartment_img" alt />
                      <div className="text-dark mt-2">Rs.1250/Sqft onwards</div>
                    </Link>
                  </div>
                </div>

                <div className="text-end pe-3">
                  <Link to="/properties" className="text-dark ">
                    ...see more
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Recommended />
        </div>
      </section>
    </>
  );
}

export default ApartmentDetails;
