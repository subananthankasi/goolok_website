import React, { useEffect, useRef, useState } from "react";
import DocumentVerification from "./DocumentVerification";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import NotFound from "../../NotFound";
import { encryptData } from "../../../Utils/encryptData";
import Skeleton from "react-loading-skeleton";
import ProfileSideBar from "../ProfileSideBar";
import "../../SaleProperty/sales.css";
import { ThreeDots } from "react-loader-spinner";
import unsign from "../../../assets/images/profile/unsign.jpg";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import { IMG_PATH } from "../../../Api/api";
import { useAlert } from "react-alert";
import { FaHandshakeSimple } from "react-icons/fa6";
import "./Trackingcss.css";
import { InvoicePayment } from "./InvoicePayment";
import { LawyerOpinion } from "./LawyerOpinion";
import { FMBSketch } from "./FMBSketch";
import { LandOwnerAgreement } from "./LandOwnerAgreement";
import { PaymentSuccess } from "../../PaymentGateway/PaymentResponse";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/images/Goolok Final Logo copy.png";
import { Divider, Steps } from "antd";
import AdvancePayment from "./AdvancePayment";
import PricePropasal from "./PricePropasal";
import { ApartLandOwnerAgreement } from "./ApartLandOwnerAgreement";
import { PlotLandOwnerAgrement } from "./PlotLandOwnerAgrement";
import { HouseLandOwnerAgreement } from "./HouseLandOwnerAgreement";
import { LayoutLandOwnerAgreement } from "./LayoutLandOwnerAgreement";
import { CommercialLandOwnerAgreement } from "./CommercialLandOwnerAgreement";
import { ApartProjectLandOwnerAgree } from "./ApartProjectLandOwnerAgree";

