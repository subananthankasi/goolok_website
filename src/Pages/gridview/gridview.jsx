// import React from "react";
// import "../gridview/gridcss.css";
// import VerticalTab from "./VerticalTab";
// import ProductGrid from "./productgrid";

// function Gridview() {
//   return (
//     <>
//       <div >
//       <ProductGrid />
//       </div>
//     </>
//   );
// }

// export default Gridview;

import React from "react";
import "../gridview/gridcss.css";
import ProductGrid from "./productgrid";
import { useLocation } from "react-router-dom";

function Gridview() {
  const location = useLocation();
  const title = location.state?.title;
  const searchValue = location.state?.searchvalue || "";


  return (
    <>
      <div 
      // style={{ backgroundColor: "#efefef" }}
      >
          <div className="container-xl py-1">
            <ProductGrid landType={title} searchValue = {searchValue}/>
          </div>
      </div>
    </>
  );
}

export default Gridview;
