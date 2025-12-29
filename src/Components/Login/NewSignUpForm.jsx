import React, { useEffect, useState } from "react";
import loginImage from "../../assets/loginimage.jpg";
import { FaGoogle, FaApple } from "react-icons/fa";
import { InputOtp } from "primereact/inputotp";
import "./logincss.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api";
import { loginAuth } from "../../Redux/Action/LoginAction";
import { useDispatch } from "react-redux";
import { Input, InputGroup } from "rsuite";
import { FaRegUserCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { fetchUserData } from "../../Redux/Action/UserData";

const NewSignUpForm = ({ setIsSignUp, isSignUp }) => {
  const [otp, setOtp] = useState();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOtpBoxVisible, setIsOtpBoxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otpData, setOtpData] = useState({});
  const [mobileData, setMobileData] = useState({ mobile: "" });
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      mobile: "",
    });
    setOtp([]);
    setIsOtpBoxVisible(false);
    setError({});
  }, []);
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

  const handleOTPSend = async (e) => {
    e.preventDefault();
    const result = validation(formData);
    if (result.isValid) {
      setLoading(true);
      setTimer(600);
      setError("");
      try {
        const response = await axios.post(
          `${LOGIN_BASE_URL}/Login/Createuser`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setOtpData(response.data);
        setIsOtpBoxVisible(true);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.messages);
        setLoading(false);
      }
    } else {
      setError(result.errors);
      setLoading(false);
    }
  };

  const OTPVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp;
    if (otpValue) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${LOGIN_BASE_URL}/Login/Verify`,
          { userID: otpData.userID, otp: otpValue },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const token = response.data.token;
        localStorage.setItem("zxcvbnm@#", token);
        localStorage.setItem("auth", true);
        setLoading(false);
        setIsOtpBoxVisible(false);
        dispatch(loginAuth());
        // closeModal()
        alert.success(
          "Welcome! Thank you for signing up. We're excited to have you on board!"
        );
        navigate("/");
        dispatch(fetchUserData());
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    }
  };

  const handleOTPResend = async (e) => {
    e.preventDefault();
    const result = validation(formData);
    if (result.isValid) {
      setLoading(true);
      setTimer(600);
      setOtp([]);
      setError("");
      try {
        const response = await axios.post(
          `${LOGIN_BASE_URL}/Login/Signin`,
          formData,
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
  const handleChange = (value, event) => {
    const name = event?.target?.name;
    if (!name) return; // guard
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action="" className="p-3">
      <div className="form-group">
        <label htmlFor="Mobile" className="form-label login-lable mt-3 mb-1">
          Full Name
        </label>
        <InputGroup>
          <InputGroup.Addon>
            <FaRegUserCircle />
          </InputGroup.Addon>
          <Input
            className={`form-control login-lable  ${
              error.name ? "input-error" : ""
            }`}
            name="name"
            autoComplete="OFF"
            readOnly={isOtpBoxVisible}
            value={formData.name}
            onChange={handleChange}
          />
        </InputGroup>
        {error.name && (
          <div className="validation_msg login-lable">{error.name}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="Mobile" className="form-label login-lable mt-3 mb-1">
          Mobile Number
        </label>
        <InputGroup>
          <InputGroup.Addon>
            <FaPhoneAlt />
          </InputGroup.Addon>
          <Input
            className={`form-control login-lable ${
              error.mobile ? "input-error" : ""
            }`}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            autoComplete="OFF"
            name="mobile"
            readOnly={isOtpBoxVisible}
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
          />
        </InputGroup>
        {error.mobile && (
          <div className="validation_msg login-lable">{error.mobile}</div>
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
      {error.error && <div className="validation_msg">{error.error}</div>}
      <div className={`mt-2 ${isOtpBoxVisible ? "" : "d-none"}`}>
        {timer > 0 ? (
          <span>
            OTP expiry in{" "}
            {timer >= 60
              ? `${Math.floor(timer / 60)}:${(timer % 60)
                  .toString()
                  .padStart(2, "0")} minutes`
              : `${timer} seconds`}
          </span>
        ) : (
          <a
            href="javascript:void(0)"
            className="text-dark"
            onClick={handleOTPResend}
          >
            Resend otp
          </a>
        )}
      </div>
      <div className="w-100 mt-3">
        {isOtpBoxVisible ? (
          <button className="premium-signin-btn" onClick={OTPVerify}>
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
          <button className="premium-signin-btn" onClick={handleOTPSend}>
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
              "Submit"
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
          Already have an account ?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsSignUp(false)}
          >
            {""} Sign In
          </span>
        </h6>
      </div>
    </form>
  );
};

export default NewSignUpForm;

const validation = (formData) => {
  const errors = {};

  const lettersRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^\d{10}$/;

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Name is required";
  } else if (!lettersRegex.test(formData.name.trim())) {
    errors.name = "Name should contain only letters";
  }

  if (!formData.mobile || !formData.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(formData.mobile.trim())) {
    errors.mobile = "Mobile number must contain 10 digits";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
