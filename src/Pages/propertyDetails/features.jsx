import React from "react";
import Skeleton from "react-loading-skeleton";

const Features = ({ data, loading }) => {
  const adminAmtPrice =
    data?.survey && Array.isArray(data.survey) && data.survey.length > 0
      ? data.survey[0].admin_total
      : null;

      
  const amenities =
    data?.amenitiesdata &&
    Array.isArray(data.amenitiesdata) &&
    data.amenitiesdata.length > 0
      ? data.amenitiesdata
      : null;

  return (
    <>
      <div className="single homes-content details mb-30 laptop_feature">
        <p class="productdetails_heading mb-4">Property Details</p>
        <ul className="homes-list clearfix">
          <li>
            <span className="font-weight-bold mr-1">Property ID:</span>
            <span className="det"> {data.subpro_name}</span>
          </li>
          <li>
            <span className="font-weight-bold mr-1">Property Type:</span>
            <span className="det"> {data.subpro_name}</span>
          </li>
          <li>
            <span className="font-weight-bold mr-1">Property status:</span>
            <span className="det"> For Sale</span>
          </li>
          <li>
            <span className="font-weight-bold mr-1">Property Price:</span>
            <span className="det"> ₹.{adminAmtPrice}</span>
          </li>
        </ul>

        <p class="productdetails_heading mb-4 mt-5">Amenities</p>
        <div className="row amenities">
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <div className="col-6 col-md-4 mt-3"> 
                  <span> 
                    <Skeleton height={15} />
                  </span>
                </div>
              ))
          ) : (
            <>
              {amenities?.map((item) => {
                return (
                  <div className="col-6 col-md-4 mt-3">
                    <i className="fa-solid fa-charging-station" />
                    <span>{item.amenities}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="mobile_feature">
        <div className="single homes-content details mb-30">
          <p class="productdetails_heading mb-4">Property Details</p>
          <div className="d-flex">
            <h3>
              <i
                className="fa fa-inr"
                aria-hidden="true"
                style={{ fontSize: 15 }}
              />
              75 Lac
            </h3>
            <h6 className="ms-4">
              <i
                className="fa fa-inr"
                aria-hidden="true"
                style={{ fontSize: 15 }}
              />
              2,818/sqft
            </h6>
          </div>

          <span class="badge badge-success">Save 50% (₹6 Lac)</span>
          <div className="mt-4">
            2 BHK House For Sale in Nungambakkam, Chennai{" "}
          </div>

          <div className="mt-4 d-flex">
            <button className="mobileview_button">Visit</button>
            <button className="mobileview_button">Book Now</button>
          </div>

          <p class="productdetails_heading mb-4 mt-5">Amenities</p>

          <div className="row amenities">
            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-charging-station" />
              <span>Electrical trench</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-water" />
              <span>Storm water drain</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-tower-observation" />
              <span>LED Street Lights</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-tree" />
              <span>Avenue trees</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-torii-gate" />
              <span>Entry portal with gate</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-shield-halved" />
              <span>Security cabin</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-regular fa-calendar-days" />
              <span>Ready to construct</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-group-arrows-rotate" />
              <span>Hopscotch</span>
            </div>

            <div className="col-12 col-md-4 mt-3">
              <i className="fa-solid fa-road" />
              <span>Elevated Blacktop Roads</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
