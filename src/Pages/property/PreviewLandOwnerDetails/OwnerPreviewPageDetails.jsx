
const LandOwnerPreview = ({ property }) => {
    const data = property?.agreement || {};
  return (
    <ul className="" >
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Property ID</span>
        <span className="text-center">{data.property_id}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">District</span> <span>{data.district_name} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Taluk</span> <span>{data.taluk_name} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Village</span> <span>{data.village_name} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Pincode</span> <span>{data.pincode ?? ""} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Land classification</span> <span>{data.classification} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name"> Total Extent in Units</span> <span>{property?.land_extent_display} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Road Frontage</span> <span>{data.road_frontage} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Road Facing</span> <span>{data.road_facing} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Road Width</span> <span>{data.road_width} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span className="agreemnt_atriputes_name">Boundary Wall</span> <span>{data.boundary_wall} </span>
      </li>
    </ul>
  );
};

const ApartmentOwnerPre = ({ property }) => {
  const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name"> CMDA / DTCP </span> <span>{data.approval_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name"> RERA</span> <span>{data.rera_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Building approval</span> <span>{data.building_permit} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Project Name</span> <span>{data.project_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Land extent in units</span> <span>{property.land_extent_display} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Builtup area in units</span> <span>{data.builtup_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">No. of BHK</span> <span>{data.bhk_count} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name"> Floors </span> <span>{data.floor} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Total Flat Cost </span>
          <span>{data.total_apartment_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Direction </span> <span>{property.direction} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Facing</span> <span>{data.facing} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road width</span> <span>{property.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Car parking</span> <span>{data.car_parking} </span>
        </li>
      </ul>
    </div>
  );
};

const HouseOwnerPreview = ({ property }) => {
   const data = property?.agreement || {};
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Village</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name"> CMDA / DTCP </span> <span>{data.aprovalno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">RERA</span> <span>{data.rerano} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Building approval</span> <span>{data.road_frontage} </span>
        </li>
        {property.subpro_name !== "Independent House" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Project Name</span> <span>{data.projectname} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Land extent in units</span> <span>{property?.land_extent_display} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Builtup area in units</span> <span>{data.built_up_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">No. of BHK</span> <span>{data.no_bhk} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Villa type</span> <span>{data.village_type} </span>
        </li>
        {property.subpro_name === "Farm House" &&
          property.subpro_name === "Beach House" && (
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">No. of Floors </span> <span>{data.no_floors} </span>
            </li>
          )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">{`Total ${
            property?.subpro_name === "Villa" ? "Villa" : "House"
          } Cost`}</span>{" "}
          <span>{data.total_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Dimension</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Facing</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Corner Villa</span> <span>{data.corner_property} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Boundary Wall</span> <span>{data.boundary_wall} </span>
        </li>
      </ul>
    </div>
  );
};

const PlotOwnerPreview = ({ property }) => {
   const data = property?.agreement || {};
  return (
    <div> 
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">
            {" "}
            {`${
              property.subpro_name === "UnApproved Plot"
                ? "Localbody approved"
                : "CMDA / DTCP"
            } `}{" "}
          </span>{" "}
          <span>{data.aprovalno} </span>
        </li>
        {property.subpro_name !== "UnApproved Plot" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">RERA</span> <span>{data.rera_no} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Project Name</span> <span>{data.projectname} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Plot No.</span> <span>{data.plotno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Total No. of Plots</span> <span>{data.no_ofplots} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Overall project extent in units</span> <span>{data.extent_units} </span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Total plot cost</span>{" "}
          <span>{data.total_saleable} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name" >Dimension</span> <span>{data.boundary_l} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Frontage</span> <span>{data.roadfrontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Facing</span> <span>{data.boun} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road width</span> <span>{data.roadwidth} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Corner Plot</span> <span>{data.cornerproperty} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Boundary Wall</span> <span>{data.boundarywall} </span>
        </li>
      </ul>
    </div>
  );
};

const CommercialOwnerPreview = ({ property }) => {
 const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Land classification</span> <span>{data.pinc} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name"> CMDA / DTCP </span> <span>{data.aprovalno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">RERA</span> <span>{data.rerano} </span>
        </li>
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Building approval</span>{" "}
            <span>{data.road_frontage} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Project Name</span> <span>{data.projectname} </span>
        </li>

        {property?.subpro_name === "Land" && (
          <>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">Plot No </span> <span>{data.plotno} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name"> Total No. of Plots </span>{" "}
              <span>{data.no_floors} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">Overall project extent in units </span>{" "}
              <span>{data.extent_in_units} </span>
            </li>
          </>
        )}
        {property?.subpro_name !== "Land" && (
          <>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">Land extent in units</span>{" "}
              <span>{data.extent_in_units} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">Builtup area in units</span>{" "}
              <span>{data.built_up_area} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span className="agreemnt_atriputes_name">Floor</span> <span>{data.no_floors} </span>
            </li>
          </>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">{`Total ${
            property?.subpro_name === "Land" ? "Plot" : "Shop"
          } Cost`}</span>{" "}
          <span>{data.total_cost} </span>
        </li>

        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Dimension</span> <span>{data.boundary_wall} </span>
          </li>
        )}
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Direction facing</span> <span>{data.boundary_wall} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Road Facing</span> <span>{data.door_facing} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span className="agreemnt_atriputes_name">Road width</span> <span>{data.road_width} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Corner Plot</span> <span>{data.corner_property} </span>
          </li>
        )}
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Car parking </span> <span>{data.carparking} </span>
          </li>
        )}
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span className="agreemnt_atriputes_name">Boundary Wall</span> <span>{data.boundary_wall} </span>
          </li>
        )}
      </ul>
    </div>
  );
};

const LayoutOwnerPreview = ({ property }) => {
    const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Land classification</span> <span>{data.land_classification} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>
            {" "}
            {property.subpro_name === "Approved"
              ? "CMDA / DTCP"
              : " Localbody approval"}{" "}
          </span>{" "}
          <span>{data.aprovalno} </span>
        </li>
        {property.subpro_name === "Approved" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>RERA</span> <span>{data.rera_no} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.projectname} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Plot No.</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total No. of Plots</span> <span>{data.total_seleable_plots} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Overall project extent in units</span>{" "}
          <span>{data.overall_extent_unit} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total plot cost</span> <span>{data.total_seleable_cost} </span>
        </li>
        {/* <li className="list-group-item d-flex justify-content-between">
          <span>Dimension</span> <span>{data.boundary_w} </span>
        </li> */}
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Facing</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Corner Plot</span> <span>{data.corner_property} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Boundary Wall</span> <span>{data.boundary_wall} </span>
        </li>
      </ul>
    </div>
  );
};

const ApartmentProjectOwnerPreview = ({ property }) => {
  const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode ?? ""} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>CMDA / DTCP</span> <span>{data.approval_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>RERA</span> <span>{data.rera_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Building approval</span> <span>{data.road_fron} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.project_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Land extent in units</span>{" "}
          <span>{data.total_land_extent} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Builtup area in units</span>{" "}
          <span>{data.built_up_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>No. of BHK</span> <span>{data.no_of_bhk} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Floor</span> <span>{data.total_floors} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total Flat cost</span> <span>{data.total_apartment_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Direction facing</span> <span>{property?.direction} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Car parking</span> <span>{data.car_parking_cost} </span>
        </li>
      </ul>
    </div>
  );
};

export {
  ApartmentOwnerPre,
  HouseOwnerPreview,
  LandOwnerPreview,
  PlotOwnerPreview,
  CommercialOwnerPreview,
  LayoutOwnerPreview,
  ApartmentProjectOwnerPreview,
};
