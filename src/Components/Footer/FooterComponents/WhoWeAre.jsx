import { useEffect, useState } from "react";
import "./FooterComponets.css";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { Breadcrumb } from "antd";

const WhoWeAre = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/whoweare`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const banner = getData[0]?.alldata ? JSON.parse(getData[0].alldata) : [];
  const slidImages = getData[0]?.slide_image
    ? JSON.parse(getData[0].slide_image)
    : [];

  const productTemplate = (product) => {
    return (
      <div className="p-2">
        <img
          src={`${IMG_PATH}cms_service/whoweare/slide/${product}`}
          alt="slide"
          className="lets_mobileimg"
        />
      </div>
    );
  };

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  return (
    <>
      <div className="container who_who" style={{ fontFamily: "poppins" }}>
        {/* Breadcrumb */}
        <div className="mt-3">
          <Breadcrumb
            style={{ fontFamily: "poppins" }}
            items={[
              { title: <Link to="/">Home</Link> },
              { title: "Who we are" },
            ]}
          />
        </div>

        {/* ==========================
            SHOW SKELETON WHEN LOADING
        =========================== */}
        {loading ? (
          <>
            <div className="row mt-3">
              <div className="col-6">
                <Skeleton height={550} width="100%" className="mt-2" />
              </div>
              <div className="col-6">
                <Skeleton height={550} width="100%" className="mt-2" />
              </div>
            </div>

            <div className="row mt-4 mb-4">
              <div className="col-12">
                <Skeleton height={40} width="40%" className="mt-2" />
                <Skeleton height={200} width="100%" className="mt-2" />
                <Skeleton height={200} width="100%" className="mt-2" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ==========================
                BANNERS FROM API
            =========================== */}
            {banner.map((item, index) => (
              <div className="row mt-3" key={index}>
                {index % 2 === 0 ? (
                  <>
                    <div className="col-12 col-md-6">
                      <img
                        src={`${IMG_PATH}cms_service/whoweare/${item.image}`}
                        alt="whomobileimg"
                        className="whomobileimg img-fluid"
                      />
                    </div>

                    <div className="col-12 col-md-6 mt-5">
                      <h2 className="mt-5 modern-title ">{item.title}</h2>
                      <p className="who_para">{item.content}</p>

                      <span
                        className="Reach_button px-4"
                        onClick={() => window.open(item.button_url, "_blank")}
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.button_text}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-12 col-md-6 mt-5">
                      <h2 className="mt-5 modern-title">{item.title}</h2>
                      <p className="who_para">{item.content}</p>

                      <span
                        className="Reach_button px-4"
                        onClick={() => window.open(item.button_url, "_blank")}
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.button_text}
                      </span>
                    </div>

                    <div className="col-12 col-md-6">
                      <img
                        src={`${IMG_PATH}/cms_service/whoweare/${item.image}`}
                        alt="whomobileimg"
                        className="whomobileimg img-fluid"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* ==========================
                SLIDER
            =========================== */}
            <div className="mt-5">
              <Carousel
                value={slidImages}
                numVisible={4}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                circular
                autoplayInterval={3000}
              />
            </div>

            {/* ==========================
                WORK SECTION
            =========================== */}
            <div className="who_letswork mt-5 mb-5">
              <h2 className="modern-title">{getData[0]?.work_title}</h2>

              <div
                className="benefit-content mt-2"
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: getData[0]?.work_description,
                }}
              ></div>

              <span
                className="Reach_button px-4 mt-3"
                onClick={() => window.open(getData[0]?.btn_url, "_blank")}
                style={{textTransform:"capitalize"}}
              >
                {getData[0]?.btn_text} 
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WhoWeAre;

