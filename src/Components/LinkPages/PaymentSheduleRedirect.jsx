import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentScheduleRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("zxcvbnm@#");

  
// other codes at home page



  useEffect(() => {
    if (!id) return;

    if (token) {
      // Already logged 
      navigate(`/profile_edit/bookdetails/${id}`, { replace: true });
    } else {
      // Not logged 
      sessionStorage.setItem("showLogin", "true");
      sessionStorage.setItem("redirectPath", `/profile_edit/bookdetails/${id}`);
      navigate("/", { replace: true });
    }
  }, [id, token, navigate]);

  return null;
};

export default PaymentScheduleRedirect;
