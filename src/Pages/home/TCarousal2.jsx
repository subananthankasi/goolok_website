import React from "react";
import { Carousel } from "react-bootstrap";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";

const TCarousal2 = ({ addBlock_3, loading }) => {


  return (
    <div className="container-xl  DesKtopView section_container">
      {loading ? (
        <Skeleton height={110} width="100%" style={{ marginTop: 10 }} />
      ) : (
        <Carousel
          indicators={false}
          controls={false}
          interval={3000}
          className="ticket-carousel"
        >
          {addBlock_3?.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="ticket-banner" style={{ cursor: "pointer", }} onClick={() => window.open(item.url, "_blank")}>
                <div className="ticket-content">
                  <img
                    src={`${IMG_PATH}cms/banners/${item.image}`}
                    className="d-block w-100"
                    alt={`Offer Banner ${index + 1}`}
                  />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

    </div>
  );
};

export default TCarousal2;
