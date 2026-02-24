import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";

const PromotionService = () => {
  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  const rawUrl = getData[0]?.url;
  const fileUrl = `${IMG_PATH}/cms_service/promotion/${getData[0]?.file}`;
  let videoUrl = rawUrl;
  if (rawUrl) {
    if (rawUrl.includes("youtube.com/watch")) {
      const videoId = rawUrl.split("v=")[1]?.split("&")[0];
      videoUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (rawUrl.includes("youtube.com/shorts")) {
      const videoId = rawUrl.split("/shorts/")[1]?.split("?")[0];
      videoUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const mainUrl = getData[0]?.file == null ? videoUrl : fileUrl;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="border_mobileimg">
            <iframe
              width="100%"
              height="315"
              // src={`${mainUrl}?autoplay=1&mute=1&controls=0`}
              src={`${mainUrl}?autoplay=1&mute=1&controls=0&rel=0`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "10px", backgroundColor: "#000" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 pt-5">
          <h2 className="">
            <span style={{ color: "blue" }}>
              {getData[0]?.title?.split(" ")[0]}
            </span>{" "}
            {getData[0]?.title?.split(" ").slice(1).join(" ")}
          </h2>
          <div style={{ textAlign: "justify" }}>{getData[0]?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PromotionService;
