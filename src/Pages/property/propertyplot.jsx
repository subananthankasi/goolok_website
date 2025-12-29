// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import gallery3 from "../../assets/images/land3.jpg";
// import gallery4 from "../../assets/images/land4.jpg";

// const Propertyplot = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <h2 className="text-center mt-4 mb-4" style={{ fontSize: "2em" }}>
//         Similar Properties
//       </h2>
//       <div
//         className="property-carousel"
//         style={{ border: "0.3px solid #bbb", padding: "15px" }}
//       >
//         <Slider {...settings}>
//           <div className="property-card" style={{ margin: "0 10px" }}>
//             <img src={gallery3} style={{ width: "100%",height:"200px" }} alt="Property 1" />
//             <div className="property-info">
//               <span className="badge">Waterfront</span>
//               {/* <div className="property-name">
//                 <h3>New Property</h3>
//                 <p>₹389,000</p>
//               </div> */}
//               {/* <div >
//                 <p style={{ display: "flex", justifyContent: "space-between" }}>Type: <strong>Condos</strong></p>
//                 <p style={{ display: "flex", justifyContent: "space-between" }}>Size: <strong>1,254 SqFt</strong></p>
//                 <p style={{ display: "flex", justifyContent: "space-between" }}>Rooms: <strong>2 Beds +  2 Baths</strong></p>
//               </div> */}
//               <div className="property-info">
//                 <div className="homes-content p-2" style={{ height: "150px" }}>
//                   <h3 className="p-0 m-0">
//                     <a href="#" className="p-0 m-0">
//                      Agriculture Land
//                     </a>
//                   </h3>

//                   <ul className="homes-list homes-list1 clearfix mb-0">
//                     <li className="the-icons mb-2">
//                       <span>Arun Land </span>
//                     </li>
//                     <li className="the-icons mb-1">
//                       <i className="fa-solid fa-ruler-combined"></i>
//                       <span className="m-0 p-0">
//                         350 sqft
//                       </span>
//                     </li>
//                   </ul>
//                   <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
//                     <a href="javascript:void(0)">
//                       <li className="the-icons">
//                         <i className="fa fa-map-marker" />
//                         <span>Vadapalani</span>
//                       </li>
//                     </a>
//                   </ul>
//                   <div className="price-properties footer mt-1 pb-0">
//                     <p className="bottom_price mb-0">

//                         <p className="bottom_price mb-0">
//                           <i
//                             className="fa fa-inr"
//                             aria-hidden="true"
//                             style={{ fontSize: 12 }}
//                           />

//                         2000000
//                         </p>

//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="property-card" style={{ margin: "0 10px" }}>
//             <img src={gallery3} style={{ width: "100%",height:"200px" }} alt="Property 2" />
//             <div className="property-info">
//               <span className="badge">Golf Course</span>
//               {/* <div className="property-name">
//                 <h3>New Property</h3>
//                 <p>₹389,000</p>
//               </div> */}
//               <div className="property-info">
//                 <div className="homes-content p-2" style={{ height: "150px" }}>
//                   <h3 className="p-0 m-0">
//                     <a href="#" className="p-0 m-0">
//                      Agriculture Land
//                     </a>
//                   </h3>

//                   <ul className="homes-list homes-list1 clearfix mb-0">
//                     <li className="the-icons mb-2">
//                       <span>Arun Land </span>
//                     </li>
//                     <li className="the-icons mb-1">
//                       <i className="fa-solid fa-ruler-combined"></i>
//                       <span className="m-0 p-0">
//                         350 sqft
//                       </span>
//                     </li>
//                   </ul>
//                   <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
//                     <a href="javascript:void(0)">
//                       <li className="the-icons">
//                         <i className="fa fa-map-marker" />
//                         <span>Vadapalani</span>
//                       </li>
//                     </a>
//                   </ul>
//                   <div className="price-properties footer mt-1 pb-0">
//                     <p className="bottom_price mb-0">

//                         <p className="bottom_price mb-0">
//                           <i
//                             className="fa fa-inr"
//                             aria-hidden="true"
//                             style={{ fontSize: 12 }}
//                           />

//                         2000000
//                         </p>

//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="property-card" style={{ margin: "0 10px" }}>
//             <img src={gallery4} style={{ width: "100%",height:"200px" }} alt="Property 3" />
//             <div className="property-info">
//               <span className="badge">Waterfront</span>
//               {/* <div className="property-name">
//                 <h3>New Property</h3>
//                 <p>₹389,000</p>
//               </div> */}
//              <div className="property-info">
//                 <div className="homes-content p-2" style={{ height: "150px" }}>
//                   <h3 className="p-0 m-0">
//                     <a href="#" className="p-0 m-0">
//                      Agriculture Land
//                     </a>
//                   </h3>