function Tracking() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchError, setFetchError] = useState(false);
  const [data, setData] = useState({});
  const [invoiceData, setInvoiceData] = useState([]);
  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/enquiry/${id}`);
      setData(response.data);
      setInvoiceData(response.data);
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const isApartment =
    data[0]?.property_type === "Apartment" ||
    data[0]?.property_type === "Plot" ||
    // data[0]?.property_type === "Layout" ||
    data[0]?.property_type === "Commercial" ||
    // data[0]?.property_type === "Apartment Project" ||
    data[0]?.property_type === "House";

  const isAproject = data[0]?.property_type === "Apartment Project";
  const isLayout = data[0]?.property_type === "Layout";


  const statusToStepIndex = isApartment
    ? {
        null: 0,
        Document_verify: 1,
        Invoice_verify: 2,
        Proposal_verify: 3,
        Payment_verify: 4,
        Lawyer_verify: 5,
        Survey_verify: 5,
        Ownwer_agree: 6,
      }
    : isAproject
    ? {
        null: 0,
        Document_verify: 1,
        Lawyer_verify: 2,
        Ownwer_agree: 3,
      }
    : isLayout
    ? {
        null: 0,
        Document_verify: 1,
        Invoice_verify: 2,
        Lawyer_verify: 3,
        Ownwer_agree: 4,
      }
    : {
        null: 0,
        Document_verify: 1,
        Invoice_verify: 2,
        Proposal_verify: 3,
        Payment_verify: 4,
        Lawyer_verify: 5,
        Survey_verify: 6,
        Ownwer_agree: 7,
      };

  const currentStatus = data[0]?.dpt_status;
  let currentStepIndex = statusToStepIndex[currentStatus] ?? null;
  const [activeTab, setActiveTab] = useState(currentStepIndex ?? 0);

  useEffect(() => {
    if (currentStepIndex !== null) {
      if (isApartment) {
        setActiveTab(currentStepIndex === 6 ? 5 : currentStepIndex);
      } else if (isAproject) {
        setActiveTab(currentStepIndex === 3 ? 2 : currentStepIndex);
      } else if (isLayout) {
        setActiveTab(currentStepIndex === 4 ? 3 : currentStepIndex);
      } else {
        setActiveTab(currentStepIndex === 7 ? 6 : currentStepIndex);
      }
    }
  }, [currentStatus]);

  const handleTabChange = (tab) => {
    if (tab <= currentStepIndex) {
      if (activeTab === tab) {
        setActiveTab(-1);

        setTimeout(() => setActiveTab(tab), 1000);
      } else {
        setActiveTab(tab);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id, activeTab]);

  // tab 3 api
  const [proposalData, setProposalData] = useState([]);
  const [loadingProposal, setLoadingProposal] = useState(true);
  const fetchProposal = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/signedview/${id}`);
      setProposalData(response.data);
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoadingProposal(false);
    }
  };

  useEffect(() => {
    if (activeTab == 2) {
      fetchProposal();
    }
  }, [activeTab]);

  const alert = useAlert();
  const [isChecked, setIsChecked] = useState(false);
  const [agreeLoading, setAgreeLoading] = useState(false);

  const handleAgree = async () => {
    if (!isChecked) {
      alert.error("You must agree to the terms and conditions to proceed.");
      return;
    }
    setAgreeLoading(true);

    try {
      await axiosInstance.post(
        `/vendor/signedproposal`,
        { id: proposalData[0].id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert.success("Agreement has been successfully sent!");
    } catch {
      alert.error("Error! Please try again!");
    } finally {
      setAgreeLoading(false);
      fetchProposal();
    }
  };

  const fetchData = async () => {
    const ids = data[0]?.advance?.id;

    try {
      const response = await axiosInstance.get(`/vendor/notification/${ids}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const contentRef = useRef();
  const steps = isApartment
    ? [
        {
          title: "Document Verification",
          component: (
            <DocumentVerification docdata={data[0]?.docdata} fetch={fetch} />
          ),
        },
        { title: "Advance Payment", component: <AdvancePayment id={id} /> },
        {
          title: "Price Proposal",
          component: <PricePropasal id={id} activeTab={activeTab} />,
        },
        {
          title: "Invoice Payment",
          component: <InvoicePayment id={id} tab={activeTab} />,
        },
        {
          title: "Legal Opinion",
          component: <LawyerOpinion id={id} tab={activeTab} />,
        },
        // { title: "Land Owner Agreement", component: <ApartLandOwnerAgreement id={id} tab={activeTab} /> },
        {
          title: "Seller Owner Agreement",
          component:
            data[0]?.property_type === "Plot" ? (
              <PlotLandOwnerAgrement id={id} tab={activeTab} />
            ) : data[0]?.property_type === "House" ? (
              <HouseLandOwnerAgreement id={id} tab={activeTab} />
            ) : data[0]?.property_type === "Layout" ? (
              <LayoutLandOwnerAgreement id={id} tab={activeTab} />
            ) : data[0]?.property_type === "Commercial" ? (
              <CommercialLandOwnerAgreement id={id} tab={activeTab} />
            ) : data[0]?.property_type === "Apartment Project" ? (
              <ApartProjectLandOwnerAgree id={id} tab={activeTab} />
            ) : (
              <ApartLandOwnerAgreement id={id} tab={activeTab} />
            ),
        },
      ]
    : isAproject
    ? [
        {
          title: "Document Verification",
          component: (
            <DocumentVerification docdata={data[0]?.docdata} fetch={fetch} />
          ),
        },

        {
          title: "Legal Opinion",
          component: <LawyerOpinion id={id} tab={activeTab} />,
        },
        {
          title: "Seller Owner Agreement",
          component: <ApartProjectLandOwnerAgree id={id} tab={activeTab} />,
        },
      ]
    : isLayout
    ? [
        {
          title: "Document Verification",
          component: (
            <DocumentVerification docdata={data[0]?.docdata} fetch={fetch} />
          ),
        },
        { title: "Advance Payment", component: <AdvancePayment id={id} /> },
        {
          title: "Legal Opinion",
          component: <LawyerOpinion id={id} tab={activeTab} />,
        },
        {
          title: "Seller Owner Agreement",
          component: <LayoutLandOwnerAgreement id={id} tab={activeTab} />,
        },
      ]
    : [
        {
          title: "Document Verification",
          component: (
            <DocumentVerification docdata={data[0]?.docdata} fetch={fetch} />
          ),
        },
        { title: "Advance Payment", component: <AdvancePayment id={id} /> },
        {
          title: "Price Proposal",
          component: <PricePropasal id={id} activeTab={activeTab} />,
        },
        {
          title: "Invoice Payment",
          component: <InvoicePayment id={id} tab={activeTab} />,
        },
        {
          title: "Legal Opinion",
          component: <LawyerOpinion id={id} tab={activeTab} />,
        },
        {
          title: "FMB Sketch",
          component: <FMBSketch id={id} tab={activeTab} />,
        },
        {
          title: "Seller Owner Agreement",
          component: <LandOwnerAgreement id={id} tab={activeTab} />,
        },
      ];
  return (
    <>
      {fetchError ? (
        <NotFound />
      ) : (
        // <div className="container profile_edit">
        //   <div className="row w-100">
        //     <ProfileSideBar />

            <div className="" style={{ margin: "20px 0px" }}>
              <div className="shadow cardheight">
                <div className="row">
                  {/* <div className="col-lg-4 ">
                    <div
                      className="rounded-0 p-4 property_tracking"
                      style={{
                        height: "100%",
                        borderRight: "1px solid #00000042",
                      }}
                    >
                      <div className="row">
                        <ul
                          className="nav nav-pills flex-column"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "1" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(1)}
                              role="tab"
                            >
                              Document Verification
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "2" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(2)}
                              role="tab"
                              aria-controls="2"
                            >
                              Advance Payment
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "3" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(3)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "3"}
                            >
                              Price Proposal
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "4" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(4)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "4"}
                            >
                              Invoice Payment
                            </a>
                          </li>


                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "5" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(5)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "5"}
                            >
                              Lawyer Opinion
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "6" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(6)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "6"}
                            >
                              FMB sketch
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "7" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(7)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "7"}
                            >
                              Land Owner Agreement
                            </a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>  */}

                  <div className="col-lg-4 ">
                    <div
                      className="rounded-0 p-4 property_tracking"
                      style={{
                        height: "100%",
                        borderRight: "1px solid #00000042",
                      }}
                    >
                      {/* <Steps
                        current={currentStepIndex}
                        direction="vertical"
                        progressDot={(dot, { index }) => {
                          const isActive = index <= currentStepIndex;
                       
                          return (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                           
                              {index !== 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: -32,
                                    width: 2,
                                    height: 24,
                                    backgroundColor: index <= currentStepIndex ? "rgb(0, 97, 0)" : "#d9d9d9",
                                    
                                  }}
                                />
                              )}
                              
                              <span
                                style={{
                                  width: 12,
                                  height: 12,
                                  backgroundColor: isActive ? "rgb(0, 97, 0)" : "#d9d9d9",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              />
                            </div>
                          );
                        }}
                        onChange={(tab) => {
                          if (tab <= currentStepIndex) {
                            handleTabChange(tab);
                          }
                        }}
                        items={[
                          { title: <span style={{ color: activeTab === 0 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(0)}>Document Verification</span> },
                          { title: <span style={{ color: activeTab === 1 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(1)}>Advance Payment</span> },
                          { title: <span style={{ color: activeTab === 2 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(2)}>Price Proposal</span> },
                          { title: <span style={{ color: activeTab === 3 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(3)}>Invoice Payment</span> },
                          { title: <span style={{ color: activeTab === 4 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(4)}>Lawyer Opinion</span> },
                          { title: <span style={{ color: activeTab === 5 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(5)}>FMB Sketch</span> },
                          { title: <span style={{ color: activeTab === 6 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(6)}>Land Owner Agreement</span> },
                        ]}
                      /> */}
                      <Steps
                        current={currentStepIndex ?? -1}
                        direction="vertical"
                        progressDot={(dot, { index }) => {
                          const isActive = index <= currentStepIndex;
                          const isDotGreen =
                            index <= currentStepIndex - 1 ||
                            currentStepIndex === 7;
                          const isLineGreen = index <= currentStepIndex;

                          return (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              {/* Line */}
                              {index !== 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: -32,
                                    width: 2,
                                    height: 24,
                                    backgroundColor: isLineGreen
                                      ? "rgb(0, 97, 0)"
                                      : "#d9d9d9",
                                  }}
                                />
                              )}

                              {/* Dot */}
                              <span
                                style={{
                                  width: 12,
                                  height: 12,
                                  backgroundColor: isDotGreen
                                    ? "rgb(0, 97, 0)"
                                    : "#d9d9d9",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              />
                            </div>
                          );
                        }}
                        onChange={(tab) => {
                          if (tab <= currentStepIndex) {
                            handleTabChange(tab);
                          }
                        }}
                        // items={[
                        //   { title: <span style={{ color: activeTab === 0 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(0)}>Document Verification</span> },
                        //   { title: <span style={{ color: activeTab === 1 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(1)}>Advance Payment</span> },
                        //   { title: <span style={{ color: activeTab === 2 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(2)}>Price Proposal</span> },
                        //   { title: <span style={{ color: activeTab === 3 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(3)}>Invoice Payment</span> },
                        //   { title: <span style={{ color: activeTab === 4 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(4)}>Lawyer Opinion</span> },
                        //   { title: <span style={{ color: activeTab === 5 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(5)}>FMB Sketch</span> },
                        //   { title: <span style={{ color: activeTab === 6 ? "rgb(6, 6, 167)" : "black" }} onClick={() => handleTabChange(6)}>Land Owner Agreement</span> },
                        // ]}
                        items={steps.map((step, index) => ({
                          title: (
                            <span
                              style={{
                                color:
                                  activeTab === index
                                    ? "#0000ff"
                                    : "black",
                              }}
                              onClick={() => handleTabChange(index)}
                            >
                              {step.title}
                            </span>
                          ),
                        }))}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-4 ">
                    <div
                      className="rounded-0 p-4 property_tracking"
                      style={{
                        height: "100%",
                        borderRight: "1px solid #00000042",
                      }}
                    >
                      <div className="row">
                        <ul
                          className="nav nav-pills flex-column"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "1" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(1)}
                              role="tab"
                            >
                              Document Verification
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "2" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(2)}
                              role="tab"
                              aria-controls="2"
                            >
                              Advance Payment
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "3" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(3)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "3"}
                            >
                              Price Proposal
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "4" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(4)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "4"}
                            >
                              Invoice Payment
                            </a>
                          </li>


                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "5" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(5)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "5"}
                            >
                              Lawyer Opinion
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "6" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(6)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "6"}
                            >
                              FMB sketch
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab == "7" ? "active_status" : ""
                                }`}
                              onClick={() => handleTabChange(7)}
                              role="tab"
                              aria-controls="property"
                              aria-selected={activeTab === "7"}
                            >
                              Land Owner Agreement
                            </a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div> */}

                  {loading ? (
                    Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div className="col-md-2 mt-3 p-4 ">
                          <Skeleton
                            height={100}
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      ))
                  ) : (
                    // <div className="col-lg-8">
                    //   <div className="ca rd p-4 cardheight">
                    //     <div
                    //       className={`tab-pane fade ${activeTab === 0 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <DocumentVerification docdata={data[0]?.docdata} fetch={fetch} />
                    //     </div>

                    //     <div
                    //       className={`tab-pane fade ${activeTab === 1 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <AdvancePayment id={id} />

                    //     </div>
                    //     <div
                    //       className={`tab-pane fade ${activeTab === 2 ? "show active" : "d-none"}`}
                    //     >
                    //       <PricePropasal id={id} activeTab={activeTab} />
                    //     </div>

                    //     <div
                    //       className={`tab-pane fade ${activeTab === 3 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <InvoicePayment id={id} tab={activeTab} />

                    //     </div>

                    //     <div
                    //       className={`tab-pane fade ${activeTab === 4 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <LawyerOpinion id={id} tab={activeTab} />

                    //     </div>

                    //     <div
                    //       className={`tab-pane fade ${activeTab === 5 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <FMBSketch id={id} tab={activeTab} />

                    //     </div>

                    //     <div
                    //       className={`tab-pane fade ${activeTab === 6 ? "show active" : "d-none"
                    //         }`}
                    //     >
                    //       <LandOwnerAgreement id={id} tab={activeTab} />

                    //     </div>

                    //   </div>
                    // </div>
                    <div className="col-lg-8">
                      <div className="card p-4 cardheight">
                        {steps.map((step, index) => (
                          <div
                            key={index}
                            className={`tab-pane fade ${
                              activeTab === index ? "show active" : "d-none"
                            }`}
                          >
                            {step.component}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            {/* </div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default Tracking;
