import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHome,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import axiosInstance from "../../../Api/axiosInstance";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};
const CreateAddress = () => {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [visible, setVisible] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState("");
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [state, setState] = useState([]);
  const navigate = useNavigate();

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

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      location: location,
      type: selectedAddress,
      active: "secondary"
    };
    try {
      await axiosInstance.post("/vendor/address", payload, {});
      formik.resetForm();
      setLocation("");
      navigate("/profile_edit/address");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
    },
    validationSchema: yup.object().shape({
      // name: yup.string().required("name is required !!"),
      // mobile: yup
      //   .string()
      //   .matches(/^[0-9]+$/, "Mobile number must be digits only")
      //   .length(10, "Mobile number must be exactly 10 digits")
      //   .required("Mobile is required !!"),
      pincode: yup.string().required("pincode is required !!"),
      state: yup.string().required("state is required !!"),
      city: yup.string().required("city is required !!"),
      house: yup.string().required("house is required !!"),
      area: yup.string().required("area is required !!"),
    }),
    onSubmit,
  });

  const openModal = () => {
    setVisible(true);
    setClickedLatLng(null);
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const latLngs = `${event.latLng.lat()}, ${event.latLng.lng()}`;
    setClickedLatLng(latLng);
  };
  const submitLocation = () => {
    if (clickedLatLng) {
      const latLngString = `${clickedLatLng.lat}, ${clickedLatLng.lng}`;
      setLocation(latLngString);
    }
    setVisible(false);
  };

  return isLoaded ? (
    <>
      {/* <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar /> */}

          <div className="" style={{ paddingTop: 50 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  padding: "0 16px",
                  height: "40px",
                }}
              >
                {/* Left Arrow */}
                <div style={{ position: "absolute", left: 0 }}>
                  <KeyboardBackspaceIcon
                    sx={{
                      backgroundColor: "#0000ff",
                      color: "white",
                      borderRadius: "25px",
                      cursor: "pointer",
                      padding: "3px"
                    }}
                    onClick={() => {
                      navigate("/profile_edit/address");
                      formik.resetForm();
                    }}
                  />
                </div>

                {/* Centered Text */}
                <h6
                  style={{
                    margin: 0,
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  Add New Address
                </h6>
              </div>
              <hr />

              <div className="container">
                <form
                  onSubmit={formik.handleSubmit}
                  className="p-4 shadow-sm rounded bg-white"
                  style={{ fontFamily: "poppins" }}
                >
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">
                        House No, Building Name *
                      </label>
                      <input
                        type="text"
                        name="house"
                        value={formik.values.house}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder="Enter address"
                      />
                      {formik.errors.house && formik.touched.house ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.house}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Area Colony *</label>
                      <input
                        type="text"
                        name="area"
                        className="form-control"
                        value={formik.values.area}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter area or colony"
                      />
                      {formik.errors.area && formik.touched.area ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.area}
                        </p>
                      ) : null}
                    </div>
                    <div className="row m-0 p-0">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          placeholder="Enter city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.city && formik.touched.city ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.city}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">State *</label>
                        <select
                          className="form-select"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{ height: "32px" }}
                        >
                          <option value="">Select...</option>
                          {state?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.state_name}
                            </option>
                          ))}
                        </select>
                        {formik.errors.state && formik.touched.state ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.state}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pin Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                        placeholder="Enter pin code"
                      />
                      {formik.errors.pincode && formik.touched.pincode ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.pincode}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-block">Location</label>
                      <button
                        type="button"
                        className="w-100"
                        onClick={() => openModal()}
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#0000ff",
                          fontFamily: "poppins",
                          color: "white"
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="me-2"
                        />
                        {location ? location : " Location"}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label d-block">
                      Type Of Address
                    </label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={` ${selectedAddress === "Home"
                          ? "home-dark"
                          : "home-light"
                          } `}
                        onClick={() => setSelectedAddress("Home")}
                      >
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Home
                      </button>
                      <button
                        type="button"
                        className={` ${selectedAddress === "Work"
                          ? "home-dark"
                          : "home-light"
                          } `}
                        onClick={() => setSelectedAddress("Work")}
                      >
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        Work
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className=" w-100"
                    style={{
                      fontFamily: "poppins",
                      padding: "10px 12px",
                      backgroundColor: "#0000ff",
                      color: "white",
                    }}
                  >
                    Save Address
                  </button>
                </form>
              </div>
            </div>
          </div>
        {/* </div>
      </div> */}
      <Dialog
        visible={visible}
        style={{ width: "42rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Location"
        modal
        className="p-fluid"
        onHide={() => {
          setVisible(false);
        }}
      >
        <div>
          <div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={handleMapClick}
            >
              {clickedLatLng && <Marker position={clickedLatLng} />}
            </GoogleMap>
          </div>
          <div className="mt-3 d-flex justify-content-end ">
            <button
              type="button"
              onClick={submitLocation}
              style={{
                fontFamily: "poppins",
                padding: "7px 12px",
                backgroundColor: "#0000ff",
                color: "white",
                fontWeight: "500",
                fontSize: "13px"
              }}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  ) : null;
};

export default CreateAddress;
