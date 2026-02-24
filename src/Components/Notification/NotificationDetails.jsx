import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import NotFound from "../../Pages/NotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { IMG_PATH } from "../../Api/api";
import { decryptData } from "../../Utils/encryptData";
import PaymentComponent from "../../Pages/PaymentGateway/PaymentGateway";
import { PaymentSuccess } from "../../Pages/PaymentGateway/PaymentResponse";

function NotificationDetails() {
  //..................
  const alert = useAlert();
  const { deid } = useParams();
  const id = decryptData(deid);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ pid: id, id: [], document: [] });
  const [fileErrors, setFileErrors] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const fetchData = async (id) => {

    try {
      const response = await axiosInstance.get(`/vendor/notification/${id}`);
      setData(response.data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
      setLoading(true);
    } else {
      setError(true)
    }
  }, [id]);

  useEffect(() => {
    if (data.docstatus) {
      setFormData({ pid: id, id: [], document: [] });

    }
  }, [data.docstatus, id]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const validTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (file && validTypes.includes(file.type)) {
      setFormData((prevData) => {
        const idIndex = prevData.id.indexOf(name);
        if (idIndex !== -1) {
          const updatedDocuments = [...prevData.document];
          updatedDocuments[idIndex] = file;

          return {
            ...prevData,
            document: updatedDocuments,
          };
        } else {
          return {
            ...prevData,
            id: [...prevData.id, name],
            document: [...prevData.document, file],
          };
        }
      });

      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(fileErrors).some((error) => error !== "");
    const hasAllFiles =
      formData.id.length > 0 && formData.document.length === formData.id.length;

    if (hasErrors || !hasAllFiles) {
      alert.error("Please fill in all fields or upload a valid file");
      return;
    }

    setLoadingSubmit(true);
    try {
      const response = await axiosInstance.post(
        "/vendor/notifupload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingSubmit(false);
      alert.success(
        "Your enquiry has been successfully sent. Our team will contact you shortly!"
      );
      fetchData(id);
    } catch (error) {
      alert.error("Failed to send your enquiry. Please try again later!");
      setLoadingSubmit(false);
    }
  };

  const renderBasedOnDocumentType = () => {
    switch (data.docstatus) {
      case "pending":
      case "redo":
        return (
          <>
            <div style={{ minHeight: "200px" }}>
              <h5>{data.title}</h5>
              <p>
                <i style={{ fontSize: "15px", fontWeight: "500" }}>Note:</i>{" "}
                {data.message}
              </p>
              <div className="row">
                {data?.body?.map((doc) => (
                  <div className="col-md-5 mb-3" key={doc.id}>
                    <label
                      style={{ fontSize: "14px" }}
                      className="mb-1 text-dark"
                    >
                      {doc.doc_type}
                    </label>

                    {data.notifstatus === "complete" ? (
                      <>
                        <a
                          href={`${IMG_PATH}/enquiry/${doc.document}`}
                          class="btn btn-warning ms-2"
                          download="download"
                        >
                          {" "}
                          <i className="fa fa-download"></i>
                        </a>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          name={doc.docid}
                          className="form-control"
                          onChange={handleChange}
                          accept=".pdf,.png,.jpeg,.jpg"
                          key={`${doc.docid}-${data.docstatus}`}
                        />
                        {fileErrors[doc.docid] && (
                          <p className="validation_msg">
                            {fileErrors[doc.docid]}
                          </p>
                        )}{" "}
                      </>
                    )}
                  </div>
                ))}

                {data.notifstatus === "complete" ? (
                  ""
                ) : (
                  <div className="col-md-10 mb-3">
                    <div style={{ float: "left" }}>
                      <a
                        href="#0"
                        onClick={handleSubmit}
                        className="btn_1 rounded full-width mt-2"
                      >
                        {loadingSubmit ? (
                          <ThreeDots
                            visible={true}
                            height="20"
                            width="80"
                            color="#ffffff"
                            radius="18"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{
                              justifyContent: "center",
                              fontSize: "12px",
                            }}
                          />
                        ) : (
                          "Submit"
                        )}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case "verify":
        return (
          <>
            <div style={{ minHeight: "200px" }}>
              <h5>{data.title}</h5>
              <p>
                <i style={{ fontSize: "15px", fontWeight: "500" }}>Note:</i>{" "}
                {data.message}
              </p>
            </div>
          </>
        );

      default:
        return <p>Unknown status.</p>;
    }
  };



  const [userData, setUserData] = useState({
    address: "",
    city: "",
    state: "",
    zip: ""
  });



  const handleHandleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [errors, setErrors] = useState({})
  const validateForm = () => {
    const newErrors = {};
    if (!userData.address) newErrors.address = "Address is required";
    if (!userData.city) newErrors.city = "City is required";
    if (!userData.state) newErrors.state = "State is required";
    if (!userData.zip) newErrors.zip = "Zip code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const renderBasedOnInvoice = () => {
    switch (data.notifstatus) {
      case "active":
        return (
          <>
            <div className="row" style={{ maxWidth: "1100px", margin: "auto" }} >
              <div className="col-md-7">
                <section className="card p-4 cardheight">
                  <h5 className="mb-4">Customer Details</h5>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={data?.customer}
                          disabled={data?.customer}
                          placeholder="name"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="+91"
                          value={data?.contact}
                          disabled={data?.contact}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="email"
                          value={data?.email}
                          disabled={data?.email}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="123 Main St"
                          onChange={handleHandleChange}
                          value={userData.address}
                          onKeyPress={(e) => {
                            if (!/[a-zA-Z0-9\s\W]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors && <div className="mt-1" style={{ color: 'red' }}>{errors.address}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          placeholder="city"
                          onChange={handleHandleChange}
                          value={userData.city}
                          onKeyPress={(e) => {
                            if (!/[a-zA-Z\s]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors && <div className="mt-1" style={{ color: 'red' }}>{errors.city}</div>}
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          placeholder="state"
                          onChange={handleHandleChange}
                          value={userData.state}
                          onKeyPress={(e) => {
                            if (!/[a-zA-Z\s]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors && <div className="mt-1" style={{ color: 'red' }}>{errors.state}</div>}
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="zip" className="form-label">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          placeholder='0000000'
                          onChange={handleHandleChange}
                          value={userData.zip}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={6}
                        />
                        {errors && <div className="mt-1" style={{ color: 'red' }}>{errors.zip}</div>}
                      </div>
                    </div>
                  </form>
                </section>
              </div>
              <div className="col-md-5 mt-3 mt-md-0">
                <section className="card p-4 cardheight">
                  <h5 className="mb-4">Payment Summary</h5>
                  <div className="d-flex justify-content-between">
                    <p>Subtotal</p>
                    <p>₹  {data?.body?.amount}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Tax</p>
                    <p>0</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h5>Total</h5>
                    <h5>₹  {data?.body?.amount}</h5>
                  </div>
                  {/* <button className="btn w-100 mt-3 text-white" style={{backgroundColor:"#2f4f4f"}}>
                    Payment Proceed
                  </button> */}
                  <PaymentComponent data={data} validateForm={validateForm} userData={userData} />
                  <div className="">
                    <p className="text-center small mt-2">
                      By payment proceed, you agree to our
                      <a href="#" className="text-danger">Terms of Service</a> and
                      <a href="#" className="text-danger">Privacy Policy</a>.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </>
        );

      case "complete":
        return (
          <>
            <PaymentSuccess />
          </>
        );
      default:
        return <p>Unknown status.</p>;
    }
  };
  return (
    <>
      {!error ? (
        <div style={{ backgroundColor: "#f5f7fb" }}>
          <section className="section">
            <div className="container">
              {loading ? (
                <>
                  <Skeleton width="80%" height={20} className="mb-3" />
                  <Skeleton width="80%" height={15} className="mb-3" />
                  <div className="row">
                    {[1, 2, 3, 4].map((index) => (
                      <div className="col-md-5 mb-3" key={index}>
                        <Skeleton width="40%" height={15} className="mb-1" />
                        <Skeleton width="100%" height={38} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {data?.type === "document" && renderBasedOnDocumentType()}
                  {data?.type === "invoice" && renderBasedOnInvoice()}
                </>
              )}
            </div>
          </section>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default NotificationDetails;
