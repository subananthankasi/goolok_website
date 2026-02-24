import { useEffect, useState } from "react";
import "../home/homestyle.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";


function TodaysDeal({ loading }) {
  const [getData, setGetData] = useState([]);
  const fetchTodayDeals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todaydeals`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
  useEffect(() => {
    fetchTodayDeals();
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (item) => {
    return (
      <div className="deal-card" key={item.id}>
        <Link to="/properties" state={{ title: item.property_name }}>
          <div className="deal-image-wrapper">
            <img
              src={`${IMG_PATH}cms/todaydeals/${item.image}`}
              alt={item.alt}
              className="deal-image"
            />
            {<span className="deal-offer-tag">{item.offer}</span>}
            <div className="deal-gradient"></div>
            <div className="deal-footer">
              <div>
                <h5 className="deal-title">{item.property_name}</h5>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="section_container">
      <div className="container-xl text-center todaysdeal_container">
        <div className="section-head mb-4">
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Skeleton height="1.5rem" width="300px" className="mb-2" />
              <Skeleton height="1.5rem" width="400px" />
            </div>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  WebkitBackgroundClip: "text",
                  letterSpacing: "1px",
                }}
              >
                Featured Deals
              </h3>
              <h6
                style={{
                  color: "#0a4ebf",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                }}
              >
                <span style={{ paddingBottom: "4px" }}>
                  Verified listings — Guaranteed value
                </span>
              </h6>
            </>
          )}
        </div>
        <div className="today_deal_section">
          {loading ? (
            <div className="row">
              <div className="col-3">
                <Skeleton height={255} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={255} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={255} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={255} width="100%" />
              </div>
            </div>
          ) : (
            <Carousel
              value={getData}
              numVisible={4}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate}
              circular
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default TodaysDeal;
