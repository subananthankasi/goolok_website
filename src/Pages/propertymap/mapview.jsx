import { useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import { Carousel } from "react-bootstrap";
import { Paginator } from "primereact/paginator";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";



function MapView({ propertyData, loading, prRoot }) {
  const products = propertyData ? propertyData : [];
  const [sort, setSort] = useState("relevance");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
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

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center mb-2">
            <div className=" col-md-5 pe-0 p-0">
              <h4 className="all_property_title" style={{ fontFamily: "poppins", fontWeight: "600" }}>All Properties</h4>
            </div>
            <div className=" col-md-7 p-0">
              <div className="d-flex align-items-center justify-content-end">
                <div className="me-3">
                  <Link
                    // to="/properties"
                    to="/properties"
                    {...(prRoot ? { state: { title: prRoot } } : {})}
                    className=" premium-map-btn"
                    style={{ backgroundColor: "#0000ff", color: "white", whiteSpace: "nowrap" }}
                  >

                    <GridViewOutlinedIcon />
                  </Link>
                </div>
                <label
                  className="mb-0 me-2 d-none d-lg-block"
                  style={{ whiteSpace: "nowrap", fontWeight: "600" }}
                >
                  Sort By:
                </label>
                <select
                  className="form-select d-none d-lg-block"
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
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.25)";
                    e.target.style.border = "none";
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.transition = "box-shadow 0.2s ease";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
                    e.target.style.border = "none";
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.transition = "box-shadow 0.2s ease";
                  }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          <Row className="grid-scroll">
            <div
              className="product-grid"
              style={{
                minHeight: "600px",
                position: "relative",
              }}
            >
              <div className="row">
                {loading ? (
                  <>
                    <div className="col-md-12 col-lg-6 ">
                      <div className="project-single">
                        <Skeleton
                          height="410px"
                          width="100%"
                          className="mb-1 "
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 ">
                      <div className="project-single">
                        <Skeleton
                          height="410px"
                          width="100%"
                          className="mb-1 "
                        />
                      </div>
                    </div>
                  </>
                ) : paginatedProducts?.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <div className="col-md-12 col-lg-4 p-1" key={product.id} >
                      <Link
                        to={`/property/${product.id}/${product.propertyType}`}
                      >
                        <div className="project-grid">
                          <div className="landscapes">
                            <div className="project-single">
                              <div className=" product-img">
                                <div className="homes">
                                  <a href="#" className="homes-img">
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
                                              height: "150px",
                                              boxShadow:
                                                "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            }}
                                          />
                                        </Carousel.Item>
                                      ))}
                                    </Carousel>
                                    {product?.disc_percentage &&
                                      product?.disc_status === "true" && (
                                        <p className="offer_tag_property">
                                          {Math.floor(product?.disc_percentage)}
                                          %
                                        </p>
                                      )}
                                  </a>
                                </div>
                              </div>
                              <div className="homes-content p-2">
                                <p
                                  className="p-0 m-0"
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: "black",
                                  }}
                                >
                                  {product?.landType}
                                </p>
                                <p
                                  className="p-0 m-0 mt-1"
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    color: "gray",
                                  }}
                                >
                                  {" "}
                                  {product?.propertyName}{" "}
                                </p>
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
                                  <p className="bottom_price mb-2">
                                    <i
                                      className="fa fa-inr"
                                      aria-hidden="true"
                                      style={{ fontSize: 12 }}
                                    />

                                    {product.price}
                                  </p>
                                )}
                                {/* <hr className="p-0 m-0"/> */}
                                {/* <div className="d-block mt-2"> */}
                                <div className="d-flex gap-1 mt-2 align-items-center ">
                                  {/* <AspectRatioSharpIcon
                                    sx={{ color: "#1675e2", fontSize: 16 }}
                                  /> */}
                                  <i
                                    className="fa-solid fa-ruler-combined"
                                    style={{ color: "black", fontSize: "12px" }}
                                  ></i>
                                  <p
                                    className="m-0 p-0"
                                    style={{
                                      color: "black",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {product?.land_extent_display}{" "}
                                  </p>
                                </div>
                                <div className="d-flex gap-1 mt-1 align-items-center">
                                  {" "}
                                  {/* <FmdGoodOutlinedIcon
                                    sx={{ color: "#1675e2", fontSize: 16 }}
                                  /> */}
                                  <i
                                    className="fa fa-map-marker"
                                    style={{ color: "black", fontSize: "12px" }}
                                  />
                                  <p
                                    style={{
                                      color: "black",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {product?.taluk}
                                  </p>
                                </div>
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "50vh" }}
                  >
                    <h6 className="text-center m-0">No data</h6>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              {products.length > rows && (
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={products.length}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}

export default MapView;
