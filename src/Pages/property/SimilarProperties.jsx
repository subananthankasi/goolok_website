import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "react-multi-carousel/lib/styles.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import API_BASE_URL, { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginForm from "../../Components/Login/LoginForm";
import { wishlistGetThunk, wishlistPostThunk, wishlistVerifyThunk } from "../../Redux/Action/WishlistThunk";
import { buyPropertiesThunk } from "../../Redux/Action/BuyPropertiesThunk";
import { useAlert } from "react-alert";
import { Skeleton } from "primereact/skeleton";

function SimilarProperties({ loading }) {
  const [getData, setGetData] = useState([]);
  const { eid } = useParams();
  const alert = useAlert()
  const token = localStorage.getItem("zxcvbnm@#");
  const userid = localStorage.getItem("userid");
  const dispatch = useDispatch()

  const fetchHighReturnProperties = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/similarproperties`, {
        headers: {
          "Pr-Root": id,
          "Gl-Root": userid
        },
      });
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    if (eid) {
      fetchHighReturnProperties(eid);
    }
  }, [eid]);

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);
  const isAuthenticated = token
  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };

  const handleWishlistClick = async (id) => {
    if (!token) {
      setIsModalOpenlogin(true)

    } else {
      try {
        const payload = {
          enqid: id,

        };
        dispatch(wishlistPostThunk(payload)).then(() => {
          dispatch(wishlistVerifyThunk(eid));
          dispatch(wishlistGetThunk());
        });
        await dispatch(wishlistGetThunk());
        alert.success("Item added to your wishlist ");
      } catch (error) {
        console.error("Error during the request:", error);
      } finally {
        dispatch(wishlistVerifyThunk(eid));
        dispatch(wishlistGetThunk());
        fetchHighReturnProperties(eid)
      }
    }
  }

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${id}`, {
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
      fetchHighReturnProperties(eid);
    }
  };
  const productTemplate = (product) => (
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
            <button className="recommend_wishlist mb-0 m-0" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistClick(product.id);
            }}>
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
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
                <span className="m-0 p-0">{product?.land_extent_display} </span>
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

  return (
    <section className="">
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />
      <div className="container-xl similar_container">
        {loading ? (
          <div className="d-flex justify-content-center mt-2"> <Skeleton height="2rem" width="25%" className="mb-1 " /></div>
        ) : (
          <div className="section-head mt-2">
            <h3 className="">Similar Properties</h3>
          </div>
        )}

        <div className="mt-1 similar_property">
          {loading ? (
            <div className="d-flex gap-3">
              <Skeleton height="300px" width="25%" className="mb-1 " />
              <Skeleton height="300px" width="25%" className="mb-1 " />
              <Skeleton height="300px" width="25%" className="mb-1 " />
              <Skeleton height="300px" width="25%" className="mb-3 " />
            </div>
          ) : getData?.length >= 4 ? (
            <Carousel
              value={getData}
              numVisible={4}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate}
              circular
              autoplayInterval={4000}
            />
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
      </div>
    </section>
  );
}

export default SimilarProperties;
