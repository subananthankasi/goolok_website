import React, { useState } from "react";

const PropertybuttonCard = ({ item }) => {
  const conversionRates = {
    sqft: 1,
    cent: 435.6,
    acre: 43560,
    ground: 2400,
    meter: 10.7639,
  };

  const defaultUnit = (item.land_units || "sqft").toLowerCase();
  const [unit, setUnit] = useState(defaultUnit);


  const baseSqft = item.land_extent_total * conversionRates[defaultUnit];


  const convertedArea =
    unit === defaultUnit
      ? item.land_extent_total
      : baseSqft / conversionRates[unit];

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit.toLowerCase());
  };

  return (
    <div>
      <strong>
        {Number.isInteger(convertedArea)
          ? convertedArea
          : convertedArea.toFixed(2)}
        <span
          role="button"
          data-bs-toggle="dropdown"
          className="dropdown-toggle text-primary ms-2"
        >
          {unit}
        </span>
        <ul className="dropdown-menu">
          {Object.keys(conversionRates).map((u) => (
            <li key={u}>
              <button
                className="dropdown-item"
                onClick={() => handleUnitChange(u)}
              >
                {u.charAt(0).toUpperCase() + u.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </strong>
    </div>
  );
};

export default PropertybuttonCard;
