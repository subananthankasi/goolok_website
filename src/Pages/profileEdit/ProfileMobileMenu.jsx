import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";

function ProfileMobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
    setOpen(false); 
  };

  return (
    <div
      style={{
        background: "#36454f",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px 16px",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">My Profile</h6>
        <span onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </span>
      </div>

      {/* Menu */}
      {open && (
        <ul className="mt-3" style={{ listStyle: "none", padding: 0 }}>
          <li onClick={() => goTo("/profile_edit/address")}>Profile</li>
          <li onClick={() => goTo("/profile_edit/mybooking")}>My Bookings</li>
          <li onClick={() => goTo("/profile_edit/service")}>Services</li>
          <li onClick={() => goTo("/profile_edit/notification")}>Notifications</li>
          <li onClick={() => goTo("/profile_edit/my_property")}>My Properties</li>
          <li onClick={() => goTo("/profile_edit/paymenthistory")}>Payment History</li>
          <li onClick={() => goTo("/profile_edit/customercare")}>Customer Care</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileMobileMenu;
