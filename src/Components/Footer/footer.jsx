import { useEffect, useState } from "react";
import "../Footer/footer.css";
import android from "../../assets/images/android.png";
import ios from "../../assets/images/appstore.png";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { Link } from "react-router-dom";

function Footer() {
  const [getData, setGetData] = useState([]);
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
                  <span key={index} className="property-link " style={{ lineHeight: 1.6, color: "white" }}>
                    {/* <a
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
                    </a> */}
                    <Link
                      to="/properties"
                      state={{ searchvalue: item }}
                      className="property-link-name"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Property in {item}
                    </Link>
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
                    <img alt="android" src={android} width="140px" style={{ height: 45 }} />
                  </div>
                  <div className="col-lg-3 col-6">
                    <img
                      src={ios}
                      width="140px"
                      style={{ height: 45, borderRadius: 10 }}
                      alt="ios"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mt-lg-0 mt-4">
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
                  <span key={index} className="property-link" style={{ lineHeight: 1.6 }}>
                    {/* <a
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
                    </a> */}
                    <Link
                      to="/properties"
                      state={{ searchvalue: item }}
                      className="property-link-name"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      New Projects in {item}
                    </Link>
                    {index < getData[0].new_project_tag_names.length - 1 &&
                      " | "}
                  </span>
                ))}
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
    </>
  );
}

export default Footer;
