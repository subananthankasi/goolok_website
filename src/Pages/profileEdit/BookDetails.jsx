import React, { useEffect, useState } from "react";
// import ProfileSideBar from "./ProfileSideBar";
import patta from "../../assets/images/patta.jpg";
// import Bookslider from "./bookslider";
// import Pricedetails from "./pricedetails";
// import TimelineAccordion from "./timelineaccordion";
import { FaDownload } from "react-icons/fa6";
import ProfileSideBar from "./ProfileSideBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/apart1.jpg";
import img2 from "../../assets/images/apart1.jpg";
import img3 from "../../assets/images/apart1.jpg";
import PriceDetails from "./PriceDetails";
import TimeLineAccordian from "./TimeLineAccordian";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const BookDetails = () => {
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
  const { id } = useParams();
  const token = localStorage.getItem("zxcvbnm@#");
  const [viewData, setViewData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${LOGIN_BASE_URL}/vendor/mybooking/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setViewData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error during the request:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar /> */}

      <div className="col-md-9 mx-auto py-5" style={{ paddingTop: 50 }}>
        {/* <div>
              <h6>Order Id : 123456</h6>
              <hr />
            </div> */}

        <div className="Mybooking">
          <h5 class="mt-2 mb-3 text-center" style={{ fontFamily: "poppins", color: "#0000ff" }}>{viewData[0]?.propertyName}</h5>
          <div className="carousel">
            {loading ? (
              <div className="text-center">
                <Skeleton width="100%" height="400px" className="mb-2" />
              </div>
            ) : viewData[0]?.images?.length > 1 ? (
              <Slider {...settings}>
                {viewData[0]?.images?.map((item, index) => (
                  <div key={index}>
                    <img
                      src={`${IMG_PATH}/enquiry/gallery/${item.gallery}`}
                      alt={`Slide ${index + 1}`}
                      style={{ height: "400px" }}
                      className="w-100"
                    />
                  </div>
                ))}
              </Slider>
            ) : viewData[0]?.images?.length === 1 ? (
              <div>
                <img
                  src={`${IMG_PATH}/enquiry/gallery/${viewData[0]?.images[0]?.gallery}`}
                  alt="Single Slide"
                  style={{ height: "400px" }}
                  className="w-100"
                />
              </div>
            ) : null}
          </div>

          <div>
            <PriceDetails pricingData={viewData[0]?.pricings} />
          </div>

          <TimeLineAccordian
            statusData={viewData[0]}
            wholeStatusData={viewData}
          />
        </div>
        {viewData[0]?.prop_doc && (
          <div className="container">
            <h5 class="mt-3 mb-3 text-center" style={{ fontFamily: "poppins" }}>Your Documents</h5>
            <div className="row ">
              {viewData[0]?.prop_doc?.ec_doc && (
                <div className="col-md-6 mt-2">
                  <div className="card">
                    <div
                      className=" pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.ec_doc}`,
                          "_blank"
                        )
                      }
                    >
                      <embed
                        src={`${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.ec_doc}#toolbar=0&navpanes=0&scrollbar=0`}
                        alt=""
                        className="pdf-hidden-scroll"
                        style={{ overflow: "none" }}
                      />
                    </div>
                    <hr className="p-0 m-0" />

                    <p
                      className="p-0 m-0 mt-2 mb-2 text-center fw-bold"
                      style={{ fontSize: "13px", fontFamily: "poppins" }}
                    >
                      EC
                    </p>
                  </div>
                </div>
              )}
              {viewData[0]?.prop_doc?.sd_soft_copy && (
                <div className="col-md-6 mt-2">
                  <div className="card">
                    <div
                      className=" pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.sd_soft_copy}`,
                          "_blank"
                        )
                      }
                    >
                      <embed
                        src={`${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.sd_soft_copy}#toolbar=0&navpanes=0&scrollbar=0`}
                        alt=""
                        className="pdf-hidden-scroll"
                      />
                    </div>
                    <hr className="p-0 m-0" />

                    <p
                      className="p-0 m-0 mt-2 mb-2 text-center fw-bold"
                      style={{ fontSize: "13px", fontFamily: "poppins" }}
                    >
                      Sale Deed
                    </p>
                  </div>
                </div>
              )}

              {viewData[0]?.prop_doc?.patta_app && (
                <div className="col-md-6 mt-2">
                  <div className="card">
                    <div
                      className=" pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.patta_app}`,
                          "_blank"
                        )
                      }
                    >
                      <embed
                        src={`${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.patta_app}#toolbar=0&navpanes=0&scrollbar=0`}
                        alt=""
                        className="pdf-hidden-scroll"
                      />
                    </div>
                    <hr className="p-0 m-0" />
                    <p
                      className="p-0 m-0 mt-2 mb-2 text-center fw-bold"
                      style={{ fontSize: "13px", fontFamily: "poppins" }}
                    >
                      Patta Application
                    </p>
                  </div>
                </div>
              )}
              {viewData[0]?.prop_doc?.patta_doc && (
                <div className="col-md-6 mt-2">
                  <div className="card">
                    <div
                      className=" pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.patta_doc}`,
                          "_blank"
                        )
                      }
                    >
                      <embed
                        src={`${IMG_PATH}regdocument/${viewData[0]?.prop_doc?.patta_doc}#toolbar=0&navpanes=0&scrollbar=0`}
                        alt=""
                        className="pdf-hidden-scroll"
                      />
                    </div>
                    <hr className="p-0 m-0" />
                    <p
                      className="p-0 m-0 mt-2 mb-2 text-center fw-bold"
                      style={{ fontSize: "13px", fontFamily: "poppins" }}
                    >
                      Patta
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default BookDetails;
