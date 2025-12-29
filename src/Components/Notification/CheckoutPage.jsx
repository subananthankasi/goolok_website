import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import axiosInstance from "../../Api/axiosInstance";
import API_BASE_URL, {
  IMG_PATH,
  PAYMENT_KEY,
  PAYMENT_KEY_SECRET,
} from "../../Api/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { faHome, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "primereact/checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { Message } from "primereact/message";
import { ThreeDots } from "react-loader-spinner";
import { Skeleton } from "primereact/skeleton";
import { useAlert } from "react-alert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RadioGroup, Radio } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DiscountIcon from "@mui/icons-material/Discount";
import offerIcon from "../../assets/percent-2-svgrepo-com.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Sidebar } from "primereact/sidebar";
import { Input, InputGroup } from "rsuite";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const CheckoutPage = () => {
  const { eid } = useParams();
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();
  const token = localStorage.getItem("zxcvbnm@#");
  const [visible, setVisible] = useState(false);
  const [getAddress, setGetAddress] = useState([]);
  const [viewForm, setViewFarm] = useState(false);
  const [state, setState] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const userId = localStorage.getItem("userid");
  const [couponsCode, setCouponsCode] = useState("");
  const [responseCoupon, setResponseCoupon] = useState("");
  const [priceBreak, setPriceBreak] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [visibleRight, setVisibleRight] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/state`);
      setState(response.data);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };
  const [shoppingCardDatas, setShoppingCardDatas] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const shoppingFetch = async (id) => {
    setCartLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/shoppingcart`, {
        headers: {
          "Gl-Status": id,
        },
      });
      setShoppingCardDatas(response.data);
      setCartLoading(false);
    } catch (error) {
      setCartLoading(false);
    }
  };
  useEffect(() => {
    stateFetch();
  }, []);
  useEffect(() => {
    if (eid) {
      shoppingFetch(eid);
    }
  }, [eid]);
  // const shoppingCardDatas = useSelector((state) => state.cart.cartItems);
  // const cartLoading = useSelector((state) => state.cart.loading);
  const [parsedCardValues, setParsedCardValues] = useState([]);

  useEffect(() => {
    if (shoppingCardDatas && shoppingCardDatas.length > 0) {
      const charges = shoppingCardDatas[0]?.charges;
      try {
        if (typeof charges === "string") {
          setParsedCardValues(JSON.parse(charges));
        } else {
          setParsedCardValues([]);
        }
      } catch (error) {
        console.error("Error parsing charges JSON:", error);
        setParsedCardValues([]);
      }
    }
  }, [shoppingCardDatas]);

  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/address`);
      setGetAddress(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  const [couponsData, setCouponsData] = useState();
  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/coupons`);
      setCouponsData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetch();
      fetchCoupons();
    }
  }, []);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    try {
      const response = await axiosInstance.post("/vendor/address", payload, {});
      formik.resetForm();
      fetch();
      setViewFarm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("name is required !!"),
      mobile: yup
        .string()
        .matches(/^[0-9]+$/, "Mobile number must be digits only")
        .length(10, "Mobile number must be exactly 10 digits")
        .required("Mobile is required !!"),
      pincode: yup.string().required("pincode is required !!"),
      state: yup.string().required("state is required !!"),
      city: yup.string().required("city is required !!"),
      house: yup.string().required("house is required !!"),
      area: yup.string().required("area is required !!"),
    }),
    onSubmit,
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressSelect = (id) => {
    setSelectedAddressId((prevId) => (prevId === id ? null : id));
  };
  const [showTooltip, setShowTooltip] = useState(false);
  const handleSubmit = () => {
    if (selectedAddressId) {
      const selectedItem = getAddress.find(
        (item) => item.id === selectedAddressId
      );
      localStorage.setItem("address", JSON.stringify(selectedItem));
      setVisible(false);
    } else {
      alert("Please select an address.");
    }
  };
  //   const getAddressFromStorage = JSON.parse(localStorage.getItem("address"));
  let getAddressFromStorage = null;

  try {
    getAddressFromStorage = JSON.parse(localStorage.getItem("address"));
  } catch (err) {
    console.error("Invalid JSON in localStorage:", err);
  }

  const deleteLoadingId = useSelector((state) => state.cart.deleteLoadingId);

  // const handleRemove = async(id) => {
  //   dispatch(cardDeleteThunk(id)).then(() => {
  //     dispatch(cardListThunk(id));
  //     dispatch(cardGetThunk());
  //   });
  // };

  // const handleRemove = async (id) => {
  //   try {
  //     await dispatch(cardDeleteThunk(id));
  //     await dispatch(cardListThunk());
  //     await dispatch(cardGetThunk());

  //     const updatedState = store.getState();
  //     const cartItems = updatedState.cart?.cartItems;
  //     const updatingTotal = cartItems?.reduce((total, item) => {
  //       const chargesNum =
  //         parseFloat(item.charges_total?.replace(/,/g, "")) || 0;
  //       return total + chargesNum;
  //     }, 0);

  //     const payload = {
  //       coupon_code: responseCoupon?.coupon_code,
  //       cart_total: updatingTotal,
  //       user_id: userId,
  //     };

  //     const response = await axiosInstance.post("/vendor/applyCoupon", payload);
  //     setResponseCoupon(response.data);
  //     setCouponsCode("");
  //   } catch (error) {}
  // };

  const [remainingAmount, setReminingAmount] = useState([]);

  useEffect(() => {
    if (shoppingCardDatas) {
      const totalBookingAmount = shoppingCardDatas?.reduce((total, item) => {
        const amount = parseFloat(item.booking_amount);
        return total + (isNaN(amount) ? 0 : amount);
      }, 0);
      setReminingAmount(totalBookingAmount);
    }
  }, [shoppingCardDatas]);

  const handlePayment = async () => {
    // const hasSelected = Object.keys(selectedOptions).length > 0;
    // if (!hasSelected) {
    //   setShowTooltip(true);
    //   setTimeout(() => setShowTooltip(false), 2000);
    //   return;
    // }
    const allSelected = shoppingCardDatas.every(
      (item) => selectedOptions[item.vacantId]
    );

    if (!allSelected) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    // const selectedSchedules = Object.values(selectedOptions);
    // const selectedSchedules = Object.entries(selectedOptions).map(
    //   ([vacantId, schedule]) => ({ [vacantId]: schedule })
    // );

    const selectedSchedules = Object.entries(selectedOptions).map(
      ([vacantId, schedule]) => ({
        vacantId,
        schedule,
      })
    );

    const payload = {
      amount: remainingAmount,
      vacantid: shoppingCardDatas?.map((item) => item.vacantId),
      option: selectedSchedules,
    };
    setPaymentLoading(true);

    try {
      const response = await axiosInstance.post(`/vendor/ordercreate`, payload);
      const orderData = response.data;
      const options = {
        key: PAYMENT_KEY,
        key_secret: PAYMENT_KEY_SECRET,
        amount: remainingAmount * 100,
        currency: "INR",
        name: "Gharuda infotech",
        description: "for testing purpose",
        order_id: orderData.order_id,

        handler: async function (razorpayResponse) {
          const finalPayload = {
            cartId: shoppingCardDatas?.map((item) => item.cartId),
            invoiceId: orderData?.invoice_id,
            invoice: orderData.invoice_no,
            contact: payload_address?.contact,
            name: payload_address?.name,
            address: payload_address?.address,
            city: payload_address?.city,
            state: payload_address?.state,
            addressid: payload_address?.addressid,
            coupon_code: responseCoupon?.coupon_code,
            coupon_amount: responseCoupon?.discount_amount,
            user_id: userId,
          };
          setPaymentLoading(false);
          setSelectedOptions({});
          try {
            const finalResponse = await axiosInstance.put(
              `/vendor/shoppingcart/${razorpayResponse?.razorpay_payment_id}`,
              finalPayload
            );
            navigate("/properties");
            alert.success("Payment successful!");
          } catch (submitError) {
            console.error("Final API Error:", submitError);
            setSelectedOptions({});
          }
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      localStorage.removeItem("address");
    } catch (error) {
      setPaymentLoading(false);
      console.error("Payment API Error:", error);
      setSelectedOptions({});
    } finally {
      setPaymentLoading(false);
      setSelectedOptions({});
    }
  };

  const payload_address = {
    contact: getAddressFromStorage
      ? getAddressFromStorage?.mobile
      : getAddress[0]?.mobile,
    name: getAddressFromStorage
      ? getAddressFromStorage?.name
      : getAddress[0]?.name,
    address: getAddressFromStorage
      ? `${getAddressFromStorage?.house_no},${getAddressFromStorage?.area_colony}`
      : `${getAddress[0]?.house_no},${getAddress[0]?.area_colony}`,
    city: getAddressFromStorage
      ? getAddressFromStorage?.city
      : getAddress[0]?.city,
    state: getAddressFromStorage
      ? getAddressFromStorage?.state
      : getAddress[0]?.state,
    addressid: getAddressFromStorage
      ? getAddressFromStorage?.id
      : getAddress[0]?.id,
  };

  // const total =
  //   shoppingCardDatas?.reduce((sum, item) => {
  //     const priceNum = parseFloat(item.price?.replace(/,/g, "")) || 0;
  //     return sum + priceNum;
  //   }, 0) || 0;
  const total = Array.isArray(shoppingCardDatas)
    ? shoppingCardDatas?.reduce((sum, item) => {
      const priceNum = parseFloat(item?.price?.replace(/,/g, "")) || 0;
      return sum + priceNum;
    }, 0)
    : 0;

  const discountAmount =
    shoppingCardDatas?.reduce((sum, item) => {
      const valueStr =
        item.disc_status === "true" ? item.total_aft_disc : item.price;
      const valueNum = parseFloat(valueStr?.replace(/,/g, "")) || 0;
      return sum + valueNum;
    }, 0) || 0;

  const discount = total - discountAmount;

  const handleCouponClick = async () => {
    const payload = {
      coupon_code: couponsCode,
      cart_total: discountAmount,
      user_id: userId,
    };
    try {
      const response = await axiosInstance.post("/vendor/applyCoupon", payload);
      setResponseCoupon(response.data);
      setCouponsCode("");
      alert.success(response.data.message);
    } catch (error) {
      alert.error(error.response.data.messages.error);
      setCouponsCode("");
    }
  };
  const parsedCharges = shoppingCardDatas?.map((item) => item.charges);

  // let items = [];
  // if (parsedCharges) {
  //   try {
  //     const parse = JSON.parse(parsedCharges);
  //     const chargesArray = Array.isArray(parse) ? parse[0] : [];
  //     items = chargesArray.map((item, index) => ({
  //       // label: `${item.charges} : ₹${item.price.toLocaleString()}`,
  //       label: `${item.charges}`,
  //       price: `₹${item.price.toLocaleString()}`,
  //       key: index.toString(),
  //     }));
  //   } catch (err) {
  //     console.error("Error parsing charges:", err);
  //   }
  // }
  let items = [];

  if (shoppingCardDatas?.length) {
    items = shoppingCardDatas.flatMap((item) => {
      if (!item.charges) return [];

      let parsed;
      try {
        parsed = JSON.parse(item.charges);
      } catch (err) {
        console.error("Invalid JSON in charges:", item.charges, err);
        return [];
      }

      // handle double array structure
      const chargesArray = Array.isArray(parsed) ? parsed.flat() : [];

      return chargesArray.map((charge, index) => {
        const priceValue =
          typeof charge.price === "number" && !isNaN(charge.price)
            ? `₹${charge.price.toLocaleString()}`
            : "₹0";

        return {
          label: charge.charges || "Unknown",
          price: priceValue,
          key: `${item.id || "item"}-${index}`,
        };
      });
    });
  }

  const categories = [
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  // const handleOptionChange = (cartId, schedule) => {
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [cartId]: schedule,
  //   }));
  // };
  const handleOptionChange = (vacantId, schedule) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [vacantId]: schedule,
    }));
  };
  const [getCouponCode, setGetCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleClick = async (coupon) => {
    setVisibleRight(false);

    const payload = {
      coupon_code: coupon.coupon_code,
      cart_total: discountAmount,
      user_id: userId,
    };

    try {
      const response = await axiosInstance.post("/vendor/applyCoupon", payload);
      setResponseCoupon(response.data);
      setSelectedCoupon({
        coupon_title: coupon.coupon_title,
        coupon_code: coupon.coupon_code,
      });
      alert.success(response.data.message);
    } catch (error) {
      alert.error(
        error.response.data?.messages?.error || "Something went wrong"
      );
    }
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    setResponseCoupon(null);
    setCouponsCode("");
    alert.info("Coupon removed");
  };

  const handleInputCouponApply = async () => {
    const payload = {
      coupon_code: couponsCode,
      cart_total: discountAmount,
      user_id: userId,
    };

    try {
      const response = await axiosInstance.post("/vendor/applyCoupon", payload);
      setResponseCoupon(response.data);

      const matched = couponsData.find(
        (item) => item.coupon_code.toLowerCase() === couponsCode.toLowerCase()
      );

      setSelectedCoupon({
        coupon_title: matched ? matched.coupon_title : "Applied Coupon",
        coupon_code: couponsCode,
      });

      setVisibleRight(false);
      setCouponsCode("");
      alert.success(response.data.message);
    } catch (error) {
      alert.error(error.response.data?.messages?.error || "Invalid coupon");
      setCouponsCode("");
      setVisibleRight(false);
    }
  };

  return (
    <>
      <div className="container checkout-address p-3 p-lg-5 ">
        <div className="row">
          <div
            className=" col-lg-7 col-12  p-0 "
            style={{
              borderRadius: "10px",
              // height: "470px",
              overflow: "scroll",
              scrollbarColor: "white",
              scrollbarWidth: "none",
            }}
          >
            <div
              className="card p-0"
              style={{
                minHeight: "70px",
                // position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              {cartLoading ? (
                <div className="pt-3 ps-3 pe-3">
                  <Skeleton height="2.5rem" width="100%" className="mb-1" />
                </div>
              ) : getAddressFromStorage ? (
                <>
                  <div className="row p-2">
                    <div className="col-lg-10 col-12">
                      <h6 style={{ fontSize: "12x" }}>
                        Your Address :{" "}
                      </h6>
                      <p style={{ color: "gray" }}>
                        {getAddressFromStorage?.house_no},{" "}
                        {getAddressFromStorage?.area_colony},
                        {getAddressFromStorage?.city} ,
                        {getAddressFromStorage?.pincode}{" "}
                      </p>
                    </div>
                    <div
                      className="col-lg-2 col-12 text-center"
                      style={{ alignItems: "center", alignContent: "center" }}
                    >
                      <button
                        className="btn text-primary"
                        style={{
                          border: "1px solid rgb(224, 224, 224)",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                        onClick={() => setVisible(true)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row p-2">
                    <div className="col-lg-10 col-md-10 col-12">
                      <h6 style={{ fontSize: "12x" }}>
                        Your Address :{" "}

                      </h6>
                      <p style={{ color: "gray" }}>
                        {getAddress[0]?.house_no}, {getAddress[0]?.area_colony},
                        {getAddress[0]?.city} ,{getAddress[0]?.pincode}{" "}
                      </p>
                    </div>
                    <div
                      className="col-lg-2 col-md-2 col-12 text-center"
                      style={{ alignItems: "center", alignContent: "center" }}
                    >
                      <button
                        className="btn text-primary"
                        style={{
                          border: "1px solid rgb(224, 224, 224)",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                        onClick={() => setVisible(true)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {cartLoading ? (
              <>
                <div className="card shadow mt-1 " style={{ height: "200px" }}>
                  <div className="row p-4">
                    <div className="col-3">
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton
                          height="150px"
                          width="150px"
                        // className="mb-2 mt-3"
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="pt-3 ps-3 ">
                        <Skeleton height="2rem" width="100%" className="mb-1" />
                        <Skeleton height="2rem" className="mb-1" />
                        <Skeleton height="2rem" className="mb-1" />
                        <Skeleton
                          height="2rem"
                          width="30%"
                          className="mt-3 mb-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : shoppingCardDatas?.length > 0 ? (
              shoppingCardDatas?.map((item) => {
                return (
                  <div className="card mt-1 " style={{ minHeight: "200px" }}>
                    <div className="row p-4">
                      <div className="col-md-3 col-12">
                        <img
                          src={`${IMG_PATH}enquiry/gallery/${item.image}`}
                          alt="land"
                          className="rounded"
                          style={{ width: "100%", height: "150px" }}
                        />
                      </div>
                      <div className="col-md-9 col-12 mt-2 mt-md-0">
                        <div className="d-flex justify-content-between">
                          <h6
                            style={{ fontFamily: "poppins", color: "#0000ff" }}
                          >
                            <strong>{item.landType}</strong>
                          </h6>
                        </div>
                        <p style={{ fontSize: "13px" }} className="mt-1">
                          <strong>{item.propertyName} </strong>{" "}
                        </p>

                        <div className="d-flex justify-content-between flex-column flex-md-row mt-1">
                          <h6 style={{ fontSize: "13px" }}>
                            Taluk : {item.taluk}
                          </h6>
                          {item.disc_status === "true" ? (
                            <div>
                              <b> Price : </b>
                              <strike
                                className="mx-2"
                                style={{ fontSize: "13px", color: "#0000ff" }}
                              >
                                <b> {item.price} </b>
                              </strike>
                              <span
                                style={{ fontSize: "13px", color: "#0000ff" }}
                              >
                                {" "}
                                <b>₹{item.total_aft_disc} </b>
                              </span>
                            </div>
                          ) : (
                            <h6 style={{ fontSize: "13px" }}>
                              <b>
                                {" "}
                                Price :{" "}
                                <span
                                  style={{
                                    fontSize: "13px",
                                    color: "#0000ff",
                                    marginLeft: "5px",
                                  }}
                                >
                                  ₹{item.price}{" "}
                                </span>{" "}
                              </b>
                            </h6>
                          )}
                        </div>
                        <div className="d-flex justify-content-between text-start flex-column flex-md-row">
                          <h6 style={{ fontSize: "13px" }}>
                            Unit : {item.units}
                          </h6>
                          <p style={{ color: "", fontSize: "13px" }}>
                            <b>
                              Booking Amount :
                              <span
                                style={{ color: "#0000ff", marginLeft: "5px" }}
                              >
                                ₹{" "}
                                {item.booking_amount ? item.booking_amount : 0}{" "}
                              </span>
                            </b>
                          </p>
                        </div>
                        {/* Payment Options */}
                        <div className="mt-1">
                          <p className="fw-bold" style={{ color: "darkblue" }}>
                            Payment Options:
                          </p>

                          <RadioGroup
                            name={`paymentOption_${item.vacantId}`}
                            value={selectedOptions[item.vacantId] || null}
                            onChange={(value) =>
                              handleOptionChange(item.vacantId, value)
                            }
                          >
                            <div className="row">
                              {item.pay_option?.map((option, index) => (
                                <div
                                  key={index}
                                  className="col-12 col-md-4 mb-2 mb-0"
                                >
                                  <Radio value={option.schedule} color="cyan">
                                    {option.schedule}
                                  </Radio>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                          {!selectedOptions[item.vacantId] && showTooltip && (
                            <small style={{ color: "red" }}>
                              Please select a payment option for this item
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-5">
                <Message severity="info" text="Shopping Cart is Empty " />
              </div>
            )}
          </div>
          <div className=" col-lg-4 col-12  col-sm-12 mx-lg-4 mx-0 mt-2 mt-lg-0 p-0 d-flex flex-column ">
            <div
              className="card p-2 m-0"
              style={{
                height: "70px",
                position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              {cartLoading ? (
                <Skeleton height="2rem" width="100%" className="mb-1 mt-1" />
              ) : (
                <p
                  className="text-start p-0 mt-3"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  PRICE DETAILS
                </p>
              )}
            </div>
            {cartLoading ? (
              <>
                <div className="card mt-1 p-3" style={{ height: "400px" }}>
                  <div className="row">
                    <div className="col-12">
                      <Skeleton height="2rem" width="100%" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton
                        height="2rem"
                        width="30%"
                        className="mt-3 mb-3"
                      />
                      <Skeleton height="2rem" className="mb-1" width="70%" />
                      <Skeleton height="2rem" className="mb-1" width="80%" />
                      <Skeleton height="2rem" className="mb-1" width="90%" />
                      <Skeleton height="2rem" className="mb-1" width="100%" />
                      <Skeleton height="2rem" className="mb-1" width="100%" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card mt-1 p-3" style={{ minHeight: "420px" }}>
                <div className="row">
                  <div className="col-md-7 col-12">
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {`Price (${shoppingCardDatas?.length} items)`}
                      {!priceBreak ? (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => setPriceBreak(true)}
                        >
                          <KeyboardArrowDownIcon />
                        </span>
                      ) : (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => setPriceBreak(false)}
                        >
                          <KeyboardArrowUpIcon />
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="col-md-5 col-12 text-end">
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                    >
                      ₹{" "}
                      {total.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                {priceBreak && (
                  <div className="container">
                    {shoppingCardDatas?.map((card, cardIndex) => {
                      let parsed = [];
                      try {
                        parsed = JSON.parse(card.charges);
                      } catch (err) {
                        console.error("Invalid JSON:", card.charges);
                      }

                      const chargesArray = Array.isArray(parsed)
                        ? parsed.flat()
                        : [];

                      const total = chargesArray?.reduce(
                        (sum, charge) =>
                          typeof charge.price === "number"
                            ? sum + charge.price
                            : sum,
                        0
                      );

                      return (
                        <div key={cardIndex} className="mb-3">
                          <p className="fw-bold mt-2 mb-2">
                            {card.propertyName || `Property ${cardIndex + 1}`}
                          </p>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "rgb(51 51 51)",
                              color: "white",
                            }}
                          >
                            {chargesArray.length > 0 ? (
                              chargesArray.map((charge, index) => (
                                <>
                                  <div className="col-9 border p-1">
                                    <p style={{ fontSize: "12px" }}>
                                      {charge.charges}
                                    </p>
                                  </div>
                                  <div className="col-3 text-end border">
                                    <p style={{ fontSize: "12px" }}>
                                      ₹
                                      {typeof charge.price === "number"
                                        ? charge.price.toLocaleString()
                                        : 0}
                                    </p>
                                  </div>
                                </>
                              ))
                            ) : (
                              <p>No charges data</p>
                            )}

                            {chargesArray.length > 0 && (
                              <>
                                <div className="col-9 border fw-bold">
                                  <p style={{ fontSize: "12px" }}>Total</p>
                                </div>
                                <div className="col-3 text-end border fw-bold">
                                  <p style={{ fontSize: "12px" }}>
                                    ₹{total.toLocaleString()}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="row mt-1">
                  <div
                    className="col-8"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Discount
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Coupons
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      Sub Total
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                        color: "green",
                      }}
                    >
                      -
                      {discount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                        textAlign: "end",
                      }}
                    >
                      ₹{" "}
                      {responseCoupon?.discount_amount
                        ? responseCoupon?.discount_amount
                        : "0"}
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                    >
                      ₹{" "}
                      {/* {responseCoupon?.final_total
                        ? responseCoupon?.final_total
                        : discountAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })} */}
                      {(
                        responseCoupon?.final_total ?? discountAmount
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-7">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                      }}
                    >
                      Total Booking Amount
                    </p>
                  </div>
                  <div className="col-5">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                      id="total"
                    >
                      ₹
                      {/* {responseCoupon?.final_total
                        ? responseCoupon?.final_total
                        : discountAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })} */}
                      {(
                        responseCoupon?.final_total ?? discountAmount
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                      }}
                      className="text-end"
                      id="booking-amount"
                    >
                      {" "}
                      ₹ {remainingAmount}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    border: "1px solid #e5e7e8",
                    borderRadius: "10px",
                    backgroundColor: "#eff3f5",
                  }}
                  className="p-2 mt-2"
                >
                  {selectedCoupon ? (
                    <>
                      <div className="d-flex gap-2 m-1">
                        <div className="col-1">
                          <img
                            src={offerIcon}
                            alt="Offer"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                        <div className="col-8">
                          <div>
                            <p className="mb-0" style={{ fontSize: "13px" }}>
                              {selectedCoupon.coupon_title}
                            </p>
                            <div className="d-flex mt-1 gap-1 align-items-center">
                              <p
                                className="p-1 mb-0 text-center"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "800",
                                  color: "#71828c",
                                  border: "1px dashed #71828c",
                                  minWidth: "50px",
                                }}
                              >
                                {selectedCoupon.coupon_code}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  fontFamily: "cursive",
                                }}
                              >
                                Coupon Applied{" "}
                                <TaskAltIcon
                                  sx={{ color: "green", fontSize: 19 }}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 p-0 m-0">
                          <div className="d-flex justify-content-center">
                            <button
                              style={{
                                padding: "3px 5px",
                                background: "rgb(51, 51, 51)",
                                border: "none",
                                borderRadius: "3px",
                                color: "white",
                                fontSize: "11px",
                                fontWeight: "500",
                                letterSpacing: "0.5px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                              }}
                              className="mt-1"
                              onClick={handleRemoveCoupon}
                            >
                              {" "}
                              Remove{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => setVisibleRight(true)}
                    >
                      <div>
                        <img
                          src={offerIcon}
                          style={{ width: "20px", height: "20px" }}
                        />
                        <span className="mx-2" style={{ fontWeight: "600" }}>
                          Apply Coupon
                        </span>
                      </div>
                      <button className="btn">
                        <ChevronRightIcon />
                      </button>
                    </div>
                  )}

                  <Sidebar
                    visible={visibleRight}
                    position="right"
                    onHide={() => setVisibleRight(false)}
                  >
                    <h6 className="text-center">Offers for you </h6>
                    <div
                    // style={{
                    //   height: "440px",
                    //   overflowY: "auto",
                    //   paddingRight: "5px",
                    //   scrollbarColor: "white",
                    //   scrollbarWidth: "none",
                    //   msOverflowStyle: "none",
                    // }}
                    >
                      <div className="mt-3">
                        <InputGroup>
                          <Input
                            placeholder="enter coupon code here.."
                            value={couponsCode}
                            onChange={(value) => setCouponsCode(value)}
                          />
                          <InputGroup.Button onClick={handleInputCouponApply}>
                            Apply
                          </InputGroup.Button>
                        </InputGroup>
                      </div>
                      <div className="mt-3">
                        {couponsData?.map((item) => (
                          <div className="coupon-card">
                            <div className="row m-1">
                              <div className="col-1 p-0 m-0">
                                <DiscountIcon />
                              </div>
                              <div className="col-8 m-0 p-0">
                                <p style={{ fontSize: "13px" }}>
                                  {item.coupon_title}
                                </p>
                                <p className="coupon-code">
                                  Code: {item.coupon_code}
                                </p>
                              </div>
                              <div className="col-3">
                                <button
                                  style={{
                                    padding: "5px 10px",
                                    background: "rgb(51, 51, 51)",
                                    border: "none",
                                    borderRadius: "3px",
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    letterSpacing: "0.5px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                  }}
                                  onClick={() => handleClick(item)}
                                >
                                  {" "}
                                  Apply{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Sidebar>
                </div>

                <div className="mt-3">
                  <Whisper
                    placement="top"
                    trigger="none"
                    open={showTooltip}
                    speaker={<Tooltip>Please select a payment option</Tooltip>}
                  >
                    <button
                      className="btn p-3 w-100 mb-2"
                      style={{
                        backgroundColor: "#fb641b",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "white",
                      }}
                      onClick={handlePayment}
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? (
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
                        />
                      ) : (
                        `PROCEED TO PAY ${remainingAmount}`
                      )}
                    </button>
                  </Whisper>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        header="Address"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          formik.resetForm();
        }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {viewForm ? (
          <>
            <form
              onSubmit={formik.handleSubmit}
              className="p-4 shadow-sm rounded bg-white"
            >
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Mobile No *</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.mobile && formik.touched.mobile ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.mobile}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pin Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    placeholder="Enter pin code"
                  />
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">State *</label>
                  <select
                    className="form-select"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ height: "30px" }}
                  >
                    <option value="">Select...</option>
                    {state?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.state && formik.touched.state ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.state}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Enter city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.city && formik.touched.city ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.city}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">
                    House No., Building Name *
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={formik.values.house}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    placeholder="Enter address"
                  />
                  {formik.errors.house && formik.touched.house ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.house}
                    </p>
                  ) : null}
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label">Area Colony *</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter area or colony"
                  />
                  {formik.errors.area && formik.touched.area ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.area}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label d-block">Type Of Address</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      // className={`btn ${selectedAddress === "Home" ? "btn-dark" : "btn-light"
                      //   } border`}
                      className={` ${selectedAddress === "Home" ? "home-dark" : "home-light"
                        } `}
                      onClick={() => setSelectedAddress("Home")}
                    >
                      <FontAwesomeIcon icon={faHome} className="me-2" />
                      Home
                    </button>
                    <button
                      type="button"
                      // className={`btn ${selectedAddress === "Work" ? "btn-dark" : "btn-light"
                      //   } border`}
                      className={` ${selectedAddress === "Work" ? "home-dark" : "home-light"
                        } `}
                      onClick={() => setSelectedAddress("Work")}
                    >
                      <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                      Work
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3 gap-2">
                <button
                  style={{
                    padding: "7px 10px",
                    backgroundColor: "#0000ff",
                    color: "white",
                    fontSize: "13px",
                    fontFamily: "poppins",
                  }}
                  className=""
                  type="button"
                  onClick={() => {
                    setViewFarm(false);
                    formik.resetForm();
                  }}
                >
                  View Address
                </button>

                <button
                  type="submit"
                  className=""
                  style={{
                    padding: "7px 10px",
                    backgroundColor: "#0000ff",
                    color: "white",
                    fontSize: "13px",
                    fontFamily: "poppins",
                  }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-end">
              <button
                className="btn text-primary"
                style={{
                  backgroundColor: "#fff",
                  color: "#333",
                  fontWeight: 600,
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(0, 0, 0, 0.08)";
                }}
                onClick={() => setViewFarm(true)}
              >
                + Add New Address
              </button>
            </div>
            <div
              style={{
                maxHeight: "400px",
                overflow: "scroll",
                scrollbarColor: "white",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {getAddress?.map((item) => {
                return (
                  <div className="card p-0 mt-2">
                    <div className="row p-2">
                      <div className="col-10">
                        <h6 style={{ fontSize: "12x" }}>
                          Your Address :{" "}

                        </h6>
                        <p style={{ color: "gray" }}>
                          {item.house_no}, {item.area_colony},{item.city} ,
                          {getAddress[0]?.pincode}{" "}
                        </p>
                      </div>
                      <div
                        className="col-2 text-center"
                        style={{ alignItems: "center", alignContent: "center" }}
                      >
                        <Checkbox
                          onChange={() => handleAddressSelect(item.id)}
                          checked={selectedAddressId === item.id}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="contained"
                type="button"
                onClick={handleSubmit}
                style={{ borderRadius: "0px", backgroundColor: "#0000ff" }}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CheckoutPage;
