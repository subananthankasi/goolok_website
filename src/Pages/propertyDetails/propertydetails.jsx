import React, { useEffect, useState } from "react"; 
import Gallery from "./gallery";
import Features from "./features";
import Description from "./description";
import Table from "./table"; 
import ad from "../../assets/images/smallad.jpg";
import Location from "./location";
import Mapdetails from "./mapdetails"; 
import StreetView from "./StreetView"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import Skeleton from 'react-loading-skeleton';  
import NotFound from "../NotFound";


function Propertydetails() {

  const { slug, id } = useParams();
  const decodedString = decodeURIComponent(id);

  const [basicData,setBasicData] = useState([])
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(false);


  useEffect(()=>{
    const fetchData = async (id) => { 
      try {
          const response = await axios.get(`${API_BASE_URL}/webland/${decodedString}`);
          setBasicData(response.data[0])
      } catch (error) {
           setError(true);
      }finally{
        setLoading(false)
      }
    }
    fetchData(decodedString)
  },[decodedString])
 
  return (
    <>
    {!error ? (
    <div style={{ backgroundColor: "#f5f7fb" }}> 
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12 ps-0 pe-0"> 
                  <div className="bg-white">
                    <Gallery data={basicData} loading={loading}/>
                  </div>
                  </div>
                  <div className="col-md-12"> 
                  <div className="bg-white mt-4">
                    <Features data={basicData} loading={loading}/>
                  </div>
                  <div className="bg-white mt-4">
                    <Description data={basicData} loading={loading}/>
                  </div>
                  <div className="bg-white mt-4 mapdetails_hidden">
                    <div className="blog-info detail" style={{padding:"0px 0px"}}>
                  <p class="productdetails_heading mb-4 ps-3 pt-3">Near by locations</p>
                    <Mapdetails data={basicData} loading={loading}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="bg-white table_hide">
                <Table />
              </div>
              {/* <div className="bg-white mt-4">
                <RecentProperties />
              </div> */}
              {/* <div className="bg-white mt-4">
                <PropertyFeatures />
              </div> */}
              <div className="mt-4 ad-img">
                <img src={ad} />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 blog-posts">
              <Location data={basicData} loading={loading}/>
            </div>
            <div className="col-lg-4 col-md-12 car custom-map-details">
              <Mapdetails data={basicData} loading={loading}/>
            </div>
          </div>
          <StreetView data={basicData} loading={loading}/>
        </div>
      </section> 
    </div>):(
      <NotFound/>
    )}
    </>
  );
}

export default Propertydetails;
