import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import unsign from "../../../assets/images/profile/unsign.jpg";
import { IMG_PATH } from "../../../Api/api";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHandshakeSimple } from "react-icons/fa6";
import { PiHandshakeFill } from "react-icons/pi";

export const ApartProjectLandOwnerAgree = ({ id, tab }) => {
    const alert = useAlert();
    const [isChecked, setIsChecked] = useState(false);
    const [agreeLoading, setAgreeLoading] = useState(false);
    const [ownerData, setOwnerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchProposal = async () => {
        try {
            const response = await axiosInstance.get(
                `/vendor/apartpragreeview/${id}`
            );
            setOwnerData(response.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tab === 2) {
            fetchProposal();
        }
    }, [tab]);

    const handleAgree = async () => {
        if (!isChecked) {
            alert.error("You must agree to the terms and conditions to proceed.");
            return;
        }
        setAgreeLoading(true);
        const payload = {
            id: ownerData.id,
        };
        try {
            const response = await axiosInstance.post(
                "/vendor/apartprsignedagree",
                payload
            );
            alert.success("Agreement has been successfully sent!");
            setAgreeLoading(false);
        } catch (error) {
            alert.error("Error! Please try again!");
            setAgreeLoading(false);
        } finally {
            fetchProposal();
        }
    };
    // const postLoading = useSelector((state) => state.agreeSigned?.loading);

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
            ) : ownerData?.ownerdetails?.length === 0 ? (
                <div className="text-center mt-5">
                    <h6 className="fw-bold">Waiting for your Agreemenfft ...</h6>
                </div>
            ) : (
                <>
                    <div className="container my-4">
                        <div className="text-center mb-4">
                            <h6 className="fw-bold" style={{ fontFamily: "poppins" }}>
                                Seller Owner Agreement
                            </h6>
                            <p className="text-muted mt-2" style={{ fontFamily: "poppins" }}>
                                Here are the details for the seller owner agreement...
                            </p>
                        </div>
                        {/* <div className="row ">
                            <div className="col-md-6 mb-3">
                                <div
                                    className="p-3 border rounded shadow-sm cardheight"
                                    style={{ minHeight: "160px" }}
                                >
                                    <a
                                        href={`${IMG_PATH}/enquiry/agreement/${ownerData.document}`}
                                        target="_blank"
                                    >
                                        <img
                                            src={unsign}
                                            alt="Unsigned Agreement"
                                            style={{
                                                width: "100%",
                                                maxHeight: "100%",
                                                cursor: "pointer",
                                                height: "95%"
                                            }}

                                        />
                                    </a>
                                    <div className='d-flex  justify-content-end'>
                                        <button className='btn1 w-100' onClick={() => viewPdf()}>View & Download </button>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border rounded shadow-sm cardheight">
                                    <div className="row mt-3">
                                        <div className="col-6">Property Id :</div>
                                        <div className="col-6">
                                            <b>{ownerData?.property_id}</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Project Name:</div>
                                        <div className="col-6">
                                            <b>{ownerData?.project_name}</b>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">Approval No:</div>
                                        <div className="col-6">
                                            <b>{ownerData?.approval_no}</b>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">Price per Sq.Ft:</div>
                                        <div className="col-6">
                                            <b>{ownerData?.price_per_sqft}</b>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">Total Apartment  Cost:</div>
                                        <div className="col-6">
                                            <b>₹ {ownerData?.total_apartment_cost}</b>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
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
                                            style={{ height: "100%" }}
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
                                            <span className="ownerMetaLabel">Property Id :</span>
                                            <span className="ownerMetaValue">
                                                {ownerData?.property_id}
                                            </span>
                                        </div>
                                        <div className="ownerMetaRow">
                                            <span className="ownerMetaLabel">Project Name:</span>
                                            <span className="ownerMetaValue">
                                                {ownerData?.project_name}
                                            </span>
                                        </div>
                                        <div className="ownerMetaRow">
                                            <span className="ownerMetaLabel">Approval No:</span>
                                            <span className="ownerMetaValue">
                                                {ownerData?.approval_no}
                                            </span>
                                        </div>
                                        <div className="ownerMetaRow">
                                            <span className="ownerMetaLabel">Price per sq ft:</span>
                                            <span className="ownerMetaValue">
                                                {ownerData?.price_per_sqft}
                                            </span>
                                        </div>
                                        <div className="ownerMetaRow">
                                            <span className="ownerMetaLabel">
                                                Total Apartment Cost:
                                            </span>
                                            <span className="ownerMetaValue">
                                                ₹ {ownerData?.total_apartment_cost}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card">
                            <div className="card-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ fontSize: "13px", width: "140px" }} className="text-center">Agreement Period</th>
                                            <th style={{ fontSize: "13px", width: "140px" }} className="text-center">Agreement Starting Date</th>
                                            <th style={{ fontSize: "13px", width: "140px" }} className="text-center">Agreement Closing Date</th>
                                            <th style={{ fontSize: "13px", width: "140px" }} className="text-center">Agreement Extending Period</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ownerData?.ownerdetails?.map((item) => (
                                            <tr key={item.id}>
                                                <td style={{ fontSize: "13px" }} className="text-center">{item.agree_period}</td>
                                                <td style={{ fontSize: "13px" }} className="text-center">{DateFormateCustom(item.agree_startdate)}</td>
                                                <td style={{ fontSize: "13px" }} className="text-center">{DateFormateCustom(item.agree_closedate)}</td>
                                                <td style={{ fontSize: "13px" }} className="text-center">{item.agree_extperiod}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div> */}

                        <div className="table-responsive mt-4">
                            <table className="table premium-table align-middle">
                                <thead className="text-center">
                                    <tr>
                                        <th>Agreement Period</th>
                                        <th>Agreement Starting Date</th>
                                        <th>Agreement Closing Date</th>
                                        <th>Agreement Extending Period</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {ownerData?.ownerdetails?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.agree_period}</td>
                                            <td>{DateFormateCustom(item.agree_startdate)}</td>
                                            <td>{DateFormateCustom(item.agree_closedate)}</td>
                                            <td>{item.agree_extperiod}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {ownerData?.status == "signed" ? (
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
                                <div className="flex items-center mb-4 mt-3 text-center">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        className="mr-2"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    />
                                    &nbsp;
                                    <label htmlFor="agree" className="text-sm" style={{ fontFamily: "poppins" }}>
                                        I agree to the terms of the seller owner agreement
                                    </label>
                                </div>

                                <div className="text-center">
                                    <button
                                        className="mb-5"
                                        style={{
                                            minWidth: "220px",
                                            padding: "10px 15px",
                                            backgroundColor: "#0000ff",
                                            color: "white",
                                            fontFamily: "poppins",
                                            fontWeight: "600"
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
                    {/* )} */}
                </>
            )}
        </div>
    );
};
