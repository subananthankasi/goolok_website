import React, { useEffect, useState } from "react";
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

  const handleChange = (panel) => (event, isExpanded) => {
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
        {/* <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component="span" sx={{ width: "55%", flexShrink: 0 }}>
              <div className="drop_line">
                <span className="questionmark fs-4 px-3 py-2">?</span>
                <span className="lines">
                  {" "}
                  What should I consider before investing in real estate with
                  Goolok?
                </span>
              </div>
            </Typography>
          </AccordionSummary>
          <hr />
          <AccordionDetails>
            <Typography>
              Consider location, property type, potential rental income, market
              trends, and your financial readiness before making an investment.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography component="span" sx={{ width: "53%", flexShrink: 0 }}>
              <div className="drop_line">
                {" "}
                <span className="questionmark fs-4 px-3 py-2">?</span>
                <span className="lines">
                  {" "}
                  What financing options are available for investment
                  properties?{" "}
                </span>
              </div>
            </Typography>
          </AccordionSummary>
          <hr />
          <AccordionDetails>
            <Typography>
              You can explore traditional mortgages, hard money loans, or cash
              purchases. Our team can assist you in understanding the best
              options for your situation.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography component="span" sx={{ width: "53%", flexShrink: 0 }}>
              <div className="drop_line">
                <span className="questionmark fs-4 px-3 py-2">?</span>
                <span className="lines">
                  {" "}
                  What are the potential risks of real estate investing?
                </span>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <hr />
            <Typography>
              Risks may include market fluctuations, tenant turnover, unexpected
              repairs, and legal issues. We recommend thorough research and
              consultation with our professionals.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography component="span" sx={{ width: "53%", flexShrink: 0 }}>
              <div className="drop_line">
                <span className="questionmark fs-4 px-3 py-2">?</span>
                <span className="lines">
                  Does Goolok offer property management services?
                </span>
              </div>
            </Typography>
          </AccordionSummary>
          <hr />
          <AccordionDetails>
            <Typography>
              Yes, we provide comprehensive property management services,
              including tenant screening, rent collection, and maintenance
              coordination to ensure smooth operations.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  );
};

export default FaqBlog;
