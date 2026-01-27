import { useMemo } from "react";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function Banner({ bannerImages, loading, MobileBannerImages }) {
  
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
    []
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
    []
  );
  return (
    <>
      <section className="DesKtopView">
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
                    style={{
                      width: "100%",
                      objectFit: "cover",
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
