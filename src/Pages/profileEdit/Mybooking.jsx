import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Paginator } from "primereact/paginator";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import cancelimg from "../../assets/cancelled-stamp-icon-vector-design-template-in-white-background-2XGEPA0.jpg";


const Mybooking = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/mybooking`, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      setBookingData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error during the request:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const events = [
    "Property booked",
    "Payment schedule",
    "Registration date",
    "Registration",
    "Property document",
  ];
  const status = [true, true, true, false, false];
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedBookingData = bookingData.slice(first, first + rows);


  const getBookingStatusUI = (status) => {
    switch (status?.toLowerCase()) {
      case "registered":
        return { text: "Completed", bg: "green" };

      case "booking":
        return { text: "In Progress", bg: "orange" };

      case "cancel":
        return { text: "Cancelled", bg: "red" };

      default:
        return null;
    }
  };
  return (
    <>
      <div style={{ paddingTop: 50 }}>
        <div>
          <h5 className="text-center" style={{ color: "#36454f" }}>
            My Bookings
          </h5>
          <hr className="hr-gradient" />
        </div>
        {loading ? (
          <>
            <Skeleton width="100%" height="260px" className="mb-2 mt-3" />
            <Skeleton width="100%" height="260px" className="mb-2" />
            <Skeleton width="100%" height="260px" className="mb-2" />
          </>
        ) : bookingData.length === 0 ? (
          <div className="text-center mt-5">
            <h6 className="mt-3 text-muted">No bookings found</h6>
            <SearchOffIcon
              className="mt-3"
              sx={{ fontSize: 43, color: "gray" }}
            />
          </div>
        ) : (
          paginatedBookingData?.map((item, index) => {
            const status = events.map((_, i) => i < item.tracker);
            return (
              <div className="mb-3" key={index}>
                <div
                  className=" border-2 p-2 "
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                  <div className="row ">
                    <div className="col-md-4">
                      <div className="">
                        <img
                          src={`${IMG_PATH}/enquiry/gallery/${item.image}`}
                          alt=""
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            height: "150px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8 " style={{ position: "relative" }}>
                      {item.booking_status?.toLowerCase() === "cancel" && (
                        <img
                          src={cancelimg}
                          alt="cancel"
                          style={{
                            width: "150px",
                            height: "150px",
                            position: "absolute",
                            right: "150px",
                            top: "20px",
                            zIndex: 1,
                            opacity: 0.3,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      <div className="d-flex justify-content-between">
                        <h6
                          className="mb-1"
                          style={{
                            fontFamily: "poppins",
                            color: "#0000ff",
                            fontSize: "19px",
                          }}
                        >
                          {item.propertyName}
                        </h6>
                        {/* <div
                          className=""
                          style={{
                            position: "absolute",
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px 10px",
                            right: "4px",
                            fontWeight: "600"
                          }}
                        >
                          Progress
                        </div> */}
                        {item.booking_status && (
                          <div
                            style={{
                              position: "absolute",
                              backgroundColor:
                                item.booking_status.toLowerCase() === "registered"
                                  ? "green"
                                  : item.booking_status.toLowerCase() === "booking"
                                    ? "#0ea5e9"
                                    : "red",
                              color: "white",
                              padding: "5px 10px",
                              right: "4px",
                              fontWeight: "600",
                              top: "10px"
                            }}
                          >
                            {item.booking_status.toLowerCase() === "registered"
                              ? "Completed"
                              : item.booking_status.toLowerCase() === "booking"
                                ? "In Progress"
                                : "Cancelled"}
                          </div>
                        )}



                        {/* {item.booking_status?.toLowerCase() === "registered" ? (
                          <Badge
                            value="Completed"
                            severity="success"
                            className="text-end"
                          ></Badge>
                        ) : item.booking_status?.toLowerCase() === "booking" ? (
                          <Badge
                            value="In Progress"
                            severity="info"
                            className="text-end"
                          ></Badge>
                        ) : item.booking_status?.toLowerCase() === "cancel" ? (
                          <Badge
                            value="Cancelled"
                            severity="danger"
                            className="text-end"
                          ></Badge>
                        ) : (
                          ""
                        )} */}


                      </div>

                      <div>
                        <div className="d-flex justify-content-between mt-4">
                          <h6
                            className="book-text mb-1"
                            style={{ fontWeight: "600", fontSize: "17px" }}
                          >
                            {item.landType}
                          </h6>
                          <p style={{ fontWeight: "600" }}>
                            BOOKING ID :{item.booking_id}{" "}
                          </p>
                        </div>
                        <h6 className="mb-2" style={{ fontSize: "15px" }}>
                          <i
                            className="fa-solid fa-ruler-combined"
                            style={{ color: "#071aa8" }}
                          ></i>{" "}
                          {item.units}
                        </h6>
                        <h6 className="mb-2" style={{ fontSize: "15px" }}>
                          <i
                            className="fa fa-map-marker"
                            style={{ color: "#071aa8" }}
                          ></i>{" "}
                          {item.village}
                        </h6>
                        <div className="d-flex align-items-center mt-3">
                          <h6
                            className=" mb-1"
                            style={{ fontWeight: "600", fontSize: "18px" }}
                          >
                            Price :{" "}
                            <span style={{ color: "#071aa8" }}>
                              {" "}
                              {item.price}{" "}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-2">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                      className="col-10"
                    >
                      {events.map((event, i) => {
                        const isCompleted = status[i];

                        return (
                          <div
                            key={event}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flex: 1,
                              position: "relative",
                              flexDirection: "column",
                            }}
                          >
                            {/* dot */}
                            <span
                              style={{
                                width: "15px",
                                height: "15px",
                                borderRadius: "50%",
                                backgroundColor: isCompleted
                                  ? "green"
                                  : "lightgray",
                                zIndex: 2,
                              }}
                            />

                            {/* line */}
                            {i < events.length - 1 && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "5px",
                                  left: "50%",
                                  width: "100%",
                                  height: "4px",
                                  backgroundColor: isCompleted
                                    ? "green"
                                    : "lightgray",
                                  zIndex: 1,
                                }}
                              />
                            )}

                            {/* label */}
                            <div
                              style={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontFamily: "poppins",
                              }}
                            >
                              <small
                                style={{ color: "#333", fontWeight: "500" }}
                              >
                                {event}
                              </small>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-2 align-items-center d-flex justify-content-center">
                      <Link
                        to={`/profile_edit/bookdetails/${item.bid}`}
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#0077B6",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.textDecoration = "none")
                        }
                      >
                        View More
                        <KeyboardDoubleArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="d-flex justify-content-center mt-4">
          {!loading && bookingData.length > 3 && (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={bookingData.length}
              onPageChange={onPageChange}
            />
          )}
        </div>
        {/* </div>
        </div> */}
      </div>
    </>
  );
};

export default Mybooking;
