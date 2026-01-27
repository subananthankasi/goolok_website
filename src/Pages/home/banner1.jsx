import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
function Banner1({ promotion_banner3, Mobile_promotion_banner3, loading }) {
  return (
    <>
      {/* Desktop View Carousel */}
      <section className="DesKtopView d-none d-lg-block">
        {loading ? (
          <Skeleton height={400} width="100%" />
        ) : (
          <div
            id="carouselDesktop2"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {promotion_banner3?.map((item, index) => (
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
                    style={{ height: "auto", objectFit: "" }}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselDesktop2"
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
              data-bs-target="#carouselDesktop2"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

      </section>
      {/* Mobile View Carousel */}
      <section className="MobileView d-lg-none">
        <div
          id="carouselMobile2"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselMobile2"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselMobile2"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            {Mobile_promotion_banner3?.map((item, index) => (
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
            data-bs-target="#carouselMobile2"
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
            data-bs-target="#carouselMobile2"
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

export default Banner1;
