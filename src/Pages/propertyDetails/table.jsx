import { useState } from "react";
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
