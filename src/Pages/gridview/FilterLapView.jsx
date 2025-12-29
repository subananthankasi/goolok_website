import Select from "react-select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import options from "react";
import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function valuetext(value) {
    return `${value}`;
  }

function FilterLapView() {
     const options = [
      { value: "Aavadi", label: "Aavadi" }, 
      { value: "Ambattur", label: "Ambattur" },
      { value: "Egmore", label: "Egmore" },
    ];
  
    const [value, setValue] = useState([20, 37]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
   
    return (
        <>
         <div className="FilterLapView">
        <div className="widget widget12">
          <div className="widget-boxed main-search-field">

            <div className="widget-boxed-header">
              <h4 style={{ marginBottom: "1rem" }}>Find Your Property</h4>
            </div>
            <div className="trip-search">
              <form className="form">
                <div className="form-group">
                  <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                    Property Type
                  </p>
                  <hr />
                  <div className="form-check">
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
                      DTCP - Layout Plots
                    </label>
                  </div>
                  <div className="form-check">
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
                      Unapproved Plots
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="exampleCheckbox3"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheckbox3"
                    >
                      Individual House
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="exampleCheckbox4"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheckbox4"
                    >
                      Commercial Building
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="exampleCheckbox5"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheckbox5"
                    >
                      Individual Plot
                    </label>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                    Property Status
                  </p>
                  <hr />
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="form-check">
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
                        For Rent
                      </label>
                    </div>
                    <div className="form-check">
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
                        For Sale
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                    Location
                  </p>
                  <hr />
                  <Select options={options} isMulti />
                </div>
              </form>
            </div>

            <div className="main-search-field-2">
              <div className="range-slider">
                <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                  Area Size
                </p>
                <hr />

                <Box sx={{ width: "100%" }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
              </div>
              <br />
              <div className="range-slider">
                <p className="mt-2 mb-2" style={{ fontSize: 14 }}>
                  Price Range
                </p>
                <hr />
                <Box sx={{ width: "100%" }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
              </div>
            </div>

            <div className="col-lg-12 no-pds">
              <div className="at-col-default-mar">
                <button
                  className="btn-default hvr-bounce-to-right w-100"
                  type="submit"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default FilterLapView;