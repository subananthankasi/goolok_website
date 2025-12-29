import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../../Api/api';
import Slider from '@mui/material/Slider';

const SidebarFilter = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subproperty`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching land data:', error);
      } finally {
        // setLoading(false); 
      }
    };
    fetch();
  }, []);

  const [value, setValue] = useState([100, 100000]);

  const [selectedFilters, setSelectedFilters] = useState([]);


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          'Level': selectedFilters.join(","),
          "Pr-Start": parseInt(value?.[0], 10),
          "Pr-End": parseInt(value?.[1], 10)
        },
      });
    } catch (error) {
      console.error('Error fetching land data:', error);
    }
  };


  return (
    <div className="sidebar">
      <h4>Find Your Property</h4>
      <form action="" onSubmit={handleSubmit}>
        <div className="filter-section">
          <div
            className="filter-header"
            onClick={() => setCategoryOpen(!isCategoryOpen)}
          >
            <h5>Property Type</h5>
            <FontAwesomeIcon icon={isCategoryOpen ? faMinus : faPlus} />
          </div>
          {isCategoryOpen && (
            <div className=" mt-4">
              <div className="form-check">
                {products?.map((item) => {

                  return (
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id={`checkbox-${item.id}`}
                        value={item.id}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheckbox1"
                      >
                        {item.subproperty}
                      </label>
                    </div>
                  )
                })}

              </div>

            </div>
          )}
        </div>


        <div className="filter-section">
          <div
            className="filter-header"
            onClick={() => setPriceOpen(!isPriceOpen)}
          >
            <h5>Price</h5>
            <FontAwesomeIcon icon={isPriceOpen ? faMinus : faPlus} />
          </div>
          {isPriceOpen &&
            <div>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                valueLabelDisplay="auto"
                min={100}
                max={100000}
                step={100}
              />
            </div>
          }
        </div>
        <div className=" no-pds">
          <div className="at-col-default-mar">
            <button
              className="btn-default hvr-bounce-to-right w-100"
              type="submit"
            >
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SidebarFilter;
