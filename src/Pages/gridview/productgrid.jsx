import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { MagnifyingGlass } from "react-loader-spinner";
import { Paginator } from "primereact/paginator";
import { Carousel } from "react-bootstrap";
import FilterOfProducts from "./FilterOfProducts";
import { useDispatch, useSelector } from "react-redux";
import { buyPropertiesThunk } from "../../Redux/Action/BuyPropertiesThunk";
import LoginForm from "../../Components/Login/LoginForm";
import {
  wishlistGetThunk,
  wishlistPostThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
import { useAlert } from "react-alert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { Breadcrumb } from "antd";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button } from "antd";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FaMapLocationDot } from "react-icons/fa6";

const ProductGrid = ({ landType, searchValue }) => {
  const token = localStorage.getItem("zxcvbnm@#");
  const [mobileFilter, setMobileFilter] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (landType || searchValue) {
      dispatch(buyPropertiesThunk({ landType, searchValue }));
    } else {
      dispatch(buyPropertiesThunk());
      sessionStorage.removeItem("location");
    }
  }, [dispatch, landType, searchValue]);

  const products = useSelector((state) => state.buyPropertiesData?.data);
  const loading = useSelector((state) => state.buyPropertiesData?.loading);

  const [filterLoading, setFilterLoading] = useState(false);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const [sort, setSort] = useState("relevance");

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const parsePrice = (product) => {
      const priceString =
        product.disc_status === "true" ? product.total_aft_disc : product.price;
      const numericPrice = Number(
        priceString?.toString().replace(/[₹,\s]/g, "") || 0
      );
      return isNaN(numericPrice) ? 0 : numericPrice;
    };
    const sorted = [...products].sort((a, b) => {
      const priceA = parsePrice(a);
      const priceB = parsePrice(b);
      if (sort === "price-low-to-high") return priceA - priceB;
      if (sort === "price-high-to-low") return priceB - priceA;
      return 0;
    });

    return sorted;
  }, [products, sort]);

  const paginatedProducts = sortedProducts.slice(first, first + rows);
  const alert = useAlert();
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const isAuthenticated = token;
  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };
  const [store, setStore] = useState([]);
  useEffect(() => {
    if (token) {
      dispatch(wishlistGetThunk()).then((res) => {
        if (res?.payload?.data) {
          const ids = res.payload.data.map((item) => item.enqid);
          setStore(ids);
        }
      });
    }

  }, [dispatch, token]);

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
        alert.success("Item added to your wishlist");
        return [...prev, eid];
      }
    });
    try {
      const payload = { enqid: eid };
      await dispatch(wishlistPostThunk(payload));
      await dispatch(wishlistVerifyThunk(eid));
      await dispatch(wishlistGetThunk());
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
      alert.success("Removed from wishlist");
    } catch (error) {
      console.error("Error:", error);
      alert.error("Error removing from wishlist");
    }
  };

  return (
    <>
      <LoginForm isOpen={isModalOpenlogin} closeModal={closeModalLogin} />
      <section className="mt-2">
        <div className="">
          <div className="product-grid">
            <div className="row d-flex justify-content-between align-items-center mb-4">
              <div className=" col-md-5 pe-0">
                <div className="mt-1">
                  <Breadcrumb
                    style={{ fontFamily: "poppins" }}
                    items={[
                      { title: <Link to="/">Home</Link> },
                      landType
                        ? { title: <Link to="/properties">Buy Property</Link> }
                        : { title: "Buy Property" },
                      landType ? { title: landType } : null,
                      searchValue ? { title: searchValue } : null,
                    ].filter(Boolean)}
                  />
                </div>
                <div className="text-start mb-3">
                  <h2
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "600",
                      fontSize: "25px",
                      // color: "#05599F",
                      color: "#0000ff",
                    }}
                  >
                    Find Your Verified Dream Property
                  </h2>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#555",
                      maxWidth: "550px",
                      margin: "0 auto 0",
                      // lineHeight: "1.6",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Welcome to a new standard of property buying. Every listing
                    has been thoroughly scrutinised for legal clarity, accurate
                    documentation, and fair market value. Explore with
                    confidence.
                  </p>
                </div>
              </div>
              <div className=" col-md-7 ">
                <div className="d-flex align-items-center justify-content-sm-between justify-content-md-end gap-3">
                  <div className="d-md-block d-lg-none d-xl-none d-xxl-none ">
                    <Button
                      type="primary"
                      icon={
                        mobileFilter ? (
                          <FilterAltOffIcon />
                        ) : (
                          <FilterAltOutlinedIcon />
                        )
                      }
                      onClick={() => setMobileFilter((prev) => !prev)}
                      style={{
                        background: "#2b2e3a",
                        color: "white",
                        borderRadius: "0",
                      }}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="me-3">
                    <Link
                      to="/propertymap"
                      state={{ sortedProducts }}
                      className=" premium-map-btn"
                      style={{ backgroundColor: "#0000ff", color: "white" }}
                    >
                      <FaMapLocationDot size={18} />
                    </Link>
                  </div>
                  <label
                    className="mb-0 me-2 d-none d-lg-block"
                    style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                  >
                    Sort By:
                  </label>
                  <select
                    className="form-select d-none d-lg-block gridview-sort"
                    style={{
                      width: "180px",
                      backgroundColor: "#fff",
                      borderRadius: "0px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                      padding: "12px 16px",
                      fontWeight: "600",
                      fontSize: "15px",
                      color: "#1a1a1a",
                      letterSpacing: "0.3px",
                      fontFamily: "'Poppins', sans-serif",
                      appearance: "none",
                      outline: "none",
                      transition: "box-shadow 0.2s ease",
                    }}
                    name="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    onFocus={(e) => {
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.25)";
                      e.target.style.border = "none";
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.transition = "box-shadow 0.2s ease";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.15)";
                      e.target.style.border = "none";
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.transition = "box-shadow 0.2s ease";
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low-to-high">
                      Price: Low to High
                    </option>
                    <option value="price-high-to-low">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 mx-md-auto ">
                {/* <Filter /> */}
                <FilterOfProducts
                  landType={landType}
                  mobileFilter={mobileFilter}
                  setMobileFilter={setMobileFilter}
                />
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="row">
                  {loading ? (
                    <>
                      <div
                        className="col-md-6 col-lg-4 "
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                      <div
                        className="col-md-6 col-lg-4"
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                      <div
                        className="col-md-6 col-lg-4"
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                      <div
                        className="col-md-6 col-lg-4"
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                      <div
                        className="col-md-6 col-lg-4"
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                      <div
                        className="col-md-6 col-lg-4"
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Skeleton height={352} />
                      </div>
                    </>
                  ) : filterLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "60vh" }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <MagnifyingGlass
                          visible={true}
                          height="100"
                          width="100"
                          ariaLabel="magnifying-glass-loading"
                          wrapperStyle={{}}
                          wrapperClass="magnifying-glass-wrapper"
                          glassColor="#efefef"
                          color="#2b2e3a"
                        />
                      </div>
                    </div>
                  ) : paginatedProducts.length > 0 ? (
                    paginatedProducts?.map((product) => (
                      <div
                        className="col-md-4 col-lg-4"
                        key={product.id}
                        style={{ padding: "5px", marginBottom: "3px" }}
                      >
                        <Link
                          to={`/property/${product.id}/${product.propertyType}`}
                          onClick={() =>
                            localStorage.setItem("cartId", product.id)
                          }
                          className="p-0 m-0"
                        >
                          <div
                            className=""
                            style={{
                              position: "relative",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <Carousel
                              interval={3000}
                              controls={true}
                              indicators={true}
                              className="custom-slider"
                            >
                              {product.images?.map((img, i) => (
                                <Carousel.Item key={i}>
                                  <img
                                    src={`${IMG_PATH}enquiry/gallery/${img}`}
                                    alt={`slide-${i}`}
                                    className="d-block w-100"
                                    style={{
                                      objectFit: "cover",
                                      height: "200px",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                    }}
                                  />
                                </Carousel.Item>
                              ))}
                            </Carousel>
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
                              {isAuthenticated &&
                                product?.whishlist === true ? (
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
                                    <FavoriteIcon
                                      sx={{ fontSize: 20, color: "red" }}
                                    />
                                  ) : (
                                    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                                  )}
                                </button>
                              ) : isAuthenticated &&
                                product?.whishlist === "false" ? (
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
                            {/* <div className="property-info">
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
                                    <span style={{
                                      display: "inline-block",
                                      maxWidth: "300px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}>{product?.propertyName} </span>
                                  </li>
                                  <li className="the-icons mb-1">
                                    <i className="fa-solid fa-ruler-combined"></i>
                                    <span className="m-0 p-0">
                                      {product?.land_extent_display}
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
                                    {product?.disc_status === "true" ? (
                                      <p className="bottom_price mb-0">
                                        <span>₹ {product.total_aft_disc}</span>
                                        <span
                                          style={{
                                            color: "gray",
                                            fontSize: "12px",
                                            textDecoration: "line-through",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          ₹ {product.price}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="bottom_price mb-0">
                                        <i
                                          className="fa fa-inr"
                                          aria-hidden="true"
                                          style={{ fontSize: 12 }}
                                        />

                                        {product.price}
                                      </p>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div> */}
                            <div className="property-card p-3">
                              <h6 className="property_landtype">
                                {product?.landType}
                              </h6>
                              <p className="property_name">
                                {product?.propertyName}
                              </p>
                              <div className="property_meta">
                                <p className="property_extent">
                                  <i className="fa-solid fa-ruler-combined"></i>
                                  <span>{product?.land_extent_display}</span>
                                </p>
                                <p className="property_extent">
                                  <i className="fa fa-map-marker"></i>
                                  <span>{product?.taluk}</span>
                                </p>
                              </div>
                              <div className="price-properties mt-1">
                                {product?.disc_status === "true" ? (
                                  <p className="price">
                                    ₹ {product.total_aft_disc}
                                    <span className="olded-price">₹ {product.price}</span>
                                  </p>
                                ) : (
                                  <p className="price">₹ {product.price}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "60vh" }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <SearchOffIcon sx={{ fontSize: 60 }} />
                        <h6>No Data Found </h6>
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  {!loading && products.length > 9 && (
                    <Paginator
                      first={first}
                      rows={rows}
                      totalRecords={products.length}
                      onPageChange={onPageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
