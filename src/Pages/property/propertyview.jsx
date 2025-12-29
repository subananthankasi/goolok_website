import React, { useEffect, useState } from "react";
import Gallery from "../propertyDetails/gallery";
import Description from "../propertyDetails/description";
import Table from "../propertyDetails/table";
import RecentProperties from "../propertyDetails/recentProperties";
import Location from "../propertyDetails/location";
import Mapdetails from "../propertyDetails/mapdetails";
import ad from "../../assets/images/smallad.jpg";
import StreetView from "../propertyDetails/StreetView";
import MyGallery from "./propertygallery";
import Propertyaddress from "./propertyaddress";
import Propertybutton from "./propertybutton";
import Propertyagent from "./propertyagent";
import Propertylocation from "./propertylocation";
import PropertyStreetView from "./proprtystreetview";
import Propertyplot from "./propertyplot";
import PropertyComparison from "./propertyomparison";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import SimilarProperties from "./SimilarProperties";
import { Breadcrumb } from "antd";
import { Skeleton } from "primereact/skeleton";
function Propertyview() {
  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eid, landType } = useParams();
  const fetch = async (eid) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/properties/${eid}`, {
        headers: { "Gl-Type": landType },
      });
      SetProducts(response?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetch(eid);
  }, [eid]);
  const [giftData, setGiftData] = useState([]);
  const fetchGift = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/gifts/${eid}`);
      setGiftData(response?.data || []);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchGift();
  }, []);



  return (
    <div>
      <section className="mt-3">
        <div className="container">
          {loading ?(
              <Skeleton height="1rem" width="25%" className="mb-3 " />
          ): (
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
