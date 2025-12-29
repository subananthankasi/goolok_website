import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { ThreeDots } from "react-loader-spinner";
import { fetchUserData } from "../../Redux/Action/UserData";
import { useDispatch, useSelector } from "react-redux";
import ProfileSideBar from "./ProfileSideBar";

function EditProfile() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.userData.userData);

  useEffect(() => {
    dispatch(fetchUserData());
    if (userData && userData) {
      setData(userData);
    }
  }, []);

  useEffect(() => {
    if (userData && userData) {
      setData(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/vendor/userup", {
        mail: email,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error posting data", error);
      setLoading(false);
    }

    setError("");
  };

  return (
    <div>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6>Edit Profile</h6>
              <hr />
            </div>

            <section>
              <div className="container" style={{ maxWidth: 500 }}>
                <div className>
                  <form>
                    <div className="form-group mt-5">
                      <div className="row">
                        <div className="col-4">
                          <label>Name</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value={data.customer}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <div className="row">
                        <div className="col-4">
                          <label>Mobile Number</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="email"
                            className="form-control"
                            value={data.phone}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <div className="row">
                        <div className="col-4">
                          <label>Email Address</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="email"
                            className="form-control"
                            value={email || data.mail}
                            onChange={handleInputChange}
                          />
                          {error && (
                            <div className="mt-1" style={{ color: "red" }}>
                              {error}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ float: "right" }}>
                      <a
                        href="#0"
                        className="btn_1 rounded full-width mt-4"
                        onClick={handleSubmit}
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
                          "Save Profile"
                        )}
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
