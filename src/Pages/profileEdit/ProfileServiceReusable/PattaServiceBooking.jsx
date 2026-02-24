import React from 'react'
import { HiDocumentText } from 'react-icons/hi2'

const PattaServiceBooking = ({pattaData}) => {
  return (
     <div className="booking-box">
         <div className="booking-title">
           <h5>
             <HiDocumentText className="icon" /> Service Booking Details
             <span className="underline"></span>
           </h5>
         </div>
         {[
           { label: "Service ID", value: pattaData?.propertyid },
           { label: "Service Type", value: pattaData?.service_cat },
           {
             label: "Service Received On",
             value: `${pattaData?.created_at}, ${pattaData?.time}`,
           },
           { label: "Property Type", value: pattaData?.property_type },
           { label: "Sub Property Type", value: pattaData?.subpro_name },
         ].map((item, i) => (
           <div
             key={i}
             className={`row-item ${i !== 4 ? "with-border" : ""}`}
           >
             <span className="label-text">{item.label}</span>
             <span className="value-text">{item.value}</span>
           </div>
         ))}
       </div>
  )
}

export default PattaServiceBooking