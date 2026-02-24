import { useEffect, useState } from "react";
import API_BASE_URL from "../../../Api/api";
import axios from "axios";
import { Skeleton } from "primereact/skeleton";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";


const TermsAndCondition = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/termspolicies`, {
        headers: {
          "Gl-Status": "termscondition",
        },
      });
      setLoading(false);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="container">
      <div className="mt-3">
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: "Terms and conditions" },
          ]}
        />
      </div>
      {loading ? (
        <>
          <div className="d-flex justify-content-end mt-5">
            <Skeleton
              height="1rem"
              width="20%"
              style={{ marginTop: 10 }}
              className="mt-2 "
            />
          </div>
          <div className="d-flex justify-content-end">
            <Skeleton
              height="1rem"
              width="20%"
              style={{ marginTop: 10 }}
              className="mt-2 "
            />
          </div>
           <Skeleton
              height="1rem"
              width="30%"
              style={{ marginTop: 10 }}
              className="mt-2 "
            />
             <Skeleton
              height={300}
              width="100%"
              style={{ marginTop: 10 }}
              className="mt-2 "
            />
             <Skeleton
              height={300}
              width="100%"
              style={{ marginTop: 10 }}
              className="mt-2 "
            />
         
        </>
      ) : (
        <>
          <div className=" mt-5">
            <p className=" text-end fw-bold">Posted as of [01-01-2025]</p>
            <p className=" text-end fw-bold">Last updated as of [01-01-2025]</p>
          </div>
          <div>
            <h2>{getData[0]?.title}</h2>
          </div>
          <div
            className="benefit-content mt-2"
            style={{ textAlign: "justify" }}
            dangerouslySetInnerHTML={{
              __html: getData[0]?.content,
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default TermsAndCondition;
