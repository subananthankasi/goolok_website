import { useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import axios from "axios";
import { Skeleton } from "primereact/skeleton";



function PremiumProperties({ loading }) {
  const [getData, setGetData] = useState([]);
  const fetchPremiumproperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/premiumproperties`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
  useEffect(() => {
    fetchPremiumproperties();
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
      <div className="premiumPropertyCard">
        <Link to="/properties" state={{ title: item.property_name }}>
          <div className="premiumPropertyImgBox">
            <img
              src={`${IMG_PATH}cms/premiumproperties/${item.image}`}
              alt={item.alt}
              className="premiumPropertyImg"
            />
            {/* Offer on top-right */}
            {item.offer && <span className="premiumPropertyOffer">{item.offer}</span>}

            {/* Property name on bottom of image */}
            <div className="premiumPropertyNameOnImage">
              {item.property_name}
            </div>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <section className="section_container">
      <div className="container-xl primium_properties_container">
        <div className="section-head  ">
          {loading ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}>
              <Skeleton height="1.5rem" width="300px" className="mb-2 text-center" />
              <Skeleton height="1.5rem" width="400px" className="mb-3 text-center" />
            </div>
          ) : (
            <>
              <h3
                className=""
                style={{
                  backgroundClip: "text",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  WebkitBackgroundClip: "text",
                  letterSpacing: "1px",
                }}
              >
                Explore Our Premium Categories
              </h3>
              <h6
                style={{
                  color: "#0a4ebf",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                }}
                className="mb-3"
              >
                <span
                  style={{
                    paddingBottom: "4px",
                  }}
                >
                  A handpicked selection of premium projects, plots, and homes
                </span>
              </h6>
            </>
          )}

        </div>
        <div className="premium_property">
          {loading ? (
            <div className="row">
              <div className="col-3">
                <Skeleton height={280} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={280} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={280} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={280} width="100%" />
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
              autoplayInterval={4000}
            />
          )}

        </div>
      </div>
    </section>
  );
}

export default PremiumProperties;
