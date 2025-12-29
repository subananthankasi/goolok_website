import React, { useState } from "react";
import Ledger from "./ledger";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import Tickets from "./Tickets";
import TicketNotification from "./ticketNotification";
import EditProfile from "./editProfile";
import AddProperty from "./AddProperty";
import Dashboard from "./Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import YourProperty from "./YourProperty";

function Profile() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "dashboard"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <div
            className="col-md-3"
            style={{
              padding: 22,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              margin: "20px 0px",
            }}
          >
            <div
              className="  gradient-custom text-center text-white"
              style={{
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem",
              }}
            >
              {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{width: 80}} /> */}

              <div
                className="Profile_upload"
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  {image ? (
                    <div>
                      <img
                        src={image}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      />
                      <CameraAltIcon
                        style={{
                          position: "absolute",
                          top: "88px",
                          right: "16px",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                    // style={{
                    //   width: '150px',
                    //   height: '150px',
                    //   borderRadius: '50%',
                    //   backgroundColor: '#f0f0f0',
                    //   display: 'flex',
                    //   justifyContent: 'center',
                    //   alignItems: 'center',
                    //   fontSize: '40px',
                    //   color: '#757575',
                    //   cursor: 'pointer',
                    //   margin:'auto'
                    // }}
                    >
                      <CameraAltIcon
                        style={{
                          position: "absolute",
                          top: "88px",
                          right: "16px",
                        }}
                      />
                    </div>
                  )}
                </label>
              </div>

              <h6 className="text-dark mt-3 mb-3">Arun Kumar</h6>
            </div>

            <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("dashboard")}
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected={activeTab === "dashboard"}
                >
                  <AccountBoxOutlinedIcon /> Dashboard
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("profile")}
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "profile"}
                >
                  <AccountBoxOutlinedIcon /> Profile
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "property" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("property")}
                  role="tab"
                  aria-controls="property"
                  aria-selected={activeTab === "property"}
                >
                  <AddBoxIcon /> Add Property
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "yourproperty" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("yourproperty")}
                  role="tab"
                  aria-controls="property"
                  aria-selected={activeTab === "yourproperty"}
                >
                  <BookmarkBorderIcon /> My Property
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "Ledger" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("Ledger")}
                  role="tab"
                  aria-controls="Ledger"
                  aria-selected={activeTab === "Ledger"}
                >
                  <AccessTimeFilledIcon /> Ledger
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "Tickets" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("Tickets")}
                  role="tab"
                  aria-controls="Ledger"
                  aria-selected={activeTab === "Tickets"}
                >
                  <UnsubscribeIcon /> Notification
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "contact" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("contact")}
                  role="tab"
                  aria-controls="contact"
                  aria-selected={activeTab === "contact"}
                >
                  <PermContactCalendarIcon /> Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            {/* <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "dashboard" ? "show active" : ""
                }`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <Dashboard />
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "profile" ? "show active" : ""
                }`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <EditProfile />
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "property" ? "show active" : ""
                }`}
                id="property"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <AddProperty />
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "yourproperty" ? "show active" : ""
                }`}
                id="property"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <YourProperty activeTab={activeTab} />
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "contact" ? "show active" : ""
                }`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div>
                  <h6>Contact</h6>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque, eveniet earum. Sed accusantium eligendi molestiae quo
                    hic velit nobis et, tempora placeat ratione rem blanditiis
                    voluptates vel ipsam? Facilis, earum!
                  </p>
                </div>
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "Ledger" ? "show active" : ""
                }`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div>
                  <h6>Ledger</h6>
                  <hr />
                  <Ledger />
                </div>
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === "Tickets" ? "show active" : ""
                }`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div>
                  <h6>Tickets Notifications (01)</h6>
                  <hr />
                  <TicketNotification />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <section
        className=" profile_mobileview"
        style={{ backgroundColor: "#f4f5f7" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-2 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{width: 80}} /> */}

                    <div
                      className="Profile_upload"
                      style={{
                        position: "relative",
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        {image ? (
                          <div>
                            <img
                              src={image}
                              alt="Preview"
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                              }}
                            />
                            <CameraAltIcon
                              style={{
                                position: "absolute",
                                top: "130px",
                                right: "16px",
                              }}
                            />
                          </div>
                        ) : (
                          <div
                          // style={{
                          //   width: '150px',
                          //   height: '150px',
                          //   borderRadius: '50%',
                          //   backgroundColor: '#f0f0f0',
                          //   display: 'flex',
                          //   justifyContent: 'center',
                          //   alignItems: 'center',
                          //   fontSize: '40px',
                          //   color: '#757575',
                          //   cursor: 'pointer',
                          //   margin:'auto'
                          // }}
                          >
                            <CameraAltIcon
                              style={{
                                position: "absolute",
                                top: "130px",
                                right: "16px",
                              }}
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    <h5 className="text-dark mt-3">Arun Kumar</h5>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="col-6 mb-3">
                        <h6>Name</h6>
                        <p className="text-muted">Arun Kumar</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h6 className="p-3">Ledger</h6>
            <Ledger />
          </div>

          <div className="card p-2 mt-2">
            <div className="d-flex btn">
              <div>Logout</div>
              <div style={{ marginLeft: "auto" }}>
                <LogoutIcon style={{ color: "red" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
