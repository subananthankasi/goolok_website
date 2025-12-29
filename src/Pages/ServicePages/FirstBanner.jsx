import React, { useState, SyntheticEvent, useEffect } from "react";
import "./FirstBanner.css";
// import img1 from "../../Assents/Goolok Banner - 3.jpg"
import img1 from "../../assets/ServiceImages/Goolok Banner - 3.jpg";
import img2 from "../../assets/ServiceImages/Goolok Banner - 4.jpg";
import img3 from "../../assets/ServiceImages/Goolok Banner - 5.jpg";
import cardimg1 from "../../assets/ServiceImages/sale.png";
import cardimg2 from "../../assets/ServiceImages/map.png";
import cardimg3 from "../../assets/ServiceImages/missing.png";
import cardimg4 from "../../assets/ServiceImages/patta.png";
import cardimg5 from "../../assets/ServiceImages/servay.png";
import cardimg6 from "../../assets/ServiceImages/approval.png";
import mobileimg7 from "../../assets/ServiceImages/mobile.png";
import videoimg8 from "../../assets/ServiceImages/video.jpg";
import mobileplay from "../../assets/ServiceImages/mobileplay.png";
import { IoMdArrowRoundForward } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import GridSections from "./GridSections";
import ServiceBlog1 from "./ServiceBlog1";
import PromotionService from "./PromotionService";
import VisionBlog from "./VisionBlog";
import FaqBlog from "./FaqBlog";
import { Skeleton } from "primereact/skeleton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FirstBanner = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [sell, setSell] = useState(false);
  const [GoogleMap, setGoogleMap] = useState(false);
  const [missingDoc, setMissingDoc] = useState(false);
  const [patta, setpatta] = useState(false);
  const [legal, setLegal] = useState(false);
  const [land, setLand] = useState(false);
  const [property, setProperty] = useState(false);
  const [approval, setApproval] = useState(false);
  const [loading, setLoading] = useState(false);

  const [getData, setGetData] = useState([]);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/bannerimages`);
      setGetData(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const bannerImages = getData?.filter((item) => {
    return item.title === "web";
  });

  const handleClickOpensell = () => {
    setSell(true);
  };
  const handleClosesell = () => {
    setSell(false);
  };
  const handleClickOpengoogle = () => {
    setGoogleMap(true);
  };
  const handleClosegoogle = () => {
    setGoogleMap(false);
  };
  const handleClickOpenmissDoc = () => {
    setMissingDoc(true);
  };
  const handleClosemissDoc = () => {
    setMissingDoc(false);
  };
  const handleClickOpenpatta = () => {
    setpatta(true);
  };
  const handleClosepatta = () => {
    setpatta(false);
  };
  const handleCloseopenLegal = () => {
    setLegal(true);
  };
  const handleCloseLegal = () => {
    setLegal(false);
  };
  const handleCloseopenLand = () => {
    setLand(true);
  };
  const handleCloseLand = () => {
    setLand(false);
  };
  const handleCloseopenproperty = () => {
    setProperty(true);
  };
  const handleCloseproperty = () => {
    setProperty(false);
  };
  const handleCloseopenapproval = () => {
    setApproval(true);
  };
  const handleCloseapproval = () => {
    setApproval(false);
  };
  return (
    <>
      <section
        className="banner-section position-relative col-12"
        style={{ position: "relative", zIndex: "1" }}
      >
        <div
          id="bannerCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {loading ? (
              <Skeleton height={400} width="100%" style={{ marginTop: 10 }} />
            ) : (
              bannerImages?.map((item) => (
                <div className="carousel-item active">
                  <img
                    src={`${IMG_PATH}cms_service/banners/${item.image}`}
                    className="w-100 banner-img"
                    alt="Banner Image 1"
                  />
                </div>
              ))
            )}
            {/* <div className="carousel-item active">
              <img
                src={img3}
                className="w-100 banner-img"
                alt="Banner Image 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img1}
                className="w-100 banner-img"
                alt="Banner Image 3"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img2}
                className="w-100 banner-img"
                alt="Banner Image 4"
              />
            </div> */}
          </div>

          {/* <!-- Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >
            <span aria-hidden="true">
              <i
                style={{ color: " #2b2e3a" }}
                className="fas fa-chevron-left fa-2x"
              ></i>
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >
            <span aria-hidden="true">
              <i
                style={{ color: "#2b2e3a" }}
                className="fas fa-chevron-right fa-2x"
              ></i>
            </span>
          </button>
        </div>
      </section>

      {/* <div className="container mt-4">
        <div className="grid-container grid-containercaro ">
          <div
            className=" card  m-0 p-0 h-70"
            onClick={handleClickOpensell}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">FREE</h3>
            </div>
            <div className="body mt-3">
              <img
                src={cardimg1}
                alt="saleimg"
                style={{ width: "250px", height: "130px" }}
              />
            </div>
            <div className=" foot pt-4">
              <h6 className="sell_properity">Sell Your Property</h6>
              <h5 className="free mt-3">Free</h5>
              <button className="btn btn-dark buttonhover mt-3 mb-5">
                <Link to="/sellproperty" style={{ color: "white" }}>
                  {" "}
                  Learn More
                </Link>{" "}
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div
            className=" h-70   card  m-0 p-0"
            onClick={handleClickOpengoogle}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2 ">FREE</h3>
            </div>
            <div className="body mt-3">
              <img
                src={cardimg2}
                alt="saleimg"
                style={{ width: "250px", height: "130px" }}
              />
            </div>
            <div className="foot pt-3">
              <h6 className="sell_properity">Find Your Property</h6>
              <h6 className="sell_properity">Google Map Location</h6>
              <h5 className="free mt-1">Free</h5>
              <button className="btn btn-dark mt-2 mb-5 buttonhover">
                <Link to="/maplocation" style={{ color: "white" }}>
                  Learn More
                </Link>{" "}
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div
            className=" h-70 card  m-0 p-0"
            onClick={handleClickOpenmissDoc}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">FREE</h3>
            </div>
            <div className="body mt-3">
              <img
                src={cardimg3}
                alt="saleimg"
                style={{ width: "270px", height: "160px" }}
              />
            </div>
            <div className="foot pt-3">
              <h6 className="sell_properity">Missing Documents</h6>
              <div className="d-flex">
                <span
                  className="mt-2 pt-1 px-2 "
                  style={{ opacity: "0.5", textDecorationLine: "line-through" }}
                >
                  ₹250{" "}
                </span>
                <h5 className="free mt-2">₹100</h5>
              </div>

              <button className="btn btn-dark mt-1 mb-5 buttonhover">
                <Link to="/missingDoc" style={{ color: "white" }}>
                  Learn More
                </Link>{" "}
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div
            className=" h-70 card m-0 p-0"
            onClick={handleClickOpenpatta}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">FREE</h3>
            </div>
            <div className="body mt-3">
              <img
                src={cardimg4}
                alt="saleimg"
                style={{ width: "250px", height: "130px" }}
              />
            </div>
            <div className="foot pt-3">
              <h6 className="sell_properity">Get Patta For Your </h6>
              <h6 className="sell_properity"> Property</h6>
              <div className="d-flex">
                <span
                  className="mt-2 pt-1 px-2  "
                  style={{ opacity: "0.5", textDecorationLine: "line-through" }}
                >
                  ₹4500{" "}
                </span>
                <h5 className="free mt-2">₹4000</h5>
              </div>

              <button className="btn btn-dark mt-1 mb-5 buttonhover">
                <Link to="/pattaservice" style={{ color: "white" }}>
                  Learn More
                </Link>{" "}
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="container">
        <div className="grid-container grid-containercaro mt-4" >
          <div
            className=" card   m-0 p-0"
            onClick={handleCloseopenLegal}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">40% OFF</h3>
            </div>
            <div className="body mt-4">
              <img
                src={cardimg6}
                alt="saleimg"
                style={{ width: "270px", height: "150px" }}
              />
            </div>
            <div className=" foot pt-4">
              <h6 className="sell_properity">Legal Opinion</h6>
              <div className="d-flex">
                <span className="mt-2 pt-2 px-2" style={{ opacity: "0.5" }}>
                  Starts at
                </span>
                <h5 className="free pt-3"> ₹10,000</h5>
              </div>
              <button className="btn btn-dark mt-4 mb-3 buttonhover">
                <Link to="/legalopinion" style={{ color: "white" }}>
                  {" "}
                  Learn More
                </Link>
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div
            className=" card m-0 p-0"
            onClick={handleCloseopenLand}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">40% OFF</h3>
            </div>
            <div className="body mt-2">
              <img
                src={cardimg5}
                alt="saleimg"
                style={{ width: "270px", height: "170px" }}
              />
            </div>
            <div className="foot pt-4">
              <h6 className="sell_properity">Land survey</h6>
              <div className="d-flex">
                <span className="mt-2 pt-2 px-2 " style={{ opacity: "0.5" }}>
                  Starts from
                </span>
                <h5 className="free pt-3"> ₹10,000</h5>
              </div>
              <button className="btn btn-dark mt-4 mb-4 buttonhover">
                <Link to="/measuring" style={{ color: "white" }}>
                  {" "}
                  Learn More
                  <IoMdArrowRoundForward size={18} />
                </Link>
              </button>
            </div>
          </div>

          <div
            className=" card  m-0 p-0"
            onClick={handleCloseopenproperty}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">40% OFF</h3>
            </div>
            <div className="body mt-2">
              <img
                src={cardimg5}
                alt="saleimg"
                style={{ width: "270px", height: "170px" }}
              />
            </div>
            <div className="foot pt-4">
              <h6 className="sell_properity">Property Valuation</h6>
              <div className="d-flex">
                <span className="mt-2 pt-2 px-2 " style={{ opacity: "0.5" }}>
                  Starts from
                </span>
                <h5 className="free pt-3"> ₹10,000</h5>
              </div>
              <button className="btn btn-dark mt-4 mb-4 buttonhover">
                <Link to="/measuring" style={{ color: "white" }}>
                  Learn More
                  <IoMdArrowRoundForward size={18} />
                </Link>
              </button>
            </div>
          </div>
          <div
            className=" card m-0 p-0"
            onClick={handleCloseopenapproval}
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header">
              <h3 className=" text-center mt-2">40% OFF</h3>
            </div>
            <div className="body mt-4">
              <img
                src={cardimg6}
                alt="saleimg"
                style={{ width: "270px", height: "150px" }}
              />
            </div>
            <div className="foot pt-4">
              <h6 className="sell_properity mt-1">All approvals</h6>
              <div className="d-flex">
                <span className="mt-2 pt-2 px-2" style={{ opacity: "0.5" }}>
                  Starts at
                </span>
                <h5 className="free pt-3"> ₹10,000</h5>
              </div>
              <button className="btn btn-dark mt-4 mb-4 buttonhover">
                <Link to="/legalopinion" style={{ color: "white" }}>
                  Learn More
                  <IoMdArrowRoundForward size={18} />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <GridSections />
      <ServiceBlog1 />
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              {" "}
              <span style={{ color: "blue" }}>Discover</span> What Goolok Can
              Tell
            </h2>
            <h2> You About Real Estate Services.</h2>
            <div>
              <p className="pt-5 fs-6">
                <span className="fs-4" style={{ color: "blue" }}>
                  G
                </span>
                oolok transforms complex property transactions into seamless
                experiences,
              </p>
              <p className="fs-6">
                {" "}
                helping clients manage property, verify documents, and meet
                legal requirements
              </p>
              <p className="fs-6"> with ease.</p>
              <button
                className="btn btn-light buttonhover mt-2  mb-4"
                style={{ color: "white" }}
              >
                Learn More
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 mobileimg">
            <img
              src={mobileimg7}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
        </div>
      </div> */}
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <img
              src={mobileimg7}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              {" "}
              <span className="fs-1" style={{ color: "blue" }}>
                Unlock
              </span>{" "}
              Expertise Across All
            </h2>
            <h2> Property Service Needs</h2>
            <div>
              <p className="pt-5 fs-6">
                <span className="fs-2" style={{ color: "blue" }}>
                  O
                </span>
                ur expert team provides tailored solutions, from land surveying
                to property,
              </p>
              <p className="fs-6">
                {" "}
                documentation, ensuring clarity and support for all property
                management goals.
              </p>
              <button className="btn btn-light buttonhover mt-2  mb-4">
                Learn More
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              {" "}
              <span style={{ color: "blue" }}>Transparent </span>Approach to
            </h2>
            <h2> Services.</h2>
            <div>
              <p className="pt-5 fs-6">
                <span className="fs-4" style={{ color: "blue" }}>
                  W
                </span>
                e prioritize open communication, keeping you informed at every
                stage of the
              </p>
              <p className="fs-6">
                {" "}
                process with regular updates and actionable insights.
              </p>
              <button className="btn btn-light mt-2 buttonhover  mb-4">
                Learn More
                <IoMdArrowRoundForward size={18} />
              </button>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <img
              src={mobileimg7}
              alt="mobileimg"
              style={{ width: "570px", height: "510px" }}
            />
          </div>
        </div>
      </div> */}
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="border_mobileimg">
              <img
                src={videoimg8}
                alt="mobileimg"
                style={{
                  width: "570px",
                  height: "400px",
                  backgroundColor: "red",
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 pt-5">
            <h2 className="pt-5">
              {" "}
              <span style={{ color: "blue" }}>Goolok </span>Real Estate Services
            </h2>
            <div>
              <p className="pt-5 fs-6">
                <span className="fs-4" style={{ color: "blue" }}>
                  G
                </span>
                oolok transforms complex property transactions into seamless
                experiences,
              </p>
              <p className="fs-6">
                {" "}
                helping clients manage property, verify documents, and meet
                legal requirements
              </p>
              <p className="fs-6">with ease.</p>
            </div>
          </div>
        </div>
      </div> */}
      <PromotionService />
      {/* <div className="container">
        <div className="row mobileplay mt-5">
          <div className="col-12 col-md-6 col-lg-6 px-5">
            <img src={mobileplay} alt="Mobileplay" />
          </div>
          <div className="col-12 col-md-6 col-lg-6 mobileplay_text pt-5">
            <h2 className="pt-5">Why Goolok?</h2>
            <p className="fs-6 pt-3">
              Goolok combines expertise, quality service, and a client-centric
              approach, making us a trusted
            </p>
            <p className="fs-6">
              partner for safe, reliable, and empowering property services.
            </p>
            <button className="btn btn-light  buttonhover mt-2 mb-4">
              Learn More
              <IoMdArrowRoundForward size={18} />
            </button>
          </div>
        </div>
      </div> */}
      <VisionBlog />
      {/* <div className="container">
        <h1 className="text-center mt-5">
          <span
            style={{ color: "blue", fontWeight: "500px", fontSize: "50px" }}
          >
            F
          </span>
          AQ
        </h1>
        <div className="col-12 col-md-12 col-lg-12">
          <Accordion
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
                Consider location, property type, potential rental income,
                market trends, and your financial readiness before making an
                investment.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
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
          </Accordion>
          <Accordion
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
                Risks may include market fluctuations, tenant turnover,
                unexpected repairs, and legal issues. We recommend thorough
                research and consultation with our professionals.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
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
          </Accordion>
        </div>
      </div> */}
      <FaqBlog />

      {/*sell  Card modal........................ */}
      <div>
        <BootstrapDialog
          onClose={handleClosesell}
          aria-labelledby="customized-dialog-title"
          open={sell}
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
            <header> Sell Your Property Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClosesell}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              fontWeight: "bold",
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosesell}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleClosesell}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>

        {/* GoogleMap...................................... */}
        <BootstrapDialog
          onClose={handleClosegoogle}
          aria-labelledby="customized-dialog-title"
          open={GoogleMap}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Find Your Property Google Map Location Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClosegoogle}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosegoogle}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleClosegoogle}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* missing Documents ................................................. */}
        <BootstrapDialog
          onClose={handleClosemissDoc}
          aria-labelledby="customized-dialog-title"
          open={missingDoc}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Missing Documents Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClosemissDoc}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3 "
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosemissDoc}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleClosemissDoc}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* patta ............................................... */}
        <BootstrapDialog
          onClose={handleClosepatta}
          aria-labelledby="customized-dialog-title"
          open={patta}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Get Patta For Your Property Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClosepatta}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosepatta}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleClosepatta}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* legal..................................... */}
        <BootstrapDialog
          onClose={handleCloseLegal}
          aria-labelledby="customized-dialog-title"
          open={legal}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Legal Opinion Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseLegal}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseLegal}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleCloseLegal}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* Land......... .......................... */}
        <BootstrapDialog
          onClose={handleCloseLand}
          aria-labelledby="customized-dialog-title"
          open={land}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Measure and Fix Boundary Stones Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseLand}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseLand}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleCloseLand}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>

        {/* property.......................................  */}
        <BootstrapDialog
          onClose={handleCloseproperty}
          aria-labelledby="customized-dialog-title"
          open={property}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Measure and Fix Boundary Stones Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseproperty}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseproperty}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleCloseproperty}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* approvals........... ................................ */}
        <BootstrapDialog
          onClose={handleCloseapproval}
          aria-labelledby="customized-dialog-title"
          open={approval}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <header>Legal Opinion Enquiry</header>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseapproval}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Name"
                className="form-control sellmodal mt-2 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Your Phone No"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter OTP"
                className="form-control sellmodal mt-3 py-3"
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseapproval}>
              Close
            </Button>

            <Button autoFocus variant="contained" onClick={handleCloseapproval}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default FirstBanner;
