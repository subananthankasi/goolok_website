// import React from 'react';
// import { Row, Col, Card } from 'react-bootstrap';
// import gallery3 from "../../assets/images/land3.jpg";
// import gallery4 from "../../assets/images/land4.jpg";
// import CustomPagination from './pagination';
// import SearchLocation from './SearchLocation';

// function MapViewlist() {
//   const properties = [
//     {
//       img: gallery3,
//       price: "₹707,990",
//       size: "2,230 SqFt",
//       type: "Single Family",
//       beds: "3 Beds",
//       baths: "2 Baths",
//       address: "248 Breakwater Boulevard # Lot 08, West Panama City Beach, FL"
//     },
//     {
//       img: gallery4,
//       price: "₹707,990",
//       size: "1,380 SqFt",
//       type: "Single Family",
//       beds: "3 Beds",
//       baths: "2.5 Baths",
//       address: "16246 E Lullwater, Panama City Beach, FL"
//     },
//     {
//       img: gallery3,
//       price: "₹707,990",
//       size: "1,113 SqFt",
//       type: "Single Family",
//       beds: "3 Beds",
//       baths: "2 Baths",
//       address: "1802 Alabama Ave Avenue, Lynn Haven, FL"
//     },
//     {
//       img: gallery4,
//       price: "₹707,990",
//       size: "2,394 SqFt",
//       type: "Attach Single",
//       beds: "5 Beds",
//       baths: "4.5 Baths",
//       address: "508 Dement Circle # C, Panama City Beach, FL"
//     }
//   ];

//   return (
//     <>
//     <div  className={`ps-0 pe-0 col-md-6`}>
//             <SearchLocation />
//     </div>

//     <div className='col-md-6'>
//      <Row className='grid-scroll'>
//       {properties.map((property, index) => (
//         <Col md={12} lg={6} key={index} className='mb-3'>
//           <Card className="h-100 d-flex flex-column ">
//             <div className="position-relative plot">
//               <Card.Img variant="top" src={property.img} alt="Property Image" />
//               <span
//                 className="position-absolute top-0 start-0 m-2 px-3 py-1 badge"
//                 style={{ fontSize: '0.8rem' }}
//               >
//                 JUST LISTED
//               </span>
//             </div>
//             <Card.Body className="flex-grow-1">
//               <Card.Title>{property.price}</Card.Title>
//               <Card.Text>
//                 <span>{property.size}</span> - <span>{property.type}</span><br />
//                 <strong>{property.beds}</strong> + <strong>{property.baths}</strong><br />
//                 <small>{property.address}</small>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//     <div className="text-center mb-3 mt-3">
//            <CustomPagination />
//     </div>
//     </div>
//     </>
//   );
// }

// export default MapViewlist;





// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import gallery3 from "../../assets/images/land3.jpg";
// import gallery4 from "../../assets/images/land4.jpg";
// import CustomPagination from "./pagination";
// import a2 from "../../assets/images/apartment3.jpg";
// import SidebarFilter from "./sidebarfilter";

// function MapViewlist() {
//   const products = [
//     {
//       id: 1,
//       image: a2,
//       title: "luxurious Apartment in 2025",
//       brand: "Apartment",
//       sq: "2000 sq Ft Build Up Area",
//       price: "15000000",
//       address: "Avadi",
//     },
//     {
//       id: 2,
//       image: a2,
//       title: "luxurious Apartment in 2025",
//       brand: "Apartment",
//       sq: "2000 sq Ft Build Up Area",
//       price: "15000000 ",
//       address: "Avadi",
//     },
//     {
//       id: 3,
//       image: a2,
//       title: "luxurious Apartment in 2025",
//       brand: "Apartment",
//       sq: "2000 sq Ft Build Up Area",
//       price: "15000000 ",
//       address: "Avadi",
//     },
//   ];

//   return (
//     <>
//       <div className="section">
//         <div className="container">
//           <div className="row d-flex justify-content-between align-items-center mb-4">
//             <div className=" col-md-5 pe-0">
//               <h2>Apartments</h2>
//             </div>
//             <div className=" col-md-7 text-end">
//               <div className="d-flex align-items-center justify-content-end">
//                 <div className="me-3">
//                   <a
//                     className="btn "
//                     style={{ backgroundColor: "#2b2e3a", color: "white" }}
//                   >
//                     Grid View
//                   </a>
//                 </div>
//                 <label
//                   className="mb-0 me-2 d-none d-lg-block"
//                   style={{ whiteSpace: "nowrap" }}
//                 >
//                   Sort By:
//                 </label>
//                 <select className="form-select w-auto d-none d-lg-block">
//                   <option value="relevance">Relevance</option>
//                   <option value="price-low-to-high">Price: Low to High</option>
//                   <option value="price-high-to-low">Price: High to Low</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <Row className="grid-scroll">
//             <div className="product-grid">
//               <div className="row">
//                 {products.map((product) => (
//                   <div className="col-md-12 col-lg-6" key={product.id}>
//                     <div className="project-grid">
//                       <div className="landscapes">
//                         <div className="project-single">
//                           <div className=" product-img1">
//                             <div className="homes">
//                               <a href="#" className="homes-img">
//                                 <img
//                                   src={product.image}
//                                   alt="home-1"
//                                   className="img-responsive"
//                                   style={{
//                                     boxShadow:
//                                       "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                                     objectFit: "cover",
//                                   }}
//                                 />
//                               </a>
//                             </div>
//                           </div>
//                           <div className="homes-content">
//                             <h3>
//                               <a href="#">{product.brand}</a>
//                             </h3>

//                             <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
//                               <li className="the-icons mb-3">
//                                 <span>{product.title}</span>
//                               </li>
//                               <li className="the-icons">
//                                 <i className="fa-solid fa-ruler-combined"></i>
//                                 <span>{product.sq} </span>
//                               </li>
//                             </ul>
//                             <ul className="homes-list homes-list1 clearfix pb-1">
//                               <a href="javascript:void(0)">
//                                 <li className="the-icons">
//                                   <i className="fa fa-map-marker" />
//                                   <span>{product.address}</span>
//                                 </li>
//                               </a>
//                             </ul>
//                             <div className="price-properties footer pt-2 pb-0">
//                               <p className="bottom_price mb-0">
//                                 <i
//                                   className="fa fa-inr"
//                                   aria-hidden="true"
//                                   style={{ fontSize: 12 }}
//                                 />
//                                 {product.price}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Row>
//           <div className="text-center mb-3 mt-3">
//             <CustomPagination />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MapViewlist;
