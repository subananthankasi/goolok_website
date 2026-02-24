import { Carousel } from "rsuite";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";


const TrustImages = ({ promotion_banner2,loading }) => {
  return (
    <div className="mt-3">
      {
        loading ? (
          <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
        ) : (
          <Carousel className="custom-slider " shape={"bar"} style={{ height: "auto" }}>
            <img alt="Trust-img" src={`${IMG_PATH}cms/banners/${promotion_banner2[0]?.image}`} style={{ cursor: "pointer", }} onClick={() => window.open(promotion_banner2[0]?.url, "_blank")} />
          </Carousel>
        )
      }
    </div>
  );
};

export default TrustImages;
