import { useEffect, useState } from "react";
import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";


const HighreturnProperties = ({ loading }) => {
  const [getData, setGetData] = useState([]);
  const fetchHighReturnProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/highreturn`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };
  useEffect(() => {
    fetchHighReturnProperties();
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const productTemplate = (item) => {
    return (
      <div className="premiumPropertyCard">
        <Link to="/properties" state={{ title: item.property_name }}>
          <div className="premiumPropertyImgBox">
            <img
              src={`${IMG_PATH}cms/highreturn/${item.image}`}
              alt={item.alt}
              className="premiumPropertyImg"
            />
            {/* Offer on top-right */}
            {item.offer && <span className="premiumPropertyOffer">{item.offer}</span>}

            {/* Property name on bottom of image */}
            <div className="premiumPropertyNameOnImage">
              {item.property_name}
            </div>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <section className="section_container">
      <div className="container-xl hightreturn_property_container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Skeleton height="2rem" width="400px" className="mb-3" />
          </div>
        ) : (
          <div className="section-head ">
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                letterSpacing: "1px",
              }}
            >
              Best Investment Properties
            </h3>
          </div>
        )}

        {
          loading ? (
            <div className="row">
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
              <div className="col-3">
                <Skeleton height={320} width="100%" />
              </div>
            </div>
          ) : (
            <div className="mt-2 highreturn_property">
              <Carousel
                value={getData}
                numVisible={4}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                circular
              />
            </div>
          )
        }
      </div>
    </section>
  );
};

export default HighreturnProperties;
