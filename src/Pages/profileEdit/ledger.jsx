import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./profilecss.css";
import { SearchData } from "../../Utils/search";
import ProfileSideBar from "./ProfileSideBar";
import { InvoicePdfDownloadButton } from "../../Utils/InvoicePdfDownload.jsx/InvoicePdfDownload";
import axiosInstance from "../../Api/axiosInstance";
import { Skeleton } from 'primereact/skeleton';


function Ledger() {
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem('zxcvbnm@#')

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Transaction Date",
      selector: (row) => row.transactiondate,
      wrap: true,
      width: "200px",
      sortable: true,
    },
    {
      name: "Transaction Type",
      selector: (row) => row.transactiontype,
      cell: (row) => (
        <div>
          {row.transactiontype}
          <br />
          <InvoicePdfDownloadButton />
          {/* <button
            className="btn btn_pdf btn-outline-danger ps-3 pe-3 p-1 mt-1"
            style={{ fontWeight: "600" }}
          >
            PDF
          </button> */}
        </div>
      ),
      width: "200px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.transactionnumber,
      width: "200px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Transaction Details",
      selector: (row) => row.details,
      width: "300px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Debit Amount (DR)",
      selector: (row) => row.debit,
      width: "200px",
      sortable: true,
      wrap: true,
    },
    {
      name: "Credit Amount (CR)",
      selector: (row) => row.credit,
      width: "200px",
      wrap: true,
      sortable: true,
    },
    {
      name: "Balance (INR)",
      selector: (row) => row.balance,
      width: "200px",
      wrap: true,
      sortable: true,
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#2f4f4f",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "600",
        textTransform: "capitalize",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/ledger`, {
        headers: {
          Authorization: token
        }
      })
      setData(response.data)
      setIsLoading(false)
    } catch (error) {

    }
  }


  useEffect(() => {
    fetchData()
  }, [])


  const [filterText, setFilterText] = useState("");
  const searchColumns = [
    "slno",
    "transactiondate",
    "transactiontype",
    "transactionnumber",
    "details",
    "debit",
    "credit",
    "balance",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  const filterdata = SearchData(data, filterText, searchColumns);

  /////////////////////////////////////

  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6>Ledger</h6>
              <hr />
            </div>

            <section className=" ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className=" ">
                      <div className="">
                        <div className="col-lg-12  mb-4">
                          <div className="searchbar">
                            <input
                              type="text"
                              className="search"
                              onChange={handleFilter}
                              placeholder="..Search"
                            ></input>
                          </div>
                          {isLoading ? (
                            <div className="skeleton-wrapper">
                              <Skeleton height="2rem" className="mb-3" width="100%" />
                              {filterdata.length > 0
                                ? filterdata.map((_, index) => (
                                  <Skeleton
                                    key={index}
                                    height="2rem"
                                    className="mb-2"
                                    width="100%"
                                    style={{ borderRadius: "5px" }}
                                  />
                                ))
                                : [...Array(4)].map((_, index) => (
                                  <Skeleton
                                    key={index}
                                    height="3rem"
                                    className="mb-2"
                                    width="100%"
                                    style={{ borderRadius: "5px" }}
                                  />
                                ))}
                            </div>
                          ) : (
                            <DataTable
                              columns={columns}
                              // data={filterdata}
                              customStyles={customStyle}
                              pagination
                              persistTableHead={true}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ledger;
