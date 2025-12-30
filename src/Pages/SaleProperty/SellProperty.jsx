import { useEffect, useMemo, useRef, useState } from "react";
import { Uploader } from "rsuite";
import "./sales.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../Redux/Action/PropertyTypeAction";
import { fetchSubPropertyType } from "../../Redux/Action/SubPropertyAction";
import axiosInstance from "../../Api/axiosInstance";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import * as yup from "yup";
import propertyImage from "../../assets/sell_images/sellPropetyImage.jpg";
import NotesIcon from "@mui/icons-material/Notes";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { FaRegBuilding } from "react-icons/fa";
import { PiHouse } from "react-icons/pi";
import { AiOutlineLayout } from "react-icons/ai";
import { TbBuildingWarehouse } from "react-icons/tb";
import { LiaBuilding } from "react-icons/lia";
import { BiSquare } from "react-icons/bi";
import { RxBorderSplit } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";


const SellProperty = () => {
  const alert = useAlert();
  const pattaRef = useRef();
  const aadhaarRef = useRef();
  const SaledeedRef = useRef();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState("1");
  const [selectedSubPropertyType, setSelectedSubPropertyType] = useState([]);
  const visualIcons = (item) => {
    if (!item?.property_type) return null;

    switch (item.property_type.toLowerCase()) {
      case "apartment project":
        return (
          <FaRegBuilding
            size={17}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "house":
        return (
          <PiHouse
            size={19}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "commercial":
        return (
          <TbBuildingWarehouse
            size={20}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "apartment":
        return (
          <LiaBuilding
            size={21}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "plot":
        return (
          <RxBorderSplit
            size={21}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "layout":
        return (
          <AiOutlineLayout
            size={19}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      case "land":
        return (
          <BiSquare
            size={21}
            color={selectedPropertyType === item.id ? "white" : "#0000ff"}
          />
        );
      default:
        return <i className="pi pi-home"></i>;
    }
  };
  const [fileList, setFileList] = useState([]);

  // const handleChange = (newFileList) => {
  //   console.log("newFileList", newFileList)
  //   if (newFileList.length > 0) {
  //     const latestFile = newFileList[newFileList.length - 1];
  //     setFileList([
  //       {
  //         ...latestFile,
  //         name: latestFile.name,
  //         blobFile: latestFile.blobFile,
  //         fileKey: Date.now(),
  //       },
  //     ]);
  //   } else {
  //     setFileList([]);
  //     console.log("file", fileList)
  //   }
  // };


  const handleChange = (newFileList) => {

    if (!newFileList || newFileList.length === 0) {
      setFileList([]);
      return;
    }

    const latestFile = newFileList[newFileList.length - 1];

    setFileList([
      {
        uid: Date.now(),
        name: latestFile.name,
        blobFile: latestFile.blobFile,
        status: "done",
      },
    ]);
  };


  const PropertyTypeData = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );

  const SubPropertyTypeData = useSelector(
    (state) => state.SubPropertyType.SubPropertyTypeData
  );
  const userData = useSelector((state) => state.userData.userData);
  useEffect(() => {
    dispatch(fetchPropertyType());
    dispatch(fetchSubPropertyType());
  }, [dispatch]);

  const [pattaFiles, setPattaFiles] = useState([]);
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const [saledeedFiles, setSaledeedFiles] = useState([]);

  const token = localStorage.getItem("zxcvbnm@#");
  const onSubmit = async () => {
    if (!token) {
      toast.error("Please login to continue");
      return;
    }
    if (!selectedPropertyType) {
      toast.error("Please select a Property Type");

      return;
    }

    if (!selectedSubPropertyType || selectedSubPropertyType.length === 0) {
      toast.error("Please Select Subproperty Type");
      return;
    }

    if (fileList.length === 0) {
      toast.error("Please upload your Title Document");
      return;
    }
    const formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //   formData.append(key, values[key]);
    // });

    formData.append("saledeed", fileList[0].blobFile);
    formData.append("type", selectedType ? selectedType.value : "sale");
    formData.append(
      "property",
      selectedPropertyType ? selectedPropertyType : ""
    );
    formData.append(
      "subproperty",
      selectedSubPropertyType ? selectedSubPropertyType : ""
    );
    formData.append("customer", userData ? userData.customer : "");
    formData.append("mobile", userData ? userData.phone : "");
    formData.append("email", userData ? userData.mail : "");
    setloading(true);
    try {
      const response = await axiosInstance.post("/vendor/enquiry", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      formik.resetForm({ values: formik.initialValues });
      formik.setFieldValue("saledeed", null);
      setSelectedPropertyType("1");
      setSelectedSubPropertyType("");
      setFileList([]);
      setPattaFiles([]);
      setAadhaarFiles([]);
      setSaledeedFiles([]);
      alert.success(
        "Your enquiry has been successfully sent. Our team will contact you shortly!"
      );
    } catch (error) {
      alert.error("Failed to send your enquiry. Please try again later!");
    } finally {
      setloading(false);
      setFileList([]);

    }
  };

  const formik = useFormik({
    initialValues: {
      // customer: "",
      // mobile: "",
      // email: "",
      property: "",
      subproperty: "",
      type: "",
      patta: null,
      aadhaar: null,
      saledeed: null,
    },
    validationSchema: yup.object().shape({
      // customer: yup.string().required("full name is required !!"),
      // mobile: yup
      //   .string()
      //   .matches(/^[0-9]{10}$/, "mobile number must be exactly 10 digits")
      //   .required("phone number is required !!"),
      // email: yup
      //   .string()
      //   .email("invalid email format")
      //   .required("email is required !!"),
      // property: yup
      //   .string()
      //   .required(
      //     "please select the type of sub property you wish to advertise !!"
      //   ),
      // subproperty: yup
      //   .string()
      //   .required(
      //     "please select the type of sub property you wish to advertise !!"
      //   ),
      // saledeed: yup.string().required("title document is required!"),
    }),
    onSubmit,
  });

  const filteredSubPropertyTypeData = useMemo(() => {
    return SubPropertyTypeData?.filter(
      (item) => item.property === selectedPropertyType
    );
  }, [SubPropertyTypeData, selectedPropertyType]);

  useEffect(() => {
    formik.setFieldValue("property", selectedPropertyType);
  }, [selectedPropertyType]);

  const handlePropertyTypeSelect = (type) => {
    setSelectedPropertyType(type);
    formik.setFieldValue("property", type);
    formik.setTouched({ ...formik.touched, property: true });
    setSelectedSubPropertyType([]);
  };

  const handleSubPropertySelect = (subId) => {
    setSelectedSubPropertyType(subId);
    formik.setFieldValue("subproperty", subId);
    formik.setTouched({ ...formik.touched, subproperty: true }, false);
  };

  return (

    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "12px",
            fontWeight: "500",
            borderRadius: "6px",
            fontFamily: "poppins,sans-serif",
          },

          // Error toast style
          error: {
            style: {
              background: "#D32F2F",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#D32F2F",
            },
          },
        }}
      />
      <div className="container-xl sell-property-container mt-3">
        <Breadcrumb
          style={{ fontFamily: "poppins" }}
          items={[
            { title: <Link to="/">Home</Link> },
            { title: "Sell Property" },
          ]}
        />
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "25px",
            color: "#0000ff",
          }}
          className="mb-3"
        >
          Sell Your Property, The Hassle-Free Way
        </h2>
        <div
          className=""
          style={{
            border: "1px solid rgb(193 212 255)",
            backgroundColor: "rgb(238 243 255)",
          }}
        >
          <div className="row p-3 g-4">
            <div className="col-4">
              <img
                src={propertyImage}
                alt=""
                style={{ width: "397px", height: "264px" }}
              />
              <h6
                className="mt-3"
                style={{ color: "" }}
              // style={{ color: "#0505ff" }}
              >
                Our Simple 3-Step Selling Process
              </h6>
              <div>
                <NotesIcon
                  className="mt-2"
                  sx={{ fontSize: 32, color: "#0000ff" }}
                />
                <p
                  className="mt-2"
                  style={{ fontWeight: "400", fontSize: "14px" }}
                >
                  Step 1:{" "}
                </p>
                <p
                  className="mt-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Submit Your Property Details
                </p>
                <p
                  style={{
                    color: "rgba(121, 121, 121, 1)",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Fill out the form below with some basic information about your
                  property. Our team will connect with you for a free,
                  no-obligation consultation.
                </p>
              </div>
              <div>
                <DescriptionOutlinedIcon
                  className="mt-2"
                  sx={{
                    fontSize: 32,
                    color: "#0000ff"
                    // color: "#0505ff" 
                  }}
                />
                <p
                  className="mt-2"
                  style={{ fontWeight: "400", fontSize: "14px" }}
                >
                  Step 2:{" "}
                </p>
                <p
                  className="mt-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  We Handle the Hard Work
                </p>
                <p
                  style={{
                    color: "rgba(121, 121, 121, 1)",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  We conduct a comprehensive legal verification, documentation
                  check, and professional valuation to establish a fair, fixed
                  price. We then manage all marketing and property viewings.
                </p>
              </div>
              <div>
                <HandshakeIcon
                  className="mt-2"
                  sx={{ fontSize: 32, color: "#0000ff" }}
                />
                <p
                  className="mt-2"
                  style={{ fontWeight: "400", fontSize: "14px" }}
                >
                  Step 3:{" "}
                </p>
                <p
                  className="mt-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Close the Deal with Confidence
                </p>
                <p
                  style={{
                    color: "rgba(121, 121, 121, 1)",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  We bring you the finalized offer. You only need to be present
                  for the final registration and signing. It's that simple.
                </p>
              </div>
            </div>
            <div className="col-8">
              <div
                style={{
                  border: "1px solid rgb(193 212 255)",
                  backgroundColor: "#f8fcff",
                  marginLeft: "50px",
                }}
                className="p-4"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  <div>
                    <h6>Property Type</h6>
                    <div className="row mt-4">
                      {PropertyTypeData?.slice()
                        .sort((a, b) => a.id - b.id)
                        .map((item, index) => (
                          <div
                            key={index}
                            className="col-6 mb-2"
                            onClick={() => handlePropertyTypeSelect(item.id)}
                          >
                            <div
                              className="text-center"
                              style={{
                                border: "1px solid #c0d5e7",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "10px 15px",
                                cursor: "pointer",
                                background:
                                  selectedPropertyType === item.id
                                    ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                                    : "#fff",
                                // background:
                                //   selectedPropertyType === item.id
                                //     ? "linear-gradient(90deg, rgba(15, 49, 255, 1) 42%,rgba(94, 165, 241, 1) 100%)"
                                //     : "#fff",

                                color:
                                  selectedPropertyType === item.id
                                    ? "white"
                                    : "black",
                                transition: "0.3s",
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              {visualIcons(item)} <p>{item.property_type}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="mt-4">Subproperty Type</h6>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                      {filteredSubPropertyTypeData?.map((item, index) => (
                        <div
                          key={index}
                          className=""
                          onClick={() => handleSubPropertySelect(item.id)}
                          style={{
                            border: "1px solid #c0d5e7",
                            fontSize: "13px",
                            fontWeight: "500",
                            padding: "10px 15px",
                            cursor: "pointer",
                            background: selectedSubPropertyType.includes(
                              item.id
                            )
                              ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                              : "#fff",
                            // background: selectedSubPropertyType.includes(
                            //   item.id
                            // )
                            //   ? "#0505ff"
                            //   : "#fff",
                            color: selectedSubPropertyType.includes(item.id)
                              ? "white"
                              : "black",
                            margin: "3px",
                            display: "inline-block",
                          }}
                        >
                          {item.subproperty}
                        </div>
                      ))}
                    </div>
                    {/* Subproperty error */}
                    {/* {formik.errors.subproperty &&
                      formik.touched.subproperty && (
                        <p className="error_msg">{formik.errors.subproperty}</p>
                      )} */}
                  </div>
                  <div>
                    <h6 className="mt-4">Title Document</h6>
                    <div className="mt-4">
                      {/* <Uploader
                        ref={formik.SaledeedRef}
                        action={null}
                        draggable
                        autoUpload={false}
                        // fileList={formik.saledeedFiles}
                        fileList={
                          formik.values.saledeed
                            ? [
                                {
                                  name: formik.values.saledeed.name,
                                  fileKey: 1,
                                },
                              ]
                            : []
                        }
                        onChange={(fileList) => {
                          const file =
                            fileList.length > 0 ? fileList[0].blobFile : null;
                          formik.setFieldValue("saledeed", file);
                        }}
                      >
                        <div
                          style={{
                            height: 110,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ddefff",
                          }}
                        >
                          <NoteAddOutlinedIcon
                            sx={{ color: "#05599f", fontSize: 32 }}
                          />

                          <span
                            style={{
                              color: "#05599f",
                              cursor: "pointer",
                            }}
                            className="mt-2"
                          >
                            Document
                          </span>
                        </div>
                      </Uploader> */}
                      <Uploader
                        action=""
                        draggable
                        autoUpload={false}
                        fileList={fileList}
                        onChange={handleChange}
                        onRemove={() => setFileList([])}
                        key={fileList.length === 0 ? "empty" : "filled"}
                      >
                        <div
                          style={{
                            height: 110,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ddefff",
                          }}
                        >
                          <NoteAddOutlinedIcon
                            sx={{ color: "#0000ff", fontSize: 32 }}
                          />
                          <span
                            style={{
                              color: "#0000ff",
                              // color: "#0505ff",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                          >
                            {fileList.length > 0
                              ? "Change Document"
                              : "Upload Document"}
                          </span>
                        </div>
                      </Uploader>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "rgba(26, 131, 30, 1)",
                      }}
                    >
                      Note :
                    </p>
                    <div
                      className="p-3"
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "rgba(26, 131, 30, 1)",
                      }}
                    >
                      Please attach the required property documents for
                      verification.
                    </div>
                  </div>
                  <div className="mt-5 mb-4 d-flex justify-content-center">
                    <button className="sell-submit-btn" type="submit">
                      {loading ? (
                        <ThreeDots
                          visible={true}
                          height="15"
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
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellProperty;
