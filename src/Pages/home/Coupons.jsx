import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Carousel } from "primereact/carousel";
import { Skeleton } from "primereact/skeleton";


const Coupons = ({ loading }) => {
  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/couponcorner`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (item) => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={`${IMG_PATH}/coupons/image/${item.image}`}
          alt={item.alt || "coupon"}
          className="todaysdeal-img"
          style={{
            width: "280px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <Skeleton height={450} width="100%" style={{ marginTop: 10 }} />
      ) : (
        <div
          className="p-3 mt-3"
          style={{ backgroundColor: "rgba(54, 69, 79, 1)", minHeight: "500px" }}
        >
          <div className="container">
            <h3 className="text-center text-white mb-4">Coupons Corner</h3>
            <div className="row justify-content-between">
              {/* Left Side  */}
              <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
                <img
                  src={`${IMG_PATH}cms/couponcorner/${getData[0]?.image}`}
                  alt="rectancle"
                  className="img-fluid"
                  style={{
                    maxHeight: "350px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Right Side */}
              <div
                className="col-md-4 col-12 d-flex flex-column justify-content-center align-items-center align-items-md-end col-mt-0 mt-3  gap-1"
                style={{ maxHeight: "350px" }}
              >
                <Carousel
                  value={getData[0]?.coupon_details || []}
                  numVisible={4}
                  numScroll={1}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={productTemplate}
                  circular
                  autoplayInterval={4000}
                  orientation="vertical"
                  verticalViewPortHeight="400px"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Coupons;
