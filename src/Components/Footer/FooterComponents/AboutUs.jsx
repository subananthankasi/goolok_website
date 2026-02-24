// import  { useEffect, useState } from "react";
// import { Skeleton } from "primereact/skeleton";
// import axios from "axios";
// import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
// import { Breadcrumb } from "antd";
// import { Link } from "react-router-dom";


// const AboutUs = () => {
//   const [getData, setGetData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchBanner = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/aboutus`);
//       setGetData(response.data?.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching land data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanner();
//   }, []);

//   return (
//     <section
//       style={{
//         background: "linear-gradient(135deg, #f9fafc, #ffffff)",
//       }}
//     >
      
//       <div className="container">
//        <div className="mt-3 mb-3">
//           <Breadcrumb
//             items={[
//               { title: <Link to="/">Home</Link> },
//               { title: "About us" },
//             ]}
//           />
//         </div>
//         <div className="d-flex justify-content-center">
//           {loading ? (
//             <Skeleton
//               height={250}
//               width="40%"
//               style={{ marginTop: 10 }}
//               className="mt-2"
//             />
//           ) : (
//             <img
//               src={`${IMG_PATH}cms/aboutus/${getData[0]?.image}`}
//               alt="About Goolok"
//               style={{
//                 maxWidth: "100%",
//                 borderRadius: "10px",
//                 boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
//                 objectFit: "cover",
//               }}
//             />
//           )}
//         </div>

//         <div className="align-items-center">
//           <div className="">
//             {loading ? (
//               <Skeleton
//                 height="2rem"
//                 width="20%"
//                 style={{ marginTop: 10 }}
//                 className="mt-2"
//               />
//             ) : (
//               <h2
//                 style={{
//                   fontWeight: "800",
//                   color: "#374550",
//                   marginBottom: "20px",
//                   fontSize: "2rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                 }}
//               >
//                 {getData[0]?.title}
//               </h2>
//             )}
//             {loading ? (
//               <Skeleton
//                 height="10rem"
//                 width="100%"
//                 style={{ marginTop: 10 }}
//                 className="mt-2"
//               />
//             ) : (
//               <div
//                 className="benefit-content mt-2"
//                 style={{
//                   color: "#555",
//                   lineHeight: "1.8",
//                   fontSize: "15px",
//                   textAlign: "justify",
//                 }}
//                 dangerouslySetInnerHTML={{
//                   __html: getData[0]?.content,
//                 }}
//               ></div>
//             )}
//             {!loading && (
//               <div
//                 className="benefit-content mt-2"
//                 style={{
//                   color: "#555",
//                   lineHeight: "1.8",
//                   fontSize: "15px",
//                   textAlign: "justify",
//                 }}
//                 dangerouslySetInnerHTML={{
//                   __html: getData[0]?.subcontent,
//                 }}
//               ></div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;
import { useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/aboutus`);
      setGetData(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f9fafc, #ffffff)",
      }}
    >
      <div className="container">
        <div className="mt-3 mb-3">
          <Breadcrumb
            items={[{ title: <Link to="/">Home</Link> }, { title: "About us" }]}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            {loading ? (
              <Skeleton
                height={300}
                style={{ marginTop: 10 }}
                className="mt-2 mb-3"
              />
            ) : (
              <img
                src={`${IMG_PATH}cms/aboutus/${getData[0]?.image}`}
                alt="About Goolok"
                style={{
                  maxWidth: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          <div className="col-md-6 align-items-center">
            <div className="">
              {loading ? (
                <Skeleton
                  height="2rem"
                  width="20%"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <h2
                  style={{
                    fontWeight: "800",
                    color: "#374550",
                    marginBottom: "20px",
                    fontSize: "2rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {getData[0]?.title}
                </h2>
              )}
              {loading ? (
                <Skeleton
                  height="10rem"
                  width="100%"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <div
                  className="benefit-content mt-2"
                  style={{
                    color: "#555",
                    lineHeight: "1.8",
                    fontSize: "15px",
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getData[0]?.content,
                  }}
                ></div>
              )}
              {/* {!loading && (
                <div
                  className="benefit-content mt-2"
                  style={{
                    color: "#555",
                    lineHeight: "1.8",
                    fontSize: "15px",
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: getData[0]?.subcontent,
                  }}
                ></div>
              )} */}
            </div>
          </div>
          {!loading && (
            <div
              className="benefit-content mt-2"
              style={{
                color: "#555",
                lineHeight: "1.8",
                fontSize: "15px",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{
                __html: getData[0]?.subcontent,
              }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
