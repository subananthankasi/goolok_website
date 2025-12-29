import React, { useCallback, useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";
import axios from "axios";
import API_BASE_URL, { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { wishlistGetThunk, wishlistPostThunk, wishlistVerifyThunk } from "../../Redux/Action/WishlistThunk";
import { buyPropertiesThunk } from "../../Redux/Action/BuyPropertiesThunk";
import LoginForm from "../../Components/Login/LoginForm";
import { useAlert } from "react-alert";
import { Skeleton } from "primereact/skeleton";
import { nearbyPropertiesGetThunk } from "../../Redux/Action/NearbyPropertiesThunk";
import { recommendGetThunk } from "../../Redux/Action/RecommendThunk";
import UseLocationFetcher from "./UseLocationFetcher";

function Recentlyadded({ loading }) {
  // const [getData, setGetData] = useState([]);
  const [locationName, setLocationName] = useState("");
  const token = localStorage.getItem("zxcvbnm@#");
  const userid = localStorage.getItem("userid");
  const dispatch = useDispatch()
  const alert = useAlert()



  const getData =
    useSelector((state) => state.nearbyPropertiesGetData?.data) || [];


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


  const { mapLoading } = UseLocationFetcher(handleLocation);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     if (!navigator.geolocation) {
  //       console.error("Geolocation not supported by this browser");
  //       return;
  //     }

  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const userLat = position.coords.latitude;
  //         const userLon = position.coords.longitude;

  //         try {
  //           const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  //           const geoRes = await axios.get(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLon}&key=${googleApiKey}`
  //           );

  //           const components = geoRes.data.results[0]?.address_components || [];
  //           const neighborhood =
  //             components.find((c) => c.types.includes("sublocality_level_1"))
  //               ?.long_name ||
  //             components.find((c) => c.types.includes("locality"))?.long_name ||
  //             components.find((c) =>
  //               c.types.includes("administrative_area_level_2")
  //             )?.long_name ||
  //             components.find((c) => c.types.includes("country"))?.long_name ||
  //             "Unknown";

  //           // const response = await axios.get(
  //           //   `${API_BASE_URL}/nearbyproperties`,
  //           //   {
  //           //     headers: {
  //           //       "Gl-Status": token ? true : false,
  //           //       "Pr-Start": userLat,
  //           //       "Pr-End": userLon,
  //           //       Level: neighborhood,
  //           //       "Pr-Root": userid,
  //           //       "Gl-Root": userid
  //           //     },
  //           //   }
  //           // );
  //           dispatch(
  //             nearbyPropertiesGetThunk({
  //               userLat,
  //               userLon,
  //               neighborhood,
  //               userid,
  //             })
  //           );
  //           // setGetData(response.data?.data);
  //         } catch (error) {
  //           console.error("Error fetching location:", error);
  //         }
  //       },
  //       (error) => {
  //         console.error("Geolocation error:", error);
  //       }
  //     );
  //   };

  //   fetchLocation();
  // }, [token, userid]);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  //     const runApi = async (lat, lon, neighborhood = "Chennai") => {
  //       // try {
  //       //   const response = await axios.get(`${API_BASE_URL}/nearbyproperties`, {
  //       //     headers: {
  //       //       "Gl-Status": token ? true : false,
  //       //       "Pr-Start": lat || "",
  //       //       "Pr-End": lon || "",
  //       //       Level: neighborhood,
  //       //       "Pr-Root": userid,
  //       //       "Gl-Root": userid
  //       //     },
  //       //   });
  //       //   setGetData(response.data?.data);
  //       // } catch (error) {
  //       //   console.error("Error running API:", error);
  //       // }
  //       try {
  //         dispatch(
  //           nearbyPropertiesGetThunk({
  //             lat,
  //             lon,
  //             neighborhood,
  //             userid,
  //           })
  //         );
  //       } catch (error) {
  //         console.error("Error running API:", error);
  //       }
  //     };

  //     if (!navigator.geolocation) {
  //       console.warn("Geolocation not supported");
  //       runApi(null, null, "Chennai");
  //       return;
  //     }

  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const userLat = position.coords.latitude;
  //         const userLon = position.coords.longitude;

  //         try {
  //           const geoRes = await axios.get(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLon}&key=${googleApiKey}`
  //           );

  //           const components = geoRes.data.results[0]?.address_components || [];

  //           const neighborhood =
  //             components.find((c) => c.types.includes("sublocality_level_1"))
  //               ?.long_name ||
  //             components.find((c) => c.types.includes("locality"))?.long_name ||
  //             components.find((c) =>
  //               c.types.includes("administrative_area_level_2")
  //             )?.long_name ||
  //             components.find((c) => c.types.includes("country"))?.long_name ||
  //             "Chennai";

  //           runApi(userLat, userLon, neighborhood);
  //         } catch (error) {
  //           console.error("Reverse geocode failed:", error);
  //           runApi(userLat, userLon, "Chennai");
  //         }
  //       },
  //       (error) => {
  //         console.warn("User denied or error:", error);
  //         runApi(null, null, "Chennai");
  //       }
  //     );
  //   };

  //   fetchLocation();
  // }, [token, userid]);


  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);
  const isAuthenticated = token
  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };

  const [store, setStore] = useState([]);
  useEffect(() => {
    dispatch(wishlistGetThunk()).then((res) => {
      if (res?.payload?.data) {
        const ids = res.payload.data.map((item) => item.enqid);
        setStore(ids);
      }
    });
  }, [dispatch]);

  const handleWishlistClick = async (eid) => {
    if (!token) {
      setIsModalOpenlogin(true);
      return;
    }
    setStore((prev) => {
      if (prev.includes(eid)) {
        alert.success("Removed from wishlist");
        return prev.filter((id) => id !== eid);
      } else {
        alert.success("Great choice! This property successfully added to your wishlist");
        return [...prev, eid];

      }
    });

    try {
      const payload = { enqid: eid };
      await dispatch(wishlistPostThunk(payload));
      await dispatch(wishlistVerifyThunk(eid));
      await dispatch(wishlistGetThunk());
      // alert.success("Item added to your wishlist");
      dispatch(recommendGetThunk(userid))
    } catch (error) {
      console.error("Error:", error);
      alert.error("Something went wrong!");
    }
  };

  const removeFromWishlist = async (eid) => {
    if (!token) {
      setIsModalOpenlogin(true);
      return;
    }

    setStore((prev) => prev.filter((id) => id !== eid));

    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${eid}`, {
        headers: { Authorization: token },
      });
      await dispatch(wishlistGetThunk());
      await dispatch(wishlistVerifyThunk(eid));
      dispatch(recommendGetThunk(userid))
      alert.success("Removed from wishlist");
    } catch (error) {
      console.error("Error:", error);
      alert.error("Error removing from wishlist");
    }
  };
  const productTemplate = (product) => {
    return (
      <div className="todaysdeal-card">
        <Link
          to={`/property/${product.id}/${product.propertyType}`}
          onClick={() => localStorage.setItem("cartId", product.id)}
        >
          <div className="todaysdeal-img-wrapper">
            <img
              src={`${IMG_PATH}enquiry/gallery/${product?.images[0]}`}
              alt={product.alt}
              className="todaysdeal-img"
            />
          </div>
          <div className="d-flex justify-content-between align-items-start position-absolute w-100 px-2" style={{ top: 8, zIndex: 10 }}>
            {product?.disc_percentage && product?.disc_status === "true" && (
              <p className="offer_tag_property_recomend mb-0">
                {Math.floor(product?.disc_percentage)}%
              </p>
            )}
            {isAuthenticated && product?.whishlist === true ? (
              // <button className="recommend_wishlist mb-0 m-0" onClick={(e) => {
              //   e.preventDefault();
              //   e.stopPropagation();
              //   handleWishlistClick(product.id);
              // }}>
              //   <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              // </button>
              <button
                className="recommend_wishlist mb-0 m-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (store.includes(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    handleWishlistClick(product.id);
                  }
                }}
              >
                {store.includes(product.id) ? (
                  <FavoriteIcon sx={{ fontSize: 20, color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                )}
              </button>
            ) : isAuthenticated && product?.whishlist === "false" ? (
              <button className="recommend_wishlist_true mb-0 m-0" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromWishlist(product.id)
              }}>
                <FavoriteIcon sx={{ fontSize: 20 }} />
              </button>
            ) : (
              <button className="recommend_wishlist mb-0 m-0" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistClick(product.id);
              }}>
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              </button>
            )}


          </div>
          <div className="text-start">
            <div className="homes-content p-2" style={{ height: "150px" }}>
              <h3 className="p-0 m-0">
                <a href="#" className="p-0 m-0">
                  {product?.landType}{" "}
                </a>
              </h3>

              <ul className="homes-list homes-list1 clearfix mb-0">
                <li className="the-icons mb-2">
                  <span>{product?.propertyName} </span>
                </li>
                <li className="the-icons mb-1">
                  <i className="fa-solid fa-ruler-combined"></i>
                  <span className="m-0 p-0">
                    {product?.land_extent_display}{" "}
                  </span>
                </li>
              </ul>
              <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
                <a href="javascript:void(0)">
                  <li className="the-icons">
                    <i className="fa fa-map-marker" />
                    <span>{product?.taluk}</span>
                  </li>
                </a>
              </ul>
              <div className="price-properties footer mt-1 pb-0">
                <p className="bottom_price mb-0">
                  <i
                    className="fa fa-inr"
                    aria-hidden="true"
                    style={{ fontSize: 12 }}
                  />

                  {product.price}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };


  return (
    <section className="section_container">
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />
      <div className="container-xl recent_property_container">
        <div className="section-head ">
          {loading ? (
            <div className="d-flex justify-content-center">
              <Skeleton height="2rem" width="500px" />
            </div>
          ) : (
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                letterSpacing: "1px",
              }}
              className="mt-4"
            >
              Discover Verified Properties Near You
            </h3>
          )}

        </div>
        {loading ? (
          <div className="row mt-4">
            <div className="col-3">
              <Skeleton height={360} width="100%" />
            </div>
            <div className="col-3">
              <Skeleton height={360} width="100%" />
            </div>
            <div className="col-3">
              <Skeleton height={360} width="100%" />
            </div>
            <div className="col-3">
              <Skeleton height={360} width="100%" />
            </div>
          </div>
        ) : getData?.length >= 4 ? (
          <div className="mt-2 recent_property">
            <Carousel
              value={getData}
              numVisible={4}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate}
              circular
            />
          </div>
        ) : (
          <div className="d-flex justify-content-center gap-3 mt-2">
            {getData?.map((product) => (
              <div className="todaysdeal-card" style={{ width: "314px" }}>
                <Link
                  to={`/property/${product.id}/${product.propertyType}`}
                  onClick={() => localStorage.setItem("cartId", product.id)}
                >
                  <div className="todaysdeal-img-wrapper">
                    <img
                      src={`${IMG_PATH}enquiry/gallery/${product?.images[0]}`}
                      alt={product.alt}
                      className="todaysdeal-img"
                    />
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-start position-absolute w-100 px-2"
                    style={{ top: 8, zIndex: 10 }}
                  >
                    {product?.disc_percentage &&
                      product?.disc_status === "true" && (
                        <p className="offer_tag_property_recomend mb-0">
                          {Math.floor(product?.disc_percentage)}%
                        </p>
                      )}
                    {isAuthenticated && product?.whishlist === true ? (
                      <button
                        className="recommend_wishlist mb-0 m-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleWishlistClick(product.id);
                        }}
                      >
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                      </button>
                    ) : isAuthenticated && product?.whishlist === "false" ? (
                      <button
                        className="recommend_wishlist_true mb-0 m-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromWishlist(product.id);
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 20 }} />
                      </button>
                    ) : (
                      <button
                        className="recommend_wishlist mb-0 m-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleWishlistClick(product.id);
                        }}
                      >
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                      </button>
                    )}
                  </div>

                  <div className="text-start">
                    <div
                      className="homes-content p-2"
                      style={{ height: "150px" }}
                    >
                      <h3 className="p-0 m-0">
                        <a href="#" className="p-0 m-0">
                          {product?.landType}{" "}
                        </a>
                      </h3>

                      <ul className="homes-list homes-list1 clearfix mb-0">
                        <li className="the-icons mb-2">
                          <span>{product?.propertyName} </span>
                        </li>
                        <li className="the-icons mb-1">
                          <i className="fa-solid fa-ruler-combined"></i>
                          <span className="m-0 p-0">
                            {product?.land_extent_display}{" "}
                          </span>
                        </li>
                      </ul>
                      <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
                        <a href="javascript:void(0)">
                          <li className="the-icons">
                            <i className="fa fa-map-marker" />
                            <span>{product?.taluk}</span>
                          </li>
                        </a>
                      </ul>
                      <div className="price-properties footer mt-1 pb-0">
                        <p className="bottom_price mb-0">
                          <i
                            className="fa fa-inr"
                            aria-hidden="true"
                            style={{ fontSize: 12 }}
                          />

                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Recentlyadded;
