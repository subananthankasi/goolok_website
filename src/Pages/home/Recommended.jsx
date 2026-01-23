import  { useCallback, useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import  { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  wishlistGetThunk,
  wishlistPostThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
import LoginForm from "../../Components/Login/LoginForm";
import { useAlert } from "react-alert";
import { Skeleton } from "primereact/skeleton";
import { recommendGetThunk } from "../../Redux/Action/RecommendThunk";
import { nearbyPropertiesGetThunk } from "../../Redux/Action/NearbyPropertiesThunk";
import UseLocationFetcher from "./UseLocationFetcher";

function Recommended({ loading }) {
  // const [getData, setGetData] = useState([]);
  const token = localStorage.getItem("zxcvbnm@#");
  const userid = localStorage.getItem("userid");
  const alert = useAlert();
  const dispatch = useDispatch();
 
  const getData =
    useSelector((state) => state.RecommendGetData?.data?.data) || [];


  useEffect(() => {
    // fetchHighReturnProperties();
    dispatch(recommendGetThunk(userid))
  }, [userid,dispatch]);

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
  const isAuthenticated = token;
  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };


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

  const handleWishlistClick = async (eid) => {
    if (!token) {
      setIsModalOpenlogin(true);
    } else {
      try {
        const payload = {
          enqid: eid,
        };
        dispatch(wishlistPostThunk(payload)).then(() => {
          dispatch(wishlistVerifyThunk(eid));
          dispatch(wishlistGetThunk());
        });
        await dispatch(wishlistGetThunk());
        alert.success("Great choice! This property successfully added to your wishlist ");
      } catch (error) {
        console.error("Error during the request:", error);
      } finally {
        dispatch(wishlistVerifyThunk(eid));
        dispatch(wishlistGetThunk());
        // fetchHighReturnProperties();
        dispatch(recommendGetThunk(userid))
        // if (locationData) {
        dispatch(
          nearbyPropertiesGetThunk({
            lat: locationData?.lat,
            lon: locationData?.lon,
            neighborhood: locationData?.neighborhood,
            userid,
          })
        );
        // }
      }
    }
  };

  const removeFromWishlist = async (eid) => {
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
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(eid));
      // fetchHighReturnProperties();
      dispatch(recommendGetThunk(userid))
      // if (locationData) {
      dispatch(
        nearbyPropertiesGetThunk({
          lat: locationData?.lat,
          lon: locationData?.lon,
          neighborhood: locationData?.neighborhood,
          userid,
        })
      );
      // }
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
          <div
            className="d-flex justify-content-between align-items-start position-absolute w-100 px-2"
            style={{ top: 8, zIndex: 10 }}
          >
            {product?.disc_percentage && product?.disc_status === "true" && (
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
      <div className="container-xl buyer_property_container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Skeleton height="2rem" width="350px" />
          </div>
        ) : (
          <div className="section-head ">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                letterSpacing: "1px",
              }}
            >
              Recommended for You
            </h3>
          </div>
        )}

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
        ) : getData.length >= 4 ? (
          <div className="mt-2 buyer_property">
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

export default Recommended;
