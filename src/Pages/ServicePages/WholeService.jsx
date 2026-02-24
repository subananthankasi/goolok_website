import { useEffect, useState } from "react";
import axios from "axios";
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
import ServiceReachOutForm from "./ServiceReachOutForm";
import FaqBlog from "./FaqBlog";
import { Breadcrumb } from "antd";


const WholeService = () => {
  const [getData, setGetData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/servicescms`);
      const services = response.data?.data || [];
      setGetData(services);
      setSelectedService(services[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const [serviceDiscription, setServiceDiscription] = useState([]);

  const fetchServiceDescription = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicecontent/${id}`);
      setServiceDiscription(response?.data?.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    fetchServiceDescription(selectedService?.service_id);
  }, [selectedService?.service_id]);

  useEffect(() => {
    fetchServices();
  }, []);

  const visualIcons = (item) => {
    if (!item?.service_title) return null;

    switch (item.service_title.toLowerCase()) {
      case "find your property google map location":
        return (
          <FaLocationDot
            size={17}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      case "missing documents":
        return (
          <FaSearch
            size={19}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      case "get patta for your property":
        return (
          <TiHome
            size={20}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      case "legal opinion":
        return (
          <ImHammer2
            size={21}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      case "land survey":
        return (
          <FaVectorSquare
            size={19}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      case "property valuation":
        return (
          <IoDocumentText
            size={21}
            color={selectedService === item.id ? "white" : "#0000ff"}
          />
        );
      default:
        return <i className="pi pi-home"></i>;
    }
  };

  const maxChars = 180;
  const plainText = serviceDiscription[0]?.description?.replace(/<[^>]+>/g, "");

  const shortText =
    plainText?.length > maxChars
      ? plainText?.substring(0, maxChars)?.trim() + "..."
      : plainText;

  return (
    <div className="container-xl service_container mt-3 mb-5">
      <div className="text-center mb-5">
        <Breadcrumb
          style={{ fontFamily: "poppins" }}
          items={[
            { title: <Link to="/">Home</Link> },
            { title: "Services" },
          ]}
        />
        <h2 className="service_title" style={{ fontFamily: "Poppins" }}>
          Your Trusted Partner in Property Services
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "#555",
            maxWidth: "700px",
            margin: "10px auto 0",
            lineHeight: "1.6",
          }}
        >
          Navigating property ownership can be complex. That’s why we offer a
          suite of expert services designed to bring clarity and confidence to
          your journey.
        </p>
      </div>

      <div className="row g-4">
        {/* --- Left Card: Services List --- */}
        <div className="col-lg-4 col-md-6">
          <div className="service_card card">
            {!loading && (
              <h6 className="service_subtitle mb-3">
                What are you looking for?
              </h6>
            )}
            {loading ? (
              <div className="row">
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
                <div className="col-6 mb-3">
                  <Skeleton height={140} width="100%" />
                </div>
              </div>
            ) : (
              <div className="row">
                {getData?.map((item, i) => (
                  <div className="col-6 mb-3" key={i}>
                    <div
                      className={`service_item ${selectedService?.service_id === item.service_id
                        ? "active"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedService(item);
                        fetchServiceDescription(item.service_id);
                      }}
                    >
                      <div className="service_icon">{visualIcons(item)}</div>
                      <p className="service_text">{item.service_title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Center Card: Selected Service --- */}
        <div className="col-lg-4 col-md-6">
          <div className="service_card card text-center">
            {loading || !selectedService ? (
              <Skeleton height={450} width="100%" />
            ) : (
              <>
                <div className="overflow-hidden mb-3 selected_service_image_container">
                  <img
                    src={`${IMG_PATH}cms_service/servicescms/${selectedService.image}`}
                    alt={selectedService.service_title}
                    className="selected_service_image"
                  />
                </div>

                <h6
                  className="text-start fw-semibold"
                  style={{ fontWeight: "600" }}
                >
                  {selectedService.service_title}
                </h6>
                <div
                  className="d-flex justify-content-start align-items-center mt-3"
                  style={{ fontFamily: "Roboto" }}
                >
                  <p
                    className=""
                    style={{
                      color: "black",
                      fontSize: "28px",
                      fontWeight: "600",
                    }}
                  >
                    ₹ {selectedService.off_amount}
                  </p>
                  <span
                    style={{
                      opacity: "0.6",
                      textDecorationLine: "line-through",
                      fontSize: "14px",
                    }}
                    className="ms-2"
                  >
                    ₹ {selectedService.amount}
                  </span>
                </div>
                <p
                  className="text-muted small mt-2"
                  style={{
                    textAlign: "justify",
                    lineHeight: "1.5",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  {shortText}
                  {plainText?.length > maxChars && (
                    <Link
                      to={`/servicepreview/${encryptData(
                        selectedService?.service_id
                      )}`}
                    >
                      <span
                        style={{
                          color: "#05599F",
                          fontWeight: "500",
                          cursor: "pointer",
                          marginLeft: "5px",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#78BDF6")}
                        onMouseLeave={(e) => (e.target.style.color = "#0000ff")}
                      >
                        Read More
                      </span>
                    </Link>
                  )}
                </p>
                <div className="mt">
                  <Link
                    to={`/servicepreview/${encryptData(
                      selectedService.service_id
                    )}`}
                    className=" d-flex align-items-center justify-content-start"
                    style={{ color: "#0000ff" }}
                  >
                    {/* {selectedService.button_text || "View Service"} */} View
                    details
                    <IoMdArrowRoundForward className="ms-2" size={18} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- Right Card: Static Info --- */}
        <div className="col-lg-4 col-md-6">
          <ServiceReachOutForm
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            getData={getData}
            proLoading={loading}
          />
        </div>
      </div>

      <FaqBlog />
    </div>
  );
};

export default WholeService;
