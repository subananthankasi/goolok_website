import Col from "react-bootstrap/Col"; 
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab"; 
import MapIcon from "@mui/icons-material/Map";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import MapViewlist from "./Mapviewlist"; 
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import GridViewlist from "./GridViewlist";
import SearchLocation from "./SearchLocation";
import ListView from "./ListView";
import FilterMobileViews from "./FilterMobileView"; 
import FilterSidebar from "./filterSidebar";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import MapListingResultsSummary from "./MapListingResults";


function VerticalTab() {
  const [selectedView, setSelectedView] = useState("Map");
  const [map, setMap] = useState(true);
  const [filter, setFilter] = useState(false);
  
  const handleSelect = (eventKey) => {
    switch (eventKey) {
      case "map":
        setSelectedView("Map");
        setMap(true);
        setFilter(false);
        break;
      case "grid":
        setSelectedView("Grid");
        setMap(false);
        setFilter(true);
        break;
      case "list":
        setSelectedView("List");
        setMap(false);
        setFilter(true);
        break;
      default:
        setSelectedView("Select View");
    }
  };

  const [landData, setLandData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/webland`, {
          headers: { 'Pr-Root': 'Land' },
        });
        setLandData(response.data);
      } catch (error) {
        console.error('Error fetching land data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="map">

      <div className={`${map ? "" : ""}`}>
        <Row>
          <Col md={6} className={`ps-0 pe-0 ${map ? "" : "d-none"}`}>
            <SearchLocation propertyData={landData} />
          </Col>

          <Col md={`${map ? "6" : "12"}`} className="p-0" >  
          <MapListingResultsSummary />
          <div className="container">
            <Row>
              <Col xs={4} className={`${map ? "" : "topfilterAndView"}`}>
                <div className="text-start">
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#d0d0d0",
                        color: "black",
                        height: "40px",
                        width: "100%",
                      }}
                    >
                      {selectedView}
                    </Dropdown.Toggle>  

                    <Dropdown.Menu className="full-width-dropdown-menu">
                      <Dropdown.Item eventKey="map">
                        <MapIcon /> Map
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="grid">
                        <GridViewSharpIcon /> Grid
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="list">
                        <ViewListSharpIcon /> List
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>

              <Col xs={8} className="filter ps-0">
                <div className={`${map ? "" : "responsive_filter"}`}>
                  <FilterMobileViews viewTypeMap={map} />
                </div>
              </Col>
            </Row>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="map">
                <MapViewlist propertyData={landData} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="grid">
                <GridViewlist propertyData={landData} />
              </Tab.Pane>
              <Tab.Pane eventKey="list">
                <ListView propertyData={landData} />  
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  );
}

export default VerticalTab;


  