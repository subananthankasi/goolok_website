import { useEffect, useState } from "react";
import TodaysDeal from "./todaysDeal";
import Banner from "./banner";
import TicketCarousel from "./TicketCarousel";
import Slider from "./slider";
import Banner1 from "./banner1";
import Recentlyadded from "./recentproperty";
import TrustImages from "./TrustImages";
import Recommended from "./Recommended";
import API_BASE_URL from "../../Api/api";
import axios from "axios";
import TCarousal1 from "./TCarousal1";
import TCarousal2 from "./TCarousal2";
import PremiumProperties from "./PremiumProperties";
import Coupons from "./Coupons";
import HighreturnProperties from "./HighreturnProperties";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/Login/LoginForm";

function Home() {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/homeimages`);
      setGetData(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setLoading(false);
    }
    finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const bannerImages = getData?.filter((item) => {
    return item.title === "banner_image" && item.device === "web";
  });
  const MobileBannerImages = getData?.filter((item) => {
    return item.title === "banner_image" && item.device === "app";
  });
  const addBlock_1 = getData?.filter((item) => {
    return item.title === "adblock1" && item.device === "web";
  });
  const mobile_addBlock_1 = getData?.filter((item) => {
    return item.title === "adblock1" && item.device === "app";
  });
  const addBlock_2 = getData?.filter((item) => {
    return item.title === "adblock2" && item.device === "web";
  });
  const addBlock_3 = getData?.filter((item) => {
    return item.title === "adblock3" && item.device === "web";
  });
  const promotion_banner = getData?.filter((item) => {
    return item.title === "promotion_banner" && item.device === "web";
  });
  const Mobile_Promotion_banner = getData?.filter((item) => {
    return item.title === "promotion_banner" && item.device === "app";
  });
  const promotion_banner2 = getData?.filter((item) => {
    return item.title === "promotion_banner2" && item.device === "web";
  });
  const Mobile_promotion_banner2 = getData?.filter((item) => {
    return item.title === "promotion_banner2" && item.device === "app";
  });
  const promotion_banner3 = getData?.filter((item) => {
    return item.title === "promotion_banner3" && item.device === "web";
  });
  const Mobile_promotion_banner3 = getData?.filter((item) => {
    return item.title === "promotion_banner3" && item.device === "app";
  });



  // agreemnent redirct pages
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shouldShowLogin = sessionStorage.getItem("showLogin");
    if (shouldShowLogin === "true") {
      setIsModalOpenLogin(true);
      sessionStorage.removeItem("showLogin");
    }
  }, []);

  const closeModalLogin = () => {
    setIsModalOpenLogin(false);
  };

  const handleLoginSuccess = () => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
    closeModalLogin();
  };
  return (
    <div className="home_container">
      <LoginForm isOpen={isModalOpenLogin} closeModal={closeModalLogin} onLoginSuccess={handleLoginSuccess} />
      <Banner bannerImages={bannerImages} loading={loading} MobileBannerImages={MobileBannerImages} />
      <TicketCarousel addBlock_1={addBlock_1} loading={loading} mobile_addBlock_1={mobile_addBlock_1} />
      <TodaysDeal loading={loading} />
      <Slider promotion_banner={promotion_banner} loading={loading} Mobile_Promotion_banner={Mobile_Promotion_banner} />
      <PremiumProperties loading={loading} />
      <TCarousal1 addBlock_2={addBlock_2} loading={loading} />
      <Coupons loading={loading} />
      <TrustImages
        promotion_banner2={promotion_banner2}
        loading={loading}
        Mobile_promotion_banner2={Mobile_promotion_banner2}
      />
      <HighreturnProperties loading={loading} />
      <TCarousal2 addBlock_3={addBlock_3} loading={loading} />
      <Recommended loading={loading} />
      <Banner1 promotion_banner3={promotion_banner3} loading={loading} Mobile_promotion_banner3={Mobile_promotion_banner3} />
      <Recentlyadded loading={loading} />
    </div>
  );
}

export default Home;
