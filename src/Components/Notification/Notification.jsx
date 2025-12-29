import {
  fetchNotificationMsg,
  fetchNotificationMsgUpdate,
} from "../../Redux/Action/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../../Utils/encryptData";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
function Notification() {
  const token = localStorage.getItem("zxcvbnm@#");
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationData.notification
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchNotificationMsg());
    }
  }, [token]);

  const navigate = useNavigate();

  const markAsRead = async (notification) => {
    const enid = encryptData(notification.id);

    const updateData = {
      status: "true",
      id: notification.id,
    };
    try {
      await dispatch(fetchNotificationMsgUpdate(updateData));
    } catch (error) { }
    navigate("/profile_edit/notification", {
      state: { notification, showFullMessage: true },
    });
  };
  const [rowId, setRowId] = useState(null);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const handleClick = (notification) => {
    setRowId(notification.id);
    setShowFullMessage(true);
    navigate("/profile_edit/notification", {
      state: { navNotifiData: notification, navSHow: true },
    });
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

    return `few seconds ago`;
  };

  return (
    <div className="nav-item dropdown">
      <div
        style={{ textAlign: "center", alignItems: "center" }}
        className="bell-icon-wrapper nav-link  d-block align-items-center p-0"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <NotificationsNoneIcon sx={{ fontSize: 30 }} />
        {notifications.some(
          (notification) => notification.notif_read == "false"
        ) && (
            <>
              <span className="notification-dot"></span>
              <span className="wave-animation"></span>
            </>
          )}
      </div>

      <ul
        className="dropdown-menu"
        aria-labelledby="navbarDropdown"
        style={{
          minWidth: "18rem",
          padding: "0px",
          left: "-230px",
          maxHeight: "400px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {notifications.length ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              style={{ padding: "10px 10px" }}
              className={`${notification.notif_read === "false" ? "" : "notread_noti"
                } card m-1`}
              //  onClick={() => markAsRead(notification)}
              onClick={() => handleClick(notification)}
            >
              <div
                className={notification.notif_read === "false" ? "fw-bold" : ""}
              >
                <div
                  className="mb-1 d-flex justify-content-between"
                  style={{ fontSize: "13px" }}
                >
                  {notification.notif_title}
                  <div>
                    {notification.notif_type === "invoice" && (
                      <label
                        className={`badge rounded-pill px-2 py-1 ${notification.status !== "active"
                            ? "bg-success text-white"
                            : "bg-warning text-dark"
                          }`}
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                        }}
                      >
                        {" "}
                        {notification.status !== "active"
                          ? "Success"
                          : "Pending"}{" "}
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-dark text-end" style={{ fontSize: "10px",fontFamily:"poppins" }}>
                {timeAgo(notification.notif_time)}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <p
              className="p-3"
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              You’re not logged in yet — sign in to view your notifications.
            </p>
          </div>
        )}
      </ul>
      {/* <ul
        className="dropdown-menu p-0"
        aria-labelledby="navbarDropdown"
        style={{
          minWidth: "18rem",
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "0px",
          left: "-200px",
        }}
      >
        {notifications.length ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleClick(notification)}
              style={{
                padding: "12px 14px",
                margin: "6px 8px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor:
                  notification.notif_read === "false" ? "#f0f8ff" : "#ffffff",
                boxShadow:
                  notification.notif_read === "false"
                    ? "0 4px 12px rgba(0,123,255,0.1)"
                    : "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease-in-out",
              }}
              className="notification-card"
            >
              <div
                className={notification.notif_read === "false" ? "fw-bold" : ""}
              >
                <div
                  className="mb-1 d-flex justify-content-between align-items-center"
                  style={{ fontSize: "14px", lineHeight: "1.3" }}
                >
                  {notification.notif_title}
                  {notification.notif_type === "invoice" && (
                    <span
                      className={`badge rounded-pill px-2 py-1 ${
                        notification.status !== "active"
                          ? "bg-success text-white"
                          : "bg-warning text-dark"
                      }`}
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                      }}
                    >
                      {notification.status !== "active" ? "Success" : "Pending"}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="text-dark text-end"
                style={{ fontSize: "11px", color: "#666" }}
              >
                {timeAgo(notification.notif_time)}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center p-3 text-muted">
            No notifications available
          </div>
        )}

        <style>
          {`
      .dropdown-menu::-webkit-scrollbar {
        display: none;
      }

      .notification-card:hover {
        background-color: #e6f0ff;
        box-shadow: 0 6px 15px rgba(0,123,255,0.15);
        transform: translateY(-1px);
      }
    `}
        </style>
      </ul> */}
    </div>
  );
}

export default Notification;
