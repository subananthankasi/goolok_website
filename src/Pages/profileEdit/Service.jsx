import { useEffect, useState } from "react";
import a1 from "../../assets/images/villa1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../Api/axiosInstance";
import { Skeleton } from "primereact/skeleton";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Paginator } from "primereact/paginator";
import find_property from "../../assets/find_property.jpg";
import missing_property from "../../assets/missing_document.jpg";
import get_property from "../../assets/get_patta_property.jpg";
import legal_opinion from "../../assets/legal_opinion.jpg";
import land_survey from "../../assets/land_servey.jpg";
import property_valuation from "../../assets/property_valution.jpg";

const Service = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completeData, setCompleteData] = useState([]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/service`, {
        headers: {
          Level: "progress",
        },
      });
      setGetData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(true);
    }
  };
  const fetchInvoiceComplete = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/service`, {
        headers: {
          Level: "live",
        },
      });
      setCompleteData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoice();
    fetchInvoiceComplete();
  }, []);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const imageShow = [
    {
      id: 1,
      image: find_property,
      type: "Find your property google map location",
    },
    {
      id: 2,
      image: missing_property,
      type: "Missing documents",
    },
    {
      id: 3,
      image: get_property,
      type: "Get patta for your property",
    },
    {
      id: 4,
      image: legal_opinion,
      type: "Legal opinion",
    },
    {
      id: 5,
      image: land_survey,
      type: "Land survey",
    },
    {
      id: 6,
      image: property_valuation,
      type: "Property valuation",
    },
  ];
  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row">
          <ProfileSideBar /> */}

      <div style={{ paddingTop: 50 }}>
        <div className="container">
          {/* <div>
              <h6 className="text-center"><b> My Services</b> </h6>
              <hr />
            </div> */}
          <div>
            <h5 className="text-center" style={{ color: "#36454f" }}>
              My Services
            </h5>
            <hr className="hr-gradient" />
          </div>

          <div className="container px-5 mt-4">
            <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
              <li className="nav-item w-50">
                <button
                  className={`nav-link ${
                    activeTab === "pending" ? "active" : ""
                  } w-100`}
                  onClick={() => setActiveTab("pending")}
                >
                  Ongoing
                </button>
              </li>
              <li className="nav-item w-50">
                <button
                  className={`nav-link ${
                    activeTab === "completed" ? "active" : ""
                  } w-100`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
              </li>
            </ul>

            <div className="tab-content ">
              {activeTab === "pending" && (
                <div>
                  {loading ? (
                    <div className="mt-3">
                      {[1, 2, 3].map((item, index) => (
                        <div
                          className="row  g-0  align-items-center"
                          key={index}
                        >
                          <div className="col-5 p-2 ">
                            <Skeleton height="9.8rem" className="mb-2" />
                          </div>

                          <div className="col-7 px-3 py-2">
                            <Skeleton
                              height="1.5rem"
                              className="mb-2"
                              width="60%"
                            />
                            <Skeleton height="1.5rem" className="mb-2" />
                            <Skeleton height="1.5rem" className="mb-2" />
                            <Skeleton height="1.5rem" className="mb-2" />

                            <div className="d-flex justify-content-between">
                              <Skeleton
                                height="1.5rem"
                                className="mb-2"
                                width="45%"
                              />
                              <Skeleton
                                height="1.5rem"
                                className="mb-2"
                                width="40%"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : getData?.length > 0 ? (
                    <>
                      {getData?.slice(first, first + rows).map((item) => {
                        const image = imageShow?.find(
                          (i) => i.type === item.service_cat,
                        );
                        return (
                          <div key={item.id} className="service-row my-3">
                            <div className="row  g-0  align-items-center position-relative ">
                              <div className="col-5 p-2 ">
                                <img
                                  src={image?.image || a1}
                                  alt="Services"
                                  className="service-image"
                                />
                              </div>

                              <div className="col-7 px-3 py-2">
                                <h6 className="mb-1 service-title google_font_poppins">
                                  {item.service_cat}
                                </h6>

                                {/* <Tag
                                  // color="#0000ff"
                                  variant="outlined"
                                  className="position-absolute  fw-bold "
                                  style={{ top: "10px", right: "10px" }}
                                >
                                  {item?.propertyid}
                                </Tag> */}
                                <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                  <label>Property ID:</label>{" "}
                                  <label className="fw-bold">
                                    {item.propertyid}
                                  </label>
                                </p>
                                <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                  <label>Customer Name:</label>
                                  <label className="fw-bold ">
                                    {item.customer}
                                  </label>
                                </p>
                                <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                  <label>Property Type:</label>{" "}
                                  <label className="fw-bold">
                                    {item.property_type}
                                  </label>
                                </p>

                                <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                  <label>Sub Property Type:</label>{" "}
                                  <label className="fw-bold">
                                    {item.subpro_name}
                                  </label>
                                </p>
                                {/* <p className="m-0 d-flex gap-2 align-items-center ">
                                  <label>Service Type:</label>{" "}
                                  <label className="fw-bold">
                                    {item.service_cat}
                                  </label>
                                </p> */}

                                {/* <div className="d-flex align-items-center mt-1">
                                <span className="me-1 small text-secondary">
                                  Price:
                                </span>
                                <span className="text-decoration-line-through text-muted me-2 small">
                                  ₹ 4500
                                </span>
                                <h5 className="mb-0 text-primary fw-bold">
                                  ₹ 4000
                                </h5>
                              </div>
                              <p className="text-muted small mb-1">
                                Consultation fee only; extra charges may apply.
                              </p>
                              <ul className="ps-3 mb-1 mt-1 service-ul">
                                <li>
                                  <b>Patta Transfer</b>
                                </li>
                                <li>
                                  <b>Patta Correction</b>
                                </li>
                                <li>
                                  <b>Patta Application</b>
                                </li>
                              </ul>
                              */}
                                <div className="d-flex justify-content-between">
                                  <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                    <label>Service Received On:</label>{" "}
                                    <label className="fw-bold">
                                      {item?.created_at &&
                                        new Date(
                                          item?.created_at,
                                        ).toLocaleDateString("en-GB")}
                                    </label>
                                  </p>
                                  <Link
                                    to={`/profile_edit/servicedetails/${item.id}`}
                                    className="premium-view-btn"
                                  >
                                    View More{" "}
                                    <FontAwesomeIcon
                                      icon={faChevronRight}
                                      size="sm"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className=" mt-3 mb-5">
                        <Paginator
                          first={first}
                          rows={rows}
                          totalRecords={getData.length}
                          onPageChange={onPageChange}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center mt-5 pt-5">
                      <h4 className="text-center">
                        <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                      </h4>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "completed" && (
                <div>
                  {loading ? (
                    <div className="mt-3">
                      {[1, 2, 3].map((item, index) => (
                        <div
                          className="row  g-0  align-items-center"
                          key={index}
                        >
                          <div className="col-5 p-2 ">
                            <Skeleton height="9.8rem" className="mb-2" />
                          </div>

                          <div className="col-7 px-3 py-2">
                            <Skeleton
                              height="1.5rem"
                              className="mb-2"
                              width="60%"
                            />
                            <Skeleton height="1.5rem" className="mb-2" />
                            <Skeleton height="1.5rem" className="mb-2" />
                            <Skeleton height="1.5rem" className="mb-2" />

                            <div className="d-flex justify-content-between">
                              <Skeleton
                                height="1.5rem"
                                className="mb-2"
                                width="45%"
                              />
                              <Skeleton
                                height="1.5rem"
                                className="mb-2"
                                width="40%"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : completeData && completeData.length > 0 && !loading ? (
                    <>
                      {completeData.slice(first, first + rows).map((item) => {
                        const image = imageShow?.find(
                          (i) => i.type === item.service_cat,
                        );
                        return (
                          <div
                            key={item.id}
                            className=" shadow-sm"
                            style={{
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            }}
                          >
                            {/* <div className="row align-items-center">
                                  <div className="col-8">
                                    <h6
                                      className="mb-1"
                                      style={{ fontWeight: "600" }}
                                    >
                                      {item.service_cat}
                                    </h6>
                                    <p className="p-0 m-0">
                                      Customer: <b>{item.customer}</b>
                                    </p>

                                    <div className="d-flex align-items-center">
                                      <span
                                        className="me-1"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Price:
                                      </span>
                                      <span
                                        className="text-decoration-line-through text-muted me-2"
                                        style={{ fontSize: "14px" }}
                                      >
                                        ₹ 4500
                                      </span>
                                      <h5
                                        className="mb-0"
                                        style={{
                                          color: "#071a9b",
                                          fontSize: "18px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        ₹ 4000
                                      </h5>
                                    </div>

                                    <p
                                      style={{
                                        marginBottom: "0px",
                                        fontSize: "10px",
                                      }}
                                    >
                                      This Price is consultation fee only; extra
                                      charges may apply.
                                    </p>

                                    <ul className="ps-0 service-ul mb-1 mt-1">
                                      <li>Patta Transfer</li>
                                      <li>Patta Correction</li>
                                      <li>Patta Application</li>
                                    </ul>

                                    <div>
                                      <Link
                                        to={`/profile_edit/servicedetails/${item.id}`}
                                        style={{
                                          fontSize: "16px",
                                          textDecoration: "underline",
                                          color: "#212529",
                                        }}
                                      >
                                        View More{" "}
                                        <FontAwesomeIcon
                                          icon={faChevronRight}
                                          size="sm"
                                        />
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="col-4">
                                    <div className="service-card">
                                      <img
                                        src={a1}
                                        alt="Services"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                </div> */}
                            <div key={item.id} className="service-row my-3">
                              <div className="row align-items-center g-0">
                                <div className="col-5 p-2">
                                  <img
                                    src={image?.image || a1}
                                    alt="Services"
                                    className="service-image"
                                  />
                                </div>

                                <div className="col-7 px-3 py-2">
                                  <h6 className="mb-1 service-title">
                                    {item.service_cat}
                                  </h6>
                                  <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                    <label>Property ID:</label>{" "}
                                    <label className="fw-bold">
                                      {item.propertyid}
                                    </label>
                                  </p>
                                  <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                    <label>Customer Name:</label>
                                    <label className="fw-bold ">
                                      {item.customer}
                                    </label>
                                  </p>
                                  <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                    <label>Property Type:</label>{" "}
                                    <label className="fw-bold">
                                      {item.property_type}
                                    </label>
                                  </p>

                                  <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                    <label>Sub Property Type:</label>{" "}
                                    <label className="fw-bold">
                                      {item.subpro_name}
                                    </label>
                                  </p>

                                  {/* <div className="d-flex justify-content-end">
                                    <Link
                                      to={`/profile_edit/servicedetails/${item.id}`}
                                      className="view-more-link"
                                    >
                                      View More{" "}
                                      <FontAwesomeIcon
                                        icon={faChevronRight}
                                        size="sm"
                                      />
                                    </Link>
                                  </div> */}
                                  <div className="d-flex justify-content-between">
                                    <p className="m-0 d-flex gap-2 align-items-center google_font_poppins">
                                      <label>Service Received On:</label>{" "}
                                      <label className="fw-bold">
                                        {item?.created_at &&
                                          new Date(
                                            item?.created_at,
                                          ).toLocaleDateString("en-GB")}
                                      </label>
                                    </p>
                                    <Link
                                      to={`/profile_edit/servicedetails/${item.id}`}
                                      className="premium-view-btn"
                                    >
                                      View More{" "}
                                      <FontAwesomeIcon
                                        icon={faChevronRight}
                                        size="sm"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className=" mt-3 mb-5">
                        <Paginator
                          first={first}
                          rows={rows}
                          totalRecords={completeData.length}
                          onPageChange={onPageChange}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center mt-5 pt-5">
                      <h4 className="text-center">
                        <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                      </h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Service;
