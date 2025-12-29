import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { encryptData } from "../../Utils/encryptData";
import { Skeleton } from "primereact/skeleton";
const GridSections = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/servicescms`);
      setGetData(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Skeleton height={350} width="100%" style={{ marginTop: 10 }} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Skeleton height={350} width="100%" style={{ marginTop: 10 }} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <Skeleton height={350} width="100%" style={{ marginTop: 10 }} />
            </div>
          </>
        ) : (
          getData?.map((item, index) => (
            // <div key={index} className="col-lg-4 col-md-6 col-sm-12">
            //   <div
            //     className="card h-100 border shadow-sm overflow-hidden"
            //     style={{
            //       borderRadius: "12px",
            //       transition: "all 0.3s ease",
            //       cursor: "pointer",
            //     }}
            //     onMouseEnter={(e) => {
            //       e.currentTarget.style.transform = "translateY(-5px)";
            //       e.currentTarget.style.boxShadow =
            //         "0 15px 25px rgba(0,0,0,0.2)";
            //     }}
            //     onMouseLeave={(e) => {
            //       e.currentTarget.style.transform = "translateY(0)";
            //       e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            //     }}
            //   >
            //     <div
            //       className="card-header  text-center"
            //       style={{ borderBottom: "1px solid #dee2e6" }}
            //     >
            //       <h3 className="mt-2">{item.percentage}</h3>
            //     </div>

            //     <div className="card-body d-flex flex-column align-items-center">
            //       <img
            //         src={`${IMG_PATH}cms_service/servicescms/${item.image}`}
            //         alt={item.service_title}
            //         className="img-fluid mb-3"
            //         style={{
            //           width: "100%",
            //           height: "180px",
            //           objectFit: "",
            //           borderRadius: "8px",
            //         }}
            //       />
            //       <h6 className="sell_properity text-center">
            //         {item.service_title}
            //       </h6>
            //       <div className="d-flex align-items-center justify-content-center mt-2">
            //         <span
            //           className="px-2"
            //           style={{
            //             opacity: "0.6",
            //             textDecorationLine: "line-through",
            //           }}
            //         >
            //           ₹ {item.amount}
            //         </span>
            //         <h5 className="text-dark fw-bold ms-2">
            //           ₹ {item.off_amount}
            //         </h5>
            //       </div>
            //     </div>

            //     <div className="card-footer bg-white border-0 text-center">
            //       <Link
            //         to={`/servicepreview/${encryptData(item.service_id)}`}
            //         className="btn btn-dark w-100 d-flex align-items-center justify-content-center buttonhover"
            //         style={{ borderRadius: "8px" }}
            //       >
            //         {item.button_text}
            //         <IoMdArrowRoundForward className="ms-2" size={18} />
            //       </Link>
            //     </div>
            //   </div>
            // </div>
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div
                className="card h-100 border-0 overflow-hidden position-relative"
                style={{
                  borderRadius: "18px",
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(240,243,248,0.8) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(55,69,80,0.15)",
                  boxShadow: "0 8px 25px rgba(55,69,80,0.15)",
                  transition: "all 0.5s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(55,69,80,0.35), 0 0 12px rgba(0,123,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(55,69,80,0.15)";
                }}
              >
                {/* Gradient Accent Border */}
                <div
                  style={{
                    content: '""',
                    position: "absolute",
                    inset: "0",
                    borderRadius: "18px",
                    padding: "1px",
                    background:
                      "linear-gradient(145deg, rgba(0,123,255,0.8), rgba(55,69,80,0.8))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                  }}
                ></div>

                {/* Header */}
                <div
                  className="card-header text-center text-white"
                  style={{
                    backgroundColor: "#374550",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px",
                    border: "none",
                    boxShadow: "0 4px 10px rgba(55, 69, 80, 0.3)",
                  }}
                >
                  <h4
                    className="fw-bold mb-0"
                    style={{
                      fontSize: "20px",
                      letterSpacing: "0.7px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.percentage}
                  </h4>
                </div>

                {/* Body */}
                <div className="card-body text-center px-3 py-4">
                  <div
                    className="rounded overflow-hidden mb-3 position-relative"
                    style={{
                      width: "100%",
                      height: "190px",
                      backgroundColor: "#eaeef3",
                      boxShadow: "inset 0 0 10px rgba(55,69,80,0.1)",
                    }}
                  >
                    <img
                      src={`${IMG_PATH}cms_service/servicescms/${item.image}`}
                      alt={item.service_title}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>

                  <h5
                    className="fw-semibold"
                    style={{
                      color: "#374550",
                      fontSize: "17px",
                      marginBottom: "6px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {item.service_title}
                  </h5>

                  <div className="d-flex align-items-center justify-content-center mt-1">
                    <span
                      className="px-2"
                      style={{
                        opacity: "0.5",
                        textDecorationLine: "line-through",
                        fontSize: "13px",
                      }}
                    >
                      ₹ {item.amount}
                    </span>
                    <h5
                      className="ms-2 fw-bold"
                      style={{
                        color: "#007bff",
                        fontSize: "18px",
                        textShadow: "0 0 6px rgba(0,123,255,0.4)",
                      }}
                    >
                      ₹ {item.off_amount}
                    </h5>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="card-footer border-0 bg-transparent text-center"
                  style={{ paddingBottom: "20px" }}
                >
                  <Link
                    to={`/servicepreview/${encryptData(item.service_id)}`}
                    className="btn w-100 d-flex align-items-center justify-content-center"
                    style={{
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, #374550 0%, #4b5b6e 100%)",
                      color: "white",
                      fontWeight: "600",
                      letterSpacing: "0.6px",
                      transition: "all 0.4s ease",
                      boxShadow: "0 6px 15px rgba(55, 69, 80, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #2c3642 0%, #495767 100%)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(55, 69, 80, 0.65)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #374550 0%, #4b5b6e 100%)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 15px rgba(55, 69, 80, 0.5)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {item.button_text}
                    <IoMdArrowRoundForward className="ms-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridSections;