//                   <ul className="homes-list homes-list1 clearfix mb-0">
//                     <li className="the-icons mb-2">
//                       <span>Arun Land </span>
//                     </li>
//                     <li className="the-icons mb-1">
//                       <i className="fa-solid fa-ruler-combined"></i>
//                       <span className="m-0 p-0">
//                         350 sqft
//                       </span>
//                     </li>
//                   </ul>
//                   <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
//                     <a href="javascript:void(0)">
//                       <li className="the-icons">
//                         <i className="fa fa-map-marker" />
//                         <span>Vadapalani</span>
//                       </li>
//                     </a>
//                   </ul>
//                   <div className="price-properties footer mt-1 pb-0">
//                     <p className="bottom_price mb-0">

//                         <p className="bottom_price mb-0">
//                           <i
//                             className="fa fa-inr"
//                             aria-hidden="true"
//                             style={{ fontSize: 12 }}
//                           />

//                         2000000
//                         </p>

//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="property-card" style={{ margin: "0 10px" }}>
//             <img src={gallery4} style={{ width: "100%",height:"200px" }} alt="Property 4" />
//             <div className="property-info">
//               <span className="badge">Water Views</span>
//               {/* <div className="property-name">
//                 <h3>New Property</h3>
//                 <p>₹389,000</p>
//               </div> */}
//              <div className="property-info">
//                 <div className="homes-content p-2" style={{ height: "150px" }}>
//                   <h3 className="p-0 m-0">
//                     <a href="#" className="p-0 m-0">
//                      Agriculture Land
//                     </a>
//                   </h3>

//                   <ul className="homes-list homes-list1 clearfix mb-0">
//                     <li className="the-icons mb-2">
//                       <span>Arun Land </span>
//                     </li>
//                     <li className="the-icons mb-1">
//                       <i className="fa-solid fa-ruler-combined"></i>
//                       <span className="m-0 p-0">
//                         350 sqft
//                       </span>
//                     </li>
//                   </ul>
//                   <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
//                     <a href="javascript:void(0)">
//                       <li className="the-icons">
//                         <i className="fa fa-map-marker" />
//                         <span>Vadapalani</span>
//                       </li>
//                     </a>
//                   </ul>
//                   <div className="price-properties footer mt-1 pb-0">
//                     <p className="bottom_price mb-0">

//                         <p className="bottom_price mb-0">
//                           <i
//                             className="fa fa-inr"
//                             aria-hidden="true"
//                             style={{ fontSize: 12 }}
//                           />

//                         2000000
//                         </p>

//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Slider>
//       </div>
//     </>
//   );
// };

// // Custom arrow components
// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "black" }}
//       onClick={onClick}
//     />
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "black" }}
//       onClick={onClick}
//     />
//   );
// };

// export default Propertyplot;

import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";

function Propertyplot() {
  const products = [
    {
      src: i1,
      alt: "Land",
      offer: "30-60% OFF",
      title: "Land",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a1,
      alt: "Plot",
      offer: "30-60% OFF",
      title: "Apartment",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a2,
      alt: "Apartment",
      offer: "30-60% OFF",
      title: "Villa",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a3,
      alt: "Layout",
      offer: "30-60% OFF",
      title: "Independent House",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
  ];
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
  const productTemplate = (product) => {
    return (
      <div className="todaysdeal-card">
        <div className="todaysdeal-img-wrapper">
          <img src={product.src} alt={product.alt} className="todaysdeal-img" />
        </div>
        <div className="text-start">
          <div className="homes-content p-2" style={{ height: "150px" }}>
            <h3 className="p-0 m-0">
              <a href="#" className="p-0 m-0">
                {product?.title}{" "}
              </a>
            </h3>

            <ul className="homes-list homes-list1 clearfix mb-0">
              <li className="the-icons mb-2">
                <span>{product?.name} </span>
              </li>
              <li className="the-icons mb-1">
                <i className="fa-solid fa-ruler-combined"></i>
                <span className="m-0 p-0">{product?.sqft} </span>
              </li>
            </ul>
            <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
              <a href="javascript:void(0)">
                <li className="the-icons">
                  <i className="fa fa-map-marker" />
                  <span>{product?.taluk}</span>
                </li>
              </a>
            </ul>
            <div className="price-properties footer mt-1 pb-0">
              <p className="bottom_price mb-0">
                <i
                  className="fa fa-inr"
                  aria-hidden="true"
                  style={{ fontSize: 12 }}
                />

                {product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="s ">
          <h2 className="text-center  mb-4" style={{ fontSize: "2em" }}>
            Similar Properties
          </h2>
        </div>

        <div className="mt-5">
          <Carousel
            value={products}
            numVisible={4}
            numScroll={3}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        </div>
      </div>
    </section>
  );
}

export default Propertyplot;
