import React, { useEffect, useRef, useState } from "react";
import FinalLogo from "../../assets/images/Goolok Final Logo.png";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "../navbar/navbar.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "../../assets/bootstrap5/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../Redux/Action/LoginAction.js";
import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import API_BASE_URL, { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api.js";
import EnquiryModal from "./enquirymodal.jsx";
import Signin from "../Signin/Signin.jsx";
import { fetchUserData } from "../../Redux/Action/UserData.js";
import Notification from "../Notification/Notification.jsx";
import Wishlist from "../Notification/Wishlist.jsx";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PercentIcon from "@mui/icons-material/Percent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LoginForm from "../Login/LoginForm.jsx";
import { TbHome } from "react-icons/tb";
import { encryptData } from "../../Utils/encryptData.js";
import { Skeleton } from "primereact/skeleton";

function Navbar() {
  const alert = useAlert();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const dropdownCategoryRef = useRef(null);
  const dropdownLocationRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownCategoryRef.current &&
        !dropdownCategoryRef.current.contains(event.target)
      ) {

      }
      if (
        dropdownLocationRef.current &&
        !dropdownLocationRef.current.contains(event.target)
      ) {

      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const [activeItem, setActiveItem] = useState(" ");
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      handleItemClick(0);
    }
    if (
      location.pathname === "/properties" ||
      location.pathname === "/property_details" ||
      location.pathname === "/apartment_details"
    ) {
      handleItemClick(1);
    }
    if (location.pathname === "/profile_edit") {
      handleItemClick(4);
    }
    if (location.pathname === "/property_sale") {
      handleItemClick(2);
    }
  }, [location.pathname]);

  const logutAuth = async () => {
    try {
      await axios.get(`${LOGIN_BASE_URL}/vendor/Signout`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      await localStorage.removeItem("zxcvbnm@#");
      await dispatch(logoutAuth());
      await alert
        .success("You have been successfully logged out. See you again soon!")
        .window.location.reload();
    } catch (error) {
      console.error(error);
      await localStorage.removeItem("zxcvbnm@#");
      await localStorage.removeItem("userid");
      await localStorage.removeItem("mobile");
      await localStorage.removeItem("fcm_token");
      await localStorage.removeItem("cartId");
      await localStorage.removeItem("address");
      await localStorage.removeItem("auth");
      
      window.location.reload();
    }
  };

  const condition = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("zxcvbnm@#");
  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);

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

  //.................
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.userData);
  const loading = useSelector((state) => state.userData?.loading);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [data, setData] = useState([]);

  const fetchSuggestions = async (value) => {
    setQuery(value);
    try {
      const response = await axios.get(`${API_BASE_URL}/search/${value}`);

      const suggestions = response.data?.result || [];
      const results = response.data?.result || [];
      setFilteredSuggestions(suggestions);
      setData(results);
      setShowDropdown(true);

    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setFilteredSuggestions([]);
      setData([]);
      setShowDropdown(true);

    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate("/properties", { state: { searchvalue: query } });
      const encryptquery = encryptData(query);
      sessionStorage.setItem("location", encryptquery);
      setShowDropdown(false);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    navigate("/properties", { state: { searchvalue: value } });
    const encryptquery = encryptData(query);
    sessionStorage.setItem("location", encryptquery);
    setShowDropdown(false);
  };
  const navLocation = useLocation();
  const isActive = (path) => navLocation.pathname === path;

  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="color: blue; font-weight: 500;">${match}</span>`
    );
  };


  return (
    <>
      <EnquiryModal show={showModal} handleClose={handleClose} />
      <Signin isOpen={isModalOpen} closeModal={closeModal} />
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />

      <nav
        className="navbar navbar-expand-lg p-0  d-block "
        style={{ width: "100%", color: "white" }}
      >
        {/* Top Header */}

        {/* Tab View  and mobile view*/}
        <div className="navbar p-2 mt-2 navbar-light d-block d-lg-none">
          <div className="container-fluid d-none d-sm-flex justify-content-between align-items-center">
            {/* left Side: Offcanvas Button */}
            <div>
              <button
                className="btn p-0"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
              >
                <FontAwesomeIcon icon={faBars} size="2x" />
              </button>
            </div>
            {/* Center: Logo */}
            <div className="">
              <Link to="/">
                <img src={FinalLogo} className="logo" alt="" loading="lazy" />
              </Link>
            </div>
            {/* Search bar */}
            <div style={{ position: "relative" }}>
              <IconField iconPosition="right">
                <InputIcon
                  className="pi pi-search"
                  style={{ paddingRight: "16px", cursor: "pointer" }}
                  onClick={handleSearch}
                />
                <InputText
                  value={query}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                    if (value.trim()) fetchSuggestions(value);
                    else setShowDropdown(false);
                  }}
                  placeholder="Search property tap"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() =>
                    query && setShowDropdown(filteredSuggestions.length > 0)
                  }
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="nav-search-bar"
                />
              </IconField>
              {showDropdown && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "300px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    overflowY: "auto",
                    zIndex: 1000,
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                  }}
                  className="p-3"
                >
                  {data.length > 0 ? (
                    <>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "gray",
                          letterSpacing: "0.5px",
                          fontFamily: "poppins",
                        }}
                      >
                        Results matching
                      </p>

                      {data.map((item, index) => {
                        const isLocality =
                          item.searchName?.toLowerCase() === "locality";
                        const icon = isLocality
                          ? "pi pi-map-marker"
                          : "pi pi-home";

                        return (
                          <li
                            key={index}
                            onClick={() => handleSelect(item?.keysearch)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 10px",
                              borderBottom: "1px solid #f1f1f1",
                              cursor: "pointer",
                              transition: "background 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#f7f7f7")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <i
                              className={icon}
                              style={{
                                fontSize: "1rem",
                                color: isLocality ? "#4E9EFF" : "#F4A261",
                                marginRight: "10px",
                              }}
                            ></i>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "14px",
                                  fontFamily: "poppins",
                                  fontWeight: 500,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: highlightMatch(item?.keysearch),
                                }}
                              />
                              <small
                                style={{
                                  fontSize: "11px",
                                  color: "gray",
                                  fontFamily: "poppins",
                                }}
                              >
                                {item.searchName}
                              </small>
                            </div>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    <li
                      style={{
                        textAlign: "center",
                        padding: "12px",
                        color: "gray",
                        fontFamily: "poppins",
                        fontSize: "13px",
                      }}
                    >
                      “We could not find any results related to{" "}
                      <b>‘{query}’.”</b>
                    </li>
                  )}
                </ul>
              )}
            </div>
            {/*wishlist */}
            <div
              className="d-flex align-items-center text-end ms-2"
              style={{ gap: "7px" }}
            >
              <div>
                <Wishlist />
              </div>
              <div>
                <Notification />
              </div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleIconClick}
                sx={{ minWidth: "auto" }}
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {isAuthenticated ? (
                  <Avatar
                    src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                    sx={{ width: 28, height: 28, mr: 1 }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ color: "#1f3351" }}
                    size="2x"
                  />
                )}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleIconClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                {!isAuthenticated ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        openModal();
                      }}
                    >
                      Sign up
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        openModallogin();
                      }}
                    >
                      Login
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        navigate("/profile_edit/mybooking");
                      }}
                    >
                      <Avatar
                        src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                        sx={{ width: 28, height: 28, mr: 1 }}
                      />
                      {userData?.customer
                        ? userData?.customer?.charAt(0).toUpperCase() +
                        userData?.customer?.slice(1).toLowerCase()
                        : ""}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        handleLogout();
                      }}
                      className="text-center"
                    >
                      Logout
                    </MenuItem>
                  </>
                )}
              </Menu>

              {/* <div>
                  <AddToCard
                    visibleRight={visibleRight}
                    setVisibleRight={setVisibleRight}
                  />
                </div> */}
            </div>
          </div>

          {/* Mobile View (<576px) */}
          <div className=" d-sm-none">
            {/* ROW 1 */}
            <div
              className="d-flex mb-2"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              {/* Left: Offcanvas */}
              <div>
                <button
                  className="btn p-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasMenu"
                >
                  <FontAwesomeIcon icon={faBars} size="2x" />
                </button>
              </div>

              {/* Center Logo */}
              <div className="">
                <Link to="/">
                  <img src={FinalLogo} className="logo" alt="" loading="lazy" />
                </Link>
              </div>

              {/* Right: Spacer → makes logo center */}
              <div style={{ width: "32px" }}></div>
            </div>

            {/* ROW 2 */}
            <div className="d-flex align-items-center">
              {/* Search Left */}
              <div className="flex-grow-1 me-2">
                <div style={{ position: "relative" }}>
                  <IconField iconPosition="right">
                    <InputIcon
                      className="pi pi-search"
                      style={{ paddingRight: "16px", cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                    <InputText
                      value={query}
                      // onChange={(e) => setQuery(e.target.value)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);
                        if (value.trim()) fetchSuggestions(value);
                        else setShowDropdown(false);
                      }}
                      placeholder="Search property"
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      onFocus={() =>
                        query && setShowDropdown(filteredSuggestions.length > 0)
                      }
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                      className="nav-search-bar"
                      style={{ width: "100%" }}
                    />
                  </IconField>
                  {showDropdown && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "300px",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        overflowY: "auto",
                        zIndex: 1000,
                        padding: 0,
                        margin: 0,
                        listStyle: "none",
                      }}
                      className="p-3"
                    >
                      {data.length > 0 ? (
                        <>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "gray",
                              letterSpacing: "0.5px",
                              fontFamily: "poppins",
                            }}
                          >
                            Results matching
                          </p>

                          {data.map((item, index) => {
                            const isLocality =
                              item.searchName?.toLowerCase() === "locality";
                            const icon = isLocality
                              ? "pi pi-map-marker"
                              : "pi pi-home";

                            return (
                              <li
                                key={index}
                                onClick={() => handleSelect(item?.keysearch)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 10px",
                                  borderBottom: "1px solid #f1f1f1",
                                  cursor: "pointer",
                                  transition: "background 0.2s ease",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = "#f7f7f7")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  "transparent")
                                }
                              >
                                <i
                                  className={icon}
                                  style={{
                                    fontSize: "1rem",
                                    color: isLocality ? "#4E9EFF" : "#F4A261",
                                    marginRight: "10px",
                                  }}
                                ></i>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "black",
                                      fontSize: "14px",
                                      fontFamily: "poppins",
                                      fontWeight: 500,
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: highlightMatch(item?.keysearch),
                                    }}
                                  />
                                  <small
                                    style={{
                                      fontSize: "11px",
                                      color: "gray",
                                      fontFamily: "poppins",
                                    }}
                                  >
                                    {item.searchName}
                                  </small>
                                </div>
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <li
                          style={{
                            textAlign: "center",
                            padding: "12px",
                            color: "gray",
                            fontFamily: "poppins",
                            fontSize: "13px",
                          }}
                        >
                          “We could not find any results related to{" "}
                          <b>‘{query}’.”</b>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              {/* Right Icons */}
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px", whiteSpace: "nowrap" }}
              >
                <Wishlist />
                <Notification />
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleIconClick}
                  sx={{ minWidth: "auto" }}
                  style={{
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  {isAuthenticated ? (
                    <Avatar
                      src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                      sx={{ width: 28, height: 28 }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{ color: "#1f3351" }}
                      size="2x"
                    />
                  )}
                </Button>
                {/** MENU stays same */}
              </div>
            </div>
          </div>
        </div>

        {/* Offcanvas Menu */}
        <div className="offcanvas offcanvas-start" id="offcanvasMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Link to={"profile_edit/mybooking"}>
              <ApartmentIcon /> My Bookings
            </Link>
            <Link to={"profile_edit/service"}>
              <DesignServicesIcon /> Services
            </Link>
            <Link to={"profile_edit/notification"}>
              <NotificationsActiveIcon /> Notifications
            </Link>
            <Link to={"profile_edit/my_property"}>
              <BookmarkIcon /> My Property
            </Link>
            <Link to={"profile_edit/paymenthistory"}>
              <HistoryIcon /> Payment History
            </Link>
            <Link to={"profile_edit/customercare"}>
              <HeadsetMicIcon /> Customer Care
            </Link>
            <Link to={"profile_edit/referrals"}>
              <PercentIcon /> Referrals and Offers
            </Link>
            <Link to={"profile_edit/address"}>
              <ApartmentIcon /> Address
            </Link>
            <Link>
              <CreditCardIcon /> Payment Method
            </Link>
          </div>
        </div>

        {/* Laptop View */}

        <div className="container-xl py-1 d-none d-lg-block">
          <div className="row align-items-center">
            <div className="col-lg-2 mt-3 mb-3">
              <Link to="/">
                <img
                  src={FinalLogo}
                  className="logo nav-logo"
                  alt=""
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="col-lg-10">
              <div className="d-flex" style={{ flexDirection: "column" }}>
                <div
                  className="d-flex align-items-center justify-content-end"
                  style={{ gap: "17px" }}
                >
                  <div className="d-flex align-items-center justify-content-between nav_search_before">
                    <ul
                      className="navbar-nav d-flex  mb-lg-0 "
                      style={{
                        alignItems: "center",
                        color: "white",
                        gap: "20px",
                      }}
                    >
                      <li
                        className="nav-item d-flex gap-1"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Link
                          to={"/"}
                          className="nav-link d-flex"
                          style={{
                            color: isActive("/") ? "rgb(5, 5, 255)" : "",
                            fontWeight: isActive("/") ? "600" : "600",
                            transition: "0.3s ease",
                          }}
                        >
                          <TbHome style={{ fontSize: "23px" }} />
                          {/* Home */}
                        </Link>

                        <Link
                          to={"/properties"}
                          className="nav-link d-flex"
                          style={{
                            color: isActive("/properties")
                              ? "rgb(5, 5, 255)"
                              : "",
                            fontWeight: isActive("/properties") ? "600" : "600",
                            transition: "0.3s ease",
                          }}
                        >
                          Buy Property
                        </Link>
                      </li>
                      <li className="nav-item d-flex p-0">
                        <Link
                          to={"/sellproperties"}
                          className="nav-link d-flex"
                          style={{
                            color: isActive("/sellproperties")
                              ? "rgb(5, 5, 255)"
                              : "",
                            fontWeight: isActive("/sellproperties")
                              ? "600"
                              : "600",
                            transition: "0.3s ease",
                          }}
                        >
                          Sell Property
                        </Link>
                      </li>
                      <li className="nav-item d-flex p-0">
                        <Link
                          to={"/service"}
                          className="nav-link d-flex"
                          style={{
                            color: isActive("/service") ? "rgb(5, 5, 255)" : "",
                            fontWeight: isActive("/service") ? "600" : "600",
                            transition: "0.3s ease",
                          }}
                        >
                          Services
                        </Link>
                      </li>
                    </ul>

                    <div>
                      <div style={{ position: "relative" }}>
                        <IconField iconPosition="right">
                          <InputIcon
                            className="pi pi-search"
                            style={{ paddingRight: "16px", cursor: "pointer" }}
                            onClick={handleSearch}
                          />
                          <InputText
                            value={query}
                            // onChange={(e) => setQuery(e.target.value)}
                            onChange={(e) => {
                              const value = e.target.value;
                              setQuery(value);
                              if (value.trim()) fetchSuggestions(value);
                              else setShowDropdown(false);
                            }}
                            placeholder="Search property lap"
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSearch()
                            }
                            onFocus={() =>
                              query &&
                              setShowDropdown(filteredSuggestions.length > 0)
                            }
                            onBlur={() =>
                              setTimeout(() => setShowDropdown(false), 200)
                            }
                            className="nav-search-bar"
                          />
                        </IconField>
                        {showDropdown && (
                          <ul
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              width: "300px",
                              background: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                              overflowY: "auto",
                              zIndex: 1000,
                              padding: 0,
                              margin: 0,
                              listStyle: "none",
                            }}
                            className="p-3"
                          >
                            {data.length > 0 ? (
                              <>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    color: "gray",
                                    letterSpacing: "0.5px",
                                    fontFamily: "poppins",
                                  }}
                                >
                                  Results matching
                                </p>

                                {data.map((item, index) => {
                                  const isLocality =
                                    item.searchName?.toLowerCase() ===
                                    "locality";
                                  const icon = isLocality
                                    ? "pi pi-map-marker"
                                    : "pi pi-home";

                                  return (
                                    <li
                                      key={index}
                                      onClick={() =>
                                        handleSelect(item?.keysearch)
                                      }
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 10px",
                                        borderBottom: "1px solid #f1f1f1",
                                        cursor: "pointer",
                                        transition: "background 0.2s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                      (e.currentTarget.style.background =
                                        "#f7f7f7")
                                      }
                                      onMouseLeave={(e) =>
                                      (e.currentTarget.style.background =
                                        "transparent")
                                      }
                                    >
                                      <i
                                        className={icon}
                                        style={{
                                          fontSize: "1rem",
                                          color: isLocality
                                            ? "#4E9EFF"
                                            : "#F4A261",
                                          marginRight: "10px",
                                        }}
                                      ></i>

                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: "black",
                                            fontSize: "14px",
                                            fontFamily: "poppins",
                                            fontWeight: 500,
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: highlightMatch(
                                              item?.keysearch
                                            ),
                                          }}
                                        />
                                        <small
                                          style={{
                                            fontSize: "11px",
                                            color: "gray",
                                            fontFamily: "poppins",
                                          }}
                                        >
                                          {item.searchName}
                                        </small>
                                      </div>
                                    </li>
                                  );
                                })}
                              </>
                            ) : (
                              <li
                                style={{
                                  textAlign: "center",
                                  padding: "12px",
                                  color: "gray",
                                  fontFamily: "poppins",
                                  fontSize: "13px",
                                }}
                              >
                                “We could not find any results related to{" "}
                                <b>‘{query}’.”</b>
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-lg-block">
                    <div className="d-flex align-items-center justify-content-end">
                      <div
                        className="d-flex justify-content-center align-items-end"
                        style={{ gap: "20px" }}
                      >
                        <div>
                          <Wishlist />
                        </div>
                        <div>
                          <Notification />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    href="#"
                    className="nav-link d-flex align-items-center p-0"
                    id="navbarDropdown"
                  >
                    <div className="d-flex">
                      {!isAuthenticated ? (
                        <>
                          <Button
                            label="Sign in"
                            onClick={openModallogin}
                            style={{
                              width: "100px",
                              height: "35px",
                              background: "#0000ff",
                              border: "none",
                              boxShadow: "none",
                              color: "white",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="d-flex"
                            style={{
                              textAlign: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="d-flex align-items-center p-0 mb-0 me-1"
                              onClick={() => navigate("/profile_edit/address")}
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "45px",
                                  height: "45px",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    shape="circle"
                                    size="2.9rem"
                                  ></Skeleton>
                                ) : userData?.profile ? (
                                  <img
                                    src={`${IMG_PATH}profile/${userData.profile}`}
                                    alt="Preview"
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "45px",
                                      height: "45px",
                                      backgroundColor: "wheat",
                                      borderRadius: "50%",
                                      alignItems: "center",
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex"
                                    }}
                                  >
                                    <p style={{ fontSize: "20px" }}>{userData?.customer
                                      ?.charAt(0)
                                      ?.toUpperCase()} </p>

                                  </div>
                                )}
                              </div>
                              <span style={{ marginLeft: "10px" }}>
                                {loading ? (
                                  <Skeleton width="3.9rem"></Skeleton>
                                ) : (
                                  userData.customer?.charAt(0).toUpperCase() +
                                  userData.customer?.slice(1).toLowerCase()
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>
      {/* Footer Menu */}
      <nav className="nav1">
        <div className="nav-box">
          <ul className="nav-container">
            <li
              className={`nav__item ${activeItem === 0 ? "active" : ""}`}
              onClick={() => handleItemClick(0)}
            >
              <Link to="/" className="nav__item-link">
                <div className="nav__item-icon">
                  <HomeIcon sx={{ fontSize: 25 }} />
                </div>
                <span className="nav__item-text">Home</span>
              </Link>
            </li>
            <li
              className={`nav__item ${activeItem === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              <Link to="/properties" className="nav__item-link">
                <div className="nav__item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 15l6 -6"></path>
                    <circle
                      cx="9.5"
                      cy="9.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <circle
                      cx="14.5"
                      cy="14.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                  </svg>
                </div>
                <span className="nav__item-text">Buy Property</span>
              </Link>
            </li>

            <li
              className={`nav__item ${activeItem === 2 ? "active" : ""}`}
              onClick={() => handleItemClick(2)}
            >
              <Link to="/sellproperties" className="nav__item-link">
                <div className="nav__item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 21v-13l9 -4l9 4v13"></path>
                    <path d="M13 13h4v8h-10v-6h6"></path>
                    <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3"></path>
                  </svg>
                </div>
                <span className="nav__item-text">Sell Property</span>
              </Link>
            </li>

            <li
              className={`nav__item ${activeItem === 3 ? "active" : ""}`}
              onClick={() => handleItemClick(3)}
            >
              <Link to="/service" className="nav__item-link">
                <a href="#Settings" className="nav__item-link">
                  <div className="nav__item-icon">
                    <DesignServicesIcon sx={{ fontSize: 25 }} />
                  </div>
                  <span className="nav__item-text">Services</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
