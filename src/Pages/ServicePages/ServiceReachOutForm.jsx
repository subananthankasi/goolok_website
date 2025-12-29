import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { Skeleton } from "primereact/skeleton";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { encryptData } from "../../Utils/encryptData";
import "./WholeService.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { FaVectorSquare } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../Redux/Action/PropertyTypeAction";
import { fetchSubPropertyType } from "../../Redux/Action/SubPropertyAction";
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
import { Uploader } from "rsuite";
import { ThreeDots } from "react-loader-spinner";
import EastIcon from "@mui/icons-material/East";
import axiosInstance from "../../Api/axiosInstance";
import { useAlert } from "react-alert";

const ServiceReachOutForm = ({
  selectedService,
  setSelectedService,
  getData,
}) => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("1");
  const [selectedSubPropertyType, setSelectedSubPropertyType] = useState([]);
  const serviceType =
    selectedService?.service_title?.toLowerCase() === "missing documents";

  const visualIForPropertycons = (item) => {
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
  const [remark, setRemark] = useState("");

  const handleChange = (newFileList) => {
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1];
      setFileList([
        {
          ...latestFile,
          name: latestFile.name,
          fileKey: Date.now(),
        },
      ]);
    } else {
      setFileList([]);
    }
  };
  const PropertyTypeData = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  const SubPropertyTypeData = useSelector(
    (state) => state.SubPropertyType.SubPropertyTypeData
  );
  const userData = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyType());
    dispatch(fetchSubPropertyType());
  }, [dispatch]);

  const filteredSubPropertyTypeData = useMemo(() => {
    return SubPropertyTypeData?.filter(
      (item) => item.property === selectedPropertyType
    );
  }, [SubPropertyTypeData, selectedPropertyType]);

  useEffect(() => { }, [selectedPropertyType]);

  const handlePropertyTypeSelect = (type) => {
    setSelectedPropertyType(type);
    setSelectedSubPropertyType([]);
  };

  const handleSubPropertySelect = (subId) => {
    setSelectedSubPropertyType(subId);
  };

  const [showAllProperties, setShowAllProperties] = useState(false);
  const [showAllSubProperties, setShowAllSubProperties] = useState(false);

  // Sort and limit property data
  const sortedProperties = PropertyTypeData?.slice().sort(
    (a, b) => a.id - b.id
  );
  const visibleProperties = showAllProperties
    ? sortedProperties
    : sortedProperties?.slice(0, 4);

  // Limit subproperty data
  const visibleSubProperties = showAllSubProperties
    ? filteredSubPropertyTypeData
    : filteredSubPropertyTypeData?.slice(0, 3);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [next, setNext] = useState("property");

  const DocumentList = [
    "CMDA",
    "DTCP",
    "WILL DEED",
    "SALE DEED",
    "FMB",
    "POWER DEED",
    "ANY OTHER DOCUMENTS",
  ];

  const visibleDocuments = showAllDocuments
    ? DocumentList
    : DocumentList.slice(0, 6);

  const showError = (msg) => toast.error(msg);

  const handleNextButton = () => {
    if (next === "missingdocument") {
      if (!selectedDocument) {
        showError("Please select a document from the list");
        return;
      }
      if (!remark || remark.trim() === "") {
        showError("Please enter remark");
        return;
      }
      setNext("property");
      return;
    }

    if (next === "property") {
      if (!selectedPropertyType) {
        showError("Please select a Property Type");
        return;
      }
      if (!selectedSubPropertyType || selectedSubPropertyType.length === 0) {
        showError("Please select Subproperty Type");
        return;
      }

      setNext("document");
      return;
    }

    if (next === "document") {
      setNext("button");
      return;
    }
    setNext("");
  };

  useEffect(() => {
    if (serviceType) {
      setNext("missingdocument");
    } else {
      setNext("property");
    }
  }, [serviceType]);

  const token = localStorage.getItem("zxcvbnm@#");
  // initialValues: {
  //   // date: null,
  //   // customer: "",
  //   // mobile: "",
  //   // email: "",
  //   // servicecat: "",
  //   documentlist: "",
  //   remark: "",
  //   property: "",
  //   subproperty: "",
  //   patta: "",
  //   aadhaar: "",
  //   saledeed: "",
  // },
  //   const payload = {
  //   ...values,
  //   type: "service",
  //   servicecat: getData[0]?.service_title,
  //   customer: profileData?.customer,
  //   mobile: profileData?.phone,
  //   email: profileData?.mail,

  // };
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

    if (serviceType) {
      if (!selectedDocument) {
        toast.error("Please select the missing document");
        return;
      }
      if (!remark || remark.trim() === "") {
        toast.error("Please enter remark for missing document");
        return;
      }
    }

    if (fileList.length === 0) {
      toast.error("Please upload your Title Document");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", "service");
      formData.append("property", selectedPropertyType ?? "");
      // formData.append("subproperty", JSON.stringify(selectedSubPropertyType));
      formData.append("subproperty", selectedSubPropertyType ?? "");
      formData.append("saledeed", fileList[0].blobFile);
      formData.append("documentlist", selectedDocument ?? "");
      formData.append("servicecat", selectedService?.service_title ?? "");
      formData.append("remark", remark ?? "");
      formData.append("customer", userData ? userData.customer : "");
      formData.append("mobile", userData ? userData.phone : "");
      formData.append("email", userData ? userData.mail : "");

      const response = await axiosInstance.post("/vendor/enquiry", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedPropertyType("1");
      setSelectedSubPropertyType("");
      setFileList([]);
      setNext("property");
      setSelectedService(getData[0]);
      setRemark("");
      setSelectedDocument(null);
      alert.success(
        "Your enquiry has been successfully sent. Our team will contact you shortly!"
      );
    } catch (error) {
      alert.error("Failed to send your enquiry. Please try again later!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <div className="service_card card text-center">
        <h5 className="service_subtitle mb-1" style={{ fontWeight: "600" }}>
          Reach Out{" "}
        </h5>
        {/* <h6
          className="m-0 p-0 mb-2"
          style={{
            textTransform: "capitalize",
            fontSize: "13px",
            color: "#2978ba",
            fontWeight: "500",
          }}
        >
          for {selectedService?.service_title}{" "}
        </h6> */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2 px-3">
          {(selectedService?.service_title?.toLowerCase() ===
            "missing documents"
            ? ["Document", "Property", "Upload"]
            : ["Property", "Upload"]
          ).map((step, index, arr) => {
            const stepKeyMap = {
              Document: "missingdocument",
              Property: "property",
              Upload: "document",
            };

            const isActive = next === stepKeyMap[step];
            const isCompleted =
              arr.findIndex((s) => stepKeyMap[s] === next) > index;

            return (
              <React.Fragment key={step}>
                {/* Step Circle */}
                <div className="d-flex flex-column align-items-center">
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isActive
                        ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                        : isCompleted
                          ? "#282fffff"
                          : "#d9e6f3",
                      color: isActive || isCompleted ? "white" : "#555",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "0.3s",
                    }}
                  >
                    {index + 1}
                  </div>
                  <small
                    style={{
                      marginTop: "4px",
                      fontSize: "11px",
                      fontWeight: "500",
                      color: isActive
                        ? "#0000ff"
                        : isCompleted
                          ? "#0000ff"
                          : "#777",
                    }}
                  >
                    {step}
                  </small>
                </div>

                {/* Connector Line */}
                {index < arr.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background: isCompleted
                        ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                        : "#d9e6f3",
                      margin: "0 5px",
                    }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          style={{ height: "410px" }}
        >
          {/* Document List */}
          {next === "missingdocument" && serviceType && (
            <>
              <div>
                <h6
                  className="text-start service_subtitle"
                  style={{ fontSize: "14px" }}
                >
                  Document List
                </h6>
                <div className="row mt-3 property_type_element">
                  {DocumentList?.map((item, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${item === "ANY OTHER DOCUMENTS" ? "col-6" : "col-6"
                        }`}
                      onClick={() => setSelectedDocument(item)}
                    >
                      <div
                        className="text-center"
                        style={{
                          border: "1px solid #c0d5e7",
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "7px 10px",
                          cursor: "pointer",
                          background:
                            selectedDocument === item
                              ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                              : "#fff",
                          color: selectedDocument === item ? "white" : "black",
                          transition: "0.3s",
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p style={{ margin: 0 }}>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 mb-3">
                <h6
                  className="text-start service_subtitle mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Remark
                </h6>
                <textarea
                  name="remark"
                  className="form-control"
                  style={{ height: "100px" }}
                  placeholder="text here ...!"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
            </>
          )}

          {next === "property" && (
            <>
              {/* property type  */}
              <div>
                <h6
                  className="text-start service_subtitle"
                  style={{ fontSize: "14px" }}
                >
                  Property Type
                </h6>
                <div className="row mt-3 property_type_element">
                  {PropertyTypeData?.sort(
                    (a, b) => Number(a.id) - Number(b.id)
                  )?.map((item, index) => (
                    <div
                      key={index}
                      className="col-6 mb-2"
                      onClick={() => handlePropertyTypeSelect(item?.id)}
                    >
                      <div
                        className="text-center"
                        style={{
                          border: "1px solid #c0d5e7",
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "7px 10px",
                          cursor: "pointer",
                          background:
                            selectedPropertyType === item?.id
                              ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                              : "#fff",
                          color:
                            selectedPropertyType === item?.id
                              ? "white"
                              : "black",
                          transition: "0.3s",
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          {visualIForPropertycons(item)} {item?.property_type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* {PropertyTypeData?.length > 4 && (
                <div className="text-start mt-2" style={{ fontSize: "12px" }}>
                  <button
                    onClick={() => setShowAllProperties(!showAllProperties)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#05599F",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    {showAllProperties ? "View Less..." : "View More ..."}
                  </button>
                </div>
              )} */}
              </div>

              {/* Subproperty Type Section */}
              <div>
                <h6
                  className="mt-2 text-start service_subtitle"
                  style={{ fontSize: "14px" }}
                >
                  Subproperty Type
                </h6>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                  {filteredSubPropertyTypeData?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSubPropertySelect(item.id)}
                      style={{
                        border: "1px solid #c0d5e7",
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "7px 10px",
                        cursor: "pointer",
                        background: selectedSubPropertyType.includes(item.id)
                          ? "linear-gradient(69.65deg, #0000ff, #78bdf6)"
                          : "#fff",
                        color: selectedSubPropertyType.includes(item.id)
                          ? "white"
                          : "black",
                        // margin: "3px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.subproperty}
                    </div>
                  ))}
                </div>

                {/* {filteredSubPropertyTypeData?.length > 3 && (
                  <div className="text-start mt-2">
                    <button
                      onClick={() =>
                        setShowAllSubProperties(!showAllSubProperties)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#05599F",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      {showAllSubProperties ? "View Less ..." : "View More ..."}
                    </button>
                  </div>
                )} */}
              </div>
            </>
          )}
          {/* Title document */}
          {next === "document" && (
            <div>
              <h6
                className="mt-2 text-start service_subtitle"
                style={{ fontSize: "14px" }}
              >
                Title Document
              </h6>
              <div className="mt-2">
                <Uploader
                  action=""
                  draggable
                  autoUpload={false}
                  fileList={fileList}
                  onChange={handleChange}
                  onRemove={() => setFileList([])}
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
          )}

          {/*Notes */}
          {/* <div className="mt-4">
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
                Please attach the required property documents for verification.
              </div>
            </div> */}

          {/*Button */}
          {/* {next === "document" && (
            <div className="mt-3">
              <button
                className="btn"
                style={{
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, #05599f 0%, #78bdf6 100%)",
                  color: "white",
                  fontWeight: "500",
                  boxShadow: "0 4px 12px rgba(5,89,159,0.3)",
                  transition: "all 0.3s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
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
          )} */}

          {/* nextButton */}

          {(next === "missingdocument" ||
            next === "property" ||
            !next === "document") && (
              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  // width: "90%",
                }}
              >
                <button
                  className=" w-100"
                  style={{
                    background: "linear-gradient(69.65deg, #0000ff, #0000ff)",
                    padding: "7px 10px",
                    color: "white",
                    fontWeight: "500",
                    boxShadow: "0 4px 12px rgba(5,89,159,0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={handleNextButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  type="button"
                >
                  Next <EastIcon />
                </button>
              </div>
            )}

          {next === "document" && (
            <div className="mt-3">
              <button
                className=""
                style={{
                  background: "linear-gradient(69.65deg, #0000ff, #0000ff)",
                  color: "white",
                  fontWeight: "500",
                  boxShadow: "0 4px 12px rgba(5,89,159,0.3)",
                  transition: "all 0.3s ease",
                  width: "100%",
                  padding: "7px 10px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                type="submit"
              >
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
          )}
        </form>
      </div>
    </div>
  );
};

export default ServiceReachOutForm;
