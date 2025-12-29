import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";


const HighreturnProperties = ({ loading }) => {
  const [getData, setGetData] = useState([]);
  const fetchHighReturnProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/highreturn`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
  useEffect(() => {
    fetchHighReturnProperties();
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
      // <div className="todaysdeal-card">
      //   <Link to="/properties" state={{ title: product.property_name }}>
      //     <div className="todaysdeal-img-wrapper">
      //       <img
      //         src={`${IMG_PATH}cms/highreturn/${product.image}`}
      //         alt={product.alt}
      //         className="todaysdeal-img"
      //       />
      //     </div>
      //     <div className="todaysdeal-body">
      //       <h5 className="todaysdeal-title" style={{ color: "black" }}>
      //         {product.property_name}
      //       </h5>
      //       {/* <p className="todaysdeal-offer">{product.offer}</p> */}
      //       <p className="offer_tag_model4">
      //         {product.offer}
      //       </p>
      //     </div>
      //   </Link>
      // </div>

      <div className="premiumPropertyCard">
        <Link to="/properties" state={{ title: item.property_name }}>
          <div className="premiumPropertyImgBox">
            <img
              src={`${IMG_PATH}cms/highreturn/${item.image}`}
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

      //   <div className="deal-card" key={item.id}>
      //   <Link to="/properties" state={{ title: item.property_name }}>
      //     <div className="deal-image-wrapper">
      //       <img
      //         src={`${IMG_PATH}cms/highreturn/${item.image}`}
      //         alt={item.alt}
      //         className="deal-image"
      //       />

      //       {/*  RERA Badge */}
      //       {<span className="deal-offer-tag">{item.offer}</span>}

      //       {/*  Gradient Shadow */}
      //       <div className="deal-gradient"></div>

      //       {/*  Footer Info */}
      //       <div className="deal-footer">
      //         <div>
      //           <h5 className="deal-title">{item.property_name}</h5>
      //           {/* <p className="deal-offer-text">{item.offer}</p> */}
      //         </div>
      //       </div>
      //     </div>
      //   </Link>
      // </div>
    );
  };
  return (
    <section className="section_container">
      <div className="container-xl hightreturn_property_container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Skeleton height="2rem" width="400px" className="mb-3" />
          </div>
        ) : (
          <div className="section-head ">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                letterSpacing: "1px",
              }}
            >
              Best Investment Properties
            </h3>
          </div>
        )}

        {
          loading ? (
            <div className="row">
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
            </div>
          ) : (
            <div className="mt-2 highreturn_property">
              <Carousel
                value={getData}
                numVisible={4}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                circular
              />
            </div>
          )
        }

      </div>
    </section>
  );
};

export default HighreturnProperties;
