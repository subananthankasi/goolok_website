import React, { useCallback, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import img from "../../assets/images/villa4.jpg";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import {
  wishlistGetThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
import LoginForm from "../Login/LoginForm";
import {
  cardGetThunk,
  cardListThunk,
  cardPostThunk,
} from "../../Redux/Action/AddToCardThunk";
import { openCartSidebar } from "../../Redux/Reducer/SliderForAddToCart";
import { useAlert } from "react-alert";
import { recommendGetThunk } from "../../Redux/Action/RecommendThunk";
import UseLocationFetcher from "../../Pages/home/UseLocationFetcher";
import { nearbyPropertiesGetThunk } from "../../Redux/Action/NearbyPropertiesThunk";

const Wishlist = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  const alert = useAlert();
  const navigate = useNavigate();
  //   const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const condition = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);
  // const fetch = async () => {
  //     try {

  //         const response = await axios.get(
  //             `${LOGIN_BASE_URL}/vendor/wishlist`,
  //             {
  //                 headers: {
  //                     'Authorization': token,
  //                 }
  //             }
  //         );
  //         setData(response.data);
  //     } catch (error) {
  //         console.error('Error during the request:', error);
  //     }
  // };
  useEffect(() => {
    if (token) {
      // fetch();
      dispatch(wishlistGetThunk());
    }
  }, [token]);
  // useEffect(() => {
  //     if (token) {
  //         fetch();

  //         const intervalId = setInterval(() => {
  //             fetch();
  //         }, 2000);

  //         return () => clearInterval(intervalId);
  //     }

  // }, [token]);
  const userid = localStorage.getItem("userid");

  const handleLocation = useCallback(
    ({ lat, lon, neighborhood }) => {
      dispatch(
        nearbyPropertiesGetThunk({
          lat,
          lon,
          neighborhood,
          userid,
        })
      );
    },
    [dispatch, userid]
  );
  const { mapLoading, locationData } = UseLocationFetcher(handleLocation);
  const deleteWishlist = async () => {
    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${data?.[0]?.id}`, {
        headers: {
          Authorization: token,
        },
      });
      // fetch()
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(data?.[0]?.id));
      dispatch(recommendGetThunk(userid));
      dispatch(
        nearbyPropertiesGetThunk({
          lat: locationData?.lat,
          lon: locationData?.lon,
          neighborhood: locationData?.neighborhood,
          userid,
        })
      );
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetch()
      // window.location.reload()
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(data?.[0]?.id));
    }
  };

  //   const count = data.length;
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };
  const data = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlist.wishlistCount);

  const localStorageCartId = localStorage.getItem("cartId");

  // const handleAddToCard = async (productId) => {
  //   try {
  //     const payload = {
  //       enqid: localStorageCartId ? localStorageCartId : productId,
  //     };
  //     dispatch(cardPostThunk(payload)).then(() => {
  //       // dispatch(cardListThunk(localStorageCartId));
  //       // dispatch(cardGetThunk());
  //       dispatch(wishlistGetThunk());
  //     });
  //     alert.success("Item added to your cart successfully 🛒");
  //     await dispatch(cardGetThunk());
  //     await dispatch(openCartSidebar());

  //     // fetchShopingCard();
  //   } catch (error) {
  //     console.error("Error during the request:", error);
  //     alert.error("Failed to add item to cart. Please try again.");
  //   } finally {
  //     // fetchCardList();
  //     // dispatch(cardListThunk(localStorageCartId));
  //     // dispatch(cardGetThunk());
  //   }
  // };
  const cardList = useSelector((state) => state.shoppingCardListData?.data);
  const isInCardList = cardList;

  return (
    <>
      {/* <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} /> */}
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />

      <div style={{ fontFamily: "poppins" }}>
        <div className="nav-item dropdown ">
          <div
            style={{ textAlign: "center", alignItems: "center" }}
            className="nav-link  d-block align-items-center p-0"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Badge badgeContent={wishlistCount} color="success">
              <FavoriteBorderRoundedIcon sx={{ fontSize: 25 }} />
            </Badge>
          </div>
          {!isAuthenticated ? (
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{
                minWidth: "15rem",
                padding: "0px",
                left: "-155px",
                maxHeight: "400px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="mt-3" style={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ width: 130 }}
                  onClick={openModallogin}
                  style={{fontFamily:"poppins"}}
                >
                  Log in
                </Button>
                <p
                  className="m-3"
                  style={{
                    fontSize: "13px",
                    fontFamily: "poppins",
                    fontWeight: 500,
                  }}
                >
                  To add or view item(s) part of your wishlist{" "}
                </p>
              </div>
            </ul>
          ) : (
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{
                minWidth: "24rem",
                padding: "0px",
                left: "-310px",
                maxHeight: "400px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item) => {
                  return (
                    <div className="card m-2">
                      <div className="row" style={{ height: "140px" }}>
                        <div className="col-6 ">
                          <Link
                            to={`/property/${item.id}/${item.propertyType}`}
                          >
                            <img
                              src={`${IMG_PATH}enquiry/gallery/${item.image}`}
                              alt=""
                              style={{ height: "140px", width: "100%" }}
                            />
                          </Link>
                        </div>
                        <div className="col-6 p-0 mt-1">
                          <div className="d-flex justify-content-between">
                            <h3
                              style={{ fontSize: "15px" }}
                              className="m-0 text-dark"
                            >
                              {item.landType}
                            </h3>
                            <button
                              className="btn mx-3 p-0"
                              style={{ color: "red" }}
                              onClick={deleteWishlist}
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
                            {item.propertyName}
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
                            ></i>
                            {/* {item.units} */}
                            <span className="mx-1">{item.units}</span>
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
                          {/* <div className="price-properties footer d-flex justify-content-between p-0">
                              <p className="bottom_price mb-0 p-0">
                                <i
                                  className="fa fa-inr"
                                  aria-hidden="true"
                                  style={{ fontSize: 12 }}
                                />
                                {item.price}
                              </p>
                            </div> */}
                          <div className="d-flex justify-content-between mt-2 mx-1">
                            <p className="bottom_price">
                              <i
                                className="fa fa-inr"
                                aria-hidden="true"
                                style={{ fontSize: 12 }}
                              />
                              {item.price}
                            </p>
                            {/* {item?.cart_status === "active" ? (
                              <button
                                className=""
                                style={{
                                  backgroundColor: "#2e7d32",
                                  color: "white",
                                  fontSize: "11px",
                                  padding: "2px 5px",
                                  borderRadius: "3px",
                                  marginRight: "15px",
                                }}
                              >
                                Added
                              </button>
                            ) : (
                              <button
                                className=""
                                onClick={() => handleAddToCard(item.id)}
                                style={{
                                  backgroundColor: "#2b2e3a",
                                  color: "white",
                                  fontSize: "11px",
                                  padding: "2px 5px",
                                  borderRadius: "3px",
                                  marginRight: "15px",
                                }}
                              >
                                Add to Cart
                              </button>
                            )} */}
                            <button
                              style={{
                                backgroundColor: "#2b2e3a",
                                color: "white",
                                fontSize: "11px",
                                padding: "2px 5px",
                                borderRadius: "3px",
                                marginRight: "15px",
                                fontFamily: "poppins",
                              }}
                              onClick={() =>
                                navigate(`/Checkoutpage/${item.id}`)
                              }
                            >
                              Buy now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" wishlist-empty-card m-2">
                  <div className="container d-flex justify-content-center align-items-center p-4 flex-column">
                    <p className="wishlist-empty-text mb-1">
                      Your wishlist is currently empty.
                    </p>
                    <small className="wishlist-empty-subtext">
                      Start exploring and add your favorite properties!
                    </small>
                  </div>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
