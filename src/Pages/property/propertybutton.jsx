import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LOGIN_BASE_URL } from "../../Api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  cardDeleteThunk,
  cardGetThunk,
  cardListThunk,
  cardPostThunk,
} from "../../Redux/Action/AddToCardThunk";
import Login from "../../Components/Login/Login";
import {
  wishlistGetThunk,
  wishlistPostThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
import { Skeleton } from "primereact/skeleton";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import LoginForm from "../../Components/Login/LoginForm";
import { useAlert } from "react-alert";
import { openCartSidebar } from "../../Redux/Reducer/SliderForAddToCart";
import PropertybuttonCard from "./PropertybuttonCard";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "antd";
import EmiPlans from "./EmiPlans";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const loaderOptions = {
  id: "google-map-script",
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["geometry", "places"],
};

function PropertyButton({ property, eid, loading }) {
  const alert = useAlert();
  const navigate = useNavigate();

  const [locationNames, setLocationNames] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        const loader = new Loader(loaderOptions);
        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        const locationPromises = property.map(async (item, index) => {
          if (item.location) {
            const [lat, lng] = item.location.split(",").map(Number);
            if (isNaN(lat) || isNaN(lng)) {
              console.error(
                `Invalid coordinates for ${item.subpro_name}:`,
                item.location
              );
              return "Invalid coordinates";
            }

            return new Promise((resolve) => {
              geocoder.geocode(
                { location: { lat, lng } },
                (results, status) => {
                  if (status === "OK" && results.length > 0) {
                    const addressComponents = results[0].address_components;
                    let cityName = "Unknown Location";

                    for (let component of addressComponents) {
                      if (component.types.includes("locality")) {
                        cityName = component.long_name;
                        break;
                      } else if (component.types.includes("sublocality")) {
                        cityName = component.long_name;
                      } else if (
                        component.types.includes("administrative_area_level_2")
                      ) {
                        cityName = component.long_name;
                      }
                    }
                    resolve(cityName);
                  } else {
                    resolve("Location not found");
                  }
                }
              );
            });
          }
          return "No location provided";
        });

        const resolvedLocations = await Promise.all(locationPromises);
        setLocationNames(resolvedLocations);
      } catch (error) {
        console.error("Google Maps API error:", error);
      }
    };

    if (property.length > 0) {
      fetchLocationNames();
    }
  }, [property]);

  const data = property ? property : [];
  const [getData, setGetData] = useState([]);

  const location = data?.map((item) => item.location);
  const [distance, setDistance] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          const location = data.map((item) => item.location);

          const targetLocation = location[0];

          if (targetLocation) {
            const [lat, lon] = targetLocation
              .split(",")
              .map((coord) => parseFloat(coord.trim()));

            if (lat && lon) {
              const calculatedDistance = getDistance(
                userLat,
                userLon,
                lat,
                lon
              );
              setDistance(calculatedDistance.toFixed(2));
            } else {
              console.error("Invalid targetLocation format");
            }
          } else {
            console.error("Target location is not available");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const token = localStorage.getItem("zxcvbnm@#");
  const fetch = async () => {
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/wishlist`, {
        headers: {
          Authorization: token,
        },
      });
      setGetData(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [wishlistStatus, setWishlistStatus] = useState(null);

  const status = property?.map((item) => item.whishlist);

  //...........................................

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const localStorageCartId = localStorage.getItem("cartId");
  const wishlistVerify = useSelector((state) => state.wishlistVerify.data);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    // fetchCardList()
    if (localStorageCartId) {
      // dispatch(cardListThunk(localStorageCartId));
    }
  }, [localStorageCartId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/wishlist`, {
        headers: {
          Authorization: token,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };
  const [cardData, setCardData] = useState([]);

  // const fetchShopingCard = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${LOGIN_BASE_URL}/vendor/shoppingcart`,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     setCardData(response.data);
  //   } catch (error) {
  //     console.error("Error during the request:", error);
  //   }
  // };
  useEffect(() => {
    // fetchShopingCard();
    dispatch(wishlistGetThunk());
    dispatch(wishlistVerifyThunk(eid));
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `${LOGIN_BASE_URL}/vendor/wishlist/${eid}/edit`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWishlist(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

  // const [cardList, setCardList] = useState([])

  // const fetchCardList = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${LOGIN_BASE_URL}/vendor/shoppingcart/${eid}/edit`,
  //       {
  //         headers: {
  //           'Authorization': token
  //         }
  //       }
  //     )
  //     setCardList(response.data);
  //   } catch (error) {
  //     console.error('Error during the request:', error);
  //   }

  // };
  const cardList = useSelector((state) => state.shoppingCardListData?.data);
  // const cardList = useSelector((state) => state.cart);

  const addToWishlist = async (productId) => {
    try {
      const payload = {
        enqid: eid,
      };
      dispatch(wishlistPostThunk(payload)).then(() => {
        dispatch(wishlistVerifyThunk(eid));
        dispatch(wishlistGetThunk());
      });
      await dispatch(wishlistGetThunk());
      // fetchShopingCard();
      alert.success("Item added to your wishlist ");
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetchCardList();
      dispatch(wishlistVerifyThunk(eid));
      dispatch(wishlistGetThunk());
    }
  };
  // const handleAddToCard = async (productId) => {
  //   try {
  //     const payload = {
  //       enqid: localStorageCartId ? localStorageCartId : eid,
  //     };
  //     dispatch(cardPostThunk(payload)).then(() => {
  //       dispatch(cardListThunk(localStorageCartId));
  //       dispatch(cardGetThunk());
  //     });
  //     alert.success("Item added to your cart successfully 🛒");
  //     await dispatch(cardGetThunk());
  //     await dispatch(openCartSidebar());

  //     fetchShopingCard();
  //   } catch (error) {
  //     console.error("Error during the request:", error);
  //     alert.error("Failed to add item to cart. Please try again.");
  //   } finally {
  //     // fetchCardList();
  //     dispatch(cardListThunk(localStorageCartId));
  //     dispatch(cardGetThunk());
  //   }
  // };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${eid}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(eid));
      alert.success("Item removed from your wishlist");
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      fetchWishlist();
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(eid));
    }
  };
  // const removeFromCard = async (productId) => {
  //   try {
  //     dispatch(cardDeleteThunk(eid)).then(() => {
  //       dispatch(cardListThunk(localStorageCartId));
  //       dispatch(cardGetThunk());
  //     });
  //     alert.success("Item removed from your cart 🗑️");
  //   } catch (error) {
  //     console.error("Error during the request:", error);
  //   } finally {
  //     dispatch(cardListThunk(localStorageCartId));
  //   }
  // };

  // const isInWishlist = (productId) => wishlist.includes(productId);
  const isInWishlist = wishlist;
  const isInCardList = cardList;
  const condition = useSelector((state) => state.auth.isAuthenticated);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);

  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };
  const [pendingAction, setPendingAction] = useState(null);
  // const handleAddToCartClick = (productId) => {
  //   if (!isAuthenticated) {
  //     setPendingAction(() => () => handleAddToCard(productId));
  //     openModallogin();
  //   } else {
  //     handleAddToCard(productId);
  //   }
  // };
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const [priceShow, setPriceShow] = useState(false);
  const formatIndianPrice = (num) => {
    const value = Number(String(num).replace(/,/g, ""));

    if (isNaN(value)) return "₹ 0";

    if (value >= 10000000) return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹ ${(value / 100000).toFixed(2)} L`;
    return `₹ ${value.toLocaleString("en-IN")}`;
  };
  const isSoldOut = property?.[0]?.status?.toLowerCase() === "booking";

  return (
    <>
      {/* <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} /> */}
      <LoginForm
        isOpen={isModalOpenlogin}
        closeModal={closeModalLogin}
        onLoginSuccess={() => {
          closeModalLogin();
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />
      <div className={isSoldOut ? "soldout-bg" : ""}>
        <div className="widget-boxed-body">
          <div className="sidebar-widget author-widget2">
            {loading ? (
              <div>
                <div className="">
                  <Skeleton height="1.5rem" width="25%" className="mb-1 " />
                  <Skeleton height="1.5rem" width="50%" className="mb-1" />
                  <Skeleton height="1.5rem" width="75%" className="mb-3" />
                  <Skeleton height="8rem" width="100%" className="mb-3" />
                  <div className="d-flex flex-column  justify-content-center align-items-center">
                    <Skeleton height="2.5rem" width="75%" className="mb-2" />
                    <Skeleton height="2.5rem" width="75%" className="mb-2" />
                    <Skeleton height="1.5rem" width="75%" className="mb-2" />
                  </div>
                </div>
              </div>
            ) : (
              property?.map((item) => {
                return (
                  <div
                    className="agent-contact-form-sidebar p-0 m-0"
                    key={item.id}
                  >
                    <h2
                      className="gallery-head"
                      style={{
                        lineHeight: "1.2",
                        fontSize: "25px",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        marginBottom: "7px",
                        color: "#0000ff",
                        fontFamily: "poppins"
                      }}
                    >
                      {item.property_type.toLowerCase() === "commercial"
                        ? `${item.property_type} ${item.subpro_name}`
                        : item.subpro_name}

                    </h2>

                    <h2
                      className=""
                      style={{
                        lineHeight: "1.2",
                        fontSize: "18px",
                        fontWeight: "600",
                        letterSpacing: "0.3px",
                        marginTop: "0",
                        fontFamily: "poppins"
                      }}
                    >
                      {item.propertyName}
                    </h2>

                    <div className="d-flex align-items-center mt-2">
                      {item?.disc_status === "true" ? (
                        <>
                          <h4 className="old-price me-2">
                            {formatIndianPrice(item.price)}{" "}
                          </h4>
                          <h4 className="original-price">
                            {formatIndianPrice(item.total_aft_disc)}
                          </h4>
                          <InfoIcon
                            sx={{
                              fontSize: 23,
                              cursor: "pointer",
                              marginLeft: "7px",
                            }}
                            onClick={() => setPriceShow(true)}
                          />
                        </>
                      ) : (
                        <>
                          <h4 className="original-price" style={{ fontSize: "17px" }}>
                            {formatIndianPrice(item.price)}
                          </h4>{" "}
                          <InfoIcon
                            sx={{
                              fontSize: 23,
                              cursor: "pointer",
                              marginLeft: "7px",
                            }}
                            onClick={() => setPriceShow(true)}
                          />
                        </>
                      )}
                    </div>

                    <div className="property-details container border  mt-3 p-3">
                      <div className="row">
                        {/* First Row */}
                        <div className="col-6 border-bottom  py-2">
                          <div className="d-flex align-items-center">
                            <i className="fa fa-ruler-combined me-2"></i>
                            <div>
                              {/* <strong>{Number(item.units).toFixed(2)}</strong> */}
                              <PropertybuttonCard key={item.id} item={item} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 border-bottom py-2">
                          <div className="d-flex align-items-center">
                            <i class="fa-solid fa-location-dot me-2"></i>
                            <div>
                              <strong>{item.taluk}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="col-6  py-2">
                          <div className="d-flex align-items-center">
                            <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                            <strong>
                              {Number(item.per_price).toFixed(2)} Per{" "}
                              {item.land_units} price{" "}
                            </strong>
                          </div>
                        </div>
                        <div className="col-6  py-2">
                          <div className="d-flex align-items-center">
                            <i class="fa-solid fa-road me-2"></i>
                            <div style={{ wordBreak: "break-all" }}>
                              <strong>{item.highlights} </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-4" style={{ flexDirection: "column", alignItems: "center" }}>

                      {isAuthenticated ? (<button
                        className=" premium-buy-btn btn-theme w-75 "
                        onClick={() => navigate(`/Checkoutpage/${item.id}`)}
                        disabled={isSoldOut}
                      >
                       {isSoldOut ? "Sold Out" :"Buy now" } 
                      </button>) : (
                        <button
                          className=" premium-buy-btn btn-theme w-75 "
                          onClick={() => setIsModalOpenlogin(true)}
                        >
                          Buy now
                        </button>
                      )}



                      {isAuthenticated ? (
                        wishlistVerify?.whishlist === "false" ? (
                          <button
                            variant=""
                            className=" btn-transparent red w-75 mt-3"
                            onClick={() => removeFromWishlist(isInWishlist.enq)}
                            style={{ alignItems: "center" }}
                          >
                            <FavoriteIcon
                              style={{ color: "red", marginRight: "5px" }}
                            />
                            Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            variant=""
                            className=" btn-transparent  w-75 mt-3"
                            onClick={() => addToWishlist(item.id)}
                            style={{ alignItems: "center" }}
                            disabled={isSoldOut}
                          >
                            <FavoriteBorderIcon
                              style={{ marginRight: "5px" }}
                            />
                            Add to Wishlist
                          </button>
                        )
                      ) : (
                        <button
                          variant=""
                          className=" btn-transparent wishlist-button w-75 mt-3"
                          onClick={() => setIsModalOpenlogin(true)}
                        >
                          <span className="heart-icon">&#10084;</span> Add to
                          Wishlist
                        </button>
                      )}

                      {/* <button
                        className="btn btn-transparent w-75 mt-3"
                        onClick={handleClick}
                      >
                        {distance ? `${distance} km` : "Calculate Distance"}
                      </button> */}
                    </div>
                    <div className="col-6 w-75 mx-5 mt-3">
                      <EmiPlans items={item} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Dialog
        visible={priceShow}
        style={{ width: "42rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Total Property Cost Summary"
        modal
        onHide={() => setPriceShow(false)}
      >
        {(() => {
          try {
            const parsed = JSON.parse(property[0]?.pricing || "[]");

            let charges = [];
            if (Array.isArray(parsed)) {
              charges = Array.isArray(parsed[0]) ? parsed[0] : parsed;
            }

            if (!charges.length)
              return (
                <p className="text-center text-muted my-3">
                  No pricing details available
                </p>
              );

            return (
              <div
                style={{
                  position: "relative",
                  // borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0",
                    background: "#fff",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <thead
                    style={{
                      background: "linear-gradient(135deg, #374550, #556270)",
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontSize: "13px",
                    }}
                  >
                    <tr>
                      <th style={{ padding: "10px 12px", textAlign: "left" }}>
                        Charges
                      </th>
                      <th style={{ padding: "10px 12px", textAlign: "left" }}>
                        Unit
                      </th>
                      <th style={{ padding: "10px 12px", textAlign: "left" }}>
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges.map((c, index) => {
                      const isLast = index === charges.length - 1;
                      return (
                        <tr
                          key={index}
                          style={{
                            background: index % 2 === 0 ? "#fafafa" : "#fff",
                            transition: "all 0.2s ease",
                            position: "relative",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f0f6ff")
                          }
                          onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            index % 2 === 0 ? "#fafafa" : "#fff")
                          }
                        >
                          <td
                            style={{
                              padding: "10px 12px",
                              borderBottom: "1px solid #eee",
                              fontWeight: "500",
                              color: "#333",
                              position: "relative",
                              ...(isLast && {
                                borderBottomLeftRadius: "23px",
                                boxShadow: "0 17px 0 0 #374550",
                              }),
                            }}
                          >
                            {c.charges}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderBottom: "1px solid #eee",
                              color: "#666",
                            }}
                          >
                            {c.unit || "-"}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderBottom: "1px solid #eee",
                              fontWeight: "600",
                              color: "#2e7d32",
                              position: "relative",
                              ...(isLast && {
                                borderBottomRightRadius: "23px",
                                boxShadow: "0 17px 0 0 #374550",
                              }),
                            }}
                          >
                            ₹{c.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          } catch (err) {
            return <span>No pricing details available</span>;
          }
        })()}
      </Dialog>
    </>
  );
}

export default PropertyButton;
