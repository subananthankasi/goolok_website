import React, { useState } from "react";
import BookingPopup from "../Booking/bookingPopup";

function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <BookingPopup isOpen={isModalOpen} closeModal={closeModal} />
      <div className="widget-boxed">
        {/* <table className="table">
          <tbody>
            <tr>
              <td>
                <div className="tabdata">
                  <i className="fa fa-building" aria-hidden="true" /> 
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div> Posted on</div>
                    <div className="smallbelow">25/03/2024</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="tabdata">
                <i class="fa-solid fa-ruler-combined"></i>
                  &nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div> 60089 sq ft</div>
                    <div className="smallbelow">Width of facing road</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="tabdata">
                  <i className="fa-solid fa-torii-gate" />{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div>No</div>
                    <div className="smallbelow">Boundary wall</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="tabdata">
                  <i className="fa-solid fa-bolt" /> &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div>Yes</div>
                    <div className="smallbelow">Electricity</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="tabdata">
                  <i className="fa-solid fa-calendar-days" />{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div>Immediately</div>
                    <div className="smallbelow">Possession</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="tabdata">
                  <i className="fa-solid fa-dungeon" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="tabdata1">
                    <div>Yes</div>
                    <div className="smallbelow">Gated Security</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table> */}
        <div className="widget-boxed-body">
          <div className="sidebar-widget author-widget2">
            <div className="agent-contact-form-sidebar">
            <p class="productdetails_heading mb-4">Booking Register</p>  
              <form name="contact_form" method="post">
              
                <input
                  type="button"
                  className="multiple-send-message" 
                  defaultValue="Schedule to Visit Plot"
                />
                <input
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal1"
                  className="multiple-send-message"
                  defaultValue="Book Now"
                  onClick={openModal}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
