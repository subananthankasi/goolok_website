import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import MapIcon from "@mui/icons-material/Map";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import MapViewlist from "../gridview/Mapviewlist";
import Dropdown from "react-bootstrap/Dropdown";
import SearchLocation from "../gridview/SearchLocation";
import MapListingResultsSummary from "../gridview/MapListingResults";
import FilterMobileView from "../gridview/FilterMobileView";
import MapView from "./mapview";
import API_BASE_URL from "../../Api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PropertyMap() {
  const [landData, setLandData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { sortedProducts } = location.state || {};
  const queryParams = new URLSearchParams(location.search);

  const level = queryParams.get("level");
  const prStart = queryParams.get("pr-start");
  const prEnd = queryParams.get("pr-end");
  const PrRoot = queryParams.get("pr-root");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/properties`, {
          // headers: { 'Pr-Root': 'Land' },
          headers: {
            Level: level,
            "Pr-Start": prStart,
            "Pr-End": prEnd,
            ...(PrRoot && { "Pr-Root": PrRoot }),
          },
        });
        setLandData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching land data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

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
