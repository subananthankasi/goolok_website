import React from "react"
import android from '../../assets/images/app-ggPlay.png'
import ios from '../../assets/images/app-iOS.png'
import download from '../../assets/images/mobileplay.png'

function Application() {
  return (
    <>
     <div style={{padding:"30px 0px"}}>
      <section className="section">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div
              className="col-lg-4 col-md-12 who-1"
              style={{ textAlign: "center" }}
            >
              <h2 className="mb-5" style={{ color: "#2b2e3a" }}>
                Find A New Plot On The Go
              </h2>
              <h4 style={{ color: "#ffae42" }}>Download our app</h4>
              <p className="mb-5">Just click below...</p>
              <a href>
                <img src={ios} width="30%" />
              </a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href>
                <img src={android} width="30%" />
              </a>
            </div>
            <div className="col-lg-8 col-md-12 mt-sm-3 mt-0 ">
              <div
                className="wprt-image-video w50"
                style={{ textAlign: "center" }}
              >
                <img
                  alt="image"
                  src={download}
                  className="dow" style={{width:'50%'}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default Application;
