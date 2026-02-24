import { useEffect, useState } from "react";
import "./FirstBanner.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import API_BASE_URL from "../../Api/api";

const FaqBlog = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faqblock`);
      setGetData(response.data?.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-5">
        <span className="faq_text">F</span>
        AQ
      </h2>
      <div className="col-12 col-md-12 col-lg-12">
        {getData?.map((item, index) => {
          const panelId = `panel-${index}`;
          return (
            <Accordion
              key={index}
              expanded={expanded === panelId}
              onChange={handleChange(panelId)}
              className="mb-3 shadow-sm"
              style={{ borderRadius: "8px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
              >
                <Typography component="div" sx={{ flex: 1 }}>
                  <div className="d-flex align-items-center">
                    <span className="d-flex align-items-center justify-content-center service_questionmark">
                      ?
                    </span>
                    <span className="service_question">{item?.question}</span>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "#555",
                    paddingLeft: "47px",
                    fontFamily: "poppins",
                  }}
                >
                  {item?.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FaqBlog;
