import React from "react";

const StreetView =({data,loading})=> {
  const location = data && data.street_view ? data.street_view : "";

  return (
    <div>
      <div className="property-location map">
        <p class="productdetails_heading mb-4 mt-4">Street View</p>
        <div className="divider-fade" /> 
        <div
            dangerouslySetInnerHTML={{
              __html: location,
            }}
          />
      </div>
    </div>
  );  
}

export default StreetView;

{/* <iframe
src="https://www.google.com/maps/embed?pb=!4v1719400822492!6m8!1m7!1s_l1ZIA7MjO_Q9RqE9Sfp-g!2m2!1d13.01085670694035!2d80.2524893449822!3f216.11178502647468!4f-6.174167437453605!5f0.7820865974627469"
width="100%"
height="350px"
style={{ border: 0 }}
allowFullScreen
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
/> */}