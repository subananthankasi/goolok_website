import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { RangeSlider } from "rsuite";
import { TagGroup, Tag } from "rsuite";
import { useDispatch } from "react-redux";
import { buyPropertiesThunk } from "../../Redux/Action/BuyPropertiesThunk";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { encryptData } from "../../Utils/encryptData";
import { Dialog } from "@mui/material";
import { Drawer } from "antd";

const FilterOfProducts = ({
  landType,
  mobileFilter = false,
  setMobileFilter,
}) => {
  const searchRef = useRef(null);
  const LIBRARIES = ["places", "geometry"];
  const loaderOptions = {
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  };
  const { isLoaded } = useJsApiLoader(loaderOptions);

  const styles = {
    width: 300,
    marginBottom: 10,
  };
  // const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [fillData, setFillData] = useState([]);
  const [selectRoadWidth, setSelectRoadWidth] = useState([]);
  const [selectAprovalType, setSelectAprovalType] = useState([]);

  const [amenitiesData, setAmenitiesData] = useState([]);
  const fetchAmenities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/amenities`);
      setAmenitiesData(response.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleRoadWidthSelect = (width) => {
    setSelectRoadWidth((prev) =>
      prev.includes(width)
        ? prev.filter((item) => item !== width)
        : [...prev, width]
    );
  };
  const handleAprovalSelect = (width) => {
    setSelectAprovalType((prev) =>
      prev.includes(width)
        ? prev.filter((item) => item !== width)
        : [...prev, width]
    );
  };

  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem("priceRange")) || [0, 0]
  );

  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(sessionStorage.getItem("selectedFilters")) || []
  );
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subproperty`, {
          headers: {
            "Pr-Root": landType,
          },
        });
        setFillData(response.data || []);
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };
    fetch();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  useEffect(() => {
    sessionStorage.setItem("priceRange", JSON.stringify(value));
  }, [value]);

  const [openTypes, setOpenTypes] = useState({});

  const toggleType = (type) => {
    setOpenTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const [locationTags, setLocationTags] = useState([]);
  const [locationInputValue, setLocationInputValue] = useState("");
  const [amenitiesTags, setAmenitiesTags] = useState([]);
  const [amenitiesValue, setAmenitiesValue] = useState("");
  const [SqftMinAmount, setSqftMinAmount] = useState("");
  const [SqftMaxAmount, setSqftMaxAmount] = useState("");

  const removeLocationTag = (tag) => {
    setLocationTags(locationTags.filter((item) => item !== tag));
  };

  const addLocationTag = () => {
    const fullValue = locationInputValue.trim();
    if (!fullValue) return;

    let placeName = fullValue;

    if (searchRef.current) {
      const places = searchRef.current.getPlaces();
      if (places?.length > 0) {
        const place = places[0];
        placeName = place.name || fullValue;
      }
    }

    if (placeName && !locationTags.includes(placeName)) {
      setLocationTags((prev) => [...prev, placeName]);
    }

    setLocationInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLocationTag();
    }
  };

  const removeAmenitiesTag = (tag) => {
    setAmenitiesTags(amenitiesTags.filter((item) => item !== tag));
  };

  const addAmenitiesTag = (value) => {
    if (value && !amenitiesTags.includes(value)) {
      setAmenitiesTags([...amenitiesTags, value]);
    }
    setAmenitiesValue(value);
  };
  const getAmenityName = (id) => {
    const found = amenitiesData?.find((item) => item.id === id);
    return found ? found.amenities : id;
  };

  const [range, setRange] = useState([1, 1000000000]);

  const handleSliderChange = (value) => {
    setRange([...value]);
  };
  const dispatch = useDispatch();
  const payload = useMemo(
    () => ({
      location: locationTags,
      from: SqftMinAmount,
      to: SqftMaxAmount,
      roadwidth: selectRoadWidth,
      aprovaltype: selectAprovalType,
      amenities: amenitiesTags,
      start: range[0],
      end: range[1],
    }),
    [
      locationTags,
      SqftMinAmount,
      SqftMaxAmount,
      selectRoadWidth,
      selectAprovalType,
      range,
      amenitiesTags,
    ]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    setFilterLoading(true);
    const encryptLocation = encryptData(locationTags);
    sessionStorage.setItem("location", encryptLocation);
    dispatch(
      buyPropertiesThunk({
        selectedFilters,
        range,
        landType,
        payload,
      })
    );
    setMobileFilter(false);
  };

  const clearFilter = async () => {
    setSelectedFilters([]);
    setLocationTags([]);
    setSelectAprovalType([]);
    setSelectRoadWidth([]);
    setLocationInputValue("");
    setAmenitiesTags([]);
    setAmenitiesValue("");
    setSqftMinAmount("");
    setSqftMaxAmount("");
    setRange([1, 500000000]);
    sessionStorage.removeItem("selectedFilters");
    sessionStorage.removeItem("location");
    dispatch(buyPropertiesThunk());
  };
  const formatIndianNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";
    const num = Number(String(value).replace(/,/g, ""));
    return isNaN(num) ? "" : num.toLocaleString("en-IN");
  };

  const parseNumber = (value) => {
    if (!value) return 0;
    return (
      Number(
        String(value)
          .replace(/,/g, "")
          .replace(/[^0-9]/g, "")
      ) || 0
    );
  };

  const handleRangeMinChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    const min = parseNumber(input);
    const [, prevMax] = range.map((v) => parseNumber(v));

    if (!isNaN(min)) {
      const newMin = prevMax ? Math.min(min, prevMax) : min;
      setRange([newMin.toString(), range[1]]);
    }
  };

  const handleRangeMaxChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    const max = parseNumber(input);
    const [prevMin] = range.map((v) => parseNumber(v));

    if (!isNaN(max)) {
      const newMax = prevMin ? Math.max(prevMin, max) : max;
      setRange([range[0], newMax.toString()]);
    }
  };

  const handlePlaceChanged = () => {
    const places = searchRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    setLocationInputValue(place.formatted_address || place.name);
  };
  const renderFilterSidebar = () => (
    <div
      className="sidebar"
      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h4> Refine Your Search</h4>
        <AutorenewIcon
          sx={{ fontSize: 25, cursor: "pointer", color: "#0000ff" }}
          onClick={() => clearFilter()}
        />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="filter-section" style={{ padding: "10px" }}>
          {isCategoryOpen && (
            <div className="">
              <div className="">
                {Object.entries(
                  fillData.reduce((acc, item) => {
                    if (!acc[item.property_type]) acc[item.property_type] = [];
                    acc[item.property_type].push(item);
                    return acc;
                  }, {})
                ).map(([propertyType, items]) => (
                  <div
                    key={propertyType}
                    className="mb-2 pb-2"
                    style={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleType(propertyType)}
                    >
                      <h6
                        className="fw-bold text-capitalize  mb-0"
                        style={{ fontSize: "14px" }}
                      >
                        {propertyType}
                      </h6>
                      <FontAwesomeIcon
                        icon={openTypes[propertyType] ? faMinus : faPlus}
                      />
                    </div>

                    {openTypes[propertyType] && (
                      <div
                        className="mt-2 p-2"
                        // style={{
                        //   backgroundColor: "rgb(237 237 237)",
                        // }}
                      >
                        {items.map((item) => (
                          <div key={item.id} className="form-check mb-1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`checkbox-${item.id}`}
                              value={item.id}
                              checked={selectedFilters.includes(
                                item.id.toString()
                              )}
                              onChange={handleCheckboxChange}
                              style={{
                                border: "1px solid #0000ff",
                                cursor: "pointer",
                              }}
                            />
                            <label
                              className="form-check-label ms-1"
                              htmlFor={`checkbox-${item.id}`}
                              style={{ fontSize: "13px",fontFamily:"poppins" }}
                            >
                              {item.subproperty}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="bg-white p-2"
          style={{ borderBottom: "1px solid #dddddd", borderRadius: "5px" }}
        >
          {isLoaded && (
            // <StandaloneSearchBox
            //   onLoad={(ref) => (searchRef.current = ref)}
            //   onPlacesChanged={handlePlaceChanged}
            // >
            //   <InputGroup size="xs">
            //     <Input
            //       placeholder="Enter a locality"
            //       value={locationInputValue}
            //       onChange={(value) => setLocationInputValue(value)}
            //       onKeyDown={(e) => {
            //         if (e.key === "Enter") {
            //           e.preventDefault();
            //           addLocationTag();

            //         }
            //       }}
            //     />
            //     <InputGroup.Addon
            //       style={{
            //         backgroundColor: "black",
            //         color: "white",
            //         cursor: "pointer",
            //       }}
            //       onClick={addLocationTag}
            //     >
            //       <SearchIcon style={{ fontSize: "18px", fontWeight: "800" }} />
            //     </InputGroup.Addon>
            //   </InputGroup>
            // </StandaloneSearchBox>
            <StandaloneSearchBox
              onLoad={(ref) => (searchRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <IconField iconPosition="right">
                <InputIcon
                  className="pi pi-search"
                  style={{ paddingRight: "16px", cursor: "pointer" }}
                  onClick={addLocationTag}
                />
                <InputText
                  value={locationInputValue}
                  onChange={(e) => setLocationInputValue(e.target.value)}
                  placeholder="Enter locality"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addLocationTag();
                    }
                  }}
                  className="filter-search-bar"
                />
              </IconField>
            </StandaloneSearchBox>
          )}

          {locationTags?.length > 0 && (
            <TagGroup
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                padding: "3px",
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {locationTags.map((item, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => removeLocationTag(item)}
                >
                  {item}
                </Tag>
              ))}
            </TagGroup>
          )}
        </div>

        <div
          className="bg-white p-2 mt-2"
          style={{ borderBottom: "1px solid #dddddd" }}
        >
          <p style={{ fontSize: "13px" }}>
            <b> Per Sq.ft Price </b>
          </p>
          <div className="d-flex gap-3 mt-2">
            <div className="d-flex align-items-center gap-1">
              <input
                type="text"
                className="form-control"
                placeholder="Min amount"
                style={{ fontSize: "", height: "25px" }}
                value={SqftMinAmount}
                onChange={(e) => setSqftMinAmount(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center gap-1">
              <input
                type="text"
                className="form-control"
                placeholder="Max amount"
                style={{ fontSize: "", height: "25px" }}
                value={SqftMaxAmount}
                onChange={(e) => setSqftMaxAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-white p-2 mt-2"
          style={{ borderBottom: "1px solid #dddddd" }}
        >
          <p style={{ fontSize: "13px" }}>
            <b>Budget Range </b>
          </p>
          <div className="mt-3">
            <RangeSlider
              value={range}
              onChange={handleSliderChange}
              min={1}
              max={500000000}
              tooltip
            />
          </div>
          <div className="d-flex gap-3 mt-3">
            <div className="d-flex align-items-center gap-1">
              <input
                type="text"
                className="form-control"
                placeholder="Min amount"
                style={{ fontSize: "11px", height: "25px" }}
                value={formatIndianNumber(range[0])}
                onChange={handleRangeMinChange}
              />
            </div>
            <div className="d-flex align-items-center">to</div>
            <div className="d-flex align-items-center gap-1">
              <input
                type="text"
                className="form-control"
                placeholder="Max amount"
                style={{ fontSize: "11px", height: "25px" }}
                value={formatIndianNumber(range[1])}
                onChange={handleRangeMaxChange}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-white p-2 mt-2"
          style={{ borderBottom: "1px solid #dddddd" }}
        >
          <p style={{ fontSize: "13px" }}>
            <b>Road Width</b>
          </p>
          <div
            className="d-flex flex-wrap justify-content-center gap-2 mt-3"
            style={{ wordBreak: "keep-all" }}
          >
            {["20ft", "30ft", "40ft", "60ft", "80ft", "100ft"].map(
              (width, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #0000ff",
                    borderRadius: "50px / 50px",
                    fontSize: "11px",
                    padding: "3px 10px",
                    minWidth: "45px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: selectRoadWidth.includes(width)
                      ? "#0000ff"
                      : "#fff",
                    fontWeight: "600",
                    color: selectRoadWidth.includes(width) ? "#fff" : "#0000ff",
                  }}
                  onClick={() => handleRoadWidthSelect(width)}
                >
                  {width}
                </div>
              )
            )}
          </div>
        </div>
        <div
          className="bg-white p-2 mt-2"
          style={{
            overflow: "hidden",
            borderBottom: "1px solid #dddddd",
          }}
        >
          <p style={{ fontSize: "13px" }}>
            <b>Approval Type</b>
          </p>
          <div
            className="d-flex flex-wrap justify-content-center gap-2 mt-3"
            style={{ wordBreak: "keep-all" }}
          >
            {["DTCP", "CMDA"].map((type, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #0000ff",
                  borderRadius: "50px / 50px",
                  fontSize: "11px",
                  padding: "3px 10px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  cursor: "pointer",
                  fontWeight: "600",
                  backgroundColor: selectAprovalType.includes(type)
                    ? "#0000ff"
                    : "#fff",
                  color: selectAprovalType.includes(type) ? "#fff" : "#0000ff",
                }}
                onClick={() => handleAprovalSelect(type)}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
        <div
          className="bg-white p-2 mt-2"
          style={{
            overflow: "hidden",
            borderBottom: "1px solid #dddddd",
          }}
        >
          <p style={{ fontSize: "13px" }}>
            <b>Amenities</b>
          </p>

          <select
            className="form-select mt-2"
            style={{ width: "100%", height: "30px", fontSize: "12px" }}
            value={amenitiesValue}
            onChange={(e) => {
              const selectedValue = e.target.value;
              addAmenitiesTag(selectedValue);
            }}
          >
            <option value="">Select Amenities</option>
            {amenitiesData?.map((item) => (
              <option value={item.id}>{item.amenities} </option>
            ))}
          </select>
          {amenitiesTags.length > 0 && (
            <TagGroup
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                padding: "3px",
                marginTop: "10px",
                marginLeft: "1px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {amenitiesTags.map((id, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => removeAmenitiesTag(id)}
                >
                  {getAmenityName(id)}
                </Tag>
              ))}
            </TagGroup>
          )}
        </div>

        <div className="mt-3">
          <button
            className=" w-100"
            type="submit"
            style={{
              backgroundColor: "#0000ff",
              padding: "10px 10px",
              color: "white",
              borderRadius: "3px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div className="d-none d-lg-block">{renderFilterSidebar()}</div>
      <Drawer
        destroyOnHidden
        placement="right"
        open={mobileFilter}
        onClose={() => setMobileFilter(false)}
        closable={true}
        style={{ zIndex: "450" }}
        size="small"
      >
        {mobileFilter && (
          <div className="d-lg-none">{renderFilterSidebar()}</div>
        )}
      </Drawer>
    </>
  );
};

export default FilterOfProducts;
