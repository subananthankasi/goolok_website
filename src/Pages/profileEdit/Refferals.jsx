import React from "react";
import ProfileSideBar from "./ProfileSideBar";
// import Bookslider from "./bookslider";
import coupen from "../../assets/images/coupon.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img2 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img3 from "../../assets/images/apart1.jpg"; // Replace with your image path

const Refferals = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            {/* <div>
                            <h6>Referrals</h6>
                            <hr />
                        </div> */}
            <div>
              <h5 className="text-center" style={{ color: "#36454f" }}>
                Referrals
              </h5>
              <hr className="hr-gradient" />
            </div>

            <div className="container">
              {/* <Bookslider /> */}
              <div className="carousel">
                <Slider {...settings}>
                  <div>
                    <img
                      src={img1}
                      alt="Slide 1"
                      style={{ height: "400px" }}
                      className=" w-100"
                    />
                  </div>
                  <div>
                    <img
                      src={img2}
                      alt="Slide 2"
                      style={{ height: "400px" }}
                      className="img-fluid w-100"
                    />
                  </div>
                  <div>
                    <img
                      src={img3}
                      alt="Slide 3"
                      style={{ height: "400px" }}
                      className="img-fluid w-100"
                    />
                  </div>
                </Slider>
              </div>
              <h6 className="section-head mt-2 mb-3">Coupons and Offers</h6>

              <div className="row">
                {/* Card 1 */}
                <div className="col-md-6 col-lg-4 mb-2">
                  <div
                    className="card coupon-card"
                    style={{ border: "none", backgroundColor: "none" }}
                  >
                    <img src={coupen} alt="New Winterwear Drip" className="" />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="col-md-6 col-lg-4 mb-2">
                  <div
                    className="card coupon-card"
                    style={{ border: "none", backgroundColor: "none" }}
                  >
                    <img src={coupen} alt="New Winterwear Drip" className="" />
                  </div>
                </div>

                {/* Card 3 */}
                <div className="col-md-6 col-lg-4 mb-2">
                  <div
                    className="card coupon-card"
                    style={{ border: "none", backgroundColor: "none" }}
                  >
                    <img src={coupen} alt="New Winterwear Drip" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refferals;
