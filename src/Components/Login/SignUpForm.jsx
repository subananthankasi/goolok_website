import React, { useState, useEffect, useRef } from "react";
// import "../signin/signcss.css";
// import './logincss.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { LOGIN_BASE_URL } from "../../Api/api";
import { useAlert } from "react-alert";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../Redux/Action/LoginAction";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { fetchUserData } from "../../Redux/Action/UserData";

const SignUpForm = ({ SignUpForm, setSignupForm, closeModal }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [input, setInput] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });
  const [otpData, setOtpData] = useState();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    setFormData({
      name: "",
      mobile: "",
    });
    setOtp(["", "", "", ""]);
    setInput(false);
    setError({});
  }, []);

  useEffect(() => {
    if (input) {
      if (timer > 0) {
        const timer = setInterval(() => {
          setTimer((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, [timer, input]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputRefs = useRef([]);
  const handleOtpChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);

    if (index < otp.length - 1 && event.target.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

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
        setInput(true);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    } else {
      setError(result.errors);
    }
  };

  const OTPVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
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
        setInput(false);
        dispatch(loginAuth());
        dispatch(fetchUserData());
        closeModal()
        alert.success(
          "Welcome! Thank you for signing up. We're excited to have you on board!"
        );
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    }
  };

  // close modal
  //   const handleCloseModal = () => {
  //     closeModal()
  //     setTimer(60)
  //   }

  // resend otp
  const handleOTPResend = async (e) => {
    e.preventDefault();
    const result = validation(formData);
    if (result.isValid) {
      setLoading(true);
      setTimer(600);
      setOtp(["", "", "", ""]);
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
        setInput(true);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.messages);
        setLoading(false);
      }
    } else {
      setError(result.errors);
    }
  };

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
      // const errorResponse = error.response.data;
      // setError(error.response.data.messages);
    }
  };
  const handleLoginFailure = (error) => { };

  return (
    <form style={{ padding: 30 }}>
      <div className="form-group">
        <div className="mb-4 model-heading">
          <strong style={{ color: "#212529" }}>
            Property Seekers / Vendor’s Registration Form
          </strong>
        </div>
      </div>
      <div className="mt-3">
        <h4 style={{color:"black"}}>Create New Account</h4>
      </div>
      <div className="form-group mt-4">
        <input
          type="text"
          className={`form-control ${errors.name ? "input-error" : ""}`}
          placeholder="First and Last Name"
          name="name"
          autoComplete="OFF"
          readOnly={input}
          value={formData.name}
          onChange={handleChange}
          style={{ fontFamily: "poppins" }}
        />
        {errors.name && <div className="validation_msg">{errors.name}</div>}
      </div>
      <div className="form-group mt-4">
        <div className="row">
          <div className="col-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">+91</span>
              </div>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "input-error" : ""}`}
                placeholder="Phone Number"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                autoComplete="OFF"
                name="mobile"
                readOnly={input}
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                style={{ fontFamily: "poppins" }}
              />
            </div>
          </div>
          {errors.mobile && (
            <div className="validation_msg">{errors.mobile}</div>
          )}
        </div>
      </div>
      <div
        className={`mb-4 mt-4 ${input ? "" : "d-none"}`}
        style={{ justifyContent: "center" }}
        id="enterotp"
      >
        <label htmlFor="otp">Enter the OTP</label>
        <div id="otp-input" className="mt-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              pattern="\d"
              inputMode="numeric"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => handleOtpChange(e, index)}
            />
          ))}
        </div>
        {errors.error && <div className="validation_msg">{errors.error}</div>}

        <div className="mt-2">
          {/* {timer > 0 ? (
            <span>OTP expiry in {timer} seconds</span>
          ) : (
            <a
              href="javascript:void(0)"
              className="text-dark"
              onClick={handleOTPResend}
            >
              Resend otp
            </a>
          )} */}
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
      </div>

      {input ? (
        <Link className="btn_1 mt-4  full-width" onClick={OTPVerify} style={{ fontFamily: "poppins", color: "white" }}>
          {" "}
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="80"
              color="#ffffff"
              radius="18"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ justifyContent: "center", fontSize: "12px" }}
              wrapperClass=""
            />
          ) : (
            "Verify"
          )}
        </Link>
      ) : (
        <Link className="btn_1 mt-4  full-width" onClick={handleOTPSend} style={{ fontFamily: "poppins", color: "white" }}>
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="80"
              color="#ffffff"
              radius="18"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ justifyContent: "center", fontSize: "12px" }}
              wrapperClass=""
            />
          ) : (
            "Submit"
          )}
        </Link>
      )}

      <div className="text-center add_top_10 text-dark mt-3" style={{ fontFamily: "poppins" }}>
        Already have an account?&nbsp;
        <Link style={{ color: "blue" }} onClick={() => setSignupForm(false)}>
          Login
        </Link>
      </div>
      <div>
        <div className="mt-2 mb-2 text-center" style={{ fontFamily: "poppins" }}>{"(or)"}</div>

        <GoogleOAuthProvider clientId="627039887114-prnmd0ikp0hsn8ajhn1pngpg5ebm223v.apps.googleusercontent.com">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%", maxWidth: "300px" }}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>
    </form>
  );
};

export default SignUpForm;

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
