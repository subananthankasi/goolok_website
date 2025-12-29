import React, { useEffect, useState } from "react";
import img from "../../assets/images/dummyimg.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileSideBar from "./ProfileSideBar";
import plot from "../../assets/images/villa2.jpg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import { Timeline } from "primereact/timeline";
import {
  faRulerCombined,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "primereact/badge";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Paginator } from "primereact/paginator";

const MyProfile = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <>
      <div className="container profile_edit">
        <div className="row">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h5 className="text-center" style={{ color: "#36454f" }}>
                Profile
              </h5>
              <hr className="hr-gradient"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
