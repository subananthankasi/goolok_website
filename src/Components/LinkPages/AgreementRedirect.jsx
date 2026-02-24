import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AgreementRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("zxcvbnm@#");

  useEffect(() => {
    if (!id) return;
    if (token) {
      navigate(`/profile_edit/property_status/${id}`, { replace: true });
    } else {
      sessionStorage.setItem("showLogin", "true");
      sessionStorage.setItem("redirectPath", `/profile_edit/property_status/${id}`);
      navigate("/", { replace: true });
    }
  }, [id, token, navigate]);

  return null;
};


export default AgreementRedirect;
