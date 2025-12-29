import React from "react";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShareIcon from "@mui/icons-material/Reply";
import dummy from "../../assets/images/dummyProfile.png";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import img from "../../assets/images/fav.png";

function Tickets() {
  const data = [
    {
      name: "Goolok",
      avatar: "../../../public/fav.png",
      date: "Sep 14, 2024 09:18 AM UTC",
      comment:
        "Welcome aboard! A new project has been created for you. We are excited to have you start working on it and look forward to your contributions.",
      actions: {
        comment: "Comment",
        reply: "Reply",
      },
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="row mt-4">
          <div className="card mb-3 p-3">
            {data.map((item, index) => (
              <>
                <div>
                  <div className="card-body">
                    <div className="d-flex flex-start align-items-center">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={img}
                        alt="avatar"
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                        <p className="text-muted small mb-0">{item.date}</p>
                      </div>
                    </div>

                    <p className="mt-3 mb-4 pb-2">{item.comment}</p>

                    <div className="d-flex justify-content-start">
                      <a
                        href="#!"
                        className="d-flex align-items-center me-3 text-primary"
                      >
                        <ShareIcon />
                        <p className="mb-0">Reply</p>
                      </a>
                    </div>
                  </div>
                </div>
                <hr className="mb-2" />
              </>
            ))}

            <div className="mt-2">
              <span className="fs-6">Reply to the tickets</span>

              <div className="mt-3">
                <RichTextEditorComponent>
                  <Inject
                    services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}
                  />
                </RichTextEditorComponent>
              </div>

              <div className="mt-3">
                <div className="d-flex">
                  <button className="btn btn-danger me-3">Cancel</button>
                  <button className="btn btn-primary">submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
