import  { useEffect, useMemo, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import { decryptData } from "../../Utils/encryptData";
import "./FirstBanner.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../Redux/Action/PropertyTypeAction";
import { fetchSubPropertyType } from "../../Redux/Action/SubPropertyAction";
import axiosInstance from "../../Api/axiosInstance";
import { ThreeDots } from "react-loader-spinner";
import {
  FaFilePdf,
} from "react-icons/fa";
import { useAlert } from "react-alert";
import { Skeleton } from "primereact/skeleton";
import findimg from "../../assets/ServiceImages/services/findimg.jpg";
import getpattaImg from "../../assets/ServiceImages/services/getpatta.jpg";
import missingImg from "../../assets/ServiceImages/services/missing.jpg";
import legalImg from "../../assets/ServiceImages/services/legal.jpg";
import landSurveyImg from "../../assets/ServiceImages/services/landsurvey.jpg";
import propertyValutionImg from "../../assets/ServiceImages/services/propertyvalution.jpg";
import { Breadcrumb } from "antd";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "16px",
  color: "#1a237e",
  marginBottom: "12px",
});

const InputWrapper = styled("div")({
  position: "relative",
  marginBottom: "20px",
});

const Icon = styled("span")({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#888",
  fontSize: "16px",
});

const StyledInput = styled("input")({
  width: "100%",
  padding: "12px 12px 12px 38px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
  transition: "0.3s",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
    outline: "none",
    background: "#fff",
  },
});

const StyledSelect = styled("select")({
  width: "100%",
  padding: "12px 8px 8px 11px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
  transition: "0.3s",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
    outline: "none",
    background: "#fff",
  },
});

const StyledTextarea = styled("textarea")({
  width: "100%",
  padding: "12px 12px 12px 38px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
  transition: "0.3s",
  minHeight: "100px",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
    outline: "none",
    background: "#fff",
  },
});

const ErrorText = styled(Typography)({
  color: "#d32f2f",
  fontSize: "12px",
  marginTop: "4px",
  marginLeft: "6px",
});

