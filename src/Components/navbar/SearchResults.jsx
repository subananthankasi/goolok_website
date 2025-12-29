import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { MagnifyingGlass } from "react-loader-spinner";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  //   const results = mockProducts.filter((p) =>
  //     p.name.toLowerCase().includes(query.toLowerCase())
  //   );
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPostSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/search`, {
        search_key: query,
      });
      setGetData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setGetData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostSearch();
  }, [query]);

  return (
    <section
      className=""
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="mt-4 mb-4">
          {loading ? (
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
          ) : getData.length > 0 ? (
            <>  
            <h6 className="mb-3 text-center">Properties in{""} {query} </h6>
            <div className="search-grid">
              {getData.map((item) => (
                <div className="search-card" key={item.id}>
                  <Link
                    to={`/property/${item.id}/${item.propertyType}`}
                    onClick={() => localStorage.setItem("cartId", item.id)}
                  >
                    <div className="search-img-wrapper">
                      <img
                        src={`${IMG_PATH}enquiry/gallery/${item?.images[0]}`}
                        alt={item.alt}
                        className="search-img"
                      />
                    </div>
                    <div className="search-content">
                      <h3 className="search-title">{item?.landType}</h3>

                      <ul className="search-list">
                        <li className="search-list-item">
                          {item?.propertyName}
                        </li>
                        <li className="search-list-item">
                          <i className="fa-solid fa-ruler-combined"></i>{" "}
                          {item?.land_extent_display}
                        </li>
                      </ul>

                      <ul className="search-list">
                        <li className="search-list-item">
                          <i className="fa fa-map-marker" /> {item?.taluk}
                        </li>
                      </ul>

                      <p className="search-price">
                        <i className="fa fa-inr" aria-hidden="true" />{" "}
                        {item.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <div style={{ textAlign: "center" }}>
                <SearchOffIcon sx={{ fontSize: 60 }} />
                <h6>No data found for " {query} "</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
