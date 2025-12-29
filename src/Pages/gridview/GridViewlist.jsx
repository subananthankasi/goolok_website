import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";
import CustomPagination from './pagination';

function GridViewlist() {
  const properties = [
    {
      img: gallery3,
      price: "₹707,990",
      size: "2,230 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2 Baths",
      address: "248 Breakwater Boulevard # Lot 08, West Panama City Beach, FL"
    },
    {
      img: gallery4,
      price: "₹707,990",
      size: "1,380 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2.5 Baths",
      address: "16246 E Lullwater, Panama City Beach, FL"
    },
    {
      img: gallery3,
      price: "₹707,990",
      size: "1,113 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2 Baths",
      address: "1802 Alabama Ave Avenue, Lynn Haven, FL"
    },
    {
      img: gallery4,
      price: "₹707,990",
      size: "2,394 SqFt",
      type: "Attach Single",
      beds: "5 Beds",
      baths: "4.5 Baths",
      address: "508 Dement Circle # C, Panama City Beach, FL" 
    }
  ];

  return (
    <div className='container'>
    <Row className="gy-4 mt-3">
      {properties.map((property, index) => (
        <Col md={4} lg={3} key={index} className='mb-3'>
          <Card className="h-100 d-flex flex-column ">
            <div className="position-relative plot">
              <Card.Img variant="top" src={property.img} alt="Property Image" />
              <span 
                bg="secondary" 
                className="position-absolute top-0 start-0 m-2 px-3 py-1 badge"
                style={{ fontSize: '0.8rem' }}
              >
                JUST LISTED
              </span>
            </div>
            <Card.Body className="flex-grow-1">
              <Card.Title>{property.price}</Card.Title>
              <Card.Text>
                <span>{property.size}</span> - <span>{property.type}</span><br />
                <strong>{property.beds}</strong> + <strong>{property.baths}</strong><br />
                <small>{property.address}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      ))}
      <div className="text-center mb-3 mt-3">
              <CustomPagination />
        </div>
    </Row>
    </div>
  );
}

export default GridViewlist;




// import land from "../../assets/images/h2.jpg";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import FilterSidebar from "./filterSidebar";
// import { useEffect, useState } from "react";
// import FilterMobileView from "./FilterMobileView";
// import FilterLapView from "./FilterLapView";
// import CustomPagination from "./pagination";
// import { Link } from "react-router-dom";
// import { plotData } from "./PlotData";
// import { IMG_PATH } from "../../Api/api";


// const GridViewlist = ({propertyData}) => {

//   const allData = propertyData?propertyData:[]

//   return (
//     <>
//       <div className="">
//         <Row>
//           <Col className="col-sm-12  mt-4 topfilterAndView">
//             <div className="row mt-1"> 
//             {allData.map((plot) => {
//                const urlName = plot.project_name.toLowerCase().replace(/ /g, '-');
//                const urlLocation = plot.project_address.toLowerCase().replace(/,/g, '-');
//               return(
//               <div className="col-md-6 col-lg-4 col-xl-3  mb-4" key={plot.id}>
//                 <Link
//                  to={`/property_details/${urlName}-${urlLocation}/${plot.id}`}
//                   className=" text-dark"
//                   style={{ textDecoration: "none" }}
//                 >
//                   <div className="card">
//                     <div className="img-container">
//                       <img
//                         src={`${IMG_PATH}/property/${plot.source_name}`}
//                         alt="img"
//                         className="card-img-top hover-effect1"
//                       />
//                     </div>
//                     <div className="card-body" style={{ padding: "15px" }}>
//                       <h5 className="card-title" style={{ fontSize: "15px" }}>
//                       {plot.project_name}
//                       </h5>
//                       <div style={{fontSize:"12px"}}>
//                         <i className="fa fa-map-marker"></i>  {plot.project_address}
//                       </div>
//                       <hr style={{margin: "10px 0"}}/>

//                       <ul
//                         className="list-unstyled"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <li>
//                           <i className="fa-solid fa-ruler-combined"></i>{" "}
//                           {plot.glk_totalarea} {plot.glk_totalunit}
//                         </li>
//                         <li>
//                           <i className="fa fa-inr" aria-hidden="true"></i>{" "}
//                           {plot.admin_centprice} /sq ft
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//              )})}
//             </div>
//             <div className="text-end mb-3">
//               <CustomPagination />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };
// export default GridViewlist;
