import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BarChartIcon from "@mui/icons-material/BarChart";
import CustomPagination from "../gridview/pagination";
import { Link } from "react-router-dom";

function ForumHome() {
  const posts = [
    {
      title: "What are the Reviews of Brigade royapiram, Aavadi, Chennai?",
      time_posted: "20 minutes ago",
      posted_by: "KenyeW",
      share_count: 0,
      replies_count: 122,
      views_count: 290,
      answer:
        "Brigade Royapettah, located in Aavadi, Chennai, is generally well-regarded for its strategic location and amenities. Residents appreciate the proximity to essential services such as schools, hospitals, and markets. The development includes well-planned apartments with modern features, and the project is seen as a good investment due to its connectivity to key areas in Chennai.",
    },
    {
      title: "Is it safe to invest in Ozone Greens, Perumbakkam, Chennai?",
      time_posted: "1 hour ago",
      posted_by: "RaviS",
      share_count: 12,
      replies_count: 45,
      views_count: 180,
      answer:
        "Ozone Greens in Perumbakkam, Chennai, has garnered attention for its affordable pricing and decent amenities. The project is considered safe for investment, particularly for first-time homebuyers. However, potential buyers should evaluate the quality of construction and overall infrastructure.",
    },
    {
      title: "How are the amenities at DLF Commanders Court, Egmore?",
      time_posted: "2 hours ago",
      posted_by: "PriyaK",
      share_count: 5,
      replies_count: 75,
      views_count: 200,
      answer:
        "DLF Commanders Court in Egmore is praised for its premium amenities, including a fully equipped clubhouse, swimming pool, and gymnasium. The project is targeted towards luxury homebuyers and is highly rated for its strategic location and high-quality construction.",
    },
    {
      title: "Are there any issues with Casagrand Tudor, Mogappair, Chennai?",
      time_posted: "30 minutes ago",
      posted_by: "VishalM",
      share_count: 3,
      replies_count: 15,
      views_count: 95,
      answer:
        "Casagrand Tudor in Mogappair, Chennai, is generally well-regarded for its modern design and amenities. However, some residents have reported minor issues related to water supply and maintenance. Overall, the project is considered a good option for families.",
    },
    {
      title:
        "What is the resale value of apartments in Purva Windermere, Pallikaranai?",
      time_posted: "45 minutes ago",
      posted_by: "AnandK",
      share_count: 7,
      replies_count: 90,
      views_count: 240,
      answer:
        "Purva Windermere in Pallikaranai, Chennai, has a good resale value due to its strategic location and the reputation of the builder. The project is popular among investors looking for long-term gains, with appreciation rates being steady over the years.",
    },
    {
      title: "How is the connectivity of Akshaya Today, Kelambakkam?",
      time_posted: "15 minutes ago",
      posted_by: "SanjayR",
      share_count: 1,
      replies_count: 30,
      views_count: 150,
      answer:
        "Akshaya Today in Kelambakkam is well-connected to major IT hubs and educational institutions. The project is a preferred choice for IT professionals working in the nearby areas. The development offers a peaceful environment away from the city's hustle and bustle.",
    },
    {
      title: "Is Radiance Icon, Koyambedu, a good investment?",
      time_posted: "3 hours ago",
      posted_by: "ArjunN",
      share_count: 2,
      replies_count: 110,
      views_count: 320,
      answer:
        "Radiance Icon in Koyambedu, Chennai, is considered a good investment due to its location near the Koyambedu bus terminal and metro station. The project offers modern amenities and is ideal for those looking for rental income or long-term appreciation.",
    },
    {
      title:
        "How is the quality of construction in Navin's Starwood Towers, Medavakkam?",
      time_posted: "1 hour ago",
      posted_by: "SnehaP",
      share_count: 4,
      replies_count: 60,
      views_count: 190,
      answer:
        "Navin's Starwood Towers in Medavakkam, Chennai, is known for its solid construction quality. The builder has a good reputation, and the project has been well-received by residents. The location is also advantageous for families due to nearby schools and hospitals.",
    },
    {
      title:
        "What are the facilities available in Alliance Galleria, Pallavaram?",
      time_posted: "20 minutes ago",
      posted_by: "MadhavS",
      share_count: 9,
      replies_count: 50,
      views_count: 220,
      answer:
        "Alliance Galleria in Pallavaram, Chennai, offers a wide range of facilities, including a shopping mall, cinema, and various dining options within the complex. The project is popular among young professionals and families looking for a vibrant community with modern amenities.",
    },
    {
      title: "Is TVS Emerald GreenHills, Perungalathur, worth buying?",
      time_posted: "10 minutes ago",
      posted_by: "DivyaK",
      share_count: 8,
      replies_count: 80,
      views_count: 260,
      answer:
        "TVS Emerald GreenHills in Perungalathur, Chennai, is worth considering for those looking for affordable housing with good connectivity to the city. The project offers decent amenities and is suitable for families and working professionals alike.",
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-3">
            <div className="card p-4 mt-4 mb-4">
              <div className="row text-center">
                <h5 className="card-title">
                  <a href="#" className="text-dark fs-4 fw-bold">
                    Discuss about Tamil Nadu Real Estate with Experts
                  </a>
                  <div
                    className="mt-3 mb-3 mx-auto"
                    style={{ maxWidth: "500px" }}
                  >
                    <div className="row">
                      <div className="col-lg">
                        <input
                          type="text"
                          className="form-control rounded-pill"
                        ></input>
                      </div>
                      <div className="col-auto m-auto">
                        <div className="mt-3 mt-lg-0">
                          <button
                            className="btn text-white"
                            style={{ background: "#2b2e3a" }}
                          >
                            Ask Question
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </h5>

                <div className="text-end"></div>
              </div>
            </div>
            {/* Post 1 */}
            <div>
              {posts.map((post, index) => (
                <div className="card mb-3 p-3" key={index}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-7 mb-3 mb-lg-0">
                      <h5 className="card-title">
                        <a href="#" className="text-dark">
                          Q. {post.title}
                        </a>
                      </h5>
                      <p className="card-text">
                        <span className="text-muted">Posted</span>
                        <a href="#" className="text-dark ms-2">
                          {post.time_posted}
                        </a>
                        <span className="text-muted">; by</span>
                        <a href="#" className="text-dark ms-1">
                          {post.posted_by}
                        </a>
                      </p>
                    </div>
                    <div className="col-lg-5 text-muted">
                      <div className="row text-center">
                        <div className="col d-flex">
                          <a href="#" className="text-muted me-2">
                            <ShareIcon />
                          </a>
                          <span className="d-block">Share</span>
                        </div>
                        <div className="col d-flex">
                          <ModeCommentIcon className="me-1" />
                          <span className="d-block">
                            {post.replies_count} Replies
                          </span>
                        </div>
                        <div className="col d-flex">
                          <BarChartIcon className="me-1" />
                          <span className="d-block">
                            {post.views_count} Views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted mt-3">
                      <span className="text-dark fs-6">Ans : </span>
                      <span className="text-muted fs-6">{post.answer}</span>
                    </div>
                    <div className="text-end">
                     <Link to="/replies"> <button className="btn btn-warning">read more</button></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mb-3 mt-2">
             <CustomPagination />
            </div>

          </div>
          {/* Sidebar */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="sticky-top" style={{ zIndex: "0" }}>
              <div className="bg-white mb-3">
                <h4 className="px-1 pt-4 pb-2 text-muted">Active Topics</h4>
                <hr className="m-0" />

                {posts.slice(0,5).map((post, index) => (
                  <>
                    <div className="px-3 py-3"  key={index}>
                      <h6 className="text-primary">
                        <a href="#" className="text-dark">
                          {post.title}
                        </a>
                      </h6>
                      <p className="text-muted">
                        <span className="text-muted">Posted</span>
                        <a href="#" className="text-dark ms-1">
                          {post.time_posted}
                        </a>
                        <span className="text-muted"> ago: by</span>
                        <a href="#" className="text-dark ms-1">
                          {post.posted_by}
                        </a>
                      </p>

                      <div className="text-muted">
                        <div className="row text-center">
                          <div className="col d-flex">
                            <a href="#" className="text-muted me-2">
                              <ShareIcon />
                            </a>
                            <span className="d-block">Share</span>
                          </div>
                          <div className="col d-flex">
                            <ModeCommentIcon className="me-1" />
                            <span className="d-block"> 
                              {post.replies_count} Replies
                            </span>
                          </div>
                          <div className="col d-flex">
                            <BarChartIcon className="me-1" />
                            <span className="d-block"> 
                              {post.views_count} Views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="m-0" />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumHome;
