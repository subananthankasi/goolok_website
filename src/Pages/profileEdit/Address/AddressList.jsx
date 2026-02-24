import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../Redux/Action/UserData";
import { FaEdit } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { Skeleton } from "primereact/skeleton";
import { useAlert } from "react-alert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GradeIcon from '@mui/icons-material/Grade';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


const AddressList = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [getLoading, setGetLoading] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phone: "",
  });
  const userData = useSelector((state) => state.userData.userData);

  const fetch = async () => {
    setGetLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/address`);
      setGetData(response.data);
      setGetLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setGetLoading(false);
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  const openDelete = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `/vendor/address/${deleteId}`
      );
      setDeleteDialog(false);
      fetch();
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  const handleEdit = (item) => {
    navigate("/profile_edit/edit_address", { state: { itemData: item } });
  };

  const [state, setState] = useState([]);
  const stateFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/state`);
      setState(response.data);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };
  useEffect(() => {
    stateFetch();
  }, []);
  const handleEditName = () => {
    setEditDialog(true);
    setFormData({
      name: userData?.customer ?? "",
      phone: userData?.phone ?? "",
      mail: userData?.mail ?? "",
    });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const validateForm = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Email
    if (!formData.mail.trim()) {
      newErrors.mail = "Email is required";
    } else if (!validateEmail(formData.mail)) {
      newErrors.mail = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      await axiosInstance.post("/vendor/userup", {
        mail: formData.mail,
        username: formData.name,
        mobile: formData.phone,
      });
      setLoading(false);
      alert.success("Your profile has been updated successfully.!");
      dispatch(fetchUserData());
      setEditDialog(false);
    } catch (error) {
      console.error("Error posting data", error);
      setLoading(false);
    }
  };

  const handlePrimaryAddress = async (id) => {
    try {
      await axiosInstance.put(`/vendor/address/${id}`);
      alert.success("Successfull set us primary address!");
      fetch();
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setGetLoading(false);
    }
  };

  return (
    <>
      <div style={{ paddingTop: 50 }} className="p-0 m-0 mt-3">
        <div>
          <h5 className="text-center" style={{ color: "#36454f" }}>
            Profile
          </h5>
          <hr className="hr-gradient" />
        </div>
        <div className="mt-4">
          {getLoading ? (
            <>
              <Skeleton height="200px" className="mb-2" />
              <Skeleton height="60px" className="mb-2" />
              <Skeleton height="140px" className="mb-2" />
              <Skeleton height="140px" className="mb-2" />
            </>
          ) : (
            <>
              <div
                style={{
                  borderLeft: "5px solid #3454ff",
                  padding: "15px 18px",
                  borderRadius: "12px",
                  background: "#f7f8ff",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
                  fontFamily: "poppins",
                }}
                className="mb-3"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Profile Overview
                  </h4>
                  <FaEdit
                    style={{ cursor: "pointer", fontSize: "17px" }}
                    onClick={handleEditName}
                  />
                </div>

                <div style={{ marginTop: "12px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{ margin: 0, color: "#777", fontSize: "12px" }}
                    >
                      Full name
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#2b2bff",
                      }}
                    >
                      {userData?.customer}
                    </p>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{ margin: 0, color: "#777", fontSize: "12px" }}
                    >
                      Mobile
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {userData?.phone}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{ margin: 0, color: "#777", fontSize: "12px" }}
                    >
                      Email
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {userData?.mail || "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card user-data-card mb-3">
                <div class="card-body">
                  <Link
                    to="/profile_edit/add_address"
                    style={{
                      fontSize: "16px",
                      color: "#212529",
                    }}
                  >
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <FaPlus className="icon" />
                        <span style={{ fontFamily: "poppins" }}>Add New Address</span>
                      </div>
                      <div class="data-content">
                        <FaChevronRight />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {getData?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="card p-3 mb-3 shadow-sm position-relative"
                  >
                    <div
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex gap-1 align-items-center">
                        <span
                          className={`icon-bg ${item.type === "Home" ? "home-bg" : "work-bg"
                            }`}
                        >
                          <FontAwesomeIcon
                            icon={item.type === "Home" ? faHome : faBriefcase}
                            className="text-white"
                          />
                        </span>
                        <span
                          className="ms-2"
                          style={{
                            background: item.type === "Home"
                              ? "linear-gradient(135deg, #4e54c8, #8f94fb)"
                              : "linear-gradient(135deg, #ff6a00, #ee0979)",
                            color: "white",
                            padding: "4px 12px",
                            borderRadius: "14px",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.4px",
                            boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.type}
                        </span>

                      </div>
                      <div className="d-flex gap-4 align-items-center">
                        {item.active === "primary" && (
                          <span
                            style={{
                              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                              color: "white",
                              padding: "3px 12px",
                              borderRadius: "18px",
                              fontSize: "12px",
                              fontWeight: 600,
                              border: "1px solid rgba(255,255,255,0.3)",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              letterSpacing: "0.4px",
                              textTransform: "uppercase"
                            }}
                            className="ms-2"
                          >
                            PRIMARY
                          </span>
                        )}
                        <div className="dropdown">
                          <button
                            type="button"
                            data-bs-toggle="dropdown"
                            style={{
                              padding: "4px 8px",
                              color: "#444",
                              backgroundColor: "white",
                              border: "1px solid #ddd",
                              borderRadius: "10px",
                              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                            }}
                          >
                            <MoreHorizIcon style={{ fontSize: "20px" }} />
                          </button>

                          <ul
                            className="dropdown-menu"
                            style={{
                              borderRadius: "12px",
                              padding: "8px 0",
                              boxShadow: "0px 4px 16px rgba(0,0,0,0.15)",
                              border: "none",
                              minWidth: "180px",
                              left: "-143px",
                              top: "32px"
                            }}
                          >
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleEdit(item)}
                                style={{
                                  padding: "5px 10px",
                                  fontWeight: 500,
                                  fontFamily: "poppins"
                                }}
                              >
                                <AutoFixHighIcon sx={{ color: "blue" }} /> Edit
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => openDelete(item.id)}
                                style={{
                                  padding: "5px 10px",
                                  fontWeight: 500,
                                  fontFamily: "poppins"
                                }}
                              >
                                <RemoveCircleOutlineIcon sx={{ color: "red" }} /> Remove
                              </button>
                            </li>
                            {item.active !== "primary" && (
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handlePrimaryAddress(item.id)}
                                  style={{
                                    padding: "5px 10px",
                                    fontWeight: 600,
                                    fontFamily: "poppins"
                                  }}
                                >
                                  <GradeIcon sx={{ color: "#efd700ff" }} /> Set as Primary
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                    </div>

                    {/* Address and Primary Label */}
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-1">
                      <div>
                        <h6 className="fw-bold mb-0">
                          No-{item.house_no}, {item.area_colony},{" "}
                          {item.city},{" "}
                          {state.find((s) => s.id === String(item.state))
                            ?.state_name || "Unknown State"}
                          , {item.pincode}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end"></div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {/* </div>
      </div> */}

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected Address
          </span>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialog(false)}
            >
              No
            </Button>
            <Button variant="contained" type="button" onClick={handleDelete}>
              {" "}
              Yes{" "}
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={editDialog}
        style={{ width: "28rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update Profile"
        modal
        onHide={() => {
          setEditDialog(false);
          setFormData({
            name: "",
            phone: "",
            mail: "",
          });
          setErrors("");
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#555",
            marginBottom: "15px",
            background: "#f8f9ff",
            padding: "10px 12px",
            borderRadius: "8px",
            borderLeft: "3px solid #0000ff",
          }}
        >
          Update your basic details. These will be used for communication and
          account verification.
        </p>
        <form>
          {/* NAME */}
          <div className="form-group mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="premium-input"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* PHONE */}
          <div className="form-group mb-2">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="premium-input"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                setErrors({ ...errors, phone: "" });
              }}
            />
            {errors.phone && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.phone}
              </span>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-group mb-4">
            <label className="form-label">Mail Id</label>
            <input
              type="text"
              className="premium-input"
              value={formData.mail}
              onChange={(e) => {
                setFormData({ ...formData, mail: e.target.value });
                setErrors({ ...errors, mail: "" });
              }}
            />
            {errors.mail && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.mail}
              </span>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="premium-btn"
              type="button"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="60"
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
                "Update"
              )}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddressList;
