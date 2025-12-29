import React, { useState } from "react";
import "./plotselection.css";
import { Checkbox } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CgOverflow } from "react-icons/cg"; 
import gallery2 from '../../assets/images/land2.jpg';
import gallery12 from '../../assets/images/land12.jpg';
import ImageMagnifier from "./ImageMagnifier";


const seatData = [
  { id: 1, seatNumber: "A1", sqft: "1000 sq ft", booked: false, label: "Plot No : 1", price: "450000"},
  { id: 2, seatNumber: "A2", sqft: "2584 sq ft", booked: false, label: "Plot No : 2", price: "450000" },
  { id: 3, seatNumber: "A3", sqft: "658 sq ft", booked: false, label: "Plot No : 3", price: "450000" },
  { id: 4, seatNumber: "B1", sqft: "4587 sq ft", booked: false, label: "Plot No  4", price: "450000" },
  { id: 5, seatNumber: "B2", sqft: "2571 sq ft", booked: false, label: "Plot No 5", price: "450000" },
  { id: 6, seatNumber: "B3", sqft: "2684 sq ft", booked: false, label: "Plot No 6", price: "450000" },
  { id: 7, seatNumber: "B3", sqft: "2684 sq ft", booked: false, label: "Plot No 7", price: "450000" },
  { id: 8, seatNumber: "B3", sqft: "2684 sq ft", booked: false, label: "Plot No 8", price: "450000" },
  { id: 9, seatNumber: "B3", sqft: "2284 sq ft", booked: false, label: "Plot No 9", price: "450000" },
  { id: 10, seatNumber: "B3", sqft: "4284 sq ft", booked: false, label: "Plot No 10", price: "450000" },
  // { id: 9, seatNumber: "B3", sqft: 2684, booked: false },
  // { id: 10, seatNumber: "B3", sqft: 2684, booked: true },
  // { id: 11, seatNumber: "B3", sqft: 2684, booked: true },
  // { id: 12, seatNumber: "B3", sqft: 2684, booked: false },
  // { id: 13, seatNumber: "B3", sqft: 2684, booked: false },
  // { id: 14, seatNumber: "B3", sqft: 2684, booked: true },
  // { id: 15, seatNumber: "B3", sqft: 2684, booked: false },
  // { id: 16, seatNumber: "B3", sqft: 2684, booked: false },
  // { id: 17, seatNumber: "B3", sqft: 2684, booked: true },
  // { id: 18, seatNumber: "B3", sqft: 2684, booked: false },
];



const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalsqft, setTotalsqft] = useState(0);
  const [total, setTotalCost] = useState(0);

  const handleSeatSelect = (seat) => {
    const isSelected = selectedSeats.includes(seat.id);
     
    const updatedSeats = isSelected
      ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat.id)
      : [...selectedSeats, seat.id];
    setSelectedSeats(updatedSeats); 

 
    
    const total = updatedSeats.reduce((acc, currentSeatId) => {
      const seatPrice = seatData.find(
        (seat) => seat.id === currentSeatId
      )?.sqft;
      return acc + seatPrice;
    }, 0);
    setTotalsqft(total);

    const totalCost = total * 1000;
    setTotalCost(totalCost);
  };
 

  return (
   <>
    {/* <h3 className="text-center mb-4">Book Your Plot</h3>
    <hr/> */}
    <div className="row">
        <div className="col-lg-8 col-md-12 mb-3" >
          <div className="pop_img" >
          <ImageMagnifier/>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 " >
        <h3 className="text-center mb-4">Book Your Plot</h3>
        <hr/>
        <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="searchIcon"
                  style={{ height: "auto" }}
                />
                 <div className="bookingplot mt-4">
        <div >
          <div className="booking_slot">
          {seatData.map((seat) => (
            
            <div className="card mt-2 " style={{ backgroundColor: "#fff7f7", }}>
                <div className="col-12  mt-2">
                <div className="row">
                <div className="col-3" >
              <div key={seat.id} style={{ marginLeft: "10px" }}>
                <input
                  type="checkbox"
                  className="checkbox"
                  id={`seat-${seat.id}`}
                  value={seat.seatNumber}
                  checked={selectedSeats.includes(seat.id)}
                  disabled={seat.booked}
                  onChange={() => handleSeatSelect(seat)}
                />
                </div>
                </div>
               
                  <div className="col-4" >
                  <ul className="list-unstyled" >
                  <li className="">Block : 01</li>
                  <li className="the-icons "><i className="fa-solid fa-ruler-combined" /> {seat.sqft}</li>
                  </ul>
                  </div>
                  <div className="col-5">
                  <ul className="list-unstyled">
                  <li className="">{seat.label}</li>
                    <li><i className="fa fa-inr" aria-hidden="true" /> {seat.price}</li>
                  </ul>
                  </div>
            
              </div>
                 <div className="row">
                  
                 </div>
              </div>
            </div>
          ))}
          </div>
            <div className="row mt-2" style={{ textAlign:"end" }}>
              <div className="col-9 p-1">
                    <a 
                      href="#"
                      className="btn12 " 
                      // onClick={closeModal}
                      style={{ fontSize: 14, textDecoration:"none", textAlign:"end" }}
                      
                    >
                      Cancel
                    </a>
                   
                  </div>
              <div className="col-2 p-1">
              <a 
                      href="#"
                      className="btn12"
                      style={{ fontSize: 14, textDecoration:"none",textAlign:"start" }}
                    >
                      Book
                    </a>
              </div>
            </div>
        </div>
      </div>
        </div>
    </div>
   </>
  );
};

export default SeatSelection;