const ServicePreviewPage = () => {
  const { serviceid } = useParams();
  const service_id = decryptData(serviceid);
  const [expanded, setExpanded] = useState(false);
  const [reachout, setReachout] = useState(false);
  const alert = useAlert();
  const [isFluid, setIsFluid] = useState(false);

  const calculateLayout = () => {
    const width = window.innerWidth;

    if (width <= 1024) {
      setIsFluid(true);
    } else {
      setIsFluid(false);
    }
  };

  useEffect(() => {
    calculateLayout();
    window.addEventListener("resize", calculateLayout);

    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [getData, setGetData] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchBanner = async () => {
    setGetLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/servicecontent/${service_id}`
      );
      setGetData(response.data?.data);
      setGetLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setGetLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  //Submit form
  const [profileData, setProfileData] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const handleCloseopenreachout = () => {
    setReachout(true);
    const todayDate = new Date();
    formik.setFieldValue("date", formatDate(todayDate));
    formik.setFieldValue("customer", profileData?.customer);
    formik.setFieldValue("mobile", profileData?.phone);
    formik.setFieldValue("email", profileData?.mail);
    formik.setFieldValue("servicecat", getData[0]?.service_title);
  };

  const handleClosereachout = () => {
    setReachout(false);
    formik.resetForm();
  };
  const token = localStorage.getItem("zxcvbnm@#");
  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/Webuser`);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetch();
    }
  }, []);

  const [loading, setloading] = useState(false);
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
      type: "service",
      servicecat: getData[0]?.service_title,
      customer: profileData?.customer,
      mobile: profileData?.phone,
      email: profileData?.mail,
    };
    setloading(true);
    try {
      const response = await axiosInstance.post("/vendor/enquiry", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      formik.resetForm();
      alert.success(
        "Your enquiry has been successfully sent. Our team will contact you shortly!"
      );
      setloading(false);
      setReachout(false);
    } catch (error) {
      alert.error("Failed to send your enquiry. Please try again later!");
      setloading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      // date: null,
      // customer: "",
      // mobile: "",
      // email: "",
      // servicecat: "",
      documentlist: "",
      remark: "",
      property: "",
      subproperty: "",
      patta: "",
      aadhaar: "",
      saledeed: "",
    },
    validationSchema: yup.object().shape({
      // date: yup.string().required("date is required !!"),
      // customer: yup.string().required("customer name is required !!"),
      // mobile: yup
      //   .string()
      //   .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      //   .required("Mobile no is required !!"),
      // email: yup
      //   .string()
      //   .email("Invalid email format")
      //   .required("Email is required !!"),
      // servicecat: yup.string().required("enquiry_category is required !!"),
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

  const serviceTitle = getData[0]?.service_title?.toLowerCase();

  const serviceImage =
    serviceTitle === "find your property google map location"
      ? findimg
      : serviceTitle === "missing documents"
        ? missingImg
        : serviceTitle === "get patta for your property"
          ? getpattaImg
          : serviceTitle === "legal opinion"
            ? legalImg
            : serviceTitle === "land survey"
              ? landSurveyImg
              : serviceTitle === "property valuation"
                ? propertyValutionImg
                : "";

  return (
    <>
      <div className={isFluid ? "container-fluid" : "container"} >
        {!getLoading && (
          <div className="mt-3">
            <Breadcrumb
              style={{ fontFamily: "poppins" }}
              items={[
                { title: <Link to="/">Home</Link> },
                { title: <Link to="/service">Services</Link> },
                { title: getData[0]?.service_title },
              ]}
            />
          </div>
        )}

        <div className="row service_container_column mt-3">
          <div className="col-6 sale_img_container">
            {getLoading ? (
              <Skeleton height={500} width="100%" style={{ marginTop: 10 }} />
            ) : (
              <img
                className="sale_img"
                src={serviceImage}
                alt={serviceTitle || "service image"}
              />
            )}
          </div>
          <div className="col-6  service_container_column">
            <div className="content-box">
              {getLoading ? (
                <Skeleton height={35} width="60px" style={{ marginTop: 10 }} />
              ) : (
                <span className="offer-badge">{getData[0]?.offer} </span>
              )}
              {getLoading ? (
                <Skeleton
                  height={35}
                  width="300px"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <h1 className="service_sub_title">
                  {getData[0]?.service_title}
                </h1>
              )}

              {getLoading ? (
                <Skeleton
                  height={35}
                  width="200px"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <>
                  <span className="sell_amount">₹ {getData[0]?.amount}</span>
                  <span className="sell_amount1">
                    ₹ {getData[0]?.off_amount}
                  </span>
                </>
              )}

              {getLoading ? (
                <Skeleton
                  height={200}
                  width="100%"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: getData[0]?.description }}
                ></div>
              )}

              {getLoading ? (
                <Skeleton
                  height={200}
                  width="100%"
                  style={{ marginTop: 10 }}
                  className="mt-2"
                />
              ) : (
                <>
                  <hr />

                  <h5 className="text_line">
                    <b>{getData[0]?.benifit_title}</b>
                  </h5>
                  <div
                    className="benefit-content mt-2"
                    dangerouslySetInnerHTML={{
                      __html: getData[0]?.benifit_content,
                    }}
                  ></div>
                </>
              )}

              <span className="Reach_button" onClick={handleCloseopenreachout}>
                Reach-out <FaRegPaperPlane />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={isFluid ? "container-fluid" : "container"}>
        <h2 className="service_sub_title mt-3">{getData[0]?.howwork_title}</h2>

        <div
          className="benefit-content mt-2 how_it_work"
          dangerouslySetInnerHTML={{
            __html: getData[0]?.howwork_content,
          }}
        ></div>
      </div>

      <BootstrapDialog
        onClose={handleClosereachout}
        aria-labelledby="customized-dialog-title"
        open={reachout}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <header style={{ fontFamily: "poppins" }}>Reach-Out</header>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosereachout}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="p-3">
            <form onSubmit={formik.handleSubmit} style={{ fontFamily: "poppins" }}>
              {/* Section: Customer Info */}
              {/* <SectionTitle> Customer Information</SectionTitle>
              <Divider sx={{ mb: 2 }} /> */}

              {/* <div className="row">
                <div className="col-md-6">
                  <InputWrapper>
                    <Icon>
                      <FaCalendarAlt />
                    </Icon>
                    <StyledInput
                      type="date"
                      name="date"
                      value={formik.values.date}
                      onChange={(value) => formik.setFieldValue("date", value)}
                      onBlur={formik.handleBlur}
                    />

                    {formik.errors.date && formik.touched.date && (
                      <ErrorText>{formik.errors.date}</ErrorText>
                    )}
                  </InputWrapper>
                </div>

                <div className="col-md-6">
                  <InputWrapper>
                    <Icon>
                      <FaUser />
                    </Icon>
                    <StyledInput
                      type="text"
                      name="customer"
                      placeholder="Customer name"
                      value={formik.values.customer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.customer && formik.touched.customer && (
                      <ErrorText>{formik.errors.customer}</ErrorText>
                    )}
                  </InputWrapper>
                </div>
              </div> */}

              {/* <div className="row">
                <div className="col-md-6">
                  <InputWrapper>
                    <Icon>
                      <FaPhone />
                    </Icon>
                    <StyledInput
                      type="text"
                      name="mobile"
                      placeholder="Mobile no"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.mobile && formik.touched.mobile && (
                      <ErrorText>{formik.errors.mobile}</ErrorText>
                    )}
                  </InputWrapper>
                </div>

                <div className="col-md-6">
                  <InputWrapper>
                    <Icon>
                      <FaEnvelope />
                    </Icon>
                    <StyledInput
                      type="text"
                      name="email"
                      placeholder="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <ErrorText>{formik.errors.email}</ErrorText>
                    )}
                  </InputWrapper>
                </div>
              </div> */}

              {/* Section: Service Category */}

              {getData[0]?.service_title?.toLowerCase() ===
                "missing documents" && (
                  <>
                    <SectionTitle sx={{ fontFamily: "poppins" }}> Enquiry Details</SectionTitle>
                    {/* <Divider sx={{ mb: 2 }} /> */}

                    {/* <InputWrapper>
                <Icon>
                  <FaRegBuilding />
                </Icon>
                <StyledSelect
                  name="servicecat"
                  value={formik.values.servicecat}
                  onChange={formik.handleChange}
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
                  <option value="Legal opinion">Legal opinion </option>
                  <option value="Land survey">Land survey </option>
                  <option value="Property valuation">
                    Property valuation{" "}
                  </option>
                  <option value="Missing documents"> Missing documents </option>
                </StyledSelect>
                {formik.errors.servicecat && formik.touched.servicecat && (
                  <ErrorText>{formik.errors.servicecat}</ErrorText>
                )}
              </InputWrapper> */}

                    <InputWrapper>
                      <StyledSelect
                        name="documentlist"
                        value={formik.values.documentlist}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option>Select List.... </option>
                        <option value="CMDA "> CMDA </option>
                        <option value="DTCP">DTCP </option>
                        <option value="WILL DEED">WILL DEED </option>
                        <option value="SALE DEED">SALE DEED </option>
                        <option value="FMB">FMB </option>
                        <option value="POWER DEED"> POWER DEED </option>
                        <option value="ANY OTHER DOCUMENTS">
                          {" "}
                          ANY OTHER DOCUMENTS{" "}
                        </option>
                      </StyledSelect>
                      {formik.errors.documentlist &&
                        formik.touched.documentlist && (
                          <ErrorText>{formik.errors.documentlist}</ErrorText>
                        )}
                    </InputWrapper>

                    <InputWrapper>
                      <StyledTextarea
                        name="remark"
                        placeholder="Add your remarks..."
                        value={formik.values.remark}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.remark && formik.touched.remark && (
                        <ErrorText>{formik.errors.remark}</ErrorText>
                      )}
                    </InputWrapper>
                  </>
                )}

              {/* Section: Property */}
              <SectionTitle sx={{ fontFamily: "poppins" }}> Property Details</SectionTitle>
              {/* <Divider sx={{ mb: 2 }} /> */}

              <div className="row mb-3">
                <div className="col-md-6">
                  <InputWrapper>
                    <StyledSelect
                      name="property"
                      value={formik.values.property}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select property type...</option>
                      {PropertyTypeData?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.property_type}
                        </option>
                      ))}
                    </StyledSelect>
                    {formik.errors.property && formik.touched.property && (
                      <ErrorText>{formik.errors.property}</ErrorText>
                    )}
                  </InputWrapper>
                </div>

                <div className="col-md-6">
                  <InputWrapper>
                    <StyledSelect
                      name="subproperty"
                      value={formik.values.subproperty}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!formik.values.property}
                    >
                      <option value="">Select sub property...</option>
                      {filteredSubPropertyTypeData?.length > 0 ? (
                        filteredSubPropertyTypeData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.subproperty}
                          </option>
                        ))
                      ) : (
                        <option>No data available</option>
                      )}
                    </StyledSelect>
                    {formik.errors.subproperty &&
                      formik.touched.subproperty && (
                        <ErrorText>{formik.errors.subproperty}</ErrorText>
                      )}
                  </InputWrapper>
                </div>
              </div>

              {/* Section: Uploads */}
              <SectionTitle sx={{ fontFamily: "poppins" }}> Upload Documents</SectionTitle>
              {/* <Divider sx={{ mb: 2 }} /> */}

              {["saledeed"].map((field) => (
                <InputWrapper key={field}>
                  <Icon>
                    <FaFilePdf />
                  </Icon>
                  <label
                    className="form-label"
                    style={{ textTransform: "capitalize" }}
                  >
                    {field === "saledeed" ? "Title document " : field} :{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <StyledInput
                    type="file"
                    accept="application/pdf"
                    name={field}
                    onChange={(event) =>
                      formik.setFieldValue(field, event.currentTarget.files[0])
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors[field] && formik.touched[field] && (
                    <ErrorText>{formik.errors[field]}</ErrorText>
                  )}
                </InputWrapper>
              ))}

              {/* Submit Button */}
              <DialogActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: "0px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "16px",
                    background: "#0000ff",
                    "&:hover": {
                      background: "#0000ff",
                    },
                    fontFamily: "poppins"
                  }}
                >
                  {loading ? (
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="80"
                      color="#ffffff"
                      radius="18"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    " Submit Enquiry"
                  )}
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default ServicePreviewPage;
