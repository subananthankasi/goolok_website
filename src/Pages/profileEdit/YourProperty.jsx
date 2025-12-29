import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import ProfileSideBar from "./ProfileSideBar";
import { Tab, Tabs } from "react-bootstrap";
import { Skeleton } from "primereact/skeleton";
import {
  completePropertyThunk,
  pendingPropertyThunk,
  progressPropertyThunk,
  waitingPropertyThunk,
} from "../../Redux/Action/YourPropertyThunk/YourpropertyThunk";
import { useDispatch, useSelector } from "react-redux";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Paginator } from "primereact/paginator";
import { FaAngleDoubleRight } from "react-icons/fa";


const YourProperty = ({ activeTab }) => {
  const [activeKey, setActiveKey] = useState("tab1");
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(waitingPropertyThunk());
    dispatch(progressPropertyThunk());
    // dispatch(pendingPropertyThunk());
    // dispatch(completePropertyThunk());
  }, []);

  // const waitingData =
  //   useSelector((state) => state.yourPropertydata?.waiting?.data) || [];
  // const wholeData =
  //   useSelector((state) => state.yourPropertydata?.progress?.data) || [];

  const dataFromStore = useSelector((state) => state.yourPropertydata?.progress?.data);
  const wholeData = Array.isArray(dataFromStore) ? dataFromStore : [];
  // const pendingData =
  //   useSelector((state) => state.yourPropertydata?.pending?.data) || [];
  // const completeData =
  //   useSelector((state) => state.yourPropertydata?.complete?.data) || [];

  // const waitingLoading = useSelector(
  //   (state) => state.yourPropertydata?.waiting?.loading
  // );
  const dataLoading = useSelector(
    (state) => state.yourPropertydata?.progress?.loading
  );
  // const pendingLoading = useSelector(
  //   (state) => state.yourPropertydata?.pending?.loading
  // );
  // const completeLoading = useSelector(
  //   (state) => state.yourPropertydata?.complete?.loading
  // );

  const handleTabChange = (key) => {
    setActiveKey(key);
    if (key === "tab1") {
      dispatch(waitingPropertyThunk());
    } else if (key === "tab2") {
      dispatch(progressPropertyThunk());
    } else if (key === "tab3") {
      dispatch(pendingPropertyThunk());
    } else if (key === "tab4") {
      dispatch(completePropertyThunk());
    }
  };
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedProducts = wholeData?.slice(first, first + rows);

  return (
    <>
      {/* <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar /> */}
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
                                  ? "status-pending"
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

                        {/* <hr className="mt-2 mb-3 m-0" /> */}
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
