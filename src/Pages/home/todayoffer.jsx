// import React, { useEffect, useState } from "react";
// import "../home/homestyle.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
// import "@fortawesome/fontawesome-free/css/all.css";
// import { Link } from "react-router-dom";
// import i1 from "../../assets/images/individual-house.jpg";
// import a1 from "../../assets/images/villa1.jpg";
// import a2 from "../../assets/images/apartment3.jpg";
// import a3 from "../../assets/images/in3.jpg";

// function TodayOffer() {
//   return (
//     <section className="section" >
//       <div className="container">
//         <div className="section-head ">
//         {/* <Link to={`/property/`}> */}
//         <h3 className="mb-3">High Return Properties</h3>
//         {/* </Link> */}
//         </div>

//         <div className="row">
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-img project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={i1}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="card-body text-center">
//                   <h5 className="card-title">Individual House</h5>
//                   <p className="card-text">30-60% OFF</p>
//                 </div>
//                   {/* <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-img  project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a1}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="card-body text-center">
//                   <h5 className="card-title">Villa</h5>
//                   <p className="card-text">30-60% OFF</p>
//                 </div>
//                   {/* <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3> */}
//                     {/* <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div> */}
//                   {/* </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-img  project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a2}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="card-body text-center">
//                   <h5 className="card-title">Apartment</h5>
//                   <p className="card-text">30-60% OFF</p>
//                 </div>
//                   {/* <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                         <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                         <a href="javascript:void(0)">
//                             <li className="the-icons">
//                             <i className="fa fa-map-marker" />
//                             <span>Address</span>
//                             </li>
//                         </a>
//                         </ul>
//                         <ul className="homes-list homes-list1 clearfix pb-1">
//                         <li className="the-icons">
//                             <i className="fa-solid fa-ruler-combined"></i>
//                             <span>600sq Ft </span>
//                         </li>
//                         </ul>
//                         <div className="price-properties footer pt-3 pb-0">
//                         <p className="bottom_price">
//                             <i
//                             className="fa fa-inr"
//                             aria-hidden="true"
//                             style={{ fontSize: 12 }}
//                             />
//                             1223000 /sq ft
//                         </p>
//                         </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-img  project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a3}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="card-body text-center">
//                   <h5 className="card-title">Independent House</h5>
//                   <p className="card-text">30-60% OFF</p>
//                 </div>
//                   {/* <div className="homes-content">
//                     <h3>
//                       <a href="#">Get</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TodayOffer;

import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
// import Carousel from "react-multi-carousel";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";

function TodayOffer() {

    const products = [
    { src: i1, alt: "Land", offer: "30-60% OFF", title: "Land" },
    { src: a1, alt: "Plot", offer: "30-60% OFF", title: "Apartment" },
    { src: a2, alt: "Apartment", offer: "30-60% OFF", title: "Villa" },
    { src: a3, alt: "Layout", offer: "30-60% OFF", title: "Independent House" },
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
        <div className="todaysdeal-body">
          <h5 className="todaysdeal-title">{product.title}</h5>
          <p className="todaysdeal-offer">{product.offer}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="section-head ">
          {/* <Link to={`/property/`}> */}
           <h3 className="mb-3 mt-3">High Return Properties</h3>
           
          {/* </Link> */}
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

export default TodayOffer;
