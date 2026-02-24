
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
