import React, { useEffect, useState } from "react";
import "../Footer/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import android from "../../assets/images/android.png";
import ios from "../../assets/images/appstore.png";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import YouTubeImg from "../../assets/social_icons/icons8-youtube-48.png"
import facebook from "../../assets/social_icons/icons8-facebook-48.png"
import instagramImg from "../../assets/social_icons/icons8-instagram-48.png"
import twitter from "../../assets/social_icons/icons8-twitter-48.png"

function Footer() {
  const [getData, setGetData] = useState([]);
  const navigate = useNavigate();
  const fetchHighReturnProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/footer`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchHighReturnProperties();
  }, []);

  const socialLinks = JSON.parse(getData[0]?.social || "[]");

  //  links
  const facebookLink =
    socialLinks.find((item) => item.social_icon.toLowerCase() === "facebook")
      ?.social_link || "#";
  const youTubeLink =
    socialLinks.find((item) => item.social_icon.toLowerCase() === "youtube")
      ?.social_link || "#";
  const twitterLink =
    socialLinks.find((item) => item.social_icon.toLowerCase() === "twitter")
      ?.social_link || "#";
  const instagramLink =
    socialLinks.find((item) => item.social_icon.toLowerCase() === "instagram")
      ?.social_link || "#";

  return (
    <>
      <footer className="first-footer">
        <div className="top-footer">
          <div className="container-fluid container-fluid1">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <h3>About Goolok</h3>
                {getData[0]?.about}
              </div>
              <div className="col-md-6 col-lg-6">
                <h3>Properties in Chennai</h3>
                {getData[0]?.property_tag_names.map((item, index) => (
                  <span key={index} className="property-link " style={{lineHeight:1.6,color:"white"}}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/properties", {
                          state: { searchvalue: item },
                        });
                        window.scrollTo(0, 0);
                      }}
                      className="property-link-name"
                    >
                      Property in {item}
                    </a>
                    {index < getData[0].property_tag_names.length - 1 && " | "}
                  </span>
                ))}
              </div>
             


            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-lg-6">
                <h3>More from Our Network</h3>
                <div className="row">
                  {(() => {
                    try {
                      const networks = getData[0]?.network
                        ? JSON.parse(getData[0].network)
                        : [];
                      return networks.map((item, index) => (
                        <div key={index} className="col-lg-3 col-4">
                          <a
                            href={item.network_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {item.netwok}
                          </a>
                        </div>
                      ));
                    } catch (e) {
                      console.error("Invalid JSON in network:", e);
                      return null;
                    }
                  })()}
                </div>

                <div className="row mt-4">
                  <div className="col-lg-3 col-6 ">
                    <img src={android} width="140px" style={{ height: 45 }} />
                  </div>
                  <div className="col-lg-3 col-6">
                    <img
                      src={ios}
                      width="140px"
                      style={{ height: 45, borderRadius: 10 }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mt-lg-0 mt-4">
                    {/* <section className="mb-4">
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#3b5998" }}
                          href={facebookLink}
                          role="button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "black" }}
                          href={twitterLink}
                          role="button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-x-twitter" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#dd4b39" }}
                          href={youTubeLink}
                          role="button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-youtube" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{
                            background:
                              "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                            outline: "none",
                            border:"none"
                          }}
                          href={instagramLink}
                          role="button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </section> */}
                    {/* <div className="d-flex gap-1">
                        <img src={facebook} alt="youtube" style={{ width: "40px", height: "40px" }} />
                        <img src={instagramImg} alt="youtube" style={{ width: "40px", height: "40px" }} />
                        <img src={twitter} alt="youtube" style={{ width: "40px", height: "40px" }} />
                        <img src={YouTubeImg} alt="youtube" style={{ width: "40px", height: "40px" }} />
                      </div> */}
                    <section className="footer-social">
                      <a
                        href={facebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon fb"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>

                      <a
                        href={twitterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon x"
                      >
                        <i className="fab fa-x-twitter" />
                      </a>

                      <a
                        href={youTubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon yt"
                      >
                        <i className="fab fa-youtube" />
                      </a>

                      <a
                        href={instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon ig"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </section>





                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <h3>New Projects in Tamil Nadu</h3>
                {getData[0]?.new_project_tag_names.map((item, index) => (
                  <span key={index} className="property-link"  style={{lineHeight:1.6}}>
                    <a
                      href="javascript:void(0);"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/properties", {
                          state: { searchvalue: item },
                        });
                        window.scrollTo(0, 0);
                      }}
                       className="property-link-name"
                    >
                      New Projects in {item}
                    </a>
                    {index < getData[0].new_project_tag_names.length - 1 &&
                      " | "}
                  </span>
                ))}
                {/* <p>
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in Trichy
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in Tiruvannamalai
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in Tirunelveli
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in Ooty
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in Kanyakumari
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);" style={{ color: "white" }}>
                    New Projects in cuddalore
                  </a>
                </p> */}
              </div>
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ backgroundColor: "#677B8B", width: "100%" }}
          >
            <div className="mt-2">
              <div className="footer_policy justify-content-center flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  <Link
                    to={"whoweare"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    Who we are
                  </Link>{" "}
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"howitswork"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    How it's work
                  </Link>{" "}
                </div>
              
                <div className="p-2 bd-highlight">
                  <Link
                    to={"blogs"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Blogs
                  </Link>
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"terms"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Terms &amp; Conditions{" "}
                  </Link>{" "}
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"privacypolicy"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    Privacy Policy
                  </Link>{" "}
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"refundpolicy"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    Refund Policy
                  </Link>
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"aboutus"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    About us
                  </Link>
                </div>
                <div className="p-2 bd-highlight">
                  <Link
                    to={"contactus"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    Contact us
                  </Link>
                </div>
              
              </div>


            </div>
          </div>
          <div className="container-fluid">
            <div style={{ textAlign: "justify" }}>
              <p>Disclaimer : {getData[0]?.disclaimer} </p>
              {/* <p>
                Disclaimer: Goolok Realty Services Limited is only an
                intermediary offering its platform to advertise properties of
                Seller for a Customer/Buyer/User coming on its Website and is
                not and cannot be a party to or privy to or control in any
                manner any transactions between the Seller and the
                Customer/Buyer/User. All the offers and discounts on this
                Website have been extended by various Builder(s)/Developer(s)
                who have advertised their products.{" "}
              </p> */}
            </div>
          </div>
        </div>
        <div className="second-footer">
          <div
            className="container"
            style={{ justifyContent: "center", color: "#2b2e3a" }}
          >
            <p>© - All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* <div className="chatbox-launch-button">
        <div
          className="chatbox-img-cont"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faRocketchat}
            style={{ fontSize: "35px", color: "white" }}
          />
          <span
            className="d-none d-md-block"
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: "bolder",
              marginLeft: "5px",
            }}
          >
            Chat With Me
          </span>
        </div>
      </div> */}
    </>
  );
}

export default Footer;
