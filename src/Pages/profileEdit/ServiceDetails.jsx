import React, { useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import patta from "../../assets/images/patta.jpg";
// import Bookslider from "./bookslider";
// import TimelineAccordion from "./timelineaccordion";
import { FaDownload } from "react-icons/fa6";
import Serviceprice from "./serviceprice";
import Servicestatus from "./servicestatus"; import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img2 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img3 from "../../assets/images/apart1.jpg"; // Replace with your image path
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const ServiceDetails = () => {
    const { eid } = useParams()
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)



    const fetchInvoice = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/vendor/service/${eid}`, {
                headers: {
                    "Level": "progress",
                }
            });
            setGetData(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching invoice:", error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchInvoice()
    }, [])
    return (
        <>
            {/* <div className="container profile_edit"> */}
                <div className="row w-100">
                    {/* <ProfileSideBar /> */}
                    <div className="col-md-9 mx-auto py-5" style={{ paddingTop: 50 }}>
                        <div className="Mybooking">
                            <Servicestatus invoiceData={getData} fetchInvoice={fetchInvoice} eid={eid} loading={loading} />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default ServiceDetails