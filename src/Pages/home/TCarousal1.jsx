import React from "react";
import { Carousel } from "react-bootstrap";
import b2 from "../../assets/images/smallbanner.jpg";
import b3 from "../../assets/images/offer-banner.jpg";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";


const TCarousal1 = ({ addBlock_2, loading }) => {

  return (
    <div className="container-xl  DesKtopView section_container">
      {loading ? (
        <Skeleton height={150} width="100%" style={{ marginTop: 10 }} />
      ) : (
        <Carousel
          indicators={false}
          controls={false}
          interval={1000}
          className="ticket-carousel"
        >
          {addBlock_2?.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="ticket-banner" style={{ cursor: "pointer" }} onClick={() => window.open(item.url, "_blank")}>
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

export default TCarousal1;
