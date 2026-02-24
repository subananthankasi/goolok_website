import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchLocation from "../gridview/SearchLocation";
import MapView from "./mapview";
import API_BASE_URL from "../../Api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PropertyMap() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { sortedProducts } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");
  const prStart = queryParams.get("pr-start");
  const prEnd = queryParams.get("pr-end");
  const PrRoot = queryParams.get("pr-root");

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          Level: level,
          "Pr-Start": prStart,
          "Pr-End": prEnd,
          ...(PrRoot && { "Pr-Root": PrRoot }),
        },
      });
    } catch (error) {
      console.error("Error fetching land data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [level, prStart, prEnd, PrRoot]);


  return (
    <div className="container-xl">
      <Row>
        <Col md={6} className={`ps-0 pe-0 p-0 `}>
          {/* <SearchLocation propertyData = {landData}/> */}
          <SearchLocation propertyData={sortedProducts} />
        </Col>

        <Col md={6} className="p-0">
          {/* <MapView  propertyData = {landData} loading = {loading} prRoot = {PrRoot} /> */}
          <MapView
            propertyData={sortedProducts}
            loading={loading}
            prRoot={PrRoot}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PropertyMap;
