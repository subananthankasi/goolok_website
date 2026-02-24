import { useCallback, useEffect, useState } from "react";
import MyGallery from "./propertygallery";
import Propertyaddress from "./propertyaddress";
import Propertybutton from "./propertybutton";
import Propertyagent from "./propertyagent";
import Propertylocation from "./propertylocation";
import PropertyStreetView from "./proprtystreetview";
import PropertyComparison from "./propertyomparison";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import SimilarProperties from "./SimilarProperties";
import { Skeleton } from "primereact/skeleton";
import { Breadcrumb } from "antd";
import '../propertyDetails/propertydetailscss.css';


function Propertyview() {

  const token = localStorage.getItem("zxcvbnm@#");
  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eid, landType } = useParams();
  const fetch = useCallback(
    async (eid) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/properties/${eid}`, {
          headers: { "Gl-Type": landType },
        });
        SetProducts(response?.data || []);
      } catch (error) {
        console.error("Error fetching land data:", error);
      } finally {
        setLoading(false);
      }
    },
    [landType]
  );

  useEffect(() => {
    fetch(eid);
  }, [eid, fetch]);


  const [giftData, setGiftData] = useState([]);
  const fetchGift = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vendor/gifts/${eid}`);
      setGiftData(response?.data || []);
    } catch (error) {
      console.error("Error", error);
    }
  }, [eid]);


  useEffect(() => {
    if (token) {
      fetchGift();
    }
  }, [token, fetchGift]);


  return (
    <div>
      <section className="mt-3">
        <div className="container">
          {loading ? (
            <Skeleton height="1rem" width="25%" className="mb-3 " />
          ) : (
            <div className="mb-3">
              <Breadcrumb
                style={{ fontFamily: "poppins" }}
                items={[
                  { title: <Link to="/">Home</Link> },
                  { title: <Link to="/properties">Buy property</Link> },
                  { title: products[0]?.propertyName },
                ]}
              /> </div>
          )}

          <div className="row align-items-start">
            <div className="col-lg-8 col-md-12">
              <MyGallery property={products} loading={loading} />
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="bg-white">
                <Propertybutton
                  property={products}
                  eid={eid}
                  loading={loading}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-start">
            <div className=" col-lg-9 col-md-12 blog-posts">
              <Propertyaddress property={products} loading={loading} />
            </div>
            <div className="col-lg-3 col-md-12 car ">
              <Propertyagent property={products} giftData={giftData} loading={loading} />
            </div>
          </div>
        </div>
      </section>

      {products?.[0]?.strategyName && (
        <section className="bg-white mt-2 pb-4">
          <div className="container">
            <div className="row">
              <div className=" col-md-12 blog-posts">
                <PropertyComparison property={products} loading={loading} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 blog-posts">
              <Propertylocation property={products} loading={loading} />
            </div>
            <div className="col-md-12 blog-posts">
              <PropertyStreetView property={products} loading={loading} />
            </div>
          </div>
        </div>
      </section>
      {/* <Propertyplot /> */}
      <SimilarProperties property={products} loading={loading} />
    </div>
  );
}

export default Propertyview;
