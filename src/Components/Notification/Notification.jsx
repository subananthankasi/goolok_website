import {
  fetchNotificationMsg,
} from "../../Redux/Action/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


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
    </div>
  );
}

export default Notification;
