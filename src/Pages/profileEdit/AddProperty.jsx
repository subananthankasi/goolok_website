import React, { useEffect, useMemo, useRef, useState } from "react";
import PropertyTypeDropDown from "../../Utils/SelectDropDown/PropertyTypeDropDown";
import SubPropertyDropDown from "../../Utils/SelectDropDown/SubPropertyDropDown";
import axiosInstance from "../../Api/axiosInstance";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import Select from "react-select";
import ProfileSideBar from "./ProfileSideBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../Redux/Action/PropertyTypeAction";
import { fetchSubPropertyType } from "../../Redux/Action/SubPropertyAction";


function AddProperty() {
  const alert = useAlert();
  const pattaRef = useRef(null);
  const aadhaarRef = useRef(null);
  const SaledeedRef = useRef(null);
  const pattaRef1 = useRef(null);
  const aadhaarRef1 = useRef(null);
  const SaledeedRef1 = useRef(null);
  const [loading, setloading] = useState(false);
  // dropdown set
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSubProperty, setSelectedSubProperty] = useState(null);

  const options = [
    {
      value: "sale",
      label: "Sale",
    },
    {
      value: "service",
      label: "Service",
    },
  ];


  const [selectedType, setSelectedType] = useState({
    value: "sale",
    label: "Sale",
  });

  const handleSelected = (data) => {
    setSelectedType(data);
  };

  const [formData, setFormData] = useState({
    customer: "",
    mobile: "",
    email: "",
    property: "",
    subproperty: "",
    type: "",
    patta: "",
    aadhaar: "",
    saledeed: "",
  });

  const [errors, setErrors] = useState({});
  const [fileErrors, setFileErrors] = useState({
    patta: "",
    aadhaar: "",
    saledeed: "",
  });
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const validTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (!file) {
        setFileErrors({
          ...fileErrors,
          [name]: "Please upload a file.",
        });
        setFormData({
          ...formData,
          [name]: null,
        });
        return;
      }
      if (file && validTypes.includes(file.type)) {
        setFormData({
          ...formData,
          [name]: file,
        });
        setFileErrors({
          ...fileErrors,
          [name]: "",
        });
      } else {
        setFileErrors({
          ...fileErrors,
          [name]:
            "Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePropertySelect = (data) => {
    setSelectedProperty(data);
    setSelectedSubProperty(null);
  };

  const handleSubPropertySelect = (data) => {
    setSelectedSubProperty(data);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      property: selectedProperty ? selectedProperty.value : "",
      subproperty: selectedSubProperty ? selectedSubProperty.value : "",
      type: selectedType ? selectedType.value : "sale",
    });
  }, [selectedSubProperty, selectedProperty, selectedType]);

  const validate = () => {
    const newErrors = {};

    if (!formData.customer)
      newErrors.customerName = "Customer name is required";
    if (!formData.mobile) newErrors.mobileNo = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobileNo = "Invalid mobile number";
    if (!formData.email) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.emailId = "Invalid email address";
    if (!formData.property)
      newErrors.selectedProperty = "Property type is required";
    if (!formData.subproperty)
      newErrors.selectedSubProperty = "Subproperty type is required";

    if (!formData.saledeed) {
      errors.saledeed = "Please upload the Title Document.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (
      Object.keys(validationErrors).length === 0 &&
      fileErrors.patta === "" &&
      fileErrors.aadhaar === "" &&
      fileErrors.saledeed === ""
    ) {
      setloading(true);
      try {
        const response = await axiosInstance.post("/vendor/enquiry", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setloading(false);
        alert.success(
          "Your enquiry has been successfully sent. Our team will contact you shortly!"
        );
        setSelectedProperty(null);
        setSelectedSubProperty(null);
        setErrors([]);
        setFormData({
          customer: "",
          mobile: "",
          email: "",
          property: "",
          subproperty: "",
          type: "sale",
        });
        if (pattaRef.current) pattaRef.current.value = "";
        if (aadhaarRef.current) aadhaarRef.current.value = "";
        if (SaledeedRef.current) SaledeedRef.current.value = "";
      } catch (error) {
        alert.error("Failed to send your enquiry. Please try again later!");
        setloading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  //....................Serice...........................

  const dispatch = useDispatch();
  const PropertyTypeData = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  const SubPropertyTypeData = useSelector(
    (state) => state.SubPropertyType.SubPropertyTypeData
  );

  useEffect(() => {
    dispatch(fetchPropertyType());
    dispatch(fetchSubPropertyType());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: selectedType ? selectedType.value : "sale",
    };
    setloading(true);
    try {
      const response = await axiosInstance.post("/vendor/enquiry", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      formik.resetForm();
      aadhaarRef1.current.value = "";
      pattaRef1.current.value = "";
      SaledeedRef1.current.value = "";
      alert.success(
        "Your enquiry has been successfully sent. Our team will contact you shortly!"
      );
      setloading(false);
    } catch (error) {
      alert.error("Failed to send your enquiry. Please try again later!");
      setloading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      date: "",
      customer: "",
      mobile: "",
      email: "",
      servicecat: "",
      documentlist: "",
      remark: "",
      property: "",
      subproperty: "",
      patta: "",
      aadhaar: "",
      saledeed: "",
    },
    validationSchema: yup.object().shape({
      date: yup.string().required("date is required !!"),
      customer: yup.string().required("customer name is required !!"),
      mobile: yup
        .string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile no is required !!"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required !!"),
      servicecat: yup.string().required("enquiry_category is required !!"),
      property: yup.string().required("property is required !!"),
      subproperty: yup.string().required("sub_property is required !!"),
      // patta: yup.string().required("patta is required !!"),
      // aadhaar: yup.string().required("aadhar is required !!"),
      saledeed: yup.string().required("Title document is required!"),
    }),
    onSubmit,
  });
  const filteredSubPropertyTypeData = useMemo(() => {
    return SubPropertyTypeData?.filter(
      (item) => item.property === formik.values.property
    );
  }, [SubPropertyTypeData, formik.values.property]);

  return (
    <div className="container profile_edit">
      <div className="row">
        <ProfileSideBar />

        <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
          <div>
            <h6>Add Property</h6>
            <hr />

            <section className="form-section">
              <div className="container" style={{ maxWidth: 500 }}>
                <div className>
                  <div className="row mt-5">
                    <div className="col-md-4 col-12">
                      <label className="form-label">Looking for</label>
                    </div>
                    {/* <div className="col-8">
                      <div className="d-flex">
                        <div
                          className="form-check"
                          style={{ fontSize: "14px" }}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            id="yes"
                            name="proceedOption"
                            value="sale"
                            onChange={handleProceedChange}
                            checked={selectedProceedOption === "sale"}
                          />
                          <label className="form-check-label" htmlFor="yes">
                            Sale
                          </label>
                        </div>

                        <div
                          className="form-check ms-4"
                          style={{ fontSize: "14px" }}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            id="yes"
                            name="proceedOption"
                            value="service"
                            onChange={handleProceedChange}
                            checked={selectedProceedOption === "service"}
                          />
                          <label className="form-check-label" htmlFor="yes">
                            Service
                          </label>
                        </div>
                      </div>
                    </div> */}

                    <div className="col-md-8 col-12">
                      <Select
                        options={options}
                        onChange={handleSelected}
                        value={selectedType}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#e7e7e7"
                              : "#e7e7e7",
                            fontSize: "13px",
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            fontSize: "12px",
                            color: "black",
                          }),
                        }}
                      />
                    </div>
                  </div>

                  {selectedType?.value === "sale" && (
                    <div>
                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12 ">
                            <label>Customer name</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="text"
                              name="customer"
                              value={formData.customer}
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.customerName && (
                              <span className="validation_msg">
                                {errors.customerName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Mobile no</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="text"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                              className="form-control"
                              maxLength={10}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                            {errors.mobileNo && (
                              <span className="validation_msg">
                                {errors.mobileNo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Email id</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.emailId && (
                              <span className="validation_msg">
                                {errors.emailId}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Property Type</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <PropertyTypeDropDown
                              onSelect={handlePropertySelect}
                              selectedProperty={selectedProperty}
                            />
                            {errors.selectedProperty && (
                              <span className="validation_msg">
                                {errors.selectedProperty}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Sub Property Type</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <SubPropertyDropDown
                              onSelect={handleSubPropertySelect}
                              selectedSubProperty={selectedSubProperty}
                              filter={selectedProperty}
                            />
                            {errors.selectedSubProperty && (
                              <span className="validation_msg">
                                {errors.selectedSubProperty}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Patta</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="file"
                              name="patta"
                              ref={pattaRef}
                              onChange={handleChange}
                              className="form-control"
                              accept=".pdf,.png,.jpeg,.jpg"
                            />

                            {fileErrors.patta && (
                              <p className="validation_msg">
                                {fileErrors.patta}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Aadhaar</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="file"
                              name="aadhaar"
                              ref={aadhaarRef}
                              onChange={handleChange}
                              className="form-control"
                              accept=".pdf,.png,.jpeg,.jpg"
                            />
                            {fileErrors.aadhaar && (
                              <p className="validation_msg">
                                {fileErrors.aadhaar}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <div className="row">
                          <div className="col-md-4 col-12">
                            <label>Title Document</label>
                          </div>
                          <div className="col-md-8 col-12">
                            <input
                              type="file"
                              name="saledeed"
                              ref={SaledeedRef}
                              onChange={handleChange}
                              className="form-control"
                              accept=".pdf,.png,.jpeg,.jpg"
                              required   
                            />
                            {fileErrors.saledeed && (
                              <p className="validation_msg">
                                {fileErrors.saledeed}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ float: "right" }}>
                        <a
                          href="#0"
                          onClick={handleSubmit}
                          className="btn_1 rounded full-width mt-4"
                        >
                          {loading ? (
                            <ThreeDots
                              visible={true}
                              height="20"
                              width="80"
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
                            " Submit Enquiry"
                          )}
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedType?.value === "service" && (
                    <div>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Recieved date</label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="date"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.date && formik.touched.date ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.date}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Customer name</label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="text"
                                name="customer"
                                value={formik.values.customer}
                                onChange={formik.handleChange}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.customer &&
                              formik.touched.customer ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.customer}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Mobile no</label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="text"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.mobile && formik.touched.mobile ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.mobile}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Email </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="text"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.email && formik.touched.email ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.email}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Enquiry Category </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <select
                                type="text"
                                name="servicecat"
                                value={formik.values.servicecat}
                                onChange={formik.handleChange}
                                className="form-select"
                                onBlur={formik.handleBlur}
                              >
                                <option>Select.... </option>
                                <option value="Get patta for your property">
                                  {" "}
                                  Get patta for your property
                                </option>
                                <option value="Find your property google map location">
                                  Find your property Google map Location{" "}
                                </option>
                                <option value="Legal opinion">
                                  Legal opinion{" "}
                                </option>
                                <option value="Land survey">
                                  Land survey{" "}
                                </option>
                                <option value="Property valuation">
                                  Property valuation{" "}
                                </option>
                                <option value="Missing documents">
                                  {" "}
                                  Missing documents{" "}
                                </option>
                              </select>
                              {formik.errors.servicecat &&
                              formik.touched.servicecat ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.servicecat}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {formik.values.servicecat === "Missing Documents" && (
                          <>
                            <div className="form-group mt-4">
                              <div className="row">
                                <div className="col-md-4 col-12">
                                  <label>Documents List </label>
                                </div>
                                <div className="col-md-8 col-12">
                                  <select
                                    type="text"
                                    name="documentlist"
                                    value={formik.values.documentlist}
                                    onChange={formik.handleChange}
                                    className="form-select"
                                    onBlur={formik.handleBlur}
                                  >
                                    <option>Select List.... </option>
                                    <option value="CMDA "> CMDA </option>
                                    <option value="DTCP">DTCP </option>
                                    <option value="WILL DEED">
                                      WILL DEED{" "}
                                    </option>
                                    <option value="SALE DEED">
                                      SALE DEED{" "}
                                    </option>
                                    <option value="FMB">FMB </option>
                                    <option value="POWER DEED">
                                      {" "}
                                      POWER DEED{" "}
                                    </option>
                                    <option value="ANY OTHER DOCUMENTS">
                                      {" "}
                                      ANY OTHER DOCUMENTS{" "}
                                    </option>
                                  </select>
                                  {formik.errors.documentlist &&
                                  formik.touched.documentlist ? (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {formik.errors.documentlist}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="form-group mt-4">
                              <div className="row">
                                <div className="col-md-4 col-12">
                                  <label>Remark </label>
                                </div>
                                <div className="col-md-8 col-12">
                                  <textarea
                                    type="text"
                                    name="remark"
                                    className="form-control"
                                    placeholder="text here ...."
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ height: "100px" }}
                                  ></textarea>
                                  {formik.errors.remark &&
                                  formik.touched.remark ? (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {formik.errors.remark}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Property Type </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <select
                                type="text"
                                name="property"
                                value={formik.values.property}
                                onChange={formik.handleChange}
                                className="form-select"
                                onBlur={formik.handleBlur}
                              >
                                <option>Select.... </option>
                                {PropertyTypeData?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.property_type}{" "}
                                  </option>
                                ))}
                              </select>
                              {formik.errors.property &&
                              formik.touched.property ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.property}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Sub Property Type </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <select
                                type="text"
                                name="subproperty"
                                value={formik.values.subproperty}
                                onChange={formik.handleChange}
                                className="form-select"
                                disabled={!formik.values.property}
                                onBlur={formik.handleBlur}
                              >
                                <option>Select.... </option>
                                {filteredSubPropertyTypeData?.length > 0 ? (
                                  filteredSubPropertyTypeData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.subproperty}
                                    </option>
                                  ))
                                ) : (
                                  <option>No data available</option>
                                )}
                              </select>
                              {formik.errors.subproperty &&
                              formik.touched.subproperty ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.subproperty}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*Patta................................ */}
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Patta </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="file"
                                name="patta"
                                ref={pattaRef1}
                                accept="application/pdf"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "patta",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.patta && formik.touched.patta ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.patta}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*................AAdhar................ */}
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Aadhar </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="file"
                                name="aadhaar"
                                ref={aadhaarRef1}
                                accept="application/pdf"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "aadhaar",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.aadhaar &&
                              formik.touched.aadhaar ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.aadhaar}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*................Title Document................ */}
                        <div className="form-group mt-4">
                          <div className="row">
                            <div className="col-md-4 col-12">
                              <label>Title document </label>
                            </div>
                            <div className="col-md-8 col-12">
                              <input
                                type="file"
                                name="saledeed"
                                ref={SaledeedRef1}
                                accept="application/pdf"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "saledeed",
                                    event.currentTarget.files[0]
                                  );
                                }}
                                className="form-control"
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.saledeed &&
                              formik.touched.saledeed ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {formik.errors.saledeed}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div style={{ float: "right" }}>
                          <button
                            type="submit"
                            className="btn1 rounded btn-lg full-width mt-4"
                          >
                            {loading ? (
                              <ThreeDots
                                visible={true}
                                height="20"
                                width="80"
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
                              " Submit Enquiry"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
