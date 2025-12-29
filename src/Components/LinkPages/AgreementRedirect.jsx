import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AgreementRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("zxcvbnm@#");


// other codes at home page

  useEffect(() => {
    if (!id) return;

    if (token) {
      // Already logged
      navigate(`/profile_edit/property_status/${id}`, { replace: true });
    } else {
      // Not logged in 
      sessionStorage.setItem("showLogin", "true");
      sessionStorage.setItem("redirectPath", `/profile_edit/property_status/${id}`);
      navigate("/", { replace: true });
    }
  }, [id, token, navigate]);

  return null;
};


export default AgreementRedirect;
