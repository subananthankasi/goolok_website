import React from "react";

const Location =({data,loading})=> {
  const location = data && data.map_view ? data.map_view : "";
  
  
  return (
    <div>
      <div className="property-location map">
      <p class="productdetails_heading mb-4">Location</p>
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

export default Location;


{/* <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.401379164892!2d80.23274747880527!3d13.061092048932816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526667a7d738bf%3A0xf707957536204422!2sNungambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710848542219!5m2!1sen!2sin"
width="100%"
height="350px"
style={{ border: 0 }}
allowFullScreen
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
/> */}