import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const Blogs = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/serviceblog`);
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

  const blogDatas = getData[0]?.alldata
    ? JSON.parse(getData[0]?.alldata)
    : null;

  return (
    <div className="container">
      <div className="mt-3">
        <Breadcrumb
          items={[{ title: <Link to="/">Home</Link> }, { title: "Blogs" }]}
        />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5 mb-3">
          <Skeleton
            height={450}
            width="50%"
            style={{ marginTop: 10 }}
            className="mt-2"
          />
        </div>
      ) : (
        <div className="mt-5 blog_mobileimgs">
          <img
            src={`${IMG_PATH}/cms_service/serviceblog/${getData[0]?.image}`}
            alt="mobileimg"
            className="blog_mobileimg img-fluid"
          />
        </div>
      )}
      {loading ? (
        <>
          <Skeleton
            height="2rem"
            width="20%"
            style={{ marginTop: 10 }}
            className="mt-2"
          />
          <Skeleton
            height="300px"
            width="100%"
            style={{ marginTop: 10 }}
            className="mt-2"
          />
        </>
      ) : (
        <div className="">
          <h3 className="modern-title mt-3 mb-2">{getData[0]?.title}</h3>
          <div className="blog_lines">{getData[0]?.description}</div>
        </div>
      )}
      {loading ? (
        <div className="row mb-4 mt-3">
          <div className="col-4">
            <Skeleton
              height="350px"
              width="100%"
              style={{ marginTop: 10 }}
              className="mt-2"
            />
          </div>
          <div className="col-4">
            {" "}
            <Skeleton
              height="350px"
              width="100%"
              style={{ marginTop: 10 }}
              className="mt-2"
            />
          </div>
          <div className="col-4">
            {" "}
            <Skeleton
              height="350px"
              width="100%"
              style={{ marginTop: 10 }}
              className="mt-2"
            />
          </div>
        </div>
      ) : (
        <div className="row mt-5">
          {blogDatas?.map((item, index) => (
            <div className="col-12 col-md-4 mb-4" key={index}>
              <div
                className=" h-100"
                style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 8px" }}
              >
                <img
                  src={`${IMG_PATH}/cms_service/serviceblog/${item.blog_image}`}
                  alt={item.title || "Blog"}
                  className="img-fluid"
                  style={{ height: "160px", width: "100%" }}
                />

                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center gap-3 mb-2 ">
                    <div className="d-flex gap-1 justify-content-center align-items-center">
                      <FaRegUserCircle
                        color="#0000ff"
                        style={{ fontSize: "18px" }}
                      />{" "}
                      <span style={{ fontSize: "15px", fontFamily: "poppins" }}>
                        By {item.name}
                      </span>
                    </div>
                    <div className="d-flex gap-1 justify-content-center align-items-center">
                      <FaRegCalendarDays
                        color="#0000ff"
                        style={{ fontSize: "17px" }}
                      />{" "}
                      <span style={{ fontSize: "15px", fontFamily: "poppins" }}>
                        {" "}
                        {item.date || "February 23, 2023"}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <h6 className="card-title">
                    {item.title ||
                      "There are many variations of passage available."}
                  </h6>
                </div>
                <div className="card-footer bg-transparent border-0 text-center">
                  <button
                    className="blog_next_btn"
                    onClick={() => {
                      window.open(item.button_url, "_blank");
                    }}
                  >
                    {item.button_text} <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
