import React, { useEffect, useState } from "react";
import loginImage from "../../assets/loginimage.jpg";
import { InputOtp } from "primereact/inputotp";
import "./logincss.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api";
import { loginAuth } from "../../Redux/Action/LoginAction";
import { useDispatch } from "react-redux";
import { Input, InputGroup } from "rsuite";
import { FaPhoneAlt } from "react-icons/fa";
import NewSignUpForm from "./NewSignUpForm";
import { fetchUserData } from "../../Redux/Action/UserData";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { fetchNotificationMsg } from "../../Redux/Action/NotificationAction";
import { onMessageListener, requestForToken } from "../Firebase";
import { message } from "antd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const NewLoginPage = () => {
  const [otp, setOtp] = useState();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpBoxVisible, setIsOtpBoxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otpData, setOtpData] = useState({});
  const [mobileData, setMobileData] = useState({ mobile: "" });
  const [error, setError] = useState({});
  const [fcmToken, setFcmToken] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  useEffect(() => {
    const fetchToken = async () => {
      const token = await requestForToken();
      if (token) {
        setFcmToken(token);
        localStorage.setItem("fcm_token", token);
      }
    };
    fetchToken();
  }, []);

    const sendTokenToBackend = async (loginToken) => {
    try {
      const token = fcmToken || localStorage.getItem("fcm_token");
      if (!token) {
        console.warn(" No FCM token available yet");
        return;
      }

      const payload = { token };

      const response = await axios.post(
        `${LOGIN_BASE_URL}/vendor/notificationuser`,
        payload,
        {
          headers: {
            Authorization: loginToken,
          },
        }
      );

    } catch (error) {
      console.error("🔥 Error sending FCM token to backend:", error);
    }
  };
   useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      const title =
        payload?.notification?.title ||
        payload?.data?.title ||
        "New Notification";
      messageApi.open({
        type: "success",
        content: `${title}`,
        icon: (
          <NotificationsActiveIcon
            sx={{ fontSize: 19, marginRight: "7px", color: "red" }}
          />
        ),
        // duration: 60
      });
      dispatch(fetchNotificationMsg());
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch, alert]);
  // google signin
  const handleLoginSuccess = async (response) => {
    const indata = jwtDecode(response.credential);
    try {
      const response = await axios.post(
        `${LOGIN_BASE_URL}/Login/gmaillogin`,
        {
          mail: indata.email,
          id: indata.sub,
          name: indata.name,
          image: indata.picture,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const token = response.data.token;
      localStorage.setItem("zxcvbnm@#", token);
      localStorage.setItem("auth", true);
      dispatch(loginAuth());
      //   closeModal()
      alert.success(
        "Welcome! Thank you for signing up. We're excited to have you on board!"
      );
    } catch (error) {
      setError(error.response.data.messages);
    }
  };
  const handleLoginFailure = (error) => {};
  const validation = (mobileData) => {
    const errors = {};
    const mobileRegex = /^\d{10}$/;
    if (!mobileData.mobile || !mobileData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobileData.mobile.trim())) {
      errors.mobile = "Mobile number must contain 10 digits";
    }

    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors: {} };
  };
  useEffect(() => {
    if (isOtpBoxVisible) {
      if (timer > 0) {
        const timer = setInterval(() => {
          setTimer((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, [timer, isOtpBoxVisible]);

  const LoginOtp = async (e) => {
    e.preventDefault();
    const result = validation(mobileData);

    if (result.isValid) {
      setLoading(true);
      setTimer(60);
      setError("");
      try {
        const response = await axios.post(
          `${LOGIN_BASE_URL}/Login/Signin`,
          mobileData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setOtpData(response.data);
        setIsOtpBoxVisible(true);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    } else {
      setError(result.errors);
    }
  };

  const mobileChange = (event) => {
    const { name, value } = event.target;
    setMobileData({
      ...mobileData,
      [name]: value,
    });
  };

  const VerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp
    if (otpValue) {
      setLoading(true);
      // setOtp(["","","",""]);
      try {
        const response = await axios.post(
          `${LOGIN_BASE_URL}/Login/Verify`,
          { userID: otpData.userID, otp: otpValue },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const token = response.data.token;
        const mobile = response.data.mobile_no;
        const userid = response.data.user_id;
        localStorage.setItem("zxcvbnm@#", token);
        localStorage.setItem("auth", true);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("userid", userid);
        await sendTokenToBackend(token);

        dispatch(fetchNotificationMsg());
        dispatch(loginAuth());
        setLoading(false);
        setIsOtpBoxVisible(false);
        alert.success("Login complete. Happy to see you again!");
        dispatch(fetchUserData());

        // closeModal();
        navigate("/");
        // if (onLoginSuccess) {
        //   onLoginSuccess();
        // }
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    }
  };
  return (
    <div
     className={`container-fluid d-flex gap-3 justify-content-center ${
    isSignUp ? "mt-3" : "mt-5"
  }`}
      style={{
        minHeight: "100vh",
      }}
    >
      <div>
        <img
          src={loginImage}
          alt="login"
          style={{
            height: isSignUp ? "520px" : "450px",
            width: "500px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div
        style={{
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          width: "380px",
          borderRadius: "8px",
          height: isSignUp ? "520px" : "450px",
        }}
      >
        <h6 className="p-3 login-tag">{isSignUp ? "Sign Up" : "Sign In"} </h6>
        <hr className="p-0 m-0" style={{ color: "red" }} />
        {isSignUp ? (
          <NewSignUpForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        ) : (
          <form action="" className="p-3">
            <div className="form-group">
              <label
                htmlFor="Mobile"
                className="form-label login-lable mt-3 mb-1"
              >
                Mobile Number
              </label>
              <InputGroup>
                <InputGroup.Addon>
                  <FaPhoneAlt />
                </InputGroup.Addon>
                <Input
                  // onChange={mobileChange}
                  onChange={(value, event) =>
                    setMobileData({ ...mobileData, mobile: value })
                  }
                  value={mobileData.mobile}
                  name="mobile"
                  maxLength={10}
                  autoComplete="OFF"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className="form-control login-lable"
                />
              </InputGroup>
              {error.mobile && (
                <div className="validation_msg">{error.mobile}</div>
              )}
            </div>
            <div
              className="form-group mt-3"
              style={{ display: isOtpBoxVisible ? "block" : "none" }}
            >
              <label className="form-label login-lable"> OTP</label>
              <div className="d-flex justify-content-center">
                <InputOtp value={otp} onChange={(e) => setOtp(e.value)} />
              </div>
            </div>
            <div className={`mt-2 ${isOtpBoxVisible ? "" : "d-none"}`}>
              {timer > 0 ? (
                <span className="login-otp">OTP expiry in {timer} seconds</span>
              ) : (
                <a
                  href="javascript:void(0)"
                  className="text-dark login-otp"
                  onClick={LoginOtp}
                >
                  Resend otp
                </a>
              )}
            </div>
            <div className="w-100 mt-3">
              {isOtpBoxVisible ? (
                <button className="premium-signin-btn" onClick={VerifyOtp}>
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
                    "VERIFY OTP"
                  )}
                </button>
              ) : (
                <button className="premium-signin-btn" onClick={LoginOtp}>
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
                    "Sign In"
                  )}
                </button>
              )}
            </div>
            {/* line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                // margin: "20px 0",
              }}
              className="mt-3"
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              ></div>
              <span
                style={{
                  margin: "0 15px",
                  color: "gray",
                  // fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              >
                or
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              ></div>
            </div>
            {/* .. */}
            <GoogleOAuthProvider clientId="627039887114-prnmd0ikp0hsn8ajhn1pngpg5ebm223v.apps.googleusercontent.com">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  // padding: "10px",
                  boxSizing: "border-box",
                }}
                className="mt-2"
              >
                <div style={{ width: "100%" }}>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                  />
                </div>
              </div>
            </GoogleOAuthProvider>
            <div className="mt-2">
              <h6 className="login-dont-have-account">
                {" "}
                I don’t have an account ?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    setIsSignUp(true);
                  }}
                >
                  Sign up
                </span>
              </h6>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewLoginPage;
