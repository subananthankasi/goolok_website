import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Sidebar } from "primereact/sidebar";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import MarginIcon from "@mui/icons-material/Margin";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IMG_PATH } from "../../Api/api";
import { Checkbox } from "rsuite";
import axiosInstance from "../../Api/axiosInstance";

const LayoutBooking = () => {
    const location = useLocation();
    const layoutData = location.state || [];
    const navigate = useNavigate();

    const [selectedPlot, setSelectedPlot] = useState(null);
    const [visible, setVisible] = useState(false);
    const [checkValue, setCheckValue] = useState(false)

    const handlePlotClick = async (plot) => {

        try {
            const response = await axiosInstance.get(`vendor/plotdetails`, {
                headers: {
                    "Gl-Status": plot.id
                }
            },);
            if (response?.data[0]?.status === "booking") return;
            if (selectedPlot?.id === response?.data[0]?.id) {
                setSelectedPlot(null);
            } else {
                // setSelectedPlot(plot);
                setSelectedPlot(response?.data[0]);
                setVisible(true)
            }
        } catch (err) {
        }
    };

    const handleBookingCancel = () => {
        navigate(-1);
    }

    const confirmBooking = () => {
        navigate('/layoutcheckout', {
            state: {
                selectedPlot,
                checkValue
            }
        });
    }
    const availableCount = layoutData?.plots?.filter((item) => (item.status !== "booking"))?.length
    return (
        <>
            <div className="layout-page" style={{ height: "100vh" }}>
                <div className="container text-center mt-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="fw-bold brand-title">{layoutData?.propertyName} </h3>
                            <div className="location-wrapper">
                                <span className="line"></span>
                                <p className="location-text mb-0">{layoutData?.taluk} </p>
                                <span className="line"></span>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex gap-3">
                                <div className="d-flex gap-1 align-items-center">
                                    <p
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            backgroundColor: "#eef1ff",
                                            border: "2px solid #0000ff",
                                        }}
                                    ></p>{" "}
                                    <span>Selected</span>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <p
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            backgroundColor: "#ffffff",
                                            border: "2px solid #cfcfe0",
                                        }}
                                    ></p>{" "}
                                    <span>Available</span>
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <p
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            backgroundColor: "#ffeaea",
                                            border: "2px solid #f37c7c",
                                        }}
                                    ></p>{" "}
                                    <span>Sold</span>
                                </div>
                            </div>
                            <p className="mt-3">
                                Total Plots : {layoutData?.plots?.length}
                                <span style={{ color: "red", fontWeight: "600" }}> |</span>{" "}
                                Available Plots : {availableCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mb-5">
                    {/* <div className="d-flex justify-content-between">
                        <p className="mb-4">
                            Total Plots : {layoutData?.plots?.length}
                            <span style={{ color: "red", fontWeight: "600" }}> ||</span>{" "}
                            Available Plots : {layoutData?.plots?.length}
                        </p>
                        <div className="d-flex gap-3">
                            <div className="d-flex gap-1 align-items-center">
                                <p
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        backgroundColor: "#eef1ff",
                                        border: "2px solid #0000ff",
                                    }}
                                ></p>{" "}
                                <span>Selected</span>
                            </div>
                            <div className="d-flex gap-1 align-items-center">
                                <p
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        backgroundColor: "#ffffff",
                                        border: "2px solid #cfcfe0",
                                    }}
                                ></p>{" "}
                                <span>Available</span>
                            </div>
                            <div className="d-flex gap-1 align-items-center">
                                <p
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        backgroundColor: "#ffeaea",
                                        border: "2px solid #f37c7c",
                                    }}
                                ></p>{" "}
                                <span>Sold</span>
                            </div>
                        </div>
                    </div> */}
                    <div className="row mt-3">
                        <div className="plot-grid">
                            {layoutData?.plots?.map((plot) => (
                                <div
                                    key={plot.id}
                                    className={`plot-card 
                                        ${plot.status === "booking" ? "sold" : ""}
                                        ${selectedPlot?.id === plot.id ? "selected" : ""}`}
                                    onClick={() => handlePlotClick(plot)}
                                >
                                    {selectedPlot?.id === plot.id && (
                                        <div className="tick-icon">
                                            <DoneAllIcon style={{ fontSize: "18px" }} />
                                        </div>
                                    )}
                                    <p> Plot No</p>
                                    <h5>{plot.plot_no}</h5>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {selectedPlot && (
                <div className="bottom-booking-card">
                    <div className="booking-info">
                        <div>
                            <p className="mb-0 small-text">Selected Plot</p>
                            <h5 className="mb-0">Plot No: {selectedPlot.plot_no}</h5>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="book-btn-cancel" onClick={handleBookingCancel}>
                                Cancel
                            </button>
                            <button className="book-btn" onClick={() => setVisible(true)}>
                                Book Now
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <Sidebar
                visible={visible}
                position="right"
                onHide={() => {setVisible(false);setCheckValue(false)}}
                style={{ width: "400px" }}
                dismissable={false}
                closeOnEscape={false}
            >
                <div className="booking-summary">
                    {selectedPlot ? (
                        <>
                            <div className="d-flex gap-2">
                                <img src={`${IMG_PATH}enquiry/gallery/${selectedPlot.image}`} alt="plot" style={{ width: "75px", height: "75px" }} />
                                <div>
                                    <p className="fredoka" style={{ fontWeight: "500" }}>{selectedPlot.propertyName} </p>
                                    <p className="fredoka mb-0 p-0 m-0" style={{ fontSize: "15px" }}><LocationOnIcon sx={{ fontSize: 16, color: "darkblue" }} /> Avadi </p>
                                    <p className="fredoka mb-0 p-0 m-0 mt-1" style={{ fontSize: "15px" }}><AspectRatioIcon sx={{ fontSize: 15, color: "darkblue" }} /> {selectedPlot?.extent_sqft} / sqft </p>
                                </div>
                            </div>

                            <div className="mt-2 fredoka d-flex justify-content-between align-items-center mb-2">
                                <p style={{ fontSize: "15px" }}>
                                    <strong>
                                        {" "}
                                        <MarginIcon />
                                    </strong>{" "}
                                    Plot No{" "}
                                </p>
                                <p>{selectedPlot.plot_no} </p>
                            </div>
                            <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <ViewInArIcon />
                                    </strong>{" "}
                                    Phase No{" "}
                                </p>
                                <p>{selectedPlot.phase_no} </p>
                            </div>
                            {/* <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <AspectRatioIcon />
                                    </strong>{" "}
                                    Area{" "}
                                </p>
                                <p>{selectedPlot.plot_no} </p>
                            </div> */}
                            <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    Rate per sqft{" "}
                                </p>
                                <p>{selectedPlot.rate_sqft} </p>
                            </div>
                             <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    Booking Amount
                                </p>
                                <p>{selectedPlot.booking_amount} </p>
                            </div>
                            <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    Plot cost{" "}
                                </p>
                                <p>{selectedPlot.plot_cost_total} </p>
                            </div>
                            <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    Development & Association cost{" "}
                                </p>
                                <p>{selectedPlot.association_cost_total} </p>
                            </div>
                             <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        <CurrencyRupeeIcon />
                                    </strong>
                                    {checkValue ? (
                                        <del>Registration cost</del>
                                    ) : (
                                        "Registration cost"
                                    )}
                                </p>
                                <p> {checkValue ? (
                                    <del>{selectedPlot.registration_total}</del>
                                ) : (
                                    selectedPlot.registration_total
                                )}   </p>
                            </div>
                           
                            {/* <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        <CurrencyRupeeIcon />
                                    </strong>
                                    {checkValue ? (
                                        <del>Registration cost</del>
                                    ) : (
                                        "Registration cost"
                                    )}
                                </p>
                                <p> {checkValue ? (
                                    <del>{selectedPlot.registration_charges}</del>
                                ) : (
                                    selectedPlot.registration_charges
                                )}   </p>
                            </div> */}
                            {/* <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    {checkValue ? (
                                        <del> Documentation cost</del>
                                    ) : (
                                        " Documentation cost"
                                    )}
                                </p>
                                <p> {checkValue ? (
                                    <del>{selectedPlot.documentation_charges}</del>
                                ) : (
                                    selectedPlot.documentation_charges
                                )}   </p>

                            </div> */}
                            {/* <div className="fredoka d-flex justify-content-between align-items-center mb-2">
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}

                                    {checkValue ? (
                                        <del> Development cost{" "}</del>
                                    ) : (
                                        " Development cost"
                                    )}
                                </p>
                                <p> {checkValue ? (
                                    <del>{selectedPlot.association_cost_total}</del>
                                ) : (
                                    selectedPlot.association_cost_total
                                )}   </p>
                            </div> */}
                            <Checkbox className="fredoka" value={checkValue} onChange={(value, checked) => setCheckValue(checked)} >Without Registration</Checkbox>
                            <div
                                className="fredoka d-flex justify-content-between align-items-center mb-2"
                                style={{ borderTop: "2px dashed #dfdfe4" }}
                            >
                                <p>
                                    <strong>
                                        {" "}
                                        <CurrencyRupeeIcon />
                                    </strong>{" "}
                                    <span style={{ fontWeight: "500" }}>Total cost{" "} </span>
                                </p>
                                <p className="" style={{ fontWeight: '500' }}>{checkValue ? selectedPlot?.total_without_registration : selectedPlot?.total_with_registration} </p>
                            </div>

                            <button
                                className="book-btn w-100 mt-3 "
                                onClick={() => confirmBooking()}
                            >
                                Confirm Booking
                            </button>
                        </>
                    ) : (
                        <p>Select a plot first</p>
                    )}
                </div>
            </Sidebar>
        </>
    );
};

export default LayoutBooking;
