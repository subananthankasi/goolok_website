import React from "react";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShareIcon from "@mui/icons-material/Reply";
import dummy from "../../assets/images/dummyProfile.png"
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';



function Replies() {

    const data = [
        {
          "name": "David Das",
          "avatar": "https://example.com/avatar1.jpg",
          "date": "December 14, 2023 09:18 AM UTC",
          "comment": "Brigade Royapettah, located in Aavadi, Chennai, is generally well-regarded for its strategic location and amenities. Residents appreciate the proximity to essential services such as schools, hospitals, and markets. The development includes well-planned apartments with modern features, and the project is seen as a good investment due to its connectivity to key areas in Chennai.",
          "actions": {
            "comment": "Comment",
            "reply": "Reply"
          }
        },
        {
          "name": "Lily Coleman",
          "avatar": "https://example.com/avatar2.jpg",
          "date": "December 14, 2023 10:30 AM UTC",
          "comment": "The location of Brigade Royapettah is great, but I feel the pricing is a bit high considering the competition. However, the amenities offered are top-notch, making it worth considering.",
          "actions": {
            "comment": "Comment",
            "reply": "Reply"
          }
        },
        {
          "name": "John Smith",
          "avatar": "https://example.com/avatar3.jpg",
          "date": "December 14, 2023 11:45 AM UTC",
          "comment": "I recently visited the Brigade Royapettah site. The quality of construction is impressive, and the overall ambiance is quite pleasing. It's a good option for those looking for a new home in Chennai.",
          "actions": {
            "comment": "Comment",
            "reply": "Reply"
          }
        },
        {
          "name": "Sarah Johnson",
          "avatar": "https://example.com/avatar4.jpg",
          "date": "December 14, 2023 12:00 PM UTC",
          "comment": "Brigade Royapettah seems like a solid investment. The connectivity to key areas in Chennai is a major advantage. I'm considering booking a unit here.",
          "actions": {
            "comment": "Comment",
            "reply": "Reply"
          }
        }
      ]
      
  return (
    <div>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="row mt-4">
          <div className="card mb-3 p-3">
            <div className="row g-0 align-items-center">
              <div className="col-12 mb-3">
                <h5 className="card-title">
                  <a href="#" className="text-dark">
                    Q. What are the Reviews of Brigade royapiram, Aavadi,
                    Chennai?
                  </a>
                </h5>
                <p className="card-text">
                  <span className="text-muted">Posted</span>
                  <a href="#" className="text-dark ms-2">
                    20 minutes ago
                  </a>
                  <span className="text-muted">; by</span>
                  <a href="#" className="text-dark ms-1">
                    Ravi Kumar
                  </a>
                </p>
              </div>
              <div className="text-muted">
                <div className="row text-center">
                  <div className="col d-flex">
                    <a href="#" className="d-flex text-primary">
                      <ShareIcon />
                      <span className="d-block fs-6 ms-2">
                        Reply
                      </span> 
                    </a>
                  </div>
                  <div className="col d-flex">
                    <ModeCommentIcon className="me-1" />
                    <span className="d-block">5 Replies</span>
                  </div>
                  <div className="col d-flex">
                    <BarChartIcon className="me-1" />
                    <span className="d-block">200 Views</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <span className="fs-6">5 Replies</span>
            </div>
            <hr className="mb-2" />

            {data.map((item,index)=>(
                <>
                 <div>
              <div className="card-body">
                <div className="d-flex flex-start align-items-center">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src={dummy}
                    alt="avatar"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">
                       {item.date}
                    </p>
                  </div>
                </div>

                <p className="mt-3 mb-4 pb-2">
                  {item.comment}
                 </p>

                <div className="d-flex justify-content-start"> 
                  <a href="#!" className="d-flex align-items-center me-3 text-muted">
                     <ModeCommentIcon className="me-1" />
                    <p className="mb-0">Comment</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3 text-primary">
                    <ShareIcon/>
                    <p className="mb-0">Reply</p>
                  </a>
                </div>
              </div>
            </div>
              <hr className="mb-2" /> 
                </>
            ))}
           
           <div className="mt-2">
              <span className="fs-6">Reply to the question</span>
             
             <div className="mt-3">
              <RichTextEditorComponent>
                      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
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

export default Replies;
