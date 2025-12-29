import React from "react";
import { Carousel } from "react-bootstrap";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";

const TicketCarousel = ({ addBlock_1, loading, mobile_addBlock_1 }) => {
  return (
    <>
     <div className="container-xl  DesKtopView section_container">
        <Carousel
          indicators={false}
          controls={false}
          interval={3000}
          className="ticket-carousel"
        >
          {loading ? (
            <Skeleton height={160} width="100%" style={{ marginTop: 10 }} />
          ) : (
            addBlock_1?.map((item, index) => (
              <Carousel.Item key={index}>
                <div
                  className="ticket-banner"
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <div className="ticket-content">
                    <img
                      src={`${IMG_PATH}cms/banners/${item.image}`}
                      className="d-block w-100"
                      alt={`Offer Banner ${index + 1}`}
                    />
                  </div>
                </div>
              </Carousel.Item>
            ))
          )}

          {/* <Carousel.Item>
        <div className="ticket-banner">
          <div className="ticket-content">
            <img src={b2} className="d-block w-100" alt="Offer Banner 2" />
          </div>
        </div>
      </Carousel.Item> */}
        </Carousel>
      </div>
      <section className="MobileView mt-2">
        <Carousel
          indicators={false}
          controls={false}
          interval={3000}
          className="ticket-carousel"
        >
          {loading ? (
            <Skeleton height={120} width="100%" style={{ marginTop: 10 }} />
          ) : (
            mobile_addBlock_1?.map((item, index) => (
              <Carousel.Item key={index}>
                <div
                  className="ticket-banner"
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <div className="ticket-content">
                    <img
                      src={`${IMG_PATH}cms/banners/${item.image}`}
                      className="d-block w-100"
                      alt={`Offer Banner ${index + 1}`}
                      style={{ height: "55px" }}
                    />
                  </div>
                </div>
              </Carousel.Item>
            ))
          )}
        </Carousel>
      </section>
    </>
  );
};

export default TicketCarousel;
