import React from "react";

export function PaymentSuccess() {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="" style={{maxWidth:"650px"}}>
            <div className="message-box _success bg-white">
              <i className="fa fa-check-circle" aria-hidden="true" />
              <h2 style={{fontSize:"20px"}}> Your payment was successful </h2>
              {/* <p style={{fontSize:"16px"}}>
                Thank you for your payment. we will <br />
                be in contact with more details shortly
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function PaymentFailed() {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
        <div className="" style={{maxWidth:"650px"}}> 
            <div className="message-box _success _failed bg-white">
              <i className="fa fa-times-circle" aria-hidden="true" />
              <h2 style={{fontSize:"22px"}}> Your payment failed </h2>
              <p style={{fontSize:"16px"}}> Try again later </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
