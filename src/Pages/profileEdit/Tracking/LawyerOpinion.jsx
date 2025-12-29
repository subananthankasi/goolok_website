import { IMG_PATH } from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";
import React, { useEffect, useState } from "react";
import unsign from "../../../assets/images/profile/unsign.jpg";
import Skeleton from "react-loading-skeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

export const LawyerOpinion = ({ id, tab }) => {
  const [lawyerData, setLawyerData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchLawyer = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/vendor/opinionview/${id}`);
      setLawyerData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 4 || tab === 1 || tab === 2) {
      fetchLawyer();
    }
  }, [tab]);
  const viewPdf = () => {
    const pdfUrl = `${IMG_PATH}enquiry/lawyer/${lawyerData[0]?.document}`;
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton height={450} style={{ marginBottom: "10px" }} />
        </div>
      ) : !lawyerData || lawyerData.length === 0 ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Lawyer Documents...</h6>
        </div>
      ) : (
        <div className="container my-4">
          <div className="text-center mt-4">
            <h6 className="fw-bold" style={{ fontFamily: "poppins" }}>
              Lawyer Opinion
            </h6>
            <p className="text-muted mt-2" style={{ fontFamily: "poppins" }}>
              Here is the opinion of the lawyer...click on below to view
            </p>
          </div>

          <div className="">
            {/* <div
              className="p-3 border rounded shadow-sm cardheight"
              style={{ minHeight: "200px", maxWidth: "250px", margin: "auto" }}
            >
              <a
                href={`${IMG_PATH}/enquiry/lawyer/${lawyerData[0]?.document}`}
                target="_blank"
              >
                <img
                  src={unsign}
                  alt="Unsigned Agreement"
                  style={{ width: "100%", maxHeight: "170px", cursor: "pointer" }}
                />
              </a>
              <div className='d-flex mt-2 justify-content-end'>
                <button className='btn1 w-100' onClick={() => viewPdf()}>View & Download </button>

              </div>
            </div> */}
            <div className="d-flex justify-content-center mt-4">
              <div className="card" style={{ width: "250px" }}>
                <div
                  className="pdf-wrapper"
                  onClick={() =>
                    window.open(
                      `${IMG_PATH}enquiry/lawyer/${lawyerData[0]?.document}`,
                      "_blank"
                    )
                  }
                >
                  <embed
                    src={`${IMG_PATH}enquiry/lawyer/${lawyerData[0]?.document}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="pdf-hidden-scroll"
                    type="application/pdf"
                  />
                </div>
                <hr className="m-0 p-0" />
                <div className="p-2 d-flex justify-content-between align-items-center">
                  <button
                    style={{
                      padding: "7px 10px",
                      backgroundColor: "#0000ff",
                      color: "white",
                      fontFamily: "poppins",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                    className="w-100"
                    onClick={() => viewPdf()}
                  >
                    View & Download{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
