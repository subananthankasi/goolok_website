import  { useEffect, useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import { ThreeDots } from "react-loader-spinner";
import { IMG_PATH } from "../../../Api/api";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import { useAlert } from "react-alert";
import { FaHandshakeSimple } from "react-icons/fa6";
import { PiHandshakeFill } from "react-icons/pi";


const PricePropasal = ({ id, activeTab }) => {
    const [proposalData, setProposalData] = useState([]);
    const [loadingProposal, setLoadingProposal] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [agreeLoading, setAgreeLoading] = useState(false);
    const alert = useAlert();

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
        } catch (error) {
            console.error("error", error);
            setAgreeLoading(false);
        } finally {
            setAgreeLoading(false);
            fetchProposal();
        }
    };
    const fetchProposal = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/signedview/${id}`);
            setProposalData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProposal(false);
        }
    };

    useEffect(() => {
        if (activeTab === 2) {
            fetchProposal();
        }
    }, [activeTab]);

    const fileString =
        "https://webman.co.in/goolok/uploads/enquiry/proposal/1740473401_1fd82800d0d7634e7c62.pdf";

    const viewPdf = () => {
        const pdfUrl = `${IMG_PATH}/enquiry/proposal/${proposalData[0]?.document}`;
        window.open(pdfUrl, "_blank");
    };

    return (
        <>
            {loadingProposal ? (
                <div className="mt-5" style={{ maxWidth: "400px", margin: "auto" }}>
                    <Skeleton height={150} style={{ marginBottom: "10px" }} />
                </div>
            ) : proposalData.length === 0 || !proposalData[0] ? (
                <div className="text-center mt-5">
                    <h6 className="fw-bold">Waiting for your proposal...</h6>
                    <p className="text-muted">
                        Your price proposal agreement is not yet available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="container my-4">
                        <div className="text-center mb-4">
                            <h6 className="fw-bold" style={{ fontFamily: "poppins" }}>
                                Price Proposal Agreement
                            </h6>
                            <p className="text-muted mt-1" style={{ fontFamily: "poppins" }}>
                                Here are the details for the Price Proposal Agreement...
                            </p>
                        </div>

                        <div className="row">
                            {/* Unsigned Image */}
                            <div className="col-md-6 mb-3">
                                {/* <div
                                    className="p-3 border rounded shadow-sm cardheight"
                                    style={{ minHeight: "160px" }}
                                >
                                    <a
                                        href={`${IMG_PATH}/enquiry/proposal/${proposalData[0]?.document}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={unsign}
                                            alt="Unsigned Agreement"
                                            style={{
                                                width: "100%",
                                                maxHeight: "136px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </a>
                                    <div className="d-flex mt-3 justify-content-end">
                                        <button className="btn1 w-100" onClick={() => viewPdf()}>
                                            View & Download
                                        </button>
                                    </div>
                                </div> */}
                                <div className="card" style={{ width: "250px" }}>
                                    <div
                                        className="pdf-wrapper"
                                        onClick={() =>
                                            window.open(
                                                `${IMG_PATH}enquiry/proposal/${proposalData[0]?.document}`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <embed
                                            src={`${IMG_PATH}enquiry/proposal/${proposalData[0]?.document}#toolbar=0&navpanes=0&scrollbar=0`}
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

                            {/* Signed Image */}
                            {/* <div className="col-md-6 mb-3">
                                <div className="p-3 border rounded shadow-sm cardheight">
                                    <div className="row">
                                        <div className="col-6">Name:</div>
                                        <div className="col-6">
                                            <b>{proposalData[0]?.customer}</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Unit Price:</div>
                                        <div className="col-6">
                                            <b>₹ {proposalData[0]?.proposal_unit}/Sqft</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Total Price:</div>
                                        <div className="col-6">
                                            <b>₹ {proposalData[0]?.proposal_price}</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Date:</div>
                                        <div className="col-6">
                                            <b>{DateFormateCustom(proposalData[0]?.created_at)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-6 mb-3">
                                <div className="proposalBoxAura">
                                    <div className="proposalRowSpace">
                                        <div className="labelSide">Name:</div>
                                        <div className="valueSide">
                                            <b>{proposalData[0]?.customer}</b>
                                        </div>
                                    </div>

                                    <div className="proposalRowSpace">
                                        <div className="labelSide">Unit Price:</div>
                                        <div className="valueSide">
                                            <b>₹ {proposalData[0]?.proposal_unit}/Sqft</b>
                                        </div>
                                    </div>

                                    <div className="proposalRowSpace">
                                        <div className="labelSide">Total Price:</div>
                                        <div className="valueSide">
                                            <b>₹ {proposalData[0]?.proposal_price}</b>
                                        </div>
                                    </div>

                                    <div className="proposalRowSpace">
                                        <div className="labelSide">Date:</div>
                                        <div className="valueSide">
                                            <b>{DateFormateCustom(proposalData[0]?.created_at)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {proposalData[0]?.status === "signed" ? (
                            <>
                                <div className="d-flex justify-content-center mt-4">
                                    <PiHandshakeFill
                                        className="text-center"
                                        style={{ fontSize: "45px", color: "green", textAlign: "center" }}
                                    /> </div>
                                <p
                                    style={{ fontWeight: "500", fontFamily: "poppins" }}
                                    className=" text-center text-muted mt-2"
                                >
                                    The agreement has been successfully acknowledged and
                                    confirmed.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center mb-4 text-center">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        className="mr-2"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    />
                                    &nbsp;
                                    <label htmlFor="agree" className="text-sm">
                                        I agree to the terms of the Price Proposal Agreement
                                    </label>
                                </div>

                                <div className="text-center">
                                    <button
                                        className=" mb-5"
                                        style={{
                                            minWidth: "220px",
                                            padding: "8px 12px",
                                            backgroundColor: "#0000ff",
                                            color: "white",
                                            fontWeight: "600",
                                            fontFamily: "poppins",
                                            cursor:"pointer"
                                        }}
                                        onClick={!agreeLoading ? handleAgree : undefined}
                                        disabled={agreeLoading}
                                    >
                                        {agreeLoading ? (
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
        </>
    );
};

export default PricePropasal;
