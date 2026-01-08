import Box from "@mui/material/Box";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationMsg,
  fetchNotificationMsgUpdate,
} from "../../Redux/Action/NotificationAction";
import { encryptData } from "../../Utils/encryptData";
// import { truncateContent } from "../../Utils/truncateContent";
import ProfileSideBar from "./ProfileSideBar";
import { truncateContent } from "../../Utils/truncateContent";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Skeleton } from "primereact/skeleton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ShowFullNotificationMessage from "../../Components/Notification/ShowFullNotificationMessage";
import { NotificationGetThunk } from "../../Redux/Action/NotificationThunk";
import Lottie from "lottie-react";
// import groovyWalkAnimation from "./groovyWalk.json";
import groovyWalkAnimation from "../../assets/Celebrations Begin.json";

export default function TicketNotification() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { navNotifiData,navSHow } = location.state || {};
  const [showFullMessage, setShowFullMessage] = useState(false);


  const [data, setData] = useState([]);
  const notifications =
    useSelector((state) => state.notificationData.notification) || [];

  // useEffect(() => {
  //   dispatch(fetchNotificationMsg());
  // }, [dispatch]);

  const fetch = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/notification/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetch(navNotifiData?.id);
  //   if (navSHow) {
  //     setShowFullMessage(true);
  //   }
  // }, [navNotifiData?.id, navSHow]);

  useEffect(() => {
    if (navNotifiData?.id) {
      fetch(navNotifiData.id);
    }

    setShowFullMessage(!!navSHow);
  }, [navNotifiData?.id, navSHow]);


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const markAsRead = async (row) => {
    const encryptId = encryptData(row.id);
    setShowFullMessage(true);
    setLoading(true);
    fetch(row.id);

    const updateData = {
      status: "true",
      id: row.id,
    };
    try {
      await dispatch(fetchNotificationMsgUpdate(updateData));
    } catch (error) { }
  };
  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} mins ago`;

    return `${seconds} seconds ago`;
  };
  const handleBack = () => {
    setShowFullMessage(false);

    navigate(".", {
      replace: true,
      state: null,
    });
  };

  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row">
          <ProfileSideBar /> */}

      <div style={{ paddingTop: 50 }}>
        <div>
          <h5 className="text-center" style={{ color: "#36454f" }}>
            Notifications
          </h5>
          <hr className="hr-gradient" />
        </div>

        <div
          className="container"
          style={{
            maxHeight: "570px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {showFullMessage ? (
              <div
                className="card p-4"
                style={{
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #f1f8ffff, #f1f8ffff)",
                  boxShadow:
                    "0 4px 12px rgba(47, 79, 79, 0.15), inset 0 0 8px rgba(55, 69, 80, 0.05)",
                  minHeight: "260px",
                  position: "relative",
                  border: "1px solid rgba(47, 79, 79, 0.1)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {loading ? (
                  <Skeleton height="250px" className="mb-1" />
                ) : (
                  <>
                    <button
                      className="btn d-flex align-items-center justify-content-center"
                      // onClick={() => setShowFullMessage(false)}
                      onClick={handleBack}
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "#0000ff",
                        color: "#fff",
                        border: "none",
                        boxShadow: "0 4px 10px rgba(47, 79, 79, 0.25)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <ArrowBackIcon />
                    </button>

                    {/* Content */}
                    <div className="mt-5 text-center">
                      <h5
                        className="fw-bold"
                        style={{
                          color: "black",
                          fontSize: "1.25rem",
                          marginBottom: "12px",
                        }}
                      >
                        {data?.title}
                      </h5>
                      <div
                        style={{
                          height: "2px",
                          width: "60px",
                          backgroundColor: "#2f4f4f",
                          margin: "0 auto 15px",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: "1.6",
                          maxWidth: "90%",
                          margin: "0 auto",
                          color: "#374550",
                        }}
                      >
                        <i style={{ fontWeight: "500", color: "#2f4f4f" }}>
                          Note:
                        </i>{" "}
                        {data?.message}
                      </p>

                      {/* Upload Button */}
                      {data?.docstatus === "redo" &&
                        data?.type === "document" && (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/property_status/${data.enqid}`
                              )
                            }
                            className="btn shadow-sm notify-btn"
                          >
                            Upload Document
                          </button>
                        )}

                      {/* Verified Status */}
                      {data?.docstatus === "verify" && (
                        <CheckCircleOutlineIcon
                          sx={{ fontSize: 55, color: "#2e7d32" }}
                          className="mt-3"
                        />
                      )}
                      <div></div>
                      {/* Advance Payment  */}
                      <div>
                        {data?.type === "invoice" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/property_status/${data.enqid}`
                              )
                            }
                            className="btn shadow-sm notify-btn"
                          >
                            Proceed to Pay
                          </button>
                        ) : data?.type === "Advance success" ? (
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 55, color: "#2e7d32" }}
                            className="mt-3"
                          />
                        ) : (
                          ""
                        )}
                        {data?.type === "proposal" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/property_status/${data.enqid}`
                              )
                            }
                            className="btn shadow-sm notify-btn"
                          >
                            Agree
                          </button>
                        ) : data?.type === "proposal success" ? (
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 55, color: "#2e7d32" }}
                            className="mt-3"
                          />
                        ) : (
                          ""
                        )}

                        {/* legal payment */}
                        {data?.type === "legal payment" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/property_status/${data.enqid}`
                              )
                            }
                            className="btn shadow-sm notify-btn"
                          >
                            Proceed to pay
                          </button>
                        ) : data?.type === "payment success" ? (
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 55, color: "#2e7d32" }}
                            className="mt-3"
                          />
                        ) : (
                          ""
                        )}
                        {/* land agreement */}
                        {data?.type === "agreement" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/property_status/${data.enqid}`
                              )
                            }
                            className="btn shadow-sm"
                            style={{
                              backgroundColor: "#0000ff",
                              color: "white",
                              fontWeight: "600",
                              padding: "10px 35px",
                              borderRadius: "0px",
                              marginTop: "25px",
                              border: "none",
                              fontSize: "15px",
                              letterSpacing: "0.5px",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#374550")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#2f4f4f")
                            }
                          >
                            Agree
                          </button>
                        ) : data?.type === "agreement success" ? (
                          ""
                        ) : (
                          ""
                        )}

                        {data?.type === "schedule" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/profile_edit/bookdetails/${data.link}`
                              )
                            }
                            className="btn shadow-sm notify-btn"
                          >
                            view
                          </button>
                        ) : data?.type === "agreement success" ? (
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 55, color: "#2e7d32" }}
                            className="mt-3"
                          />
                        ) : (
                          ""
                        )}
                        {/* Property Live */}
                        {data?.type === "survey" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              animation: "fadeUp 1s ease-in-out",
                              position: "absolute",
                              top: "0",
                            }}
                          >
                            <Lottie
                              animationData={groovyWalkAnimation}
                              loop={true}
                              style={{
                                height: "250px",
                                width: "250px",
                                filter:
                                  "drop-shadow(0 6px 12px rgba(47, 79, 79, 0.2))",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : notifications.length ? (
              notifications?.map((notification) => (
                <div
                  className="card card1"
                  onClick={() => markAsRead(notification)}
                  key={notification.id}
                >
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-1">
                        <div className="text-center align-item-center bg_icon">
                          <NotificationsActiveIcon />
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-7">
                        <p
                          className="card-text"
                          style={{ fontSize: "14px" }}
                        >
                          <strong>
                            {notification.notif_title}
                            <span
                              className={`${notification.notif_read === "false"
                                ? "read"
                                : ""
                                }  ms-1`}
                            ></span>
                          </strong>{" "}
                          -{truncateContent(notification.notif_content, 50)}
                        </p>
                      </div>
                      <div
                        className="col-sm-12 col-lg-4 text-end text-dark"
                        style={{ fontSize: "12px" }}
                      >
                        <p className="card-text">
                          {" "}
                          {timeAgo(notification.notif_time)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-2">No notifications available</p>
            )}
          </Box>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
}
