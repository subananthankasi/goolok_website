import React from "react"
import gallery1 from '../../assets/images/land8.jpg'
import gallery2 from '../../assets/images/land2.jpg'
import gallery3 from '../../assets/images/land3.jpg'
import gallery4 from '../../assets/images/land4.jpg'

function RecentProperties() {
  return (
    <div>
      <div className="widget-boxed mt-5">
        <div className="widget-boxed-header">
        <p class="productdetails_heading mb-4">Recent Properties</p>  
        </div>
        <div className="widget-boxed-body">
          <div className="recent-post">
            <div className="recent-main">
              <div className="recent-img">
                <a href="#">
                  <img src={gallery1} alt />
                </a>
              </div>
              <div className="info-img">
                <a href="#">
                  <h6>House Ploat</h6>
                </a>
                <p>Rs.5,000/Sq ft</p>
              </div>
            </div>
            <div className="recent-main my-4">
              <div className="recent-img">
                <a href="#">
                  <img src={gallery2} alt />
                </a>
              </div>
              <div className="info-img">
                <a href="#">
                  <h6>House Ploat</h6>
                </a>
                <p>Rs.4,500/Sq ft</p>
              </div>
            </div>
            <div className="recent-main">
              <div className="recent-img">
                <a href="#">
                  <img src={gallery3} alt />
                </a>
              </div>
              <div className="info-img">
                <a href="#">
                  <h6>House Ploat</h6>
                </a>
                <p>Rs.7,599/Sq ft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentProperties;
