import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import axios from "axios";
import {
  cardDeleteThunk,
  cardGetThunk,
  cardListThunk,
} from "../../Redux/Action/AddToCardThunk";
import LoginForm from "../Login/LoginForm";
import {
  closeCartSidebar,
  openCartSidebar,
} from "../../Redux/Reducer/SliderForAddToCart";
import { wishlistGetThunk } from "../../Redux/Action/WishlistThunk";

const AddToCard = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  const navigate = useNavigate();
  // const [visibleRight, setVisibleRight] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const condition = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);


  const data = useSelector((state) => state.cart.cartItems);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(cardGetThunk());
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     fetch();

  //     const intervalId = setInterval(() => {
  //       fetch();
  //     }, 2000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [token]);

  const grandTotal = data.reduce((total, item) => {
    const cleanedPrice = item.price?.replace(/,/g, "");
    const price = parseFloat(cleanedPrice) || 0;
    return total + price;
  }, 0);

  const localStorageCartId = localStorage.getItem("cartId");

  // const deleteCardlist = async () => {
  //   try {
  //     dispatch(cardDeleteThunk(data?.[0]?.id)).then(() => {
  //       dispatch(cardGetThunk());
  //       dispatch(cardListThunk(localStorageCartId));
  //     dispatch(wishlistGetThunk());

  //     });
  //     dispatch(cardGetThunk());
  //   } catch (error) {
  //     console.error("Error during the request:", error);
  //   } finally {
  //     dispatch(cardGetThunk());
  //   }
  // };
  // useEffect(() => {
  //   if (token) {
  //     dispatch(cardListThunk(localStorageCartId));
  //   }
  // }, []);

  const count = data.length;

  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };
  const handleCheckoutPage = () => {
    navigate("CheckoutPage");
    // setVisibleRight(false);
    dispatch(closeCartSidebar());
  };
  const cartCount = useSelector((state) => state.cart.cartCount);
  const visibleRight = useSelector(
    (state) => state.sliderforcart.cartSidebarOpen
  );

  return (
    <>
      {/* <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} /> */}
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />
      <div className="">
        <Sidebar
          visible={visibleRight}
          position="right"
          // onHide={() => setVisibleRight(false)}
          onHide={() => dispatch(closeCartSidebar())}
        >
          <h5 className="text-center">Shopping Carts </h5>
          <div
            style={{
              height: "440px",
              overflowY: "auto",
              paddingRight: "5px",
              scrollbarColor: "white",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {data && data.length > 0 ? (
              data.map((item) => {
                return (
                  <div className="card mt-2" key={item.id}>
                    <div className="row" style={{ minHeight: "145px" }}>
                      <div className="col-5">
                        <img
                          src={`${IMG_PATH}enquiry/gallery/${item.image}`}
                          alt="land"
                          className="rounded"
                          style={{ height: "145px", width: "100%" }}
                        />
                      </div>
                      <div className="col-7 p-0 mt-1">
                        <div className="d-flex justify-content-between">
                          <h3
                            style={{ fontSize: "13px",lineHeight:"normal" }}
                            className="m-0 text-dark"
                          >
                            {item.propertyName}
                          </h3>
                          <button
                            className="btn mx-3 p-0"
                            style={{ color: "red" }}
                            // onClick={deleteCardlist}
                          >
                            <HighlightOffIcon />
                          </button>
                        </div>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "gray",
                          }}
                        >
                          {item.landType}
                        </p>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "gray",
                          }}
                        >
                          <i
                            className="fa-solid fa-ruler-combined"
                            style={{ color: "black" }}
                          ></i>{" "}
                          {item.units}
                        </p>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "gray",
                          }}
                        >
                          <i
                            className="fa fa-map-marker"
                            style={{ color: "black" }}
                          />
                          <span className="mx-1">{item.village}</span>
                        </p>
                        <p
                          className="p-0 m-0"
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "gray",
                          }}
                        >
                          Price:{" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                          {item.price}
                        </p>
                        <div className="price-properties footer d-flex justify-content-between p-0 m-0">
                          <button
                            className="btn mt-1 mb-1"
                            style={{
                              border: "1px solid rgb(224, 224, 224)",
                              fontSize: "12px",
                              fontWeight: "600",
                              boxShadow: "0 2px 8px rgba(15, 12, 12, 0.1)",
                            }}
                          >
                            Booking : ₹
                            {item.booking_amount ? item.booking_amount : 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="text-center mt-3 text-muted"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Your Card is Empty
                <br />
                <br />
                Start Filling it up..!
              </div>
            )}
          </div>
          {data && data.length > 0 && (
            <>
              <p
                className="text-end mt-3"
                style={{ fontSize: "14px", fontWeight: "600" }}
              >
                TOTAL : ₹{grandTotal}{" "}
              </p>
              <div
                className="mt-3  text-center w-100"
                style={{ alignItems: "center", alignContent: "center" }}
              >
                <button
                  className="btn text-primary p-2 w-100"
                  style={{
                    border: "1px solid rgb(224, 224, 224)",
                    fontSize: "13px",
                    fontWeight: "600",
                    boxShadow: "0 2px 8px rgba(15, 12, 12, 0.1)",
                  }}
                  onClick={handleCheckoutPage}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  PLACE ORDER{" "}
                </button>
              </div>
            </>
          )}
        </Sidebar>
      </div>
      <div>
        <div className="">
          <button
            className="btn px-0"
            // onClick={() => setVisibleRight(true)}
            onClick={() => dispatch(openCartSidebar())}
            style={{ border: "none" }}
          >
            <Badge badgeContent={cartCount} color="success">
              <ShoppingCartRoundedIcon sx={{ fontSize: 25 }} />
            </Badge>
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCard;
