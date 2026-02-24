import { useEffect, useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { IMG_PATH } from "../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { landAgreePdfThunk } from "../../../Redux/Action/LandOwnerAgreement";
import { FaHandshakeSimple } from "react-icons/fa6";
import { PiHandshakeFill } from "react-icons/pi";

export const LandOwnerAgreement = ({ id, tab }) => {
  const alert = useAlert();
  const [isChecked, setIsChecked] = useState(false);
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProposal = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/agreeview/${id}`);
      setOwnerData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 6 || tab === 5) {
      fetchProposal();
    }
  }, [tab]);


  const handleAgree = async () => {
    if (!isChecked) {
      alert.error("You must agree to the terms and conditions to proceed.");
      return;
    }
    try {
      dispatch(landAgreePdfThunk({ id: ownerData.id }));

      // await axiosInstance.post(
      //   `/vendor/signedproposal`,
      //   { id: ownerData[0].id },

      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      alert.success("Agreement has been successfully sent!");
    } catch {
      alert.error("Error! Please try again!");
    } finally {
      fetchProposal();
    }
  };
  const postLoading = useSelector((state) => state.agreeSigned?.loading);

  const viewPdf = () => {
    const pdfUrl = `${IMG_PATH}/enquiry/agreement/${ownerData.agreement_file}`;
    window.open(pdfUrl, "_blank");
  };
  return (
    <div>
      {loading ? (
        <div className="mt-5" style={{ maxWidth: "400px", margin: "auto" }}>
          <Skeleton height={150} style={{ marginBottom: "10px" }} />
        </div>
      ) : !ownerData || ownerData.length === 0 ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Agreement ...</h6>
        </div>
      ) : (
        <>
          <div className="container my-4">
            <div className="text-center mt-4">
              <h6 className="fw-bold" style={{ fontFamily: "poppins" }}>
                Seller Owner Agreement
              </h6>
              <p className="text-muted mt-2" style={{ fontFamily: "poppins" }}>
                Here are the details for the seller owner agreement...
              </p>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "100%" }}
                >
                  <div className="card" style={{ width: "250px" }}>
                    <div
                      className="pdf-wrapper"
                      onClick={() =>
                        window.open(
                          `${IMG_PATH}enquiry/agreement/${ownerData.agreement_file}`,
                          "_blank"
                        )
                      }
                      style={{height:"100%"}}
                    >
                      <embed
                        src={`${IMG_PATH}enquiry/agreement/${ownerData.agreement_file}#toolbar=0&navpanes=0&scrollbar=0`}
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
              <div className="col-6">
                <div className="d-flex justify-content-center">
                  <div className="ownerMetaCard" style={{ width: "300px" }}>
                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Classification:</span>
                      <span className="ownerMetaValue">
                        {ownerData?.classification}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Units:</span>
                      <span className="ownerMetaValue">{ownerData?.units}</span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Price:</span>
                      <span className="ownerMetaValue">
                        ₹ {ownerData?.price}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Total Cost:</span>
                      <span className="ownerMetaValue">
                        ₹ {ownerData?.total_cost}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Road Frontage:</span>
                      <span className="ownerMetaValue">
                        {ownerData?.road_frontage}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Road Facing:</span>
                      <span className="ownerMetaValue">
                        {ownerData?.road_facing}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Road Width:</span>
                      <span className="ownerMetaValue">
                        {ownerData?.road_width}
                      </span>
                    </div>

                    <div className="ownerMetaRow">
                      <span className="ownerMetaLabel">Boundary Wall:</span>
                      <span className="ownerMetaValue">
                        {ownerData?.boundary_wall}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {ownerData?.status === "signed" ? (
              <>
                <div className="d-flex justify-content-center mt-4">
                  <PiHandshakeFill
                    className="text-center"
                    style={{ fontSize: "45px", color: "green", textAlign: "center" }}
                  /> </div>
                <p
                  style={{ fontWeight: "500", fontFamily: "poppins" }}
                  className=" text-center text-muted mt-3 mb-4"
                >
                  The agreement has been successfully acknowledged and
                  confirmed.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center mt-4 text-center">
                  <input
                    type="checkbox"
                    id="agree"
                    className="mr-2"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  &nbsp;
                  <label htmlFor="agree" className="text-sm" style={{fontFamily:"poppins"}}>
                    I agree to the terms of the seller owner agreement
                  </label>
                </div>

                <div className="text-center">
                  <button
                    className="mt-3"
                    style={{
                      minWidth: "220px",
                      padding: "10px 15px",
                      backgroundColor: "#0000ff",
                      fontFamily: "poppins",
                      color: "white",
                      fontWeight: "600"
                    }}
                    onClick={!postLoading ? handleAgree : undefined}
                    disabled={postLoading}
                  >
                    {postLoading ? (
                      <ThreeDots
                        visible={true}
                        height="20"
                        width="80"
                        color="#ffffff"
                        radius="18"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                        wrapperClass=""
                      />
                    ) : (
                      <>
                        Agree&nbsp;
                        <FaHandshakeSimple style={{ fontSize: "22px" }} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
