import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Skeleton } from "primereact/skeleton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const ShowFullNotificationMessage = ({ id, setShowFullMessage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/notification/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, [dispatch]);
  return (
    <div
      className="card p-4"
      style={{
        borderRadius: "18px",
        background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
        boxShadow:
          "0 4px 12px rgba(47, 79, 79, 0.15), inset 0 0 8px rgba(55, 69, 80, 0.05)",
        minHeight: "260px",
        position: "relative",
        border: "1px solid rgba(47, 79, 79, 0.1)",
      }}
    >
      {loading ? (
        <Skeleton height="250px" className="mb-1" />
      ) : (
        <>
          {/* Back Button */}
          <button
            className="btn d-flex align-items-center justify-content-center"
            onClick={() => setShowFullMessage(false)}
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#2f4f4f",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 10px rgba(47, 79, 79, 0.25)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#374550")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2f4f4f")
            }
          >
            <ArrowBackIcon />
          </button>

          {/* Content */}
          <div className="mt-5 text-center">
            <h5
              className="fw-bold"
              style={{
                color: "#2f4f4f",
                fontSize: "1.25rem",
                marginBottom: "12px",
              }}
            >
              {data?.title}
            </h5>
            <div
              style={{
                height: "2px",
                width: "60px",
                backgroundColor: "#2f4f4f",
                margin: "0 auto 15px",
                borderRadius: "2px",
              }}
            ></div>
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.6",
                maxWidth: "90%",
                margin: "0 auto",
                color: "#374550",
              }}
            >
              <i style={{ fontWeight: "500", color: "#2f4f4f" }}>Note:</i>{" "}
              {data?.message}
            </p>

            {/* Upload Button */}
            {data?.docstatus === "redo" && data?.type === "document" && (
              <button
                onClick={() =>
                  navigate(`/profile_edit/property_status/${data.enqid}`)
                }
                className="btn shadow-sm"
                style={{
                  backgroundColor: "#2f4f4f",
                  color: "white",
                  fontWeight: "600",
                  padding: "10px 35px",
                  borderRadius: "50px",
                  marginTop: "25px",
                  border: "none",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 10px rgba(47, 79, 79, 0.25)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#374550")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2f4f4f")
                }
              >
                Upload Document
              </button>
            )}

            {/* Verified Status */}
            {data?.docstatus === "verify" && (
              <CheckCircleOutlineIcon
                sx={{ fontSize: 55, color: "#2e7d32" }}
                className="mt-3"
              />
            )}
            {data?.docstatus === null && (
              <ErrorOutlineIcon
                sx={{ fontSize: 55, color: "#d4841aff" }}
                className="mt-3"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowFullNotificationMessage;
