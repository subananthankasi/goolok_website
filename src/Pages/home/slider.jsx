import React from "react";
// import b2 from "../../assets/images/sale_banner1.jpg";
import b2 from "../../assets/a6dcbecf66a89e0c09c6b2bd78ccf9db696c56f8 (1).jpg";
import b3 from "../../assets/images/sale_banner2.jpg";
import mb1 from "../../assets/images/MobileView/mob_banner1.jpg";
import mb2 from "../../assets/images/MobileView/mob_banner2.jpg";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";

function Slider({ promotion_banner, Mobile_Promotion_banner, loading }) {
  return (
    <>
      {/* Desktop View Carousel */}
      <section className="DesKtopView d-none d-lg-block d-md-block mt-3">
        {loading ? (
          <Skeleton height={500} width="100%" style={{ marginTop: 10 }} />
        ) : (
          <img
            src={`${IMG_PATH}cms/banners/${promotion_banner[0]?.image}`}
            className=" w-100"
            alt="Desktop Banner 1"
            style={{ height: "auto", objectFit: "cover", cursor: "pointer" }}
            onClick={() => window.open(promotion_banner[0]?.url, "_blank")}
          />
        )}

        {/* <div
          id="carouselDesktop"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={b2} className="d-block w-100" alt="Desktop Banner 1" />
            </div>
            <div className="carousel-item">
              <img src={b3} className="d-block w-100" alt="Desktop Banner 2" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
      </section>

      {/* Mobile View Carousel */}
      <section className="MobileView d-lg-none">
        <div
          id="carouselMobile"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselMobile"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselMobile"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          {/* <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={mb1} className="d-block w-100" alt="Mobile Banner 1" />
            </div>
            <div className="carousel-item">
              <img src={mb2} className="d-block w-100" alt="Mobile Banner 2" />
            </div>
          </div> */}
          <div className="carousel-inner">
            {Mobile_Promotion_banner?.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""
                  } carousel-item`}
                style={{ cursor: "pointer" }}
                onClick={() => window.open(item.url, "_blank")}
              >
                <img
                  src={`${IMG_PATH}cms/banners/${item.image}`}
                  className="d-block w-100"
                  alt={item.title || "Banner"}
                  style={{ height: "auto", objectFit: "" }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Slider;
