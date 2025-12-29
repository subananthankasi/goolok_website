import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaUmbrella, FaHouseUser } from 'react-icons/fa';
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";
import CustomPagination from './pagination';

const ListView = () => {
  const properties = [
    {
      img: gallery3,
      price: "₹707,990",
      size: "2,230 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2 Baths",
      address: "Panama City Beach, FL",
      description: "Move in ready new construction, 3 bed, 2 bath + Flex room, single story, 2 car garage. This home backs up to the woods..."
    },
    {
      img: gallery4,
      price: "₹707,990",
      size: "1,380 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2.5 Baths",
      address: "Panama City Beach, FL",
      description: "Well-maintained single-family home with updated amenities and a spacious backyard."
    },
    {
      img: gallery3,
      price: "₹707,990",
      size: "1,113 SqFt",
      type: "Single Family",
      beds: "3 Beds",
      baths: "2 Baths",
      address: "Panama City Beach, FL",
      description: "Cozy family home close to local amenities with a modern kitchen and living space."
    },
    {
      img: gallery4,
      price: "₹707,990",
      size: "2,394 SqFt",
      type: "Attach Single",
      beds: "5 Beds",
      baths: "4.5 Baths",
      address: "Panama City Beach, FL",
      description: "Luxury home with expansive living areas and premium finishes, ideal for large families."
    }
  ];

  return (
    <div className='container mt-3'>
      {properties.map((property, index) => (
        <Card className="property-card mb-4" key={index}>
          <Row noGutters>
            <Col md={5} className="property-image">
              <div className="badge-container plot">
                <span className='badge'>JUST LISTED</span>
              </div>
              <Card.Img src={property.img} alt="Property" className="img-fluid" />
            </Col>
            <Col md={7} className="property-details">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title className="title">
                    {property.address}
                  </Card.Title>
                  <button className="price">{property.price}</button>
                </div>
                <Row className="property-features text-muted mt-2">
                    <Col xs={6}><FaRulerCombined /> {property.size}</Col>
                    <Col xs={6}><FaBed /> {property.beds}</Col>
                    <Col xs={6}><FaBath /> {property.baths}</Col>
                    <Col xs={6}><FaHouseUser/> {property.type}</Col>
                  </Row>
                {/* <Row className="property-features text-muted">
                  <Col xs={4}><FaRulerCombined /> Size <strong>{property.size}</strong></Col>
                  <Col xs={4}><FaBed /> {property.beds}</Col>
                  <Col xs={4}><FaBath /> {property.baths}</Col>
                </Row> */}
                <Card.Text className="description mt-3">
                  {property.description}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
      <div className="text-center mb-3 mt-3">
              <CustomPagination />
        </div>
    </div>
  );
};

export default ListView;




// import land from "../../assets/images/h2.jpg";
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import FilterLapView from "./FilterLapView";
// import CustomPagination from "./pagination";
// import { Link } from "react-router-dom";
// import { plotData } from "./PlotData";
// import { IMG_PATH } from "../../Api/api";


// const ListView = ({propertyData}) => {
//   const allData = propertyData?propertyData:[]

//   return (
//     <div className=" mt-3">
//       <Row>
//       {/* <Col className="col-md-4 col-lg-3 d-none d-md-block mt-2">
//       <div className="col-md-12 col-lg-12 mb-4 "  >
//                   <FilterLapView />
                
//                 </div>
//       </Col> */}
//       <Col sm={12} className="mt-2 topfilterAndView ">
//       <div className="row">
//         {allData.map((plot) => {
//             const urlName = plot.project_name.toLowerCase().replace(/ /g, '-');
//             const urlLocation = plot.project_address.toLowerCase().replace(/,/g, '-');
//           return(
//           <Link to={`/property_details/${urlName}-${urlLocation}/${plot.id}`} className=" text-dark" style={{textDecoration:"none"}}>
//             <div className="project-single" data-aos="fade-up">
//               <div className="row bg-white p-0">
//                 <div className="col-sm-12 col-lg-4 p-0">
//                   <div className="project-inner project-head">
//                     <div className="list_img">
//                       <a href="javascript:void(0)" className="homes-img">
//                         <img   src={`${IMG_PATH}/property/${plot.source_name}`} alt="img" className="hover-effect1" />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-sm-12 col-lg-8 ps-0 pe-0">
//                   <div className="homes-content">
//                     <h3>
//                       <a href="#" style={{fontSize:"16px"}}>  {plot.project_name}</a>
//                     </h3>
//                     <p className="homes-address">
//                       <i className="fa fa-map-marker" />
//                       <span> {plot.project_address} </span>
//                     </p>
//                     <ul className="list-unstyled mb-2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <li>
//                           <i className="fa-solid fa-ruler-combined"></i>  {plot.glk_totalarea} {plot.glk_totalunit}
//                         </li>
//                         <li>
//                           <i className="fa fa-inr" aria-hidden="true"></i>  {plot.admin_centprice} /sq ft
//                         </li>
//                       </ul>
//                     <ul className="list-unstyled d-flex home-table list_content">
//                       <li>
//                         <div className="tabdata">
//                           <i className="fa-solid fa-torii-gate" />
//                           &nbsp;&nbsp;&nbsp;&nbsp;
//                           <div className="tabdata1">
//                             <div className="smallbelow">No</div>  
//                             <div className="smallbelow">Boundary wall</div>
//                           </div>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="tabdata">
//                           <i className="fa-solid fa-bolt" />
//                           &nbsp;&nbsp;&nbsp;&nbsp;
//                           <div className="tabdata1">
//                             <div className="smallbelow">Yes</div>
//                             <div className="smallbelow">Electricity</div>
//                           </div>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="tabdata">
//                           <i className="fa-solid fa-dungeon" />
//                           &nbsp;&nbsp;&nbsp;&nbsp;
//                           <div className="tabdata1">
//                             <div className="smallbelow">Yes</div>
//                             <div className="smallbelow">Gated Security</div>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                     <hr />
//                     <div>
//                       <a
//                         href="/property_details"
//                         className="btn12"
//                         style={{ fontSize: 12 }}
//                       >
//                         Read More Details
//                       </a>
//                       <span className="share_icon">
//                         <i className="fa-solid fa-share" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             </Link>
//        )})}
//          <div className="text-end mb-3 mt-2">
//             <CustomPagination />
//             </div>
//       </div>
//       </Col>
     
//       </Row>
//     </div>
//   );
//   };  

//   export default ListView;