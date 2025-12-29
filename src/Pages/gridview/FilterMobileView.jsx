import React, { useEffect, useState } from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { setLocationSearch } from "../../Redux/Action/GridViewFilterAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faCity,
  faTree,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

function valuetext(value) {
  return `${value}`;
}

const FilterMobileView = ({ viewTypeMap }) => {
  const options = [
    { value: "Arakkonam", label: "Arakkonam" },
    { value: "Ambattur", label: "Ambattur" },
    { value: "Sriperumpudur", label: "Sriperumpudur" },
    { value: "tnagar", label: "tnagar" },
    { value: "chennai", label: "chennai" },
  ];

  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for offcanvas customizing
  const [show, setShow] = useState(false);

  const handleCloses = () => setShow(false);
  const handleShows = () => setShow(true);

  const [placement, setPlacement] = useState("top");

  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth <= 768) {
        setPlacement("end");
      } else {
        setPlacement("top");
      }
    };
    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);

  // location search
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const handleSearch = (option) => {
    setSearch(option);
  };
  dispatch(setLocationSearch(search));
  return (
    <>
      <div className="">
        <div className="FilterMobileView">
          <div
            className="row"
            style={{
              float: "right",
              // display: "flex",
              width: "100%",
              justifyContent: "space-between",
              height: "40px",
            }}
          >
            <div className={`col-6 ps-0 pe-0  `}>
              <label className="center_location w-100">
                <Select
                  options={options}
                  placeholder="Search..."
                  onChange={handleSearch}
                  value={search}
                />
              </label>
            </div>
            <div
              className={`col-6 ps-0  text-end  `}
            >
              <a href="# " className="btn_1" onClick={handleShows}>
                <FilterAltIcon />
                <label className="hide_filter text-white">More Filter</label>
              </a>
            </div>
          </div>

          <Offcanvas
            className="filter_button"
            show={show}
            onHide={handleCloses}
            placement={placement}
            style={{
              height: placement === "end" ? "" : "auto",
              backgroundColor: "#efefef",
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="widget widget12 p-3">
                <div className="main-search-field">
                  {/* <div className="widget-boxed-header">
                    <h4 style={{ marginBottom: "1rem" }}>Find Your Property</h4>
                  </div> */}

                  <div className="">
                    <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                      Location
                    </p>
                    <hr />
                    <Select options={options} isMulti />
                  </div>

                  <div className="property-filter mt-3">
                    {/* Price Range */}
                    <div className="filter-row">
                      <div className="filter-column">
                        <label>Minimum Price</label>
                        <select>
                          <option>Min</option>
                          <option>₹500,00</option>
                          <option>₹1000,00</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="filter-column">
                        <label>Maximum Price</label>
                        <select>
                          <option>Max</option>
                          <option>₹500,00</option>
                          <option>₹1,000,00</option>
                          {/* Add more options as needed */}
                        </select> 
                      </div>
                    </div>

                    {/* Bedrooms and Bathrooms */}
                    <div className="filter-row">
                      <div className="filter-column">
                        <label>Bedrooms</label>
                        <select>
                          <option>Any</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="filter-column">
                        <label>Bathrooms</label>
                        <select>
                          <option>Any</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                    </div>

                    {/* Home Type */}
                    <div className="mb-3">
                      <label>Home Type</label>
                      <div className="row d-flex gx-2 gy-2">
                        <div className="col-6 col-md-4 col-lg-3 ">
                          <button className="btn btn-light w-100">
                            <div style={{ fontSize: "2rem", color: "#2b2e3a" }}>
                              <FontAwesomeIcon icon={faHome} />
                            </div>
                            Single Family
                          </button>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 ">
                          <button className="btn btn-light w-100">
                            <div style={{ fontSize: "2rem", color: "#2b2e3a" }}>
                              <FontAwesomeIcon icon={faBuilding} />
                            </div>
                            Condos
                          </button>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 ">
                          <button className="btn btn-light w-100">
                            <div style={{ fontSize: "2rem", color: "#2b2e3a" }}>
                              <FontAwesomeIcon icon={faCity} />
                            </div>
                            Townhouse
                          </button>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 ">
                          <button className="btn btn-light w-100">
                            <div style={{ fontSize: "2rem", color: "#2b2e3a" }}>
                              <FontAwesomeIcon icon={faTree} />
                            </div>
                            Land
                          </button>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 ">
                          <button className="btn btn-light w-100">
                            <div style={{ fontSize: "2rem", color: "#2b2e3a" }}>
                              <FontAwesomeIcon icon={faHouseUser} />
                            </div>
                            Multi-Family
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="filter-column">
                      <label>Other</label>
                      <select>
                        <option>Attach Single</option>
                        <option>Auction</option>
                      </select>
                    </div>

                    {/* Property Styles and Status */}
                    <div className="filter-row">
                      <div className="filter-column">
                        <label>Property Styles</label>
                        <select>
                          <option>Style</option>
                          <option>Modern</option>
                          <option>Classic</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="filter-column">
                        <label>Property Statuses</label>
                        <select>
                          <option>Active</option>
                          <option>Pending</option>
                          <option>Sold</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="trip-search">
                    <form className="form">
                      <div className="form-group">
                        <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                          <strong>Property Facts</strong>
                        </p>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Min Sq Ft</label>
                            <select>
                              <option>0</option>
                              <option>500</option>
                              <option>1000</option>
                            </select>
                          </div>
                          <div className="filter-column">
                            <label>Max Sq Ft</label>
                            <select>
                              <option>1000</option>
                              <option>2000</option>
                              <option>3000</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Min Acres</label>
                            <select>
                              <option>0</option>
                              <option>500</option>
                              <option>1000</option>
                            </select>
                          </div>
                          <div className="filter-column">
                            <label>Max Acres</label>
                            <select>
                              <option>1000</option>
                              <option>2000</option>
                              <option>3000</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Min Year Built</label>
                            <select>
                              <option>1990+</option>
                              <option>1995+</option>
                              <option>2000</option>
                            </select>
                          </div>
                          <div className="filter-column">
                            <label>Max Year Built</label>
                            <select>
                              <option>2010+</option>
                              <option>2015+</option>
                              <option>2020+</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Walkscore</label>
                            <select>
                              <option>Attach Single</option>
                              <option>Auction</option>
                            </select>
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>
                    
                  <hr />

                  <div className="form-group mt-3">
                    <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                      <strong>Property Amenities</strong>
                    </p>  
                    <p className="mt-2" style={{marginBottom:"10px"}}>General Options</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            Just Listed
                          </label>
                        </div>
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Adult 55+
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Water Front
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Walkable
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Green/Energy Star
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Water View
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Fixer Upper
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Horse Property
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                              Views
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Newly Built
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Golf Course
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Open House
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Pool
                          </label>
                        </div>


                      </div>
                    </div>

                    <p className="mt-2" style={{marginBottom:"10px"}}>Financial Options</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            Reduced
                          </label>
                        </div>
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Not Distressed
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Seller Financing
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Foreclosures
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Lease to Own
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Short Sales
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            No HOA Fees
                          </label>
                        </div>


                      </div>
                    </div>

                    <p className="mt-2" style={{marginBottom:"10px"}}>Structural Options</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            Fireplace
                          </label>
                        </div>
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            1 Story
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Basement
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             1+ Garage
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             2 Stories
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                             Primary on Main
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            2+ Garage
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            3 Stories
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                           Air Conditioning
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            3+ Garage
                          </label>
                        </div>

                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Deck
                          </label>
                        </div>


                      </div>
                    </div>

                    <p className="mt-2" style={{marginBottom:"10px"}}>Rental Options</p>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            Furnished
                          </label>
                        </div>
                        <div className="col-sm-4 form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
                            id="exampleCheckbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox2"
                          >
                            Allows Pets
                          </label>
                        </div>


                      </div>
                    </div>

                    <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>HOA</label>
                            <select>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>New Construction</label>
                            <select>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Pool Y/N</label>
                            <select>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Waterfront Y/N</label>
                            <select>
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </div>
                        </div>

                        <div className="filter-row mt-3">
                          <div className="filter-column">
                            <label>Keywords</label>
                            <input
                            className="form-control"
                            type="text"
                            placeholder="text"
                          />
                          </div>
                        </div>

                  </div>

                  <div className="row filter_bottom">
                    <div className="col-6">
                    <button
                        className="btn btn-default hvr-bounce-to-right"
                        style={{ backgroundColor: "#2b2e3a", color: "white" }}
                        type="submit"
                        onClick={handleCloses}
                      >
                       Apply Filter
                      </button>
                    </div>
                    <div className="col-6 text-end">
                    <button
                        className="btn btn-default hvr-bounce-to-left"
                        style={{ backgroundColor: "#2b2e3a", color: "white" }}
                        type="submit"
                        onClick={handleCloses}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
};

export default FilterMobileView;
