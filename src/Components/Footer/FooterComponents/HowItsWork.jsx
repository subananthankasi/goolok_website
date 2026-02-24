import { useEffect, useState } from "react";
import {ListGroup } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import { Skeleton } from "primereact/skeleton";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const HowItsWork = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/howitwork`);
      setGetData(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const tagName = getData[0]?.alldata ? JSON.parse(getData[0]?.alldata) : [];

  const [selectedItem, setSelectedItem] = useState(
    tagName.length > 0 ? tagName[0].tag_name : ""
  );
  useEffect(() => {
    if (tagName.length > 0 && !selectedItem) {
      setSelectedItem(tagName[0].tag_name);
    }
  }, [tagName, selectedItem]);

  const getSelectedContent = (schedule) => {
    const option = tagName?.find((opt) => opt.tag_name === schedule);
    if (!option) return [];
    if (option) {
      return [
        {
          tag_name: option.tag_name,
          title: option.title,
          content: option.content,
          image: option?.image,
        },
      ];
    }
    return [];
  };
  const selectedContent = getSelectedContent(selectedItem);

  return (
    <div className="container p-3">
      <div className="mb-3">
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: "How it's work" },
          ]}
        />
      </div>
      <div className="d-flex" style={{ height: "32rem", overflow: "hidden" }}>
        {loading ? (
          <>
            <Skeleton
              height="100%"
              width="20%"
              style={{ marginTop: 10 }}
              className="mt-2"
            />
            <Skeleton
              height="100%"
              width="40%"
              style={{ marginTop: 10 }}
              className="mx-2 mt-2"
            />
            <Skeleton
              height="100%"
              width="40%"
              style={{ marginTop: 10 }}
              className="mt-2"
            />
          </>
        ) : (
          <>
            {/* Left Sidebar */}
            <div
              style={{
                width: "20%",
                height: "100%",
                background: "#fff",
                borderRight: "1px solid #eee",
                boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
                borderRadius: "8px 0 0 8px",
                overflowY: "auto",
                padding: "6px",
              }}
            >
              <ListGroup variant="flush">
                {tagName?.map((option, i) => (
                  <ListGroup.Item
                    key={i}
                    action
                    active={selectedItem === option.tag_name}
                    onClick={() => setSelectedItem(option.tag_name)}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "13px",
                      padding: "6px 10px",
                      border: "none",
                      borderBottom: "1px solid #f1f1f1",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background:
                        selectedItem === option.tag_name
                          ? "#0000ff"
                          : "#fff",
                      color: selectedItem === option.tag_name ? "#fff" : "#333",
                      fontWeight:
                        selectedItem === option.tag_name ? "600" : "400",
                      marginBottom: "4px",
                    }}
                  >
                    {option.tag_name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* Middle Image Section */}
            <div
              style={{
                width: "40%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              <img
                src={`${IMG_PATH}/cms_service/howitwork/${selectedContent[0]?.image}`}
                alt="img"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  // borderRadius: "10px",
                }}
              />
            </div>

            {/* Right Content */}
            <div
              style={{
                width: "40%",
                padding: "20px",
                height: "100%",
                overflowY: "auto",
                borderRadius: "0 8px 8px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h5
                style={{
                  textTransform: "capitalize",
                  fontWeight: "700",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                {selectedContent[0]?.title}
              </h5>

              <div
                className="benefit-content"
                style={{
                  textAlign: "justify",
                  maxWidth: "80%",
                  color: "#555",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
                dangerouslySetInnerHTML={{
                  __html: selectedContent[0]?.content,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HowItsWork;
