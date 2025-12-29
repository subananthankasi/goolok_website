import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import i1 from "../../assets/images/individual-house.jpg";
import a1 from "../../assets/images/villa1.jpg";
import a2 from "../../assets/images/apartment3.jpg";
import a3 from "../../assets/images/in3.jpg";

const CateGory = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    { src: i1, alt: "Individual House", offer: "Plots below 3 Lakhs" },
    { src: a1, alt: "Villa", offer: "Gated Communities" },
    { src: a2, alt: "Apartment", offer: "Individual House below 1 Crore" },
    { src: a3, alt: "Interior", offer: "Villa Starts at 60 Lakhs" },
  ];

  return (
    <div className="section pt-0">
      <div className="container">
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} className="brand-card" >
              <img src={item.src} alt={item.alt} className="brand-img" />
              <p className="brand-offer-text mb-0">{item.offer}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CateGory;
