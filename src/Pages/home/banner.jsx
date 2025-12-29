import React, { useMemo } from "react";
import b2 from "../../assets/images/sale_banner1.jpg";
import b3 from "../../assets/images/sale_banner2.jpg";
import mb1 from "../../assets/images/MobileView/mob_banner1.jpg";
import mb2 from "../../assets/images/MobileView/mob_banner2.jpg";
import newBanner from "../../assets/images/newhomepanner.jpg";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import {
  CarouselComponent,
  CarouselItemsDirective,
  CarouselItemDirective,
} from "@syncfusion/ej2-react-navigations";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function Banner({ bannerImages, loading, MobileBannerImages }) {
  // const settings = {
  //   dots: true,
  //   arrows: false,
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000, 
  //   speed: 2000, 
  //   fade: true,
  //   cssEase: "ease-in-out",
  //   pauseOnHover: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   adaptiveHeight: false,
  // };
  // const animations = [
  //   {
  //     initial: { opacity: 0, scale: 1.1 },
  //     animate: { opacity: 1, scale: 1 },
  //     exit: { opacity: 0, scale: 0.95 },
  //   },
  //   {
  //     initial: { opacity: 0, scale: 0.9 },
  //     animate: { opacity: 1, scale: 1 },
  //     exit: { opacity: 0, scale: 1.05 },
  //   },
  //   {
  //     initial: { opacity: 0, y: 50 },
  //     animate: { opacity: 1, y: 0 },
  //     exit: { opacity: 0, y: -50 },
  //   },
  //   {
  //     initial: { opacity: 0, x: 50 },
  //     animate: { opacity: 1, x: 0 },
  //     exit: { opacity: 0, x: -50 },
  //   },
  // ];

  const settings = useMemo(
    () => ({
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 2000,
      fade: true,
      cssEase: "ease-in-out",
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
    }),
    [] // fixed object reference
  );

  const animations = useMemo(
    () => [
      {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      },
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.05 },
      },
      {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      },
      {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
      },
    ],
    [] // fixed array reference
  );
  return (
    <>
      <section className="DesKtopView">
        {/* <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {loading ? (
              <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
            ) : (
              bannerImages?.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <img
                    src={`${IMG_PATH}cms/banners/${item.image}`}
                    className="d-block w-100"
                    alt={item.title || "Banner"}
                    style={{ height:"auto", objectFit: "" }}
                  />
                </div>
              ))
            
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
        {/* <div className="control-container">
          <CarouselComponent
            animationEffect="Fade"
            autoPlay={true}
            interval={3000}
            showIndicators={false}
            showNavigationButtons={false}
          >
            <CarouselItemsDirective>
              {bannerImages?.map((item, index) => (
                <CarouselItemDirective
                  key={index}
                  template={() => (
                    <figure className="img-container" style={{ margin: 0 }}>
                      <img
                        src={`${IMG_PATH}cms/banners/${item.image}`}
                        alt={item.title || "Banner"}
                        style={{
                          height: 400,
                          width: "100%",
                          // objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(item.url, "_blank")}
                      />
                    </figure>
                  )}
                />
              ))}
            </CarouselItemsDirective>
          </CarouselComponent>
        </div> */}
        {loading ? (
          <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
        ) : (
          <Slider {...settings}>
            {bannerImages.map((item, idx) => {
              const animation = animations[idx % animations.length];
              return (
                <div key={idx}>
                  <motion.img
                    src={`${IMG_PATH}cms/banners/${item.image}`}
                    alt={item.title || `banner-${idx}`}
                    initial={animation.initial}
                    animate={animation.animate}
                    exit={animation.exit}
                    // transition={{ duration: 2, ease: "easeInOut" }}
                    style={{
                      width: "100%",
                      // height: "400px",
                      objectFit: "cover",
                      // borderRadius: "12px",
                      cursor: item.url ? "pointer" : "default",
                    }}
                    onClick={() => item.url && window.open(item.url, "_blank")}
                  />
                </div>
              );
            })}
          </Slider>
        )}
      </section>

      {/* ////////////////////////////////////////
//////  web app view ///////
////////////////////////////////////////  */}

      <section className="MobileView">
        <div
          id="carouselExampleControls1"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleControls1"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleControls1"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
          </div>

          {/* <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={mb1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={mb2} className="d-block w-100" alt="..." />
            </div>
          </div> */}
          <div className="carousel-inner">
            {loading ? (
              <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
            ) : (
              MobileBannerImages?.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === 0 ? "active" : ""
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
              ))
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls1"
            data-bs-slide="prev"
          ></button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls1"
            data-bs-slide="next"
          ></button>
        </div>
      </section>
    </>
  );
}

export default Banner;
