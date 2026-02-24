import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { Skeleton } from "primereact/skeleton";
import {
  progressPropertyThunk,
} from "../../Redux/Action/YourPropertyThunk/YourpropertyThunk";
import { useDispatch, useSelector } from "react-redux";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Paginator } from "primereact/paginator";
import { FaAngleDoubleRight } from "react-icons/fa";


const YourProperty = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(progressPropertyThunk());
  }, [dispatch]);


  const dataFromStore = useSelector((state) => state.yourPropertydata?.progress?.data);
  const wholeData = Array.isArray(dataFromStore) ? dataFromStore : [];
  const dataLoading = useSelector(
    (state) => state.yourPropertydata?.progress?.loading
  );

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedProducts = wholeData?.slice(first, first + rows);

  return (
    <>
      <div className=" mt-3">
        <section className="mt-4">
          <div className="continer">
            <div>
              <h5 className="text-center" style={{ color: "#36454f" }}>
                My Properties
              </h5>
              <hr className="hr-gradient" />
            </div>
            <div className="row">
              {dataLoading ? (
                [...Array(6)].map((_, i) => (
                  <div className="col-lg-6 mb-2" key={i}>
                    <div className="card shadow border-0">
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton height="2rem" width="50%" className="mb-2 mt-3" />
                        <Skeleton height="2rem" className="mb-1" />
                        <Skeleton height="2rem" className="mb-1" />
                        <Skeleton height="2rem" className="mb-1" />
                        <Skeleton height="2rem" width="30%" className="mt-3 mb-3" />
                      </div>
                    </div>
                  </div>
                ))
              ) : paginatedProducts?.length > 0 ? (
                paginatedProducts?.map((data, index) => (
                  <div className="col-lg-6 mb-2" key={index}>
                    <div className="card shadow border-0" style={{ borderRadius: "0px", fontFamily: "poppins" }}>
                      <div className="pt-3 ps-3 pe-3">
                        <div className="d-flex py-3">
                          <div
                            className={`premium-badge ${data.status === "waiting"
                              ? "status-waiting"
                              : data.status === "progress"
                                ? "status-processing"
                                : data.status === "pending"
                                  ? "status-pending" :
                                 data.status === "closed"
                                  ? "status-closed"
                                  : "status-success"
                              }`}
                          >
                            {data.status}
                          </div>
                          <div className="ms-auto text-muted">
                            {DateFormateCustom(data.created_at)}
                          </div>
                        </div>
                        <span className="text-nowrap text-xs text-muted" style={{ fontWeight: "600" }}>
                          Property ID: {data.propertyid || "ONLND1003"}
                        </span>
                        <div className="row mt-2">
                          <div className="col-5">
                            <label>Property Type:</label>
                          </div>
                          <div className="col-7">
                            <label style={{ fontWeight: "600" }}>{data.property_type}</label>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-5">
                            <label>Sub Property:</label>
                          </div>
                          <div className="col-7">
                            <label style={{ fontWeight: "600" }}>{data.subpro_name}</label>
                          </div>
                        </div>
                        <div className="text-end mt-4 mb-3">
                          <Link
                            to={`/profile_edit/property_status/${data.id}`}
                            className="btn-premium"
                          >
                            Your property status <FaAngleDoubleRight />

                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted" style={{ fontSize: "15px" }}>
                    {" "}
                    <SearchOffIcon sx={{ fontSize: 25 }} /> No data found
                  </p>
                </div>
              )}
            </div>

            {!dataLoading && wholeData.length > 6 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={wholeData?.length}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default YourProperty;
