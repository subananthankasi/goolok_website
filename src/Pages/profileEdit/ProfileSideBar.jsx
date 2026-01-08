import React, { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useLocation, useNavigate } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import HistoryIcon from "@mui/icons-material/History";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import axios from "axios";
import axiosInstance from "../../Api/axiosInstance";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { logoutAuth } from "../../Redux/Action/LoginAction";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { useAlert } from "react-alert";
import profileimage from "../../assets/User-Profile-PNG-Image.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FadeLoader } from "react-spinners";
import { fetchUserData } from "../../Redux/Action/UserData";


function ProfileSideBar() {
  const token = localStorage.getItem("zxcvbnm@#");
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/profile_edit/mybooking")) {
      setActiveTab("mybooking");
    } else if (location.pathname.includes("/profile_edit/bookdetails")) {
      setActiveTab("bookdetails");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/profile_edit/address")) {
      setActiveTab("address");
    } else if (location.pathname.includes("/profile_edit/add_address")) {
      setActiveTab("add_address");
    }
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname.includes("/profile_edit/service")) {
      setActiveTab("service");
    } else if (location.pathname.includes("/profile_edit/servicedetails")) {
      setActiveTab("servicedetails");
    }
  }, [location.pathname]);

  const [profileData, setProfileData] = useState([]);
  const fetch = async () => {
    setUploadLoading(true)
    try {
      const response = await axiosInstance.get(`/vendor/Webuser`);
      setProfileData(response.data);
      setUploadLoading(false)
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setUploadLoading(false)
    }
  };

  useEffect(() => {
    if (token) {
      fetch();
    }
  }, []);
  const dispatch = useDispatch();
  const NotifyDeviceId = localStorage.getItem("NotifyDeviceId");
  const logutAuth = async () => {
    try {
      await axios.get(`${LOGIN_BASE_URL}/vendor/Signout/${NotifyDeviceId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      await localStorage.removeItem("zxcvbnm@#");
      await localStorage.removeItem("NotifyDeviceId");
      await dispatch(logoutAuth());
      await alert
        .success("You have been successfully logged out. See you again soon!")
        .window.location.reload();
    } catch (error) {
      console.error(error);
      await localStorage.removeItem("zxcvbnm@#");
      window.location.reload();
    }
  };
  const handleLogout = async () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => logutAuth(),
        },
        {
          label: "No",
        },
      ],
      closeOnClickOutside: false,
      overlayClassName: "confirmcustomAlert",
    });
  };


  const [uploadLoading, setUploadLoading] = useState(false)

  const handleImageChange = async (e) => {
    setUploadLoading(true)
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profile", file);
    formData.append("oldfile", profileData?.profile);
    try {
      const response = await axiosInstance.post(`/vendor/Webuser`, formData, {
      });
      fetch()
      setUploadLoading(false)
      dispatch(fetchUserData());
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setUploadLoading(false)
    }
  };


  const profile = profileData?.profile;
  const customerInitial = profileData?.customer?.charAt(0)?.toUpperCase() || "";
  const showInitial = profile === null;
  const showDefaultImage = profile === undefined;

  return (
    <>
      <div
        style={{
          padding: 22,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          margin: "20px 0px",
          backgroundColor: "#36454f",
          // borderRadius: "10px",
        }}
      >
        <div
          className="  gradient-custom text-center text-white"
          style={{
            borderTopLeftRadius: ".5rem",
            borderBottomLeftRadius: ".5rem",
          }}
        >

          <div
            className="Profile_upload"
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />

            <label htmlFor="image-upload" style={{ position: "relative" }}>

              {uploadLoading && (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    // background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    left: "3px",
                    zIndex: 10,
                  }}
                >
                  <FadeLoader height={15} width={4} margin={2} radius={2} color="#fff" />
                </div>
              )}
              <div style={{ position: "relative" }}>
                {profile ? (
                  /** Show uploaded image */
                  <img
                    src={`${IMG_PATH}profile/${profile}`}
                    alt="Profile"
                    style={{
                      width: "95px",
                      height: "95px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                ) : showDefaultImage ? (
                  <img
                    src={profileimage}
                    alt="Default"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                ) : (
                  <div
                    style={{
                      width: "95px",
                      height: "95px",
                      borderRadius: "50%",
                      background: "#d9d9d9",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    {customerInitial}
                  </div>
                )}

                <CameraAltIcon
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    right: "6px",
                    color: profile ? "white" : "black",
                    cursor: "pointer",
                  }}
                />
              </div>
            </label>
          </div>
          <div className="mt-3 mb-2">
            <h6 className="mb-1" style={{ color: "white", textTransform: "capitalize" }}>
              {profileData.customer ?? "-"}{" "}
            </h6>
          </div>
        </div>
        <ul className="premium-sidebar">
          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/address" ||
                location.pathname.startsWith("/profile_edit/add_address")
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/address")}
            >
              <AccountCircleIcon /> Profile
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/mybooking" ||
                location.pathname.startsWith("/profile_edit/bookdetails")
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/mybooking")}
            >
              <ApartmentIcon /> My Bookings
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/service" ||
                location.pathname.startsWith("/profile_edit/servicedetails")
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/service")}
            >
              <DesignServicesIcon /> Services
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/notification"
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/notification")}
            >
              <UnsubscribeIcon /> Notifications
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/my_property" ||
                location.pathname.startsWith("/profile_edit/property_status")
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/my_property")}
            >
              <BookmarkBorderIcon /> My Properties
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/paymenthistory"
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/paymenthistory")}
            >
              <HistoryIcon /> Payment History
            </a>
          </li>

          <li>
            <a
              className={`link ${location.pathname === "/profile_edit/customercare"
                ? "active"
                : ""
                }`}
              onClick={() => navigate("/profile_edit/customercare")}
            >
              <HeadsetMicIcon /> Customer Care
            </a>
          </li>
        </ul>

        <button
          className="btn mt-4"
          style={{
            backgroundColor: "red",
            fontWeight: "600",
            color: "white",
            width: "100%",
            fontSize: "15px",
            fontFamily: "poppins"
          }}
          onClick={handleLogout}
        >
          {" "}
          <LogoutIcon /> Logout
        </button>
        {/* </div> */}
      </div>
    </>
  );
}

export default ProfileSideBar;
