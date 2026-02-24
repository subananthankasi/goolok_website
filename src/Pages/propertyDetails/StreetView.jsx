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
