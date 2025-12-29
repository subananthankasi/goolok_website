import React, { useEffect, useState } from "react";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import axios from "axios";
import { IoMdArrowRoundForward } from "react-icons/io";
import mobileplay from "../../assets/ServiceImages/mobileplay.png";

const VisionBlog = () => {
  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/visionblock`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="container">
      <div className="row mobileplay mt-5">
        <div className="col-12 col-md-6 col-lg-6 px-5">
          {getData[0]?.image ? (
            <img
              src={`${IMG_PATH}cms_service/visionblock/${getData[0]?.image}`}
              alt="Mobileplay"
              style={{width:"100%"}}
            />
          ) : (
            <img src={mobileplay} alt="Mobileplay" />
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-6 mobileplay_text pt-5">
          <h2 className="pt-5">{getData[0]?.title} </h2>

          <p className="fs-6 p-3">{getData[0]?.description}</p>
          <button
            className="btn btn-light  buttonhover mt-2 mb-4"
            onClick={() => window.open(getData[0]?.button_url, "_blank")}
          >
            {getData[0]?.button_text}
            <IoMdArrowRoundForward size={18} />
          </button>
        </div>
      </div>
    </div>


  
  );
};

export default VisionBlog;
