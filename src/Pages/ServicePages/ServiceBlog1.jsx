import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";

const ServiceBlog1 = () => {
  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocksection/new`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <>
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              <span style={{ color: "blue" }}>
                {getData[0]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[0]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>
            <div className="mt-3">
              <p className=" fs-6" style={{ textAlign: "justify" }}>
                {getData[0]?.description}
              </p>
            </div>
          </div>

          <div
            className="col-12 col-md-6 col-lg-6 mobileimg"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[0]?.image}`}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
        </div>
      </div> */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 order-1 order-md-2 text-center mb-4 mb-md-0">
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[0]?.image}`}
              alt="section visual"
              className="img-fluid rounded shadow-sm"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-start px-3">
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "2rem",
                lineHeight: "1.3",
                textAlign: "justify",
              }}
            >
              <span style={{ color: "blue" }}>
                {getData[0]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[0]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>

            <p
              className="fs-6"
              style={{
                textAlign: "justify",
                color: "#374550",
                fontSize: "1rem",
                lineHeight: "1.7",
              }}
            >
              {getData[0]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="container mt-5">
        <div className="row">
          <div
            className="col-12 col-md-6 col-lg-6"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[1]?.image}`}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              <span style={{ color: "blue" }}>
                {getData[1]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[1]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>
            <div className="mt-3">
              <p className="fs-6" style={{ textAlign: "justify" }}>
                {getData[1]?.description}
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-12 col-md-6 order-1 order-md-1 text-center mb-4 mb-md-0">
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[1]?.image}`}
              alt="section visual"
              className="img-fluid rounded shadow-sm"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Text Section */}
          <div className="col-12 col-md-6 order-2 order-md-2 text-center text-md-start px-3">
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "2rem",
                lineHeight: "1.3",
              }}
            >
              <span style={{ color: "blue" }}>
                {getData[1]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[1]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>

            <p
              className="fs-6"
              style={{
                textAlign: "justify",
                color: "#374550",
                fontSize: "1rem",
                lineHeight: "1.7",
              }}
            >
              {getData[1]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              <span style={{ color: "blue" }}>
                {getData[2]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[2]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>

            <div className="mt-3">
              <p className="fs-6" style={{ textAlign: "justify" }}>
                {" "}
                {getData[2]?.description}
              </p>
            </div>
          </div>

          <div
            className="col-12 col-md-6 col-lg-6"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[2]?.image}`}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
        </div>
      </div> */}

      <div className="container my-5">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-start px-3">
            <h2
              className="fw-bold mb-3 pt-4 pt-md-0"
              style={{
                fontSize: "2rem",
                lineHeight: "1.3",
              }}
            >
              <span style={{ color: "blue" }}>
                {getData[2]?.block_title?.split(" ")[0]}
              </span>{" "}
              {getData[2]?.block_title?.split(" ").slice(1).join(" ")}
            </h2>

            <p
              className="fs-6 mt-3"
              style={{
                textAlign: "justify",
                color: "#374550",
                fontSize: "1rem",
                lineHeight: "1.7",
              }}
            >
              {getData[2]?.description}
            </p>
          </div>

          {/* Image Section */}
          <div className="col-12 col-md-6 order-1 order-md-2 text-center mb-4 mb-md-0">
            <img
              src={`${IMG_PATH}cms_service/blocksection/${getData[2]?.image}`}
              alt="section visual"
              className="img-fluid rounded shadow-sm"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceBlog1;
