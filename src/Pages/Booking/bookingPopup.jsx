import React from 'react' 
import SeatSelection from './book'

const BookingPopup =({isOpen, closeModal})=> {
  return (
    <div
    className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-xl" role="document">
      <div className="modal-content">
        <div >
          <button type="button" className="close closebutton" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
       <SeatSelection/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BookingPopup;