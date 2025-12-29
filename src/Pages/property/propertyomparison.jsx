import PropertyImage from "./propertyimage";
import * as FaIcons from "react-icons/fa";
import { Skeleton } from "primereact/skeleton";

const PropertyComparison = ({ property, loading }) => {
  const product = property[0];

  return (
    <>
      <div className="row g-3 align-items-center">

        <div className="col-lg-6">
          {loading ? (
            <Skeleton height="1.5rem" width="25%" className="mb-1 " />
          ) : (
            <h2 className="investment-head ">
              <span>{product.strategyName} </span>
            </h2>
          )}

          <div className="agent-contact-form-sidebar">
            {loading ? (
              <Skeleton height="300px" width="100%" className="mb-1 " />
            ) : (
              <div>
                <p style={{ fontSize: "15px", textAlign: "justify" }}> {product.strategyDes}</p>
              </div>
            )}

          </div>
        </div>
        <div className="col-lg-6">
          {loading ? (
            <Skeleton height="325px" width="100%" />
          ) : (
            <PropertyImage property={property} />
          )}
        </div>
      </div>
      <div className="row g-3 mb-4 mt-3">
        {loading ? (
          <div className="d-flex gap-2">
            <Skeleton height="100px" width="25%" className="mb-1 " />
            <Skeleton height="100px" width="25%" className="mb-1 " />
            <Skeleton height="100px" width="25%" className="mb-1 " />
            <Skeleton height="100px" width="25%" className="mb-1 " />
          </div>
        ) : (
          product?.strategy_type?.map((item, index) => {
            const IconComponent = FaIcons[item.icon];
            return (
              <div className="col-md-6 PropertyComparison col-lg-3">
                <div
                  className="card h-100 p-3 d-flex flex-column align-items-center justify-content-between"
                  key={index}
                  style={{ boxShadow: "0 4px 12px rgba(43, 46, 58, 0.4)" }}
                >
                  {IconComponent && <IconComponent size={32} style={{ color: "#0000ff" }} />}
                  <div className="text-end">
                    <div className="mb-2">
                      <h5>{item.strategy}</h5>
                      <p className="mb-0">{item.remark}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

      </div>
    </>
  );
};

export default PropertyComparison;
