import React, { useEffect, useState } from "react";
import "../SaleProperty/sales.css";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ProgressBar from "@ramonak/react-progress-bar";
import { CategoryOptions, LayOutOptions, plotOptions } from "./dropDownsBaseOnCategory";

function PropertySale() {
  const CustomTextField = styled(TextField)({
    backgroundColor: "white",
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #2b2e3a",
    },
  });

  const currencies = [
    {
      value: "IND +91",
      label: "IND +91",
    },
  ];

  const PropertyType = [
    {
      value: "Select Property type",
      label: "Select Property type",
    },
    {
      value: "Flat/Apartment",
      label: "Flat/Apartment",
    },

    {
      value: "Villa",
      label: "Villa",
    },

    {
      value: "Residential Land/plot",
      label: "Residential Land/plot",
    },
  ];

  const noFloor = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "< 10",
      label: "< 10",
    },
    {
      value: "10 - 25",
      label: "10 - 25",
    },
  ];

  const status = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "Furnished",
      label: "Furnished",
    },
    {
      value: "Semi-Furnished",
      label: "Semi-Furnished",
    },
    {
      value: "Unfurnished",
      label: "Unfurnished",
    },
  ];

  const units = [
    {
      value: "sq-ft",
      label: "sq-ft",
    },
    {
      value: "sq-m",
      label: "sq-m",
    },
  ];

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  // tabs
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const nextStep = () => {
    setActiveTab((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setActiveTab((prevStep) => prevStep - 1);
  };

  const [selectedValueArea, setSelectedValueArea] = useState("Select");

  const handleSelectArea = (event) => {
    setSelectedValueArea(event.target.textContent);
  };


  // start button 
  const [start,setStart] = useState(false); 



  // inputfield base on select 
  const [category, seCategory] = useState("");
  const [subType, setSubType] = useState([]);
  const [selectedSubType, setselectedSubType] = useState('');

  const handleCategoryChange = (event) => {
    seCategory(event.target.value);
  };
  const handleSubCategoryChange = (event) => {
    setselectedSubType(event.target.value);
  }; 

  useEffect(() => {
    if (category === "land") {
      setSubType(CategoryOptions); 
    }else if(category === "layout"){
      setSubType(LayOutOptions);
    }else if (category === "plot"){
      setSubType(plotOptions);
    }
  }, [category]);
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className={`row ${start === false ? "" : "d-none"}`} style={{ alignItems: "center" }}>
          <div className="col-lg-7 sale_content_hide">
            <h2>"Advertise Your Property Online and Reach More Buyers!"</h2>
            <ul className="sales_list">
              <li>Online Property Ads for a Faster Sale</li>
              <li>Post Your Property Ad Online and Attract Buyers!</li>
              <li>Sell Your Property Online – Easy and Fast!</li>
            </ul>
          </div>

          <div className="col-lg-5">
            <div className="card p-4">
              <h4>Let's get you started</h4>
              <div className="pt-4">
                <h6>You are:</h6>
                <div className="d-flex pt-2">
                  <button
                    className={`Sales_select_button ${
                      selectedButton === "Owner" ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick("Owner")}
                  >
                    Owner
                  </button>
                  <button
                    className={`Sales_select_button ${
                      selectedButton === "Agent" ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick("Agent")}
                  >
                    Agent
                  </button>
                  <button
                    className={`Sales_select_button ${
                      selectedButton === "Builder" ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick("Builder")}
                  >
                    Builder
                  </button>
                </div>
              </div>

              <div className="pt-4 w-100">
                <h6>Enter Your Name:</h6>
                <div className="pt-1">
                  <CustomTextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "-webkit-fill-available" }}
                  />
                </div>
              </div>

              <div className="pt-4">
                <h6>Your Contact Number:</h6>
                <div className="d-flex pt-2">
                  <CustomTextField
                    select
                    defaultValue="IND +91"
                    variant="standard"
                    style={{ width: "150px" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>

                  <CustomTextField
                    id="standard-basic"
                    className="ms-3"
                    style={{ width: "-webkit-fill-available" }}
                    variant="standard"
                  />
                </div>
              </div>

              <div className="pt-5" style={{ textAlign: "center" }}>
                <button className="sales_submit" onClick={()=>setStart(true)}>Start</button>
              </div>
            </div>
          </div>
        </div>

        {/* property details input forms  */}

      {start && (  <div className="container" style={{ marginTop: "60px" }}>
          <div className="row " style={{justifyContent:"space-between"}}>
            <h2>Sell Your Property</h2>
            <p>You can post your property for free</p>
            <div className="col-md-3 ps-0">

              <div className="row">
                <div className="col-4 col-md-12">
                <div className="nav-item1">
                  <a
                    className={`nav-link4 ${
                      activeTab === 1 ? "formactive" : ""
                    }`}
                    onClick={() => handleTabChange(1)}
                  >
                    Basic Details
                  </a>
                </div>

                </div>
                <div className="col-4 col-md-12">
                <div className="nav-item1">
                  <a
                    className={`nav-link4 ${
                      activeTab === 2 ? "formactive" : ""
                    }`}
                    onClick={() => handleTabChange(2)}
                    role="tab"
                  >
                    Property Details
                  </a>
                </div>
                </div>
                <div className="col-4 col-md-12">
                <div className="nav-item1">
                  <a
                    className={`nav-link4 ${
                      activeTab === 3 ? "formactive" : ""
                    }`}
                    onClick={() => handleTabChange(3)}
                  >
                    Documents
                  </a>
                </div>
                </div>
              </div> 
            </div>

            <div className="col-md-8">
              <div
                className={`tab-pane fade ${
                  activeTab === 1 ? "show active" : "d-none"
                }`}
              >
                <div className="row">
                  <div className="text-end  pb-5">
                    <label className="p-2" style={{ fontSize: "15px" }}>
                      Completed 0/10
                    </label>
                    <ProgressBar
                      completed={70}
                      height="15px"
                      labelSize="12px"
                      bgColor="#FFAE43"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Name"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Mobile"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Address"
                    />
                  </div>


                  <div className="col-md-6 mb-5">
                      <select
                            id="inputState"
                            className="form-select"
                            value={category}
                            onChange={handleCategoryChange}
                          >
                            <option value="">--Category--</option>
                            <option value="land">Land</option>
                            <option value="layout">Layout</option>
                            <option value="plot">Plot</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="house">Independent House </option>
                            <option value="buildingFloor">Builder Floor</option>
                            <option value="farmHoue">Farm House</option>
                            <option value="beachHouse">Beach House</option>
                            <option value="serviceDepartment">Serviced Apartment</option> 
                            <option value="commercialHouse">Commercial House</option> 
                            <option value="commercialComplex">Commercial Complex</option> 
                      </select>
                  </div>


                
                     {(category === "land" || category === "layout" || category === "plot") && (  
                      <div className="col-md-6 mb-5">
                          <select id="inputState" className="form-select" value={selectedSubType}
                            onChange={handleSubCategoryChange}> 
                            {subType.map((option) => ( 
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                       </div> 
                       )}


                    {(selectedSubType === "approved" || category === "plot") && (
                        <div className="col-md-6 mb-5"> 
                          <select id="inputState" className="form-select">
                            <option value="CMDA">CMDA</option>
                            <option value="DTCP">DTCP</option>
                            <option value="RERA">RERA</option>
                            <option value="Unapproved">Unapproved</option>
                          </select>
                          </div>
                          )}

                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">--State --</option>
                      <option value="Enable">TamilNadu</option>
                      <option value="Disable">Kerala</option>
                    </select>
                  </div>
              
                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">-- Select District --</option>
                      <option value="Enable">Chengalpattu</option>
                      <option value="Disable">Ariyalur</option>
                      <option value="Disable">Chennai</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">-- Select Taluk --</option>
                      <option value="Enable">Purasaiwalkam Taluk</option>
                      <option value="Disable">Tondiarpet Taluk</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">-- Select Village --</option>
                      <option value="Enable">Selvoyil</option>
                      <option value="Disable">Jambuli</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">-- Select Pincode --</option>
                      <option value="Enable">600005</option>
                      <option value="Disable">600007</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">-- Property Category --</option>
                      <option value="land">Land</option>
                      <option value="layout">Layout</option>
                      <option value="plot">Plot</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="house">Independent House </option>
                      <option value="buildingFloor">Builder Floor</option>
                      <option value="farmHoue">Farm House</option>
                      <option value="beachHouse">Beach House</option>
                      <option value="serviceDepartment">
                        Serviced Apartment
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-5">
                    <select id="inputState" className="form-select">
                      <option value="Enable">
                        -- Property Sub Category --
                      </option>
                      <option value="land">Agricultural Land</option>
                      <option value="layout">Barren Land</option>
                      <option value="plot">Farm Land</option>
                    </select>
                  </div>
                </div>

                <div style={{ float: "right" }}>
                  <a
                    href="javascript:void(0);"
                    className="btn_1 rounded full-width btn-next"
                    onClick={nextStep}
                  >
                    Next
                  </a>
                </div>
              </div>

              <div
                className={`tab-pane fade ${
                  activeTab === 2 ? "show active" : "d-none"
                }`}
              >
                <div className="row">
                  <div className="text-end  pb-5">
                    <label className="p-2" style={{ fontSize: "15px" }}>
                      Completed 0/8
                    </label>
                    <ProgressBar
                      completed={70}
                      height="15px"
                      labelSize="12px"
                      bgColor="#FFAE43"
                    />
                  </div>


                  {(category === "layout" || category === "apartment" || category === "villa" || category === "buildingFloor" || category === "serviceDepartment" || category === "commercialComplex") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Project Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>)}

                      {(category === "land" || category === "plot") && (   <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                          Land Size
                          </label>
                          <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>)}

                        

                        

                        {(category === "land" || category === "plot") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                          Total Four sides Measurement sq/m
                          </label>
                          <div className="row">
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="East"
                              />
                            </div>

                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="West"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="North"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="South"
                              />
                            </div>
                            <div className="col">
                            <div className="input-group">
                          
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                            </div>
                          </div>
                        </div>)}

                    
                        {category === "layout" && ( <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                             Total project area
                          </label>
                          <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>)}

                        {category === "layout" && ( <div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Total saleable area
                          </label>
                          <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>)}

                        {category === "layout" && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              Total no of plots
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}
                     

                          {category === "layout" && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total no of plots available for sale
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}
                         

                          


                          { (category === "apartment" || category === "villa" || category === "house" || category === "buildingFloor" || category === "farmHoue" || category === "beachHouse" || category === "serviceDepartment" || category === "commercialHouse" || category === "commercialComplex") && (  <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                              Property Status
                            </label>
                            <select id="inputState" className="form-select">
                              <option value="Enable">Completed</option>
                              <option value="Enable">Under Process</option>
                              <option value="Enable">Fully Furnished</option>
                              <option value="Enable">Semi Furnished</option>
                              <option value="Enable">Unfurnished</option>
                            </select>
                          </div>)}
                     

                       

                          { (category === "apartment" || category === "villa" || category === "house" || category === "buildingFloor" || category === "farmHoue" || category === "beachHouse" || category === "serviceDepartment" || category === "commercialHouse" || category === "commercialComplex") && (<div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                             Year Built
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                          />
                        </div>)}

                   
                        { (category === "apartment" || category === "villa" || category === "buildingFloor" || category === "serviceDepartment" || category === "commercialComplex") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total Project area
                            </label>
                            <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                          </div>)}
                    
                          { (category === "apartment" || category === "villa" || category === "buildingFloor" || category === "serviceDepartment" || category === "commercialComplex") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total No of units
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}

                          { (category === "apartment" || category === "villa" || category === "buildingFloor" || category === "serviceDepartment" || category === "commercialComplex") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total no of units available for sale
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}


                          { (category === "apartment" || category === "buildingFloor" || category === "serviceDepartment" || category === "commercialComplex") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Total Floors
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}

                          
                          {(category === "house" || category === "farmHoue" || category === "beachHouse" || category === "commercialHouse") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                             Plot Dimension 
                            </label>
                            <div className="row">
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="East"
                              />
                            </div>

                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="West"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="North"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="South"
                              />
                            </div>
                            <div className="col">
                            <div className="input-group">
                          
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                            </div>
                          </div>
                          </div>)}

                          { (category === "house" || category === "farmHoue" || category === "beachHouse" || category === "commercialHouse") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Road Frontage 
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}

                          {(category === "house" || category === "farmHoue" || category === "beachHouse" || category === "commercialHouse") && ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                            Plot area
                            </label>
                            <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                          </div>)}


                          {(category === "house" || category === "farmHoue" || category === "beachHouse" || category === "commercialHouse")&& ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              Built-up area
                            </label>
                            <div className="input-group">
                            <input type="text" className="form-control" />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedValueArea}
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end"
                              style={{ minWidth: "80px" }}
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Acre
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Cent
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                  onClick={handleSelectArea}
                                >
                                  Sqft
                                </a>
                              </li>
                            </ul>
                          </div>
                          </div>)}
                          
                          { (category === "house"  || category === "farmHoue" || category === "beachHouse" || category === "commercialHouse")&& ( <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                             No of floors
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>)}

                    
                         
                    

                          {(category === "villa" || category === "layout" || category === "serviceDepartment")&& (<div className="col-md-12 col-lg-6 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                           Brochure
                          </label>
                          <input
                            type="File"
                            className="form-control"
                            id="lastName"
                          />
                        </div>)}

                  {/* <div className="col-md-6 mb-5">
                    <label htmlFor="lastName" className="form-label label_size">
                      Property Size
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedValueArea}
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{ minWidth: "80px" }}
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={handleSelectArea}
                          >
                            Acre
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={handleSelectArea}
                          >
                            Cent
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={handleSelectArea}
                          >
                            Sqft
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6 mb-5">
                  <label htmlFor="lastName" className="form-label label_size">
                  Total Four sides Measurement sq/m
                          </label>
                          <div className="row">
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="East"
                              />
                            </div>

                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="West"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="North"
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="South"
                              />
                            </div>
                          </div>
                  </div>


                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Year Built"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Total Floors"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Total no of plots"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Total no of plots available for sale"
                    />
                  </div>

                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Total No of units"
                    />
                  </div>


                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Built-up Area"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="No.of.Bedrooms"
                    />
                  </div>
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="No.of Bathrooms"
                    />
                  </div>
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Door Facing"
                    />
                  </div>
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="Plot facing"
                    />
                  </div>
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="No.of.Balconies"
                    />
                  </div>
                  <div className="col-md-6 mb-5">
                    <input
                      type="email"
                      className="form-control1"
                      name="email"
                      id="email"
                      placeholder="No.of Parking"
                    />
                  </div>
              


                  <div className="col-md-6 mb-5"> 
                            <select id="inputState" className="form-select">
                              <option value="Enable">--Status--</option>
                              <option value="Enable">Completed</option>
                              <option value="Enable">Under Process</option>
                              <option value="Enable">Fully Furnished</option>
                              <option value="Enable">Semi Furnished</option>
                              <option value="Enable">Unfurnished</option>
                            </select>
                  </div> */}


                </div>
                <div style={{ float: "right" }}>
                  <a
                    href="javascript:void(0);"
                    className="btn_1 rounded full-width btn-next"
                    onClick={nextStep}
                  >
                    Next
                  </a>
                </div>
              </div>


              <div
                className={`tab-pane fade ${
                  activeTab === 3 ? "show active" : "d-none"
                }`}
              >
              <div className="row">
                  <div className="text-end  pb-5">
                    <label className="p-2" style={{ fontSize: "15px" }}>
                      Completed 0/8
                    </label>
                    <ProgressBar
                      completed={70}
                      height="15px"
                      labelSize="12px"
                      bgColor="#FFAE43"
                    />
                  </div>

                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">DTCP Approval Copy </label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">RERA Approval Copy </label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">Layout Copy</label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">Property Documents</label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">Property Parent Documents</label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                  <div className="col-md-12 mb-5">
                      <div className="row">
                              <div className="col-4">
                                <label className="label_size">Property PATTA </label>
                              </div>
                              <div className="col-7">
                                <input type="file" className="form-control" /> 
                              </div>
                              <div className="col-auto"></div>
                      </div>
                  </div>  
                 
            



             </div>


                <div style={{ float: "right" }}>
                  <a
                    href="javascript:void(0);"
                    className="btn_1 rounded full-width btn-next" 
                  >
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
       )}
       
        {/* Property Details */}
        {/* <hr className="mt-5" /> */}
        {/* <div className="pt-3">
          <h5>Property Details</h5>

          <div className="mt-4">
            <div className="input_head">
              <label className="form-label">Property Type</label>
            </div>

            <CustomTextField
              id="standard-select-currency"
              select
              defaultValue="Select Property type"
              variant="standard"
              className="mt-"
            >
              {PropertyType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
        </div> */}

        {/* <div className="pt-5">
          <h5>Property Location</h5>

          <div className="row">
            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="City"
                variant="standard"
                className="dash_input"
              />
            </div>

            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="Locality"
                variant="standard"
                className="dash_input"
              />
            </div>
          </div>
        </div> */}

        {/* dynamic Change base on property Type  */}

        {/* <div className="pt-5">
          <h5>Property Features</h5>

          <div className="mt-4">
            <div className="input_head">
              <label className="form-label">
                Total No. of Flats in Your Society
              </label>
            </div>

            <CustomTextField
              id="standard-select-currency"
              select
              defaultValue="Select"
              variant="standard"
            >
              {noFloor.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="No.of Bedrooms"
                variant="standard"
                className="dash_input"
              />
            </div>

            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="No.of Balconies"
                variant="standard"
                className="dash_input"
              />
            </div>

            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="Floor No."
                variant="standard"
                className="dash_input mt-3"
              />
            </div>

            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="Total Floors"
                variant="standard"
                className="dash_input mt-3"
              />
            </div>

            <div className="col-md-6">
              <div className="mt-4">
                <div className="input_head">
                  <label className="form-label">Furnished Status</label>
                </div>

                <CustomTextField
                  id="standard-select-currency"
                  select
                  defaultValue="Select"
                  variant="standard"
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </div>
            </div>

            <div className="col-md-6">
              <CustomTextField
                id="standard-basic"
                label="Bathrooms"
                variant="standard"
                className="dash_input mt-3"
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h5>Area</h5>

          <div className="row">
            <div className="col-sm-6">
              <div className="mt-4">
                <div className="input_head">
                  <label className="form-label">Carpet Area</label>
                </div>

                <div className="d-flex">
                  <CustomTextField id="standard-basic" variant="standard" />
                  <CustomTextField
                    select
                    defaultValue="sq-ft"
                    variant="standard"
                    style={{ width: "100px" }}
                  >
                    {units.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mt-4">
                <div className="input_head">
                  <label className="form-label">Super Area</label>
                </div>

                <div className="d-flex">
                  <CustomTextField id="standard-basic" variant="standard" />
                  <CustomTextField
                    select
                    defaultValue="sq-ft"
                    variant="standard"
                    style={{ width: "100px" }}
                  >
                    {units.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h5>Property Availability</h5>

          <div className="row">
            <div className="col-sm-6">
              <div className="mt-3">
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    className="text-dark"
                  >
                    Possession Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="construction"
                      control={<Radio style={{ color: "#2b2e3a" }} />}
                      label="Under Construction"
                    />
                    <FormControlLabel
                      value="move"
                      control={<Radio style={{ color: "#2b2e3a" }} />}
                      label="Ready to Move"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h5>Price Details</h5>

          <div className="row mt-3">
            <div className="col-md-6">
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  Expected Price
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  className="mt-4"
                  startAdornment={
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div className="col-md-6">
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  Booking Amount
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  className="mt-4"
                  startAdornment={
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked style={{ color: "#2b2e3a" }} />}
              label="I am posting this property exclusively on Boolok"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked style={{ color: "#2b2e3a" }} />}
              label="I agree to Boolok T&C, Privacy Policy, & Cookie Policy"
            />
          </FormGroup>
        </div>
        <div className="mt-3">
          <button className="btn_login_sale">Post</button>
        </div> */}
      </div>
    </>
  );
}

export default PropertySale;
