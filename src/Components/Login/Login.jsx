import { useEffect, useRef, useState } from 'react';
import './logincss.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { LOGIN_BASE_URL } from "../../Api/api";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { loginAuth } from "../../Redux/Action/LoginAction";
import { useDispatch } from "react-redux";
import { fetchUserData } from '../../Redux/Action/UserData';


const Login = ({ isOpen, closeModal }) => {

    const [otpData, setOtpData] = useState();
    const [input, setInput] = useState(true);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [mobileData, setMobileData] = useState({ mobile: "" });
    const [errors, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);



    const alert = useAlert();
    const dispatch = useDispatch();

    const mobileChange = (event) => {
        const { name, value } = event.target;
        setMobileData({
            ...mobileData,
            [name]: value,
        });
    };

    useEffect(() => {
        setMobileData({
            mobile: "",
        });
        setOtp(["", "", "", ""]);
        setInput(false);
        setError({});
    }, [isOpen]);



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
        if (input) {
            if (timer > 0) {
                const timer = setInterval(() => {
                    setTimer((prevCount) => prevCount - 1);
                }, 1000);

                return () => clearInterval(timer);
            }
        }
    }, [timer, input]);



    const LoginOtp = async (e) => {
        e.preventDefault();
        const result = validation(mobileData);

        if (result.isValid) {
            setLoading(true);
            setTimer(60)
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

    const VerifyOtp = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
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
                localStorage.setItem("mobile",mobile)
                localStorage.setItem("userid",userid)
                dispatch(loginAuth());
                setLoading(false);
                setInput(false);
                alert.success("Login complete. Happy to see you again!");
                dispatch(fetchUserData())
                closeModal();
            } catch (error) {
                setError(error.response.data.messages);
                setLoading(false);
            }
        }
    };

    const inputRefs = useRef([]);
    const handleOtpChange = (event, index) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);

        if (index < otp.length - 1 && event.target.value !== '') {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div
            className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div>
                        <button
                            type="button"
                            className="close closebutton"
                            onClick={closeModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form style={{ padding: 30 }}>
                            <div className="form-group">
                                <h3 className="mb-4 model-heading" style={{ color: 'black' }}>
                                    <strong>Enter Phone number to continue</strong>
                                </h3>
                            </div>
                            <div className=" input-group ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">+91</span>
                                </div>
                                <input
                                    type="text"
                                    onChange={mobileChange}
                                    value={mobileData.mobile}
                                    name="mobile"
                                    maxLength={10}
                                    autoComplete="OFF"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    className="form-control"
                                    placeholder="Phone Number"
                                />
                            </div>
                            {errors.mobile && (
                                <div className="validation_msg">{errors.mobile}</div>
                            )}
                            {/* <div className="fl-wrap filter-tags clearfix add_bottom_30 mt-5 d-flex">
                <div className="checkboxes">
                  <div className="filter-tags-wrap ">
                    <input
                      type="radio"
                      name="loginmethod"
                      defaultValue="generateotp"
                      checked={isCheckedotp}
                      onChange={handleCheckboxChangeOtp}
                    />
                    <label htmlFor="html">&nbsp;Generate OTP</label>
                    <br />
                  </div>
                </div>
               
              </div> */}

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
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            {errors.error && (
                                <div className="validation_msg">{errors.error}</div>
                            )}

                            <div className={`mt-2 ${input ? "" : "d-none"}`}>
                                {timer > 0 ? (
                                    <span>OTP expiry in {timer} seconds</span>
                                ) : (
                                    <a href="javascript:void(0)" className="text-dark" onClick={LoginOtp}>Resend otp</a>
                                )}
                            </div>

                            {input ? (
                                <Link
                                    className="btn_1 mt-4 rounded full-width"
                                    onClick={VerifyOtp}
                                >
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
                                <Link
                                    className="btn_1 mt-4 rounded full-width"
                                    onClick={LoginOtp}
                                >
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
                                        "Login"
                                    )}
                                </Link>
                            )}


                            <div className="text-center add_top_10 text-dark" style={{ fontSize: 11 }}>
                                By continuing, you agree to our
                                <a href="#" style={{ color: "blue" }}>
                                    Terms &amp; Conditions of Use
                                </a>
                                and &nbsp;
                                <a href="#" style={{ color: "blue" }}>
                                    Privacy and Privacy Noticwice.
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
