import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useJsApiLoader } from "@react-google-maps/api";
import OfficeLocations from "./OfficeLocations";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { encryptData } from "../../../Utils/encryptData";


const ContactUs = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/contactus`);
      setGetData(response.data?.data);
      const encrypted = encryptData(JSON.stringify(response.data?.data));
      localStorage.setItem("address", encrypted);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const HeadOffice = getData?.filter((item) => {
    return item.address_type === "Head Office";
  });
  const otherOffices = getData?.filter((item) => {
    return item.address_type !== "Head Office";
  });

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f9fafc, #ffffff)",
        fontFamily: "poppins"
      }}
      className="mt-2"
    >
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="mt-3 mb-3">
          <Breadcrumb
            items={[
              { title: <Link to="/">Home</Link> },
              { title: "Contact us" },
            ]}
          />
        </div>
        {/* ====== TITLE ====== */}
        <h2
          className="text-center"
          style={{
            fontWeight: "800",
            color: "#374550",
            marginBottom: "15px",
            fontSize: "2rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Contact Us
        </h2>

        <p
          className="text-center mb-5"
          style={{
            color: "#555",
            fontSize: "15px",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          We’re here to help! Have a question about our services or need
          assistance with your property search? Reach out to us — we’d love to
          hear from you.
        </p>

        {/* ====== CONTACT SECTION ====== */}
        <div
          className="p-4 mb-5"
          style={{
            background: "#fff",
            boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div className="row">
            {/* Head Office */}
            <div className="col-md-6 col-12 mb-4 mb-md-0">
              <h5
                style={{
                  color: "#374550",
                  fontWeight: "700",
                  marginBottom: "15px",
                }}
              >
                Head Office
              </h5>
              <p
                style={{ color: "#555", fontSize: "14px", marginBottom: "6px" }}
              >
                <LocationOnIcon sx={{ color: "blue", fontSize: 18 }} />{" "}
                <strong>Address:</strong> {HeadOffice[0]?.address}
              </p>
              <p
                style={{ color: "#555", fontSize: "14px", marginBottom: "6px" }}
              >
                <CallIcon sx={{ color: "green", fontSize: 18 }} />{" "}
                <strong>Phone:</strong> {HeadOffice[0]?.mobile}
              </p>
              <p style={{ color: "#555", fontSize: "14px" }}>
                <EmailIcon sx={{ color: "red", fontSize: 18 }} />{" "}
                <strong>Email:</strong> {HeadOffice[0]?.email}
              </p>
            </div>

            {/* Contact Form */}
            <div className="col-md-6 col-12">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="form-control"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      padding: "10px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="form-control"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      padding: "10px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="form-control"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      padding: "10px",
                      fontSize: "14px",
                    }}
                  ></textarea>
                </div>

                <button
                  type="button"
                  style={{
                    backgroundColor: "#0000ff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    transition: "all 0.3s ease",
                    width: "100%",
                  }}

                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ====== OTHER OFFICES ====== */}
        <h4
          className="text-center mb-4"
          style={{
            color: "#374550",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          Our Other Offices
        </h4>

        <div className="row">
          {otherOffices.map((office, i) => (
            <div key={i} className="col-md-4 col-sm-6 col-12 mb-4">
              <div
                className="p-4 h-100"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h6
                  style={{
                    color: "#374550",
                    fontWeight: "700",
                    marginBottom: "10px",
                  }}
                >
                  {office.address_type}
                </h6>
                <p
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  <strong>Address:</strong> {office.address}
                </p>
                <p
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  <strong>Phone:</strong> {office.mobile}
                </p>
                <p style={{ color: "#555", fontSize: "14px" }}>
                  <strong>Email:</strong> {office.email}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ====== Google Map ====== */}

        <OfficeLocations allOffices={getData} />
      </div>
    </section>
  );
};

export default ContactUs;
